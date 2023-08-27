const express = require('express');
const expressHandlebars = require('express-handlebars')
const handlers = require('./lib/handlers')
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json())

app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))

app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'))

const PORT = process.env.PORT || 3000;

app.get('/', handlers.home)
const TOURS = [
    {
        id: 1, name: 'Худ Ровер', price: 10.99,
    },
    {
        id: 2, name: 'Ореген Ровер', price: 10.99,
    },
]

app.get('/api/tours', (req, res) => {
    res.json(TOURS)
})

app.put('/api/tour/:id', (req, res) => {
    const currentTour = TOURS.find((tour) => tour.id === parseInt(req.params.id));

    if (!currentTour) return res.status(404).json({
        error: 'No such tour exists'
    });

    if (req.body.name) currentTour.name = req.body.name;
    if (req.body.price) currentTour.price = req.body.price;
    res.json({success: true})
})


app.delete('/api/tour/:id', (req, res) => {
    const currentIndex = TOURS.findIndex((tour) => tour.id === parseInt(req.params.id))
    if (currentIndex < 0) return res.json({error: 'The tour is not exists'});
    TOURS.splice(currentIndex, 1);
    res.json({success: true})
})

app.get('/headers', (req, res) => {
    res.type('text/plain')
    const headers = Object.entries(req.headers)
        .map(([key, value]) => `${key}: ${value}`)
    res.send(headers.join('\n'))
})

app.get('/about', handlers.about)

// app.use((req, res) => {
//     res.status(404);
//     res.render('404')
// })
//
// app.use((err, req, res) => {
//     res.status(500);
//     res.render('500')
// });

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Express is running at http://localhost:${PORT}`)
    })
} else {
    module.exports = app;
}