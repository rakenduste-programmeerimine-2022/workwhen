const express = require("express")
const router = express.Router()
const todoController = require("../controllers/todo.controller")
const checkToken = require("../middlewares/checkToken")
const { body, param } = require("express-validator")

router.post(
    "/add",
    checkToken,
    body("title").not().isEmpty().trim().escape(),
    body("description").not().isEmpty().trim().escape(),
    body("date").isISO8601().toDate().withMessage("Wrong date format!"),
    body("assigned").not().isEmpty().trim().escape(),
    todoController.add
)

router.get(
    "/all",
    checkToken,
    param("completed").trim().isBoolean(),
    todoController.all
)

router.post(
    "/update",
    checkToken,
    body("id").not().isEmpty().trim().escape(),
    todoController.update
)
    
router.post(
    "/remove",
    checkToken,
    body("id").not().isEmpty().trim().escape(),
    todoController.remove
)

module.exports = router