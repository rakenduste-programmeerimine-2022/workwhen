const jwt = require("jsonwebtoken")
require("dotenv").config()

const checkToken = (req, res, next) => {
    const header = req.headers["authorization"]

    if(typeof header !== "undefined"){
        const bearer = header.split(" ")
        const token = bearer[1]

        jwt.verify(token, `${process.env.KEY}`, (err, decoded) => {
            if(err){
                res.sendStatus(403)
            } else {
                next()
            }
        })
    } else {
        res.sendStatus(403)
    }
}

module.exports = checkToken