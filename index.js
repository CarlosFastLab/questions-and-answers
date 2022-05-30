const expresss = require('express');
const app = expresss();
const port = 8080;

// configuring ejs in Express - HTML renderer
app.set('view engine', 'ejs');
// Configuring express to use static files
app.use(expresss.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/ask', (req, res) => {
    res.render('ask');
})

app.listen(port, err => {
    if (err) {
        console.log("an error has occurred: ", error);
    } else {
        console.log('\x1b[42m\x1b[30m', `Server started at port ${port} \x1b[0m`);
    }
});