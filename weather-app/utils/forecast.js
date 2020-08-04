const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=27b1f66384800b1599c4ae275d21c835&query=' + latitude + ',' + longitude

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else callback(undefined, {
            current: body.current
        })
    })
}

module.exports = forecast