require('dotenv').config()
const expresss = require('express');
const app = expresss();
const port = 8080;
const bodyParser = require('body-parser');
const connection = require('./database/database');
const questionModel = require('./database/Question');

// database connection
connection
    .authenticate()
    .then(() => {
        console.log('\x1b[42m\x1b[30m', `Succesfully connected to database! \x1b[0m`);
    })
    .catch(err => {
        console.log('An error has occured:', err)
    })

// configuring ejs in Express - HTML renderer
app.set('view engine', 'ejs');
// configuring express to use static files
app.use(expresss.static('public'));
// configuring bodyparser to access data from form
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/ask', (req, res) => {
    res.render('ask');
});

// we are using post since this route exists to receive the question form data
app.post('/savequestion', (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    res.send(`Form received, question title: ${title}, question description: ${description}`);
});

app.listen(port, err => {
    if (err) {
        console.log("an error has occurred: ", err);
    } else {
        console.log('\x1b[42m\x1b[30m', `Server started at port ${port} \x1b[0m`);
    }
});
