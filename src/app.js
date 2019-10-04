const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geoCode = require('./utils/geocode');
const foreCast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for EXPRESS configuration
const publicDirPath = path.join(__dirname, "../public");
const hbsViewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");


//Default directory is 'views' in root folder.
//Set-Up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', hbsViewsPath); //Not needed incase of default folder path
hbs.registerPartials(partialsPath);

//SetUp static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Application',
        name: 'Vinodh'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Vinodh'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Vinodh'
    });
});
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Provide an address'
        });
    }

    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        foreCast(latitude, longitude, (error, foreCastData) => {
            if (error) {
                return res.send({ error });
            }

            return res.send({
                location,
                forecast: foreCastData,
                address: req.query.address
            });

        });
    });
});

app.get('/products', (req, res) => {
    // To make parameters as required
    if (!req.query.search) {
        return res.send({
            error: 'Provide a search term'
        });
    }

    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Error HELP',
        errorMessage: '404 ERROR page for help article.',
        name: 'Vinodh'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page: Generic',
        errorMessage: '404 ERROR page: Page not found!',
        name: 'Vinodh'
    });
});

app.listen(port, () => {
    console.log("Server started successfully on port: " + port);
});