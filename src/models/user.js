const mongoose = require("mongoose");
const validator = require("validator");
const House = require("./house");
const userSchema = new mongoose.Schema({
    userName: {
        type: String,

        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,

        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid!");
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error("pick a strong password!");
            }
        }
    },
    phoneNumber: {
        type: Number,
        trim: true,
        required: true,
        validator(value) {
            if (!validator.isMobilePhone(value))
                throw new Error("phone number is invalid!");
        }
    },
    avatar: {
        type: String
    },
    role: {
        type: String,
        enum: {
            values: ["Admin", "User"],
            message: "{VALUE} is not supported"
        },
        default: "User"
    },
    offerHouse: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "House"
        }
    ],
    favHouse: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "House"
        }
    ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
