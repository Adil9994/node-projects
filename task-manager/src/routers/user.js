const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        return res.status(201).send({user, token})
    } catch (err) {
        return res.status(400).send(err)
    }
})

router.post('/users/login', async (req, res,) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        return res.status(200).send({user : user , token : token})
    } catch (err) {
        return res.status(400).send(err)
    }
})
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        return res.send()
    } catch (err) {
        return res.status(500).send()
    }
})
router.post('/users/logout', auth, async (req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        return res.send()
    } catch(err) {
        return res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    return res.status(200).send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    const isValid = updates.every((value) => {
        return allowedUpdates.includes(value)
    })
    if (!isValid) {
        return res.status(400).send({ error : "Can't update"})
    }
    try {
        updates.forEach((value) => req.user[value] = req.body[value])
        return res.status(200).send(await req.user.save())
    } catch (err) {
        return res.status(500).send(err)
    }
})

router.delete('/users/me', auth,  async (req, res) => {
    try {
        await req.user.remove()
        return res.status(200).send(req.user)
    } catch (error) {
        return res.status(500).send(error)
    }
})

module.exports = router