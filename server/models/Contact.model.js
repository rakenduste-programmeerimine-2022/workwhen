const { Schema, model } = require("mongoose")

const contactSchema = new Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true}
    },
    { timestamps: true }
)

contactSchema.statics.add = async ({ name, email, phone }) => {
    return new Promise(async (resolve, reject) => {
        const contact = await Contact.findOne({ name, email, phone })
        if(contact) return reject("Contact already exists!")
        const newContact = new Contact({
            name,
            email,
            phone
        })

        newContact.save((err) => {
            if(err) return reject(err)
            resolve(newContact)
        })
    })
}


const Contact = model("Contact", contactSchema)

module.exports = Contact
