const Bookmark = require("../models/Bookmark.model")

exports.add = async (req, res) => {
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