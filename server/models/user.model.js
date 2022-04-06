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
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [isEmail],
            lowercase: true,
            trim: true,
        },
        emailConfirmed: {
            type: Boolean,
            required: true,
            default: true,
        },
        emailToken: {
            type: String,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            maxlength: 255,
            trim: true,
        },
        security: {
            tokens: [
                {
                    refreshToken: String,
                    createdAt: Date,
                }],
            passwordReset: {
                token: {
                    type: String,
                    default: null,
                },
                provisionnalPassword: {
                    type: String,
                    default: null,
                },
                expiry: {
                    type: Date,
                    default: null,
                },
            },
        }
    },
    {
        timestamps: true,
    }
);

// SALAGE DES MDP AU SIGN UP
userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// SALAGE DES MDP AU SIGN IN AVEC COMPARAISON (METHODE COMPARE) ENTRE EMAIL ET PASSWORD
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({email});
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
};


const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;