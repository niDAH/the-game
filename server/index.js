const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const routes = require('./routes/index');

const port = process.env.PORT || 4000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());

app.get('/', (req, res) => {
    res.send('Hello, but you don\'t belong here.');
});

// Routes goes here
app.use('/api', routes);

app.listen(port, () => console.log(`Listening on port ${port}.`));
