// src/app.js
const express = require('express');
const artistRouter = require('./routes/artist');

const app = express();

app.use(express.json());

app.use('/artist', artistRouter);

module.exports = app;

// const express = require('express');
// const artistRouter = require('./routes/artist');

// const app = express();

// app.use(express.json());

// app.use('/artist', artistRouter);

// app.get('/', (req, res) => { res.status(200).send('hello world')});

// module.exports = app;
