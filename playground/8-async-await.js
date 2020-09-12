const add = (a , b) => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                return reject('Numbers must be non negative')
            }
            resolve(a + b)
        }, 2000)
    })
}

const doWork = async () => {
    const firstSum = await add(1, 1)
    const secondSum = await add(2, 2)
    const thirdSum = await add(3, 3)
    return thirdSum
}

doWork().then((result) => {
    console.log(result)
}).catch((err) => {
    console.log(err)
})