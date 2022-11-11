const Shift = require("../models/Shift.model")

exports.add = async (req, res) => {
    Shift.add(req.body)
        .then((data) => res.send(data))
        .catch((err) => res.send(err))
}

exports.get = async (req, res) => {
    Shift.get(req.body)
        .then((data) => res.send(data))
        .catch((err) => res.send(err))
}