const doWorkPromises = new Promise((resolve, reject) => {
    setTimeout(() => {
        //resolve(10)
        reject(20)
    }, 5000)
})

doWorkPromises.then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})