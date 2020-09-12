const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        const savedUser = await user.save()
        return res.status(201).send(savedUser)
    } catch (err) {
        return res.status(400).send(err)
    }
})

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        return res.send(users)
    } catch (err) {
        return res.status(500).send()
    }

    // User.find({}).then((users) => {
    //     return res.send(users)
    // }).catch((error) => {
    //     return res.status(500).send()
    // })
})

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        return res.send(user)
    } catch (error) {
        return res.status(500).send()
    }

    // const _id = req.params.id
    // User.findById(_id).then((user) => {
    //     if (!user) {
    //         return res.status(404).send()
    //     }
    //     return res.send(user)
    // }).catch((error) => {
    //     return res.status(500).send()
    // })
})

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        const savedTask = await task.save()
        return res.status(201).send(savedTask)
    } catch (err) {
        return res.status(400).send(err)
    }
    // const task = new Task(req.body)
    // task.save().then((task) => {
    //     return res.status(201).send(task)
    // }).catch((error) => {
    //     return res.status(400).send(error)
    // })
})

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        return res.send(tasks)
    } catch (err) {
        return res.status(500).send()
    }
    // Task.find({}).then((tasks) => {
    //     return res.send(tasks)
    // }).catch((error) => {
    //     return res.status(500).send()
    // })
})

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const foundedTask = await Task.findById(_id)
        if (!foundedTask) {
            return res.status(404).send()
        }
        return res.send(foundedTask)
    } catch (err) {
        return res.status(500).send()
    }
    // const _id = req.params.id
    // Task.findById(_id).then((task) => {
    //     if (!task) {
    //         return res.status(404).send()
    //     }
    //     return res.send(task)
    // }).catch((error) => {
    //     return res.status(500).send()
    // })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})