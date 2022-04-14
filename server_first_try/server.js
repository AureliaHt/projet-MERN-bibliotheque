//IMPORTS
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
require ('dotenv').config({path: './config/.env'});
const mongoose = require('mongoose');
const {checkUser, requireAuth} = require('./middleware/auth.middleware');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const helmet = require('helmet');
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const credentials = require('./middleware/credentials');

const app = express();

//MIDDLEWARES
app.use(logger);
app.use(credentials);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../client/public')));

app.use(helmet());
app.use(cookieParser());

// CORS
app.use(cors(corsOptions));

// JWT
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
});

// MIDDLEWARE ROUTES
app.use('/register', require('./routes/api/register.routes'));
app.use('/auth', require('./routes/api/auth.routes'));
app.use('/user', require('./routes/api/user.routes'));

app.use(verifyJWT);

app.use(errorHandler);

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