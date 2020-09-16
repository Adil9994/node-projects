const express = require('express')
const router = new express.Router()
const multer = require('multer')
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

const upload = multer({
    limits : {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }
        return cb(null, true)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    req.user.avatar = req.file.buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(500).send('Wrong ObjectID')
        }
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).send('User does not exist')
        }
        if (!user.avatar) {
            res.status(500).send('User avatar is empty')
        }
        res.set('Content-Type', 'image/jpg')
        res.send(user.avatar)
    } catch (err) {
        res.status(500).send()
    }
})

module.exports = router