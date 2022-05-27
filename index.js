const expresss = require('express');
const app = expresss();
const port = 8080;

// configuring ejs in Express - HTML renderer
app.set('view engine', 'ejs');

app.get('/:name/:lang', (req, res) => {
    const name = req.params.name;
    const lang = req.params.lang;
    res.render('index', {
        name,
        lang,
        company: 'Fast INC.',
        subs: 8001
    });
});

app.listen(port, (err) => {
    if (err) {
        console.log("an error has occurred: ", error);
    } else {
        console.log('\x1b[42m\x1b[30m', `Server started at port ${port} \x1b[0m`);
    }
});