const express = require("express")
const router = express.Router()
const shiftController = require("../controllers/shift.controller")
const { body } = require("express-validator")
const checkToken = require("../middlewares/checkToken")

router.post(
    "/add",
    checkToken,
    body("shifts").isArray().not().isEmpty(),
    shiftController.add
)

router.post(
    "/get",
    checkToken,
    body("date").isISO8601().toDate().withMessage("Wrong date format!"),
    shiftController.get
)

router.post(
    "/publish",
    checkToken,
    body("date").isISO8601().toDate().withMessage("Wrong date format!"),
    shiftController.publish
)

router.post(
    "/schedule",
    checkToken,
    body("date").isISO8601().toDate().withMessage("Wrong date format!"),
    shiftController.seeSchedule
)

module.exports = router