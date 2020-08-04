const http = require('http')

const url = 'http://api.weatherstack.com/current?access_key=27b1f66384800b1599c4ae275d21c835&query=45,-75'

const request = http.request(url, (response) => {
    let data = ''

    response.on('data', (chunk) => {
        data = data + chunk.toString()
    })

    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    })
})

request.on('error', (error) => {
    console.log(error.message)
})

request.end()