const Leave = require("../models/Leave.model")
const { validationResult } = require("express-validator")


exports.add = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    Leave.add(req.body)
        .then((data) => res.send(data))
        .catch((err) => res.send(err))
}

exports.all = async (req, res) => {
    Leave.all()
        .then((data) => res.send(data))
        .catch((err) => res.send(err))
}