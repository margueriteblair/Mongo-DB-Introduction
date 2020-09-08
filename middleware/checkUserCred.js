const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator').default(); //lets us check if the given credential is an email
//if not an email, we will check that it's a username

module.exports = async (req, res, next) => {
    try {

        const {password: p, credential: c} = req.body;
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