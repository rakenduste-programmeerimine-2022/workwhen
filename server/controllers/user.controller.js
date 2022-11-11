const User = require('../models/user.model')

exports.signup = async (req, res) => {
    User.signup(req.body)
        .then((data) => res.send(data))
        .catch((err) => res.send(err))
}

exports.login = async (req, res) => {
    User.login(req.body)
        .then((data) => res.send(data))
        .catch((err) => res.send(err))
}

exports.getAll = async (req, res) => {
    User.all(req.body)
        .then((data) => res.send(data))
        .catch((err) => res.send(err))
}