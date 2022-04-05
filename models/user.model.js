const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            minlength: 3,
            maxlength: 54,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [isEmail],
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            maxlength: 54,
            trim: true
        }
    },
    {
        timestamps: true,
    }
);

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;