const UserSettings = require('../models/user-settings.model')
const { validationResult } = require("express-validator")

exports.usersettings = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    UserSettings.usersettings(req.body)
        .then((data) => res.send(data))
        .catch((err) => res.send(err))
}