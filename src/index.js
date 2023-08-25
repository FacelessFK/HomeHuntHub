const express = require("express");
const app = express();
const patch = require("path");

app.use(express.static(patch.join(__dirname, "../public")));
app.set("view engine", "ejs");
app.set("views", "views");
app.use("/", (req, res, next) => {
    res.render("map");
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
