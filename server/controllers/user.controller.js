const User = require('../models/user.model')
const { validationResult } = require("express-validator")

exports.signup = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    User.signup(req.body)
        .then((data) => res.send(data))
        .catch((err) => res.send(err))
}

exports.login = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    User.login(req.body)
        .then((data) => res.send(data))
        .catch((err) => res.send(err))
}

exports.getAll = async (req, res) => {
    User.all(req.body)
        .then((data) => res.send(data))
        .catch((err) => res.send(err))
}

exports.changePassword = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    User.changePassword(req)
        .then((data) => res.send(data))
        .catch((err) => res.send(err))
}