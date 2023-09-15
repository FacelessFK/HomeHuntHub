require("dotenv").config();
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
    ],
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
        throw new Error("user not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("password is not correct");

    return user;
};

userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET, {
        expiresIn: "5m"
    });
    console.log(token);
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
};

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
