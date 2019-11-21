const express = require('express')
require("./db/mongoose")
const User = require("./models/user")
const Task = require("./models/task")

const userRouter = require("./route/user")
const tasksRouter = require("./route/tasks")


const app = express()
const port = process.env.PORT || 3030

app.use(express.json())
app.use(userRouter)
app.use(tasksRouter)

app.listen(port, () => {
    console.log("Server is up on port : " + port)
})
