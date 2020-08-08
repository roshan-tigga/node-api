var createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route');  
const dotenv = require('dotenv').config();

const app = express();

const db = require('./db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', route);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

