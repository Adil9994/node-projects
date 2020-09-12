const express = require('express')
const router = new express.Router()
const Task = require('../models/task')

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        const savedTask = await task.save()
        return res.status(201).send(savedTask)
    } catch (err) {
        return res.status(400).send(err)
    }
})

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        return res.send(tasks)
    } catch (err) {
        return res.status(500).send(err)
    }
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const foundedTask = await Task.findById(_id)
        return res.send(foundedTask)
    } catch (err) {
        return res.status(500).send(err)
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['completed', 'description']
    const isValid = updates.every((value) => {
        return allowedUpdates.includes(value)
    })
    if (!isValid) {
        return res.status(400).send({ error : "Can't update"})
    }
    try {
        return res.status(200).send(await Task.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators: true}))
    } catch (err) {
        return res.status(500).send(err)
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        return res.status(200).send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router