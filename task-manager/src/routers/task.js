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
        if (tasks.length === 0) return res.status(200).send('No tasks in dbase')
        return res.send(tasks)
    } catch (err) {
        return res.status(500).send(err)
    }
})

router.get('/tasks/:id', async (req, res) => {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(500).send('Wrong ObjectID')
        }
        const foundedTask = await Task.findById(req.params.id)
        if (!foundedTask) {
            return res.status(400).send('Task with id ' + req.params.id + ' not found')
        }
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
        return res.status(400).send({error: "Can't update"})
    }
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(500).send('Wrong ObjectID')
        }
        const foundedTask = await Task.findById(req.params.id)

        if (!foundedTask) {
            return res.status(400).send('Task with id ' + req.params.id + ' not found')
        }

        updates.forEach((value) => {
            foundedTask[value] = req.body[value]
        })

        return res.status(200).send(await foundedTask.save())

        //return res.status(200).send(await Task.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators: true}))
    } catch (err) {
        return res.status(500).send(err)
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(500).send('Wrong ObjectID')
        }
        const foundedTask = await Task.findByIdAndDelete(req.params.id)
        if (!foundedTask) {
            return res.status(400).send('Task with id ' + req.params.id + ' not found')
        }
        return res.status(200).send(foundedTask)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router