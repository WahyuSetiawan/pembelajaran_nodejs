const express = require('express')
const Task = require("../models/user")
const auth = require("../middleware/auth")
const router = new express.Router()


router.post('/tasks', auth, async (req, res) => {
    const task = new Task({ ...req.body, owner: req.user._id })

    try {
        await task.save()

        res.status(201).send()
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({ owner: req.user._id })
        res.send(tasks)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get("/tasks", auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById({ _id: _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})


router.patch("/tasks/:id", auth, async (req, res) => {
    const updates = Object.keys(res.body)
    const allowedUpdates = ["description", "completed"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid updates !" })
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete("/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            return req.status(404).send()
        }

        req.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router
