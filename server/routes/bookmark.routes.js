const express = require("express")
const router = express.Router()
const bookmarkController = require("../controllers/bookmark.controller")
const { body } = require("express-validator")
const checkToken = require("../middlewares/checkToken")

router.post(
    "/add",
    checkToken,
    body("category").notEmpty().trim().escape(),
    body("title").notEmpty().trim().escape(),
    body("description").trim().escape(),
    body("link").notEmpty(),
    bookmarkController.add
)

router.post(
    "/remove",
    checkToken,
    body("id").notEmpty().trim().escape(),
    bookmarkController.remove
)

router.get("/all", checkToken, bookmarkController.all)

module.exports = router