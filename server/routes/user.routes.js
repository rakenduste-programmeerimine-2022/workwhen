const express = require("express")
const router = express.Router()
const userController = require("../controllers/user.controller")
const { body } = require("express-validator")

router.post(
    "/signup",
    body("username").notEmpty().trim().escape(),
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 5 }).withMessage("Minimum length 5"),
    body("fullname").notEmpty().trim().escape(),
    body("contact").notEmpty().trim().escape(),
    body("birthday").isISO8601().toDate().withMessage("Wrong date format!"),
    userController.signup
)

router.post(
    "/login",
    body("username").not().isEmpty().trim().escape(),
    body("password").isLength({ min: 5 }).withMessage("Minimum length 5"),
    userController.login
)

router.get("/all", userController.getAll)
module.exports = router