const express = require("express");
const router = express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");


router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
});

router.get('/users/me', auth, async (req, res) => {
    // try {
    //     const users = await User.find({})
    //     res.status(200).send(users)
    // } catch (error) {
    //     res.status(500).send()
    // }
    res.send(req.user)
});




router.patch('/users/me', auth, async (req, res) => {
    const id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })
    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid updates" })
    }
    try {
        // const user = await User.findById(req.params.id)
        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })
        await req.user.save()
        res.send(req.user)


    } catch (error) {
        res.status(400).send()
    }
})


router.delete('/users/me', auth, async (req, res) => {
    // const id = req.params.id
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (error) {
        res.status(500).send()
    }
})

// user login routes
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send()
    }
});


// logout  user
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

// logout all user
router.post('/users/logoutall', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})
module.exports = router