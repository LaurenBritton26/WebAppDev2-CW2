const express = require('express');
const app = express();
require('dotenv').config();

const cookieParser = require('cookie-parser');
app.use(cookieParser())

app.use(express.urlencoded({
    extended: true
}));


const router = require('./routes/wellnessRoutes');
app.use('/', router);

const path = require('path');
const public = path.join(__dirname,'public');
app.use(express.static(public));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const mustache = require('mustache-express');
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

app.get('/', function(req,res) {
    res.send('Hello! Welcome to Wellness Insight');
})

app.listen(3000, () => {
    console.log('Server Started on port 3000. Ctrl^c to exit.');
})

