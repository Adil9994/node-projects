const names = ['first', 'second', 'third']
const shortNames = names.filter(name => {
    return name.length <= 4
})
/*
const geocode = (address, callback) => {
    setTimeout(() => {
    const data = {
        latitude: 0,
        longitude: 0
        }
        callback(data)
    }, 5000)
}

geocode('omsk',data => {
    console.log(data)
})
*/

/*
const add = (firstNumber, secondNumber, callback) => {
    setTimeout(() => {
        callback(firstNumber + secondNumber)
    },3000)
}

add(1, 4, (sum) => {
    console.log(sum)
})
*/

const doWorkCallback = (callback) => {
    setTimeout(() => {
        callback(undefined, 10)
    }, 1000)
}

doWorkCallback((firstArg, secondArg) => {
    console.log(firstArg)
    console.log(secondArg)
})