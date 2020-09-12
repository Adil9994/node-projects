// const doWorkPromises = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         //resolve(10)
//         reject(20)
//     }, 5000)
// })
//
// doWorkPromises.then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000)
    })
}

// add(1, 2).then((sum) => {
//     console.log(sum)
// }).catch((error) => {
//     console.log(error)
// })

add(1, 1).then((sum) => {
    console.log(sum)
    return add(sum, 1)
}).then((sum) => {
    console.log(sum)
})

