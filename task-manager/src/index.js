const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const Task = require('./models/task')
const User = require('./models/user')

const main = async() => {
    // const task = await Task.findById('5f5fcba341339f2e52a2ff9a')
    // await task.populate('ownerUser').execPopulate()
    // console.log(task.ownerUser)

    // const user = await User.findById('5f5fcb360e9bbd2dfa3c959e')
    // await user.populate('tasks').execPopulate()
    // console.log(user.tasks)

}
// main()