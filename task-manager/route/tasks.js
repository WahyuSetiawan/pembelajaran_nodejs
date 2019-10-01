const express = require('express')
const Task = require("../models/user")
const router = new express.Router()


router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()

        res.status(201).send()
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get("tasks/:id", async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(id)

        if (!task) {
            return res.status(404).send()
        }

        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete("/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if (!task) {
            return req.status(404).send()
        }

        req.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router
