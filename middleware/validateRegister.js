const mongoose = require('mongoose')
const User = require('../models/User')
const validator = require('validator').default;


module.exports = async (req, res, next) => {
    try {
        const {email, username, password} = req.body 
        const validationErrors = [];

        if (email === undefined || email.trim().length === 0) {
            validationErrors.push({key: 'email', error: "Email Required"})
        } else if (email !== undefined && !validator.isEmail(email)) {
            validationErrors.push({key: 'email', error: 'Must be a valid email address'});
        } else {
            const emailExist = await User.findOne({email: email}) !== null;
            if (emailExist) validationErrors.push({key: 'email', error: 'email is in use'})
        }

        if (username === undefined || username.trim().length === 0) {
            validationErrors.push({key: 'username', error: 'Username required'})
        } else {
            const usernameExist = await User.findOne({username: username}) !== null;
            if (usernameExist) validationErrors.push({key: "username", error: "username in use"});
        }

        if (password === undefined || password.trim().length === 0) {
            validationErrors.push({key: "password", error: "password required"})
        } else if (password !== undefined && password.length < 7) {
            validationErrors.push({key: 'password', error: 'password didnt meet requirements' })
        }
        
            if (validationErrors.length > 0) {
                res.status(400).json({
                    "validation errors" : validationErrors
                })
            } else {

                //create a new object, only include the fields that we need (username, email, password in this case) (preferred approach for gabe)
                //we pass password 2 to the backend
                //remove uneeded / security risking fields 

                delete req.body.password2;

                //could possibly sent via postman we can put in a ton of keys via postman
                delete req.body.emailValidated
                next();
            }
    } catch (error) {
        res.status(500).json({message: error.message || "Unknown Error"})
    }
}