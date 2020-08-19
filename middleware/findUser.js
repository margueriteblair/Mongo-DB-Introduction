const User = require("../models/User");
//require the User model

const findUser = async (req, res, next) => {
    const userId = req.params.id
    try {
        if (typeof(userId) !== 'string' || userId.length !== 24) {
            console.error(`An invalid ID was given`)
            res.status(400).json({message: "Invalid ID given"})
        }
        const user = await User.findById(userId)
        if (user === null) {
            return res.status(404).json({message: `No user found`})
        }
        req.userId = userId
        next();
    } catch (error) {
        const msg = error.message || err;
        console.log(msg)
        res.status(500).json({message: msg});
    }
}

module.exports = findUser;