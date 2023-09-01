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
        unique: true,
        validator(value) {
            if (!validator.isMobilePhone(value))
                throw new Error("phone number is invalid!");
        }
    },
    avatar: {
        type: Buffer
    },
    role: {
        enum: ["Admin", "User", "new"],
        message: "{VALUE} is not supported"
    },
    offerHouse: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "House"
        }
    ],
    favHouse: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "House"
        }
    ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
