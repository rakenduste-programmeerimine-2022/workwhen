const express = require("express")
const router = express.Router()
const todoController = require("../controllers/todo.controller")
const { body } = require("express-validator")
const checkToken = require("../middlewares/checkToken")

router.post(
    "/add",
    checkToken,
    body("title").notEmpty().trim().escape(),
    body("description").notEmpty().trim().escape(),
    body("date").isISO8601().toDate().withMessage("Wrong date format!"),
    body("assigned").notEmpty().trim().escape(),
    todoController.add
)

router.get(
    "/all",
    checkToken,
    body("completed").notEmpty().trim().escape(),
    todoController.all
)

router.post(
    "/update",
    checkToken,
    body("id").notEmpty().trim().escape(),
    todoController.update
)
    
router.post(
    "/remove",
    checkToken,
    body("id").notEmpty().trim().escape(),
    todoController.remove
)

module.exports = router