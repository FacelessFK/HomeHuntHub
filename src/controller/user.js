const User = require("../models/user");
const createUser = async (req, res) => {
    console.log(req.body);
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).json({ user });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createUser
};
