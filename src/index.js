require("dotenv").config();
const express = require("express");
const app = express();
const routs = require("./routes/routes");

// middleware
app.use(express.json());
app.use(express.static("./src/public"));

// template engine setup

app.use(routs);
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
