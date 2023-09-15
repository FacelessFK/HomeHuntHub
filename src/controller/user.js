const User = require("../models/user");

const createUser = async (req, res) => {
    try {
        // const salt = await bcrypt.genSalt();
        // const hashPassword = await bcrypt.hash(req.body.password, salt);
        // const user = new User({ ...req.body, password: hashPassword });
        const user = new User(req.body);
        const token = await user.generateAuthToken();
        await user.save();
        // console.log(token);
        res.status(201).json({ user });
    } catch (error) {
        res.status(400).json({ Msg: error.message });
    }
};
const logIn = async (req, res) => {
    try {
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        );
        const token = await user.generateAuthToken();
        res.status(200).json({ user });
    } catch (err) {
        res.status(400).json();
    }
};
const logOut = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(
            (token) => token.token !== req.token
        );
        await req.user.save();
        res.send();
    } catch (err) {
        res.status(500).send();
    }
};
const authedUser = async (req, res) => {
    res.send(req.user);
};
// const authedUserPatch = async (req, res) => {
//     const {userName,email,password}
// };
module.exports = {
    createUser,
    logIn,
    logOut,
    authedUser
};
