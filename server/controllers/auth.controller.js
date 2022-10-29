const User = require('../models/user.model')

exports.signup = async (req, res) => {
  User.signup(req.body)
    .then((data) => res.send(`Seems to be done ${data}`))
    .catch((err) => res.send(`Failed successfully ${err}`))
}

exports.login = async (req, res) => {}

exports.protected = async (req, res) => {}