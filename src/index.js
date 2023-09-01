require("dotenv").config();
const express = require("express");
const app = express();
const routs = require("./routes/routes");
const mongoCon = require("./db/mongoose");

// middleware
app.use(express.json());
app.use(express.static("./src/public"));

// template engine setup

app.use(routs);
const port = process.env.PORT || 4000;

const start = async () => {
    try {
        await mongoCon(
            process.env.MONGO_URI,
            console.log("database connected...!")
        );
        app.listen(port, () => {
            console.log(`server is running on port ${port}`);
        });
    } catch (err) {
        console.log(err);
    }
};
start();
