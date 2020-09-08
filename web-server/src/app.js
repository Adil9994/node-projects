const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render("index", {
        title: 'Weather App',
        name: 'dim'
    })
})

app.get('/about', (req, res) => {
    res.render("about", {
        title: 'yolo',
        name: 'vitalya'
    })
})

app.get('/help', (req, res) => {
    res.render("help", {
        title: 'helppp',
        name: 'lyk'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send('No address')
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send(error)
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send(error)
            }
            res.send([{location},{info :forecastData}])
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'asd',
        name: 'asd',
        errorMessage: 'Help page not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'asd',
        name: 'asd',
        errorMessage: 'Page not found'
    })
})


app.listen(port, () => {
    console.log('Server is up')
})