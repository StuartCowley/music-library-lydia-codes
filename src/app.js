// src/app.js
const express = require('express');
const artistRouter = require('./routes/artist');

const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.json());

app.use('/artist', artistRouter);

module.exports = app;
