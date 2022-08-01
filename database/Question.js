const Sequelize = require('sequelize');
const connection = require('./database');

const Question = connection.define('question', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

// Force false avoids recreation/deletion of preexistent tables
Question.sync({ force: false })
.then(() => {
    console.log('\x1b[42m\x1b[30m', 'Question table created in DB!', '\x1b[0m')
});
