const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require("../models/User")
const validator = require('validator').default; //lets us check if the given credential is an email
//if not an email, we will check that it's a username
module.exports = async (req, res, next) => {
    try {

        const {password: p, credential: c} = req.body;
        const failed = validator.isEmail(c) ? "email" : "username"

        const query = {}
        query.field = c.trim();

        const foundUser = await User.findOne(query, {password: 1})

        if (foundUser == null) {
            return res.status(400).json({message: "Credentials invalid"})
        } 
        const passwordMatches = bcrypt.compare(p, foundUser.password)

        if (!passwordMatches) {
            return res.status(400).json({message: 'Credentials Do Not Match'})
        }

        req.userId = foundUser._id

        next();
        //first is the user logging in with their email or their username
        //if email? check if their email is in use
        //if username? check that the username is in use

        //if either the username or the password exists, then check the password
        //bcrypt does the work of comparing the two passwords.
        //if the password matches, then go to the next middleware
        //otherwise send a general message "failed login"
    } catch (error) {
        console.error(error.message || err)
        res.json({message: error.message, error: error})
    }
}