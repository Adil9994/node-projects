const fs = require('fs')

const book = {
    title : 'Fire',
    author : 'Sun'
}
/*
const bookJSON = JSON.stringify(book)
fs.writeFileSync('1-json.json', bookJSON)

const dataBuffer = fs.readFileSync('1-json.json')
const dataJSON = dataBuffer.toString()
const data = JSON.parse(dataJSON)
console.log(data.title)
*/

const dataBuffer = fs.readFileSync('1-json.json')
const dataJSON = dataBuffer.toString()
const data = JSON.parse(dataJSON)
data.age = 30
data.name = 'Mike'
const humanJSON = JSON.stringify(data)
fs.writeFileSync('1-json.json', humanJSON)

