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

exports.all = async (req, res) => {
    Contact.all()
        .then((data) => res.send(data))
        .catch((err) => res.send(err))
}

exports.edit = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    Contact.edit(req.body)
        .then((data) => res.send(data))
        .catch((err) => res.send(err))
}

exports.remove = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    Contact.remove(req.body)
        .then((data) => res.send(data))
        .catch((err) => res.send(err))
}