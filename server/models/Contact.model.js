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

contactSchema.statics.edit = async ({ id, name, email, phone }) => {
    return new Promise(async (resolve, reject) => {
        const contact = await Contact.findById(id)
        if(!contact) return reject("Contact doesn't exist!")
        
        if(name && name !== contact.name){
            contact.name = name
        }
        if(email && email !== contact.email){
            contact.email = email
        }
        if(phone && phone !== contact.phone){
            contact.phone = phone
        }
        
        contact.save((err) => {
            if(err) return reject(err)
            resolve(contact)
        })
    })
}

const Contact = model("Contact", contactSchema)

module.exports = Contact
