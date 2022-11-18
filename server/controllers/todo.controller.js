const Todo = require("../models/Todo.model")
const { validationResult } = require("express-validator")

exports.add = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    Todo.add(req.body)
        .then((data) => res.send(data))
        .catch((err) => res.send(err))
}

exports.all = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    Todo.all(req.query)
        .then((data) => res.send(data))
        .catch((err) => res.send(err))
}

exports.update = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    Todo.update(req.body)
        .then((data) => res.send(data))
        .catch((err) => res.send(err))
}

exports.remove = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    Todo.remove(req.body)
        .then((data) => res.send(data))
        .catch((err) => res.send(err))
}