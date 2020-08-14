const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebar engine & path to setup
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicPath))

// setup dynamic content to serve
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Vishal'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Vishal'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'For help anytime call 911',
        name: 'vishal'
    })
})

app.get('/weather', (req, res) => {
    let desc, placename
    if (req.query.address) {
        geocode(req.query.address, (error, { location, longitude, latitude } = {}) => {
            if (req.query.address) {
                if (error) {
                    return res.send({
                        error: error
                    })
                }
                forecast(latitude, longitude, (error, { info, temperature, feelslike }) => {
                    if (error) {
                        return res.send({
                            error: error
                        })
                    }
                    placename = location
                    desc = info
                    res.send({
                        location: placename,
                        forecast: desc,
                        address: req.query.address
                    })
                })
            }
        })
    } else {
        return res.send({
            error: "Provide some term for search"
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "search term should provide"
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        name: 'vishal',
        message: 'Help article not found.!',
        title: '404 Error'
    })
})
app.get('*', (req, res) => {
    res.render('error', {
        name: 'vishal',
        message: '404 Page Not found',
        title: '404 Error'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})