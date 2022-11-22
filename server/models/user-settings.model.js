const { Schema, model } = require("mongoose")
const bcrypt = require("bcrypt")
require("dotenv").config()

const userSettingsSchema = new Schema(
    {
        username: { type: String, required: true},
        currentPwd: { type: String, required: true },
        newPwd: {type: String, required: true }
    },
    { timestamps: true }
)

userSettingsSchema.statics.usersettings = async ({ username, currentPwd, newPwd }) => {
    return new Promise(async (resolve, reject) => {
        const currentUser = await Pwdchange.findOne({ username })
        if(!await bcrypt.compare(currentPwd, currentUser.password)) return reject("Wrong current password!")
        else {
            currentUser.password = await bcrypt.hash(newPwd, 10)
            } if (error) {
                return reject(error)
            } else {
                resolve(currentUser)
            }
    }
)}

const UserSettings = model("UserSettings", userSettingsSchema)
module.exports = UserSettings