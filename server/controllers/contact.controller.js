const Contact = require("../models/Contact.model")
const { validationResult } = require("express-validator")

exports.add = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    Contact.add(req.body)
        .then((data) => res.send(data))
        .catch((err) => res.send(err))
}