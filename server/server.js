//IMPORTS
const express = require('express');
const http = require('http');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes.js');
require ('dotenv').config({path: './config/.env'});
const mongoose = require('mongoose');
const {checkUser, requireAuth} = require('./middleware/auth.middleware');
const cors = require('cors');
const helmet = require('helmet');
const config = require('./config/config');

//const { port, allowedDomains } = config;

const app = express();

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(cors({ origin: true, credentials: true}));

app.use(helmet());



// JWT
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
});

// MIDDLEWARE ROUTES
app.use('/user', userRoutes);

const server = http.createServer(app);

// CONNECT TO MONGODB
const connectionUrl = 'mongodb+srv://' + process.env.DB_USER_PASS + '@cluster0.bru98.mongodb.net/mern-bibliotheque';
const PORT = process.env.PORT || 5000;

mongoose.connect(connectionUrl, {useNewUrlParser: true, useUnifiedTopology: true,})
    .then(() => console.log('connected to mongoDB'))
    .catch((err) => console.log('failed to connect to mongoDB', err));

//SERVER
app.listen(5000, () => {
    console.log(`listenning on port ${process.env.PORT}`);
});