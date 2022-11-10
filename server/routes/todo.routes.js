const express = require("express")
const router = express.Router()
const todoController = require("../controllers/todo.controller")
const { body, param } = require("express-validator")

router.post(
    "/add",
    body("title").notEmpty().trim().escape(),
    body("description").notEmpty().trim().escape(),
    body("date").isISO8601().toDate().withMessage("Wrong date format!"),
    body("assigned").notEmpty().trim().escape(),
    todoController.add
)

router.get(
    "/all",
    param("completed").trim().isBoolean(),
    todoController.all
)

router.post(
    "/update",
    body("id").notEmpty().trim().escape(),
    todoController.update
)
    
router.post(
    "/remove",
    body("id").notEmpty().trim().escape(),
    todoController.remove
)

module.exports = router