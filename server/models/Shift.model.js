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

shiftSchema.statics.add = async ({ date, type, username }) => {
    return new Promise(async (resolve, reject) => {
        // maybe need to check if date isn't in the past
        const shift = await Shift.findOne({ date })
        if(shift == null){
            const newShift = new Shift({
                date,
                [type]: username
            })

            newShift.save((err) => {
                if(err) return reject(err)
                resolve(newShift)
            })
        }
        shift[type].push(username)
        shift.save((err) => {
            if(err) return reject(err)
            resolve(shift)
        })
    })
}

shiftSchema.statics.get = async ({ date }) => {
    return new Promise(async (resolve, reject) => {
        const shift = await Shift.findOne({ date })
        if(shift != null) resolve(shift)
        reject("No shifts planned for this date")
    })
}

const Shift = model("Shift", shiftSchema)

module.exports = Shift