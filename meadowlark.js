const express = require('express');
const expressHandlebars = require('express-handlebars')
const handlers = require('./lib/handlers')

const app = express();

app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}));

app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'))

const PORT = process.env.PORT || 3000;

app.use((req, res) => {
    res.status(404);
    res.render('404')
})

app.use((err, req, res) => {
    res.status(500);
    res.render('500')
});

app.get('/', handlers.home)

app.get('/about', handlers.about)

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Express is running at http://localhost:${PORT}`)
    })
} else {
    module.exports = app;
}