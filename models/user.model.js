import mongoose from "mongoose";
import {isEmail} from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            minlength: 3,
            maxlength: 50,
            required: true,
            unique: true,
            trim: true
        }
    }
);

const UserModel = mongoose.model('user', userSchema);

export default UserModel;