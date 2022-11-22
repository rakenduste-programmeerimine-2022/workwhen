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

router.get("/all", checkToken, contactController.all)

router.post(
    "/edit",
    checkToken,
    body("id").not().isEmpty().trim().escape(),
    body("name").isString(),
    body("email")
    .if(body("email").exists({checkFalsy: true}))
    .isEmail()
    .withMessage("Not an email"),
    body("phone").isString(),
    contactController.edit
)

router.post(
    "/remove",
    checkToken,
    body("id").not().isEmpty().trim().escape(),
    contactController.remove
)

module.exports = router