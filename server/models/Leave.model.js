const { Schema, model } = require("mongoose")
const Shift = require("./Shift.model")
const dateRange = require("../utils/dateRange.util")

const leaveSchema = new Schema(
    {
        username: { type: String, required: true },
        type: { type: String, required: true },
        startDate: { type: Date, required: true},
        endDate: { type: Date, required: true},
        comments: { type: String }
    },
    { timestamps: true }
)

leaveSchema.statics.add = async ({ username, type, startDate, endDate, comments }) => {
    return new Promise(async (resolve, reject) => {
        const leave = await Leave.findOne({ username, type, startDate, endDate })
        if(leave) return reject("Planned/unplanned leave is already registered!")
        const newLeave = new Leave({
            username,
            type,
            startDate,
            endDate,
            comments
        })

        newLeave.save((err) => {
            if(err) return reject(err)
            // leave also needs to go to shift planning document
            const dates = dateRange(startDate, endDate)
            dates.forEach(date => {
                console.log({ date, type: "leave", username })
                Shift.add({ date, type: "leave", username })
                    .catch((err) => reject(err))
            })
            resolve(newLeave)
        })
    })
}

//all

const Leave = model("Leave", leaveSchema)

module.exports = Leave