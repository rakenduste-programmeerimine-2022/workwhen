const Shift = require("../models/Shift.model")
const { validationResult } = require("express-validator")

exports.add = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    Shift.add(req.body, req.headers["authorization"].split(" ")[1])
        .then((data) => res.send(data))
        .catch((err) => res.send(err))
}

exports.get = async (req, res) => {
    Shift.get(req.body)
        .then((data) => res.send(data))
        .catch((err) => res.send(err))
}