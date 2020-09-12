require('../src/db/mongoose')

const Task = require('../src/models/task')
//
// Task.findByIdAndDelete({_id : "5f5bcf0f493aa66d293a7f66"}).then((deletedTask) => {
//     console.log(deletedTask)
//     return Task.countDocuments({completed: false})
// }).then((tasks) => {
//     console.log(tasks)
// }).catch((error) => {
//     console.log(error)
// })

const deleteTask = async () => {
    await Task.findByIdAndDelete({_id : "5f5bcf0e493aa66d293a7f65"})
    return await Task.countDocuments({completed : false})
}

deleteTask().then((countsTasks) => {
    console.log(countsTasks)
}).catch((err) => {
    console.log(err)
})

const User = require('../src/models/user')

// User.findByIdAndUpdate('5f5b8f74039c505ba96be21c', { age: 0}).then((user) => {
//     console.log(user)
//     return User.countDocuments( {age: 0} )
// }).then((result) => {
//     console.log(result)
// }).catch((err) => {
//     console.log(err)
// })

// const updateUserById = async () => {
//         const updatedUser = await User.findByIdAndUpdate('5f5b8f74039c505ba96be21c', {age: 15})
//         return await User.countDocuments({age : 15})
// }
//
// updateUserById().then((countUserAgeTen) => {
//     console.log(countUserAgeTen)
// }).catch((err) => {
//     console.log(err)
// })