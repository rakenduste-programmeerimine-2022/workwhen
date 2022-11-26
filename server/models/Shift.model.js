const { Schema, model } = require("mongoose")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const shiftSchema = new Schema(
    {
        date: { type: Date },
        dayShift: [{ type: Schema.Types.ObjectId, ref: "User" }],
        nightShift: [{ type: Schema.Types.ObjectId, ref: "User" }],
        booked: [{ type: Schema.Types.ObjectId, ref: "User" }],
        leave: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
    { timestamps: true }
)

shiftSchema.statics.add = async ({ shifts }, token) => {
    return new Promise(async (resolve, reject) => {
        const decoded = jwt.verify(token, `${process.env.KEY}`)
        shifts.forEach(async shift => {
            const date = shift.date
            const existingShift = await Shift.findOne({ date })
            if(existingShift == null){
                const newShift = new Shift({
                    date,
                    [shift.type]: decoded.id
                })

                newShift.save((err) => {
                    if(err) return reject(err)
                    resolve(newShift)
                })
            } else {
                /*
                    check if user is present in correct type,
                    if user is in another type, then remove
                    if not present in type then push
                */
                const inCorrectShift = existingShift[shift.type].includes(decoded.id)
                if(!inCorrectShift){
                    const inDayShift = existingShift.dayShift.includes(decoded.id)
                    const inNightShift = existingShift.nightShift.includes(decoded.id)
                    const inBooked = existingShift.booked.includes(decoded.id)
                    const inLeave = existingShift.leave.includes(decoded.id)
                    if(!(inDayShift == inCorrectShift)){
                        existingShift.dayShift.pull(decoded.id)
                    }
                    if(!(inNightShift == inCorrectShift)){
                        existingShift.nightShift.pull(decoded.id)
                    }
                    if(!(inBooked == inCorrectShift)){
                        existingShift.booked.pull(decoded.id)
                    }
                    if(!(inLeave == inCorrectShift)){
                        existingShift.leave.pull(decoded.id)
                    }
                    existingShift[shift.type].push(decoded.id)
                    existingShift.save((err) => {
                        if(err) return reject(err)
                        resolve(existingShift)
                    })
                }
            }
        })
    })
}

/* 
    should rewrite to return all user shifts based on month
    if scheduler then return everyones shift based on month
*/
shiftSchema.statics.get = async ({ date }) => {
    return new Promise(async (resolve, reject) => {
        const shift = await Shift.findOne(
                { date },
                "-_id date dayShift nightShift booked leave"
            )
            .populate("dayShift nightShift booked leave", "fullname")
        if(shift != null) return resolve(shift)
        reject("No shifts planned for this date")
    })
}

const Shift = model("Shift", shiftSchema)

module.exports = Shift