const dotenv = require('dotenv').config({path: 'bin/.env-dev'});
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const crudRoutes = require('./api/crud/crud.routes');
const db = require("./config/db");
const app = express();

db.initDBConnection();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('dist'));

// ================================================
app.use("/api/", crudRoutes);

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: "dist/" });
});

module.exports = app;