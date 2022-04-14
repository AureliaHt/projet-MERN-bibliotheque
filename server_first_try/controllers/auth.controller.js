const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const path = require('path');
require ('dotenv').config({path: '../config/.env'});
const { signUpErrors, signInErrors } = require('../utils/errors.utils');

// DUREE DE VIE DU COOKIE CONTENANT LE TOKEN (3J)
const maxAge = 3 * 24 * 60 * 60 * 1000 ;

// FONCTION POUR CREER LE TOKEN AVEC VARIABLE D'ENVIRONNEMENT POUR DECODER LE TOKEN
const createToken = (id) => {
    return jwt.sign({id}, process.env.SECRET_TOKEN_ACCESS, {
        expiresIn: maxAge
    })
};

// S'INSCRIRE  SIGN UP
module.exports.signUp = async (req, res) => {
    const { pseudo, password } = req.body;
    if (!pseudo || !password) return res.status(409).json({ 'message': 'Pseudo and password are required'});

    const duplicate = UserModel.pseudo.find(user => user.username === pseudo);
    if (duplicate) return res.sendStatus(409);

    try {
        const user = await UserModel.create({ pseudo, email, password });
        res.status(201).json({ user: user._id });
    }
    catch (err){
        const errors = signUpErrors(err);
        res.status(400).send({errors});
    };
};

// SE CONNECTER   SIGN IN
module.exports.signIn = async (req, res) => {
    const { pseudo, password } = req.body;
    if (!pseudo || !password) return res.status(400).json({ 'message': 'Pseudo and password are required'});

    try {
        const user = await UserModel.login(pseudo, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge});
        res.status(200).json({ user: user._id})
    }
    catch (err){
        const errors = signInErrors(err);
        res.status(200).json({ errors})
    }
};

// SE DECONNECTER
module.exports.logout = async (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
};