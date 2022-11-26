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
shiftSchema.statics.get = async ({ date }, token) => {
    return new Promise(async (resolve, reject) => {
        const decoded = jwt.verify(token, `${process.env.KEY}`)
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2)
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1)
        if(decoded.role === "scheduler"){
            const shift = await Shift.find(
                    { date: { $gte: firstDay, $lte: lastDay} },
                    "-_id date dayShift nightShift booked leave"
                )
                .populate("dayShift nightShift booked leave", "fullname")
                .sort({ date: 1 })
            if(shift != null) return resolve(shift)
            reject("No shifts planned for this date")
        } else {
            const shift = await Shift.find(
                { 
                    date: { $gte: firstDay, $lte: lastDay },
                    $or: 
                    [
                        { dayShift: decoded.id },
                        { nightShift: decoded.id },
                        { booked: decoded.id },
                        { leave: decoded.id }
                    ]
                    // dayShift: { $in: decoded.id},
                    // nightShift: { $in: decoded.id},
                    // booked: { $in: decoded.id},
                    // leave: { $in: decoded.id}
                    
                },
                "_id date dayShift nightShift booked leave")
                .populate("dayShift nightShift booked leave", "fullname")
                .sort({ date: 1 })
                console.log(shift)
            if(shift != null) return resolve(shift)
            reject("No shifts planned for this date")
        }
    })
}

const Shift = model("Shift", shiftSchema)

module.exports = Shift