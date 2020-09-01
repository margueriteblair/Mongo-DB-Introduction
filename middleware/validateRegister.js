const mongoose = require('mongoose')
const User = require('../models/User')
const validator = require('validator').default;



module.exports = async (req, res, next) => {
    try {
        const {email, username, password} = req.body //this is a concept called object destructuring
        //checks if the data exists with if statements
        const validationErrors = [];
        const emailExist = await User.findOne({email: email}) !== null;
        const usernameExist = await User.findOne({username: username}) !== null;
            if (emailExist) {
                validationErrors.push({key: 'email', error: 'email is in use'})
            }
            if (usernameExist) {
                validationErrors.push({key: 'username', error: 'username is in use'});
            }
            if (password.length < 7) validationErrors.push({key: 'password', error: 'password didnt meet requirements' })
            if (validationErrors.length > 0) {
                res.status(400).json({
                    "validation errors" : validationErrors
                })
            } else {
                next();
            }
        //if this array has more than 0 elements, respond with the array of errors
    } catch (error) {
        res.status(500).json({message: error.message || "Unknown Error"})
    }
}