const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router.js');
const mongoose = require('mongoose');
const User = require('./models/user')

mongoose.connect('mongodb://localhost/auth', () => console.log('connected to db'))
// mongo port is set to 27018
const app = express();
app.use(express.json())

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/* '}));

router(app)

const port = process.env.PORT || 3090;
const server = http.createServer(app);

server.listen(port, () => console.log('server listening on port ' + port));