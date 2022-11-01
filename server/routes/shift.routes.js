const express = require("express")
const router = express.Router()
const shiftController = require("../controllers/shift.controller")
const { body } = require("express-validator")

router.post(
    "/add",
    body("date").isISO8601().toDate().withMessage("Wrong date format!"),
    body("type").notEmpty().trim().escape(),
    body("employeeId").notEmpty().trim().escape(),
    shiftController.add)

    module.exports = router