const express = require("express")
const router = express.Router()
const userController = require("../controllers/user.controller")
const { body } = require("express-validator")
const checkToken = require("../middlewares/checkToken")

router.post(
    "/signup",
    body("username").not().isEmpty().trim().escape(),
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 5 }).withMessage("Minimum length 5"),
    body("fullname").not().isEmpty().trim().escape(),
    body("contact").not().isEmpty().trim().escape(),
    body("birthday").isISO8601().toDate().withMessage("Wrong date format!"),
    userController.signup
)

router.post(
    "/login",
    body("username").not().isEmpty().trim().escape(),
    body("password").isLength({ min: 5 }).withMessage("Minimum length 5"),
    userController.login
)

router.get("/all", checkToken, userController.getAll)
module.exports = router