const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

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
    res.send('Weather page')
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


app.listen(3000, () => {
    console.log('Server is up')
})