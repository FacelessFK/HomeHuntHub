const mongoose = require("mongoose");

const mongoCon = (uri) => {
    mongoose.connect(uri);
};
module.exports = mongoCon;
