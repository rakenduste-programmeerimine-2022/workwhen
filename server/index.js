const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const userRouter = require("./routes/user.routes")
const shiftRouter = require("./routes/shift.routes")
require("dotenv").config()

const app = express()
const PORT = 8080

app.use(morgan("dev"))
app.use(express.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@workwhen.j4desho.mongodb.net/?retryWrites=true&w=majority`
mongoose
  .connect(uri)
  .then(() => console.log('Database connection established'))
  .catch((e) => console.error(e))

app.use("/user", userRouter)
app.use("/shift", shiftRouter)

app.get("*", (req, res) => {
    res.send("404")
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})