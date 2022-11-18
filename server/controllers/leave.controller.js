const Leave = require("../models/Leave.model")

exports.add = async (req, res) => {
    Leave.add(req.body)
        .then((data) => res.send(data))
        .catch((err) => res.send(err))
}