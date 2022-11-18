const express = require("express")
const router = express.Router()
const leaveController = require("../controllers/leave.controller")
const { body } = require("express-validator")
const checkToken = require("../middlewares/checkToken")

router.post(
    "/add",
    checkToken,
    body("username").not().isEmpty().trim().escape(),
    body("type").not().isEmpty().trim().escape(),
    body("startDate").isISO8601().toDate().withMessage("Wrong date format!"),
    body("endDate").isISO8601().toDate().withMessage("Wrong date format!"),
    body("comments").trim().escape(),
    leaveController.add
)

module.exports = router