require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

const environment = process.env.NODE_ENV;
const stage = require('./config')[environment];

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

if (environment !== 'production') {
    app.use(logger('dev'));
}

const apiRoutes = require('./config/routes');
app.use('/api/v1', apiRoutes);

/* Database */
const {
    User
} = require('./database');

/* Server Setup */
app.listen(`${stage.port}`, () => {
    console.log(`Server now listenting at localhost:${stage.port}`);
});

module.exports = app;