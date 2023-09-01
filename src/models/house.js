const mongoose = require("mongoose");
const User = require("./user");
const houseSchema = new mongoose.Schema({
    type: {
        enum: ["rent", "sale"],
        message: "{VALUE} is not supported"
    },
    price: {
        rent: {
            type: {
                mortgage: Number,
                rentPM: Number
            },
            required: () => this.type === "rent"
        },
        sale: {
            type: Number,
            required: () => this.type === "sale"
        }
    },
    coordinates: {
        type: { latitude: String, longitude: String },
        required: true
    },
    area: {
        type: Number,
        required: true
    },
    spacialFeatures: {
        rooms: {
            type: Number,
            required: true
        },
        basement: {
            type: Boolean,
            required: true
        },
        parking: {
            type: Boolean,
            required: true
        }
    },
    pictures: {
        type: [Buffer]
    },
    address: {
        type: String,
        required: true
    },
    Features: {
        type: [String]
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const House = mongoose.model("House", houseSchema);
module.exports = House;
