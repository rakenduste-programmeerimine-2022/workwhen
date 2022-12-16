const { Schema, model } = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const userSchema = new Schema(
    {
        username: { type: String, required: true},
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        fullname: { type: String, required: true },
        contact: { type: String, required: true }, // not needed
        birthday: { type: Date, required: true },
        role: { type: String, default: 'employee' },
        deleted: { type: Boolean, default: false }
    },
    { timestamps: true }
)

userSchema.statics.signup = async ({ username, email, password, fullname, contact, birthday, role }) => {
    return new Promise(async (resolve, reject) => {
        const user = await User.findOne({ email })
        if(user) reject("User already exists!")
        else {
            const newUser = new User({
                username,
                email,
                password: await bcrypt.hash(password, 10),
                fullname,
                contact,
                birthday,
                role
            })
    
            newUser.save((err) => {
                if(err) return reject(err)
                resolve(newUser)
            })
        }

    })
}

userSchema.statics.changePassword = async (req) => {
    return new Promise(async (resolve, reject) => {
        const { username, currentPwd, newPwd } = req.body
        const token = req.headers["authorization"].split(" ")[1]

        const decoded = jwt.verify(token, `${process.env.KEY}`)

        const existingUser = await User.findById(decoded.id)
        if(!existingUser) return reject("Something went wrong!")
        if(!await bcrypt.compare(currentPwd, existingUser.password)) return reject("Wrong current password!")
        // console.log(newPwd)

        existingUser.password = await bcrypt.hash(newPwd, 10)

        existingUser.save((err) => {
            if(err) return reject(err)
            resolve("Successfully changed password!")
        })
    })
}

userSchema.statics.login = async ({ username, password }) => {
    return new Promise(async (resolve, reject) => {
        const existingUser = await User.findOne({ username })
        if(!existingUser) return reject("User doesn't exist!")
        if(!await bcrypt.compare(password, existingUser.password)) return reject("Wrong username or password!")
        else {
            const token = jwt.sign(
                {
                    id: existingUser._id,
                    role: existingUser.role
                },
                `${process.env.KEY}`,
                { expiresIn: "12h" }
            )
            if(!token) reject("Somethin went wrong!")
            const response = {
                token,
                data: {
                    username: existingUser.username,
                    email: existingUser.email,
                    fullname: existingUser.fullname,
                    role: existingUser.role
                }
            }
            resolve(response)
        }

    })
}

userSchema.statics.all = async () => {
    return new Promise(async (resolve, reject) => {
        const users = await User.find({ deleted: false }, " -_id email fullname contact birthday", {})
        resolve(users)
        // console.log(users)
    })
}

const User = model("User", userSchema)

module.exports = User
