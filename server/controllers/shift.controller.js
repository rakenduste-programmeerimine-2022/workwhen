const Shift = require("../models/Shift.model")

exports.add = async (req, res) => {
    Shift.add(req.body)
        .then((data) => res.send(`All gucci ${data}`))
        .catch((err) => res.send(`Oh no ${err}`))
}