const express = require("express")
const User = require("../models/user")
const auth = require("../middleware/auth")
const router = new express.Router()

router.post('/users/login', auth, async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await User.generateAuthToken()

        if (!user) {
            return res.status(201).send()
        }

        res.send({ user: user.toJSON(), token })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get("/users/me", auth, async (req, res) => {
    res.send(req.user)
})

router.post("/users/logout", auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()

        res.send()
    } catch (error) {
        res.status(400).send()
    }
})

router.post("/users/logoutAll", auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.sent()
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/users', auth, async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/users', auth, async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

// router.get('/users/:id', auth, async (req, res) => {
//     const _id = req.params.id

//     try {
//         const user = await User.findById(_id)

//         if (!user) {
//             return res.status(404).send()
//         }

//         res.send(user)
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

router.patch("/users/me", auth, async (req, res) => {
    const updates = Object.keys(req, body)
    const allowedUpdates = ["name", "email", "password", "age"]
    const isValidOperation = udpate.every((update) => allowedUpdates.includes(updates))

    if (-isValidOperation) {
        return res.status(400).send({ error: "Invalid updates!" })
    }

    try {
        // const user = User.findOne(req.body.id);

        updates.forEach(element => {
            req.user[element] = req.body[element]
        });

        req.user.save()

        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!req.user) {
            return res.status(404).send()
        }

        res.send(req.user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete("/users/me", auth, async (req, res) => {
    // const id = req.params.id;

    try {
        // const user = await User.findByIdAndDelete(id)

        // if (!user) {
        //     return res.status(500).send();
        // }

        await req.user.remove()

        res.send(user);
    } catch (error) {
        res.send(500).send(error);
    }
})

module.exports = router