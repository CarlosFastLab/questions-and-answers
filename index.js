require('dotenv').config()
const expresss = require('express');
const app = expresss();
const port = 8080;
const bodyParser = require('body-parser');
const connection = require('./database/database');
const Question = require('./database/Question');
const Answer = require('./database/Answer');

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
    // Equivalent to SELECT * FROM question
    // raw: true parameter only brings back the data persisted, with no additional(unnecessary) data
    // order: ordering data, in this case based on id column value
    Question.findAll({ raw: true, order: [
        ['id', 'DESC']
    ]})
    .then((questions) => {
        // Passing the returned questions to our "frontend" with EJS
        res.render('index', {
            questions
        });
    });
});

app.get('/ask', (req, res) => {
    res.render('ask');
});

// we are using post since this route exists to receive the question form data
app.post('/savequestion', (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    // Equivalent to INSERT INTO question ...Question
    Question.create({
        title,
        description
    })
    .then(() => {
        res.redirect("/");
    })
});

app.get('/question/:id', (req, res) => {
    const id = req.params.id;
    console.log(id)
    // Finding by ID inside model/table
    Question.findOne({
        where: {
            id
        }
    })
    .then((question) => {
        // question != undefined means a question with the required id has been found in DB
        if(question != undefined) {
            res.render('question', {
                question
            });
        } else {
            res.redirect("/");
        }
    });
});

app.listen(port, err => {
    if (err) {
        console.log("an error has occurred: ", err);
    } else {
        console.log('\x1b[42m\x1b[30m', `Server started at port ${port} \x1b[0m`);
    }
});
