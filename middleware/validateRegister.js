const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = async (req, res, next) => {
    try {
        //checks if the data exists with if statements
        const validationErrors = [];
        const emailExist = await User.findOne({email: email}) !== null;
        const usernameExist = await User.findOne({username: username}) !== null;
        if (!emailExist || !usernameExist) {
            const data = [];
            if (emailExist) {
                validationErrors.push({key: 'email', error: 'email is in use'})
            }
            if (usernameExist) {
                validationErrors.push({key: 'username', error: 'username is in use'});
            }
            if (password.length < 7) validationErrors.push({key: 'password', error: 'password didnt meet requirements' })
            if (validationErrors.length > 0) {
                res.status(400).json({
                    valid
                })
            } else {
                next();
            }
        }
        //if this array has more than 0 elements, respond with the array of errors
    } catch (error) {
        res.status(500).json({message: error.message || "Unknown Error"})
    }
}