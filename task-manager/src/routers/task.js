const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Task = require('../models/task')

router.post('/tasks', auth,  async (req, res) => {
    const task = new Task({
        ...req.body,
        ownerUser: req.user._id
    })
    try {
        const savedTask = await task.save()
        return res.status(201).send(savedTask)
    } catch (err) {
        return res.status(400).send(err)
    }
})

router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}
    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options : {
                limit : parseInt(req.query.limit),
                skip : parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        if (req.user.tasks.length === 0) return res.status(200).send('No tasks in dbase')
        return res.send(req.user.tasks)
    } catch (err) {
        return res.status(500).send(err)
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(500).send('Wrong ObjectID')
        }

        const task = await Task.findOne({ _id :req.params.id, ownerUser: req.user._id})

        if (!task) {
            return res.status(400).send('Task with id ' + req.params.id + ' not found')
        }
        return res.send(task)
    } catch (err) {
        return res.status(500).send(err)
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
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
        const task = await Task.findOne({ _id :req.params.id, ownerUser: req.user._id})

        if (!task) {
            return res.status(400).send('Task with id ' + req.params.id + ' not found')
        }

        updates.forEach((value) => {
            task[value] = req.body[value]
        })

        return res.status(200).send(await task.save())

    } catch (err) {
        return res.status(500).send(err)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(500).send('Wrong ObjectID')
        }
        const task = await Task.findOneAndDelete({ _id :req.params.id, ownerUser: req.user._id})
        if (!task) {
            return res.status(400).send('Task with id ' + req.params.id + ' not found')
        }
        return res.status(200).send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router