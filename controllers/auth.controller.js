const UserModel = require('../models/user.model');
const { signUpErrors } = require('../utils/errors.utils');

module.exports.signUp = async (req, res) => {
    console.log(req.body);
    const { pseudo, email, password } = req.body;

    try {
        const user = await UserModel.create({ pseudo, email, password });
        res.status(201).json({ user: user._id });
    }
    catch (err){
        const errors = signUpErrors(err);
        res.status(400).send({errors});
    };
};