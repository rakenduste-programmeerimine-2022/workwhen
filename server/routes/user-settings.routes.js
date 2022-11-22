const express = require("express")
const router = express.Router()
const { body } = require("express-validator")
const checkToken = require("../middlewares/checkToken")
const userSettingsController = require("../controllers/user-settings.controller")

router.post(
    "/usersettings",
    body("username").not().isEmpty().trim().escape(),
    body("currentPwd").isLength({ min: 5 }).withMessage("Minimum length 5"),
    body("newPwd").isLength({ min: 5 }).withMessage("Minimum length 5"),
    userSettingsController.usersettings
)

module.exports = router