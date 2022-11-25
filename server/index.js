const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const userRouter = require("./routes/user.routes")
const shiftRouter = require("./routes/shift.routes")
const bookmarkRouter = require("./routes/bookmark.routes")
const todoRouter = require("./routes/todo.routes")
const leaveRouter = require("./routes/leave.routes")
const contactRouter = require("./routes/contact.routes")
require("dotenv").config()

const app = express()
const PORT = 8080

app.use(morgan("dev"))
app.use(express.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    next()
})

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@workwhen.j4desho.mongodb.net/?retryWrites=true&w=majority`
mongoose
  .connect(uri)
  .then(() => console.log('Database connection established'))
  .catch((e) => console.error(e))

app.use("/user", userRouter)
app.use("/shift", shiftRouter)
app.use("/bookmark", bookmarkRouter)
app.use("/todo", todoRouter)
app.use("/leave", leaveRouter)
app.use("/contact", contactRouter)

app.get("*", (req, res) => {
    res.send("404")
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})