const { Schema, model } = require("mongoose")

const todoSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        date: { type: Date, required: true },
        assigned: { type: String, required: true },
        completed: { type: Boolean, default: false },
        deleted: { type: Boolean, default: false }
    },
    { timestamps: true }
)

todoSchema.statics.add = async ({ title, description, date, assigned }) => {
    return new Promise(async (resolve, reject) => {
        const todo = await Todo.findOne({ title, description, date, assigned }, { completed: false })
        if(todo) reject("To-do already exists!")
        const newTodo = new Todo({
            title,
            description,
            date,
            assigned
        })

        newTodo.save((err) => {
            if(err) return reject(err)
            resolve(newTodo)
        })
    })
}

todoSchema.statics.all = async ({ completed }) => {
    return new Promise(async (resolve, reject) => {
        const todos = await Todo.find({ completed, deleted: false }, "_id title description date assigned")
        resolve(todos)
    })
}

todoSchema.statics.update = async ({ id }) => {
    return new Promise(async (resolve, reject) => {
        const todo = await Todo.findById(id)
        if(!todo) reject("To-do doesn't exist")
        todo.completed = true
        todo.save((err) => {
            if(err) return reject(err)
            resolve(todo)
        })
    })
}

todoSchema.statics.remove = async ({ id }) => {
    return new Promise(async (resolve, reject) => {
        const todo = await Todo.findById(id)
        if(!todo) reject("To-do doesn't exist")
        todo.deleted = true

        todo.save((err) => {
            if(err) return reject(err)
            resolve(todo)
        })
    })
}

const Todo = model("Todo", todoSchema)

module.exports = Todo