const { Schema, model } = require("mongoose")

const shiftSchema = new Schema(
    {
        date: { type: Date },
        dayShift: [{ type: String }],
        nightShift: [{ type: String }],
        booked: [{ type: String }],
        leave: [{ type: String }],
    },
    { timestamps: true }
)

shiftSchema.statics.add = async ({ date, type, employeeId }) => {
    return new Promise(async (resolve, reject) => {
        // maybe need to check if date isn't in the past
        const shift = await Shift.findOne({ date })
        if(!shift){
            const newShift = new Shift({
                date,
                [type]: employeeId
            })

            newShift.save((err) => {
                if(err) return reject(err)
                resolve(newShift)
            })
        }
        shift[type].push(employeeId)
        shift.save((err) => {
            if(err) return reject(err)
            resolve(shift)
        })
    })
}

const Shift = model("Shift", shiftSchema)

module.exports = Shift