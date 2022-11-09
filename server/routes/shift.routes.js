const express = require("express")
const router = express.Router()
const shiftController = require("../controllers/shift.controller")
const { body } = require("express-validator")
const checkToken = require("../middlewares/checkToken")

router.post(
    "/add",
    checkToken,
    body("date").isISO8601().toDate().withMessage("Wrong date format!"),
    body("type").notEmpty().trim().escape(),
    body("username").notEmpty().trim().escape(),
    shiftController.add
)

router.get(
    "/get",
    checkToken,
    body("date").isISO8601().toDate().withMessage("Wrong date format!"),
    shiftController.get
)

module.exports = router