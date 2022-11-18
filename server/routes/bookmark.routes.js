const express = require("express")
const router = express.Router()
const bookmarkController = require("../controllers/bookmark.controller")
const { body } = require("express-validator")
const checkToken = require("../middlewares/checkToken")

router.post(
    "/add",
    checkToken,
    body("category").not().isEmpty().trim().escape(),
    body("title").not().isEmpty().trim().escape(),
    body("description").trim().escape(),
    body("link").not().isEmpty(),
    bookmarkController.add
)

router.post(
    "/remove",
    checkToken,
    body("id").not().isEmpty().trim().escape(),
    bookmarkController.remove
)

router.get("/all", checkToken, bookmarkController.all)

module.exports = router