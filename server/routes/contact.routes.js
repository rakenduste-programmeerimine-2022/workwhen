const express = require("express")
const router = express.Router()
const contactController = require("../controllers/contact.controller")
const { body } = require("express-validator")
const checkToken = require("../middlewares/checkToken")

router.post(
    "/add",
    checkToken,
    body("name").not().isEmpty().trim().escape(),
    body("email").not().isEmpty().isEmail(),
    body("phone").not().isEmpty().trim().escape(),
    contactController.add
)

module.exports = router