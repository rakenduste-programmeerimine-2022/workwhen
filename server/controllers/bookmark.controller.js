const Bookmark = require("../models/Bookmark.model")
const { validationResult } = require("express-validator")

exports.add = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    Bookmark.add(req.body)
        .then((data) => res.send(data))
        .catch((err) => res.send(err))
}

exports.remove = async (req, res) => {
    Bookmark.remove(req.body)
        .then((data) => res.send(data))
        .catch((err) => res.send(err))
}

exports.all = async (req, res) => {
    Bookmark.all(req.body)
        .then((data) => res.send(data))
        .catch((err) => res.send(err))
}