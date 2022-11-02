const Shift = require("../models/Shift.model")

exports.add = async (req, res) => {
    Shift.add(req.body)
        .then((data) => res.send(`Success ${data}`))
        .catch((err) => res.send(`Oh no ${err}`))
}

exports.get = async (req, res) => {
    Shift.get(req.body)
        .then((data) => res.send(`Success ${data}`))
        .catch((err) => res.send(`Oh no ${err}`))
}