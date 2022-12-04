const { Schema, model } = require("mongoose")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const shiftSchema = new Schema(
    {
        date: { type: Date, required: true },
        dayShift: [{ type: Schema.Types.ObjectId, ref: "User" }],
        nightShift: [{ type: Schema.Types.ObjectId, ref: "User" }],
        booked: [{ type: Schema.Types.ObjectId, ref: "User" }],
        leave: [{ type: Schema.Types.ObjectId, ref: "User" }],
        published: { type: Boolean, default: false}
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
                if(existingShift.published) return reject("Cannot add to an already published schedule!")
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
    if not scheduler then return months shifts
    if scheduler then return everyones shifts based on month
*/
shiftSchema.statics.get = async ({ date }, token) => {
    return new Promise(async (resolve, reject) => {
        const decoded = jwt.verify(token, `${process.env.KEY}`)
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2).setUTCHours(0)
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1).setUTCHours(0)
        if(decoded.role === "scheduler"){
            const shift = await Shift.find(
                    { date: { $gte: firstDay, $lte: lastDay} },
                    "-_id date dayShift nightShift booked leave published"
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
                },
                "_id date dayShift nightShift booked leave published",)
                .populate("dayShift nightShift booked leave", "fullname")
                .sort({ date: 1 })
                .lean()

            // cleaning the output document
            const employeeShifts = []
            shift.forEach((elem) => {
                let title = ["Day-Shift", "Night-Shift", "Booked", "Leave"]

                elem.dayShift = elem.dayShift.filter(user => user._id.toString() == decoded.id)
                if(elem.dayShift.length === 0){
                    title = title.filter(type => type !== "Day-Shift")
                }

                elem.nightShift = elem.nightShift.filter(user => user._id.toString() == decoded.id)
                if(elem.nightShift.length === 0){
                    title = title.filter(type => type !== "Night-Shift")
                }

                elem.booked = elem.booked.filter(user => user._id.toString() == decoded.id)
                if(elem.booked.length === 0){
                    title = title.filter(type => type !== "Booked")
                }

                elem.leave = elem.leave.filter(user => user._id.toString() == decoded.id)
                if(elem.leave.length === 0){
                    title = title.filter(type => type !== "Leave")
                }

                employeeShifts.push({
                    date: elem.date,
                    title: title[0]
                })
            })
            if(shift.length >= 1 && employeeShifts.length >= 1) return resolve(employeeShifts)
            reject("No shifts planned for this date")
        }
    })
}

shiftSchema.statics.publish = async ({ date }, token) => {
    return new Promise(async (resolve, reject) => {
        const decoded = jwt.verify(token, `${process.env.KEY}`)
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2).setUTCHours(0)
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1).setUTCHours(0)
        
        if(decoded.role !== "scheduler") return reject(`Cannot publish schedule with ${decoded.role} role!`)
        const shifts = await Shift.find({ date: { $gte: firstDay, $lte: lastDay}, published: false})
        if(shifts.length === 0) return reject("No shifts in this month or it's already published!")

        shifts.forEach(shift => {
            shift.published = true
            shift.save((err) => {
                if(err) return reject(err)
            })
        })
        resolve(shifts)
    })
}

const Shift = model("Shift", shiftSchema)

module.exports = Shift