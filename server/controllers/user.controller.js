const User = require('../models/user.model')

exports.signup = async (req, res) => {
    User.signup(req.body)
        .then((data) => res.send(`Seems to be done ${data}`))
        .catch((err) => res.send(`Failed successfully ${err}`))
}

exports.login = async (req, res) => {
    // needs to store token (from data) to somewhere
    User.login(req.body)
        .then((data) => res.send(`Seems to be logged in ${data}`))
        .catch((data) => res.send(`Error ${data}`))
}

// exports.protected = async (req, res) => {}

exports.getAll = async (req, res) => {
    User.all(req.body)
        .then((data) => res.send(data))
        .catch((data) => res.send(`Error ${data}`))
}