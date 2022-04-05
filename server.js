//IMPORTS
import express from "express";
import dotenv from "dotenv";
dotenv.config({path: './config/.env'});
import mongoose from "mongoose";
import cors from "cors";

const app = express();

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET, HEAD, PUT, POST, PATCH, DELETE',
    'preflightContinue': false
}
app.use(cors(corsOptions));

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CONNECT TO MONGODB
const connectionUrl = 'mongodb+srv://' + process.env.DB_USER_PASS + '@cluster0.bru98.mongodb.net/mern-bibliotheque';
mongoose.connect(connectionUrl, {useNewUrlParser: true, useUnifiedTopology: true,})
    .then(() => console.log('connected to mongoDB'))
    .catch((err) => console.log('failed to connect to mongoDB', err));

//SERVER
app.listen(5400, () => {
    console.log(`listenning on port ${process.env.PORT}`);
});