require('../src/db/mongoose')

const Task = require('../src/models/task')

Task.findByIdAndDelete({_id : "5f5bcf0f493aa66d293a7f66"}).then((deletedTask) => {
    console.log(deletedTask)
    return Task.countDocuments({completed: false})
}).then((tasks) => {
    console.log(tasks)
}).catch((error) => {
    console.log(error)
})