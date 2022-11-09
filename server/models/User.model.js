const { Schema, model } = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const key = require("../secret")

const userSchema = new Schema(
    {
        username: { type: String, required: true},
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        fullname: { type: String, required: true },
        contact: { type: String, required: true },
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

userSchema.statics.login = async ({ username, password }) => {
    return new Promise(async (resolve, reject) => {
        const existingUser = await User.findOne({ username })
        if(!existingUser) return reject("User doesn't exist!")
        if(!await bcrypt.compare(password, existingUser.password)) return reject("Wrong password!")
        else {
            const token = jwt.sign(
                {
                    id: existingUser._id
                },
                `${key}`,
                { expiresIn: "12h" }
            )
            if(!token) reject("Somethin went wrong!")
            const response = {
                token,
                data: {
                    username: existingUser.username,
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
        // some checks? for example if token present
        const users = await User.find({ deleted: false }, {})
        resolve(users)
    })
}

const User = model("User", userSchema)

module.exports = User
