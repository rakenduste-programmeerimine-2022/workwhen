const { Schema, model } = require("mongoose")
const Shift = require("./Shift.model")
const dateRange = require("../utils/dateRange.util")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const leaveSchema = new Schema(
    {
        employee: { type: Schema.Types.ObjectId, ref: "User", required: true },
        type: { type: String, required: true },
        startDate: { type: Date, required: true},
        endDate: { type: Date, required: true},
        comments: { type: String },
        deleted: { type: Boolean, default: false }
    },
    { timestamps: true }
)

leaveSchema.statics.add = async ({ id, type, startDate, endDate, comments }) => {
    return new Promise(async (resolve, reject) => {
        const leave = await Leave.findOne({ id, type, startDate, endDate })
        if(leave) return reject("Planned/unplanned leave is already registered!")
        const newLeave = new Leave({
            employee: id,
            type,
            startDate,
            endDate,
            comments
        })

        const token = jwt.sign({ id }, `${process.env.KEY}`, { expiresIn: 60 })
        if(!token) return reject("Something went wrong!")

        // leave also needs to go to shift planning documents
        // converting to acceptable form
        const dates = dateRange(startDate, endDate)
        const leaveToShift = new Object()
        leaveToShift.shifts = new Array()
        dates.forEach(date => {
            leaveToShift.shifts.push({ date, type: "leave" })
        })
        newLeave.save((err) => {
            if(err) return reject(err)
            Shift.add(leaveToShift, token).catch((err) => reject(err))
            resolve(newLeave)
        })
    })
}

leaveSchema.statics.all = async () => {
    return new Promise(async (resolve, reject) => {
        const leaves = await Leave.find(
            {},
            "_id employee type startDate endDate comments")
            .populate("employee", "fullname")
        resolve(leaves)
    })
}

const Leave = model("Leave", leaveSchema)

module.exports = Leave