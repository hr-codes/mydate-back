const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();


const app = express();

const routes = require('./routes/routes')

app.use(bodyParser.json());

app.use(express.json())

app.use('/api', routes);

const DB_NAME = process.env.MYDATE_DB_NAME;
const DB_USER = process.env.MYDATE_DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.MYDATE_DB_PASSWORD);

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.awb7g7h.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`)
  .then(() => {
    console.log('db connected successfully')

    app.listen(3000)
  })
  .catch((err) => console.log('error on connect db', err))
