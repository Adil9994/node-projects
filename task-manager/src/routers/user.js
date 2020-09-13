const express = require('express')
const router = new express.Router()
const User = require('../models/user')

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        const savedUser = await user.save()
        return res.status(201).send(savedUser)
    } catch (err) {
        return res.status(400).send(err)
    }
})

router.post('/users/login', async (req, res,) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        return res.status(200).send(user)
    } catch (err) {
        return res.status(400).send(err)
    }
})

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        if (users.length === 0) return res.status(200).send('No users in dbase')
        return res.status(200).send(users)
    } catch (err) {
        return res.status(500).send(err)
    }
})

router.get('/users/:id', async (req, res) => {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(500).send('Wrong ObjectID')
        }
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(400).send('User with id ' + req.params.id + ' not found')
        }
        return res.send(user)
    } catch (error) {
        return res.status(500).send(error)
    }
})

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    const isValid = updates.every((value) => {
        return allowedUpdates.includes(value)
    })
    if (!isValid) {
        return res.status(400).send({ error : "Can't update"})
    }
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(500).send('Wrong ObjectID')
        }
        const user = await User.findById(req.params.id)

        if (!user) {
            return res.status(400).send('User with id ' + req.params.id + ' not found')
        }
        updates.forEach((value) => user[value] = req.body[value])

        return res.status(200).send(await user.save())

        //return res.status(200).send(await User.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators: true}))
    } catch (err) {
        return res.status(500).send(err)
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(500).send('Wrong ObjectID')
        }
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(400).send('User with id ' + req.params.id + ' not found')
        }
        return res.status(200).send(user)
    } catch (error) {
        return res.status(500).send(error)
    }
})

module.exports = router