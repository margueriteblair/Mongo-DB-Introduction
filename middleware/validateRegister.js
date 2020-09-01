const mongoose = require('mongoose')

module.exports = async (req, res, next) => {
    try {
        const emailExist = await User.findOne({email: email}) !== null;
        const usernameExist = await User.findOne({username: username}) !== null;
        const validationErrors = [];
        if (!emailExist || !usernameExist) {
            const data = [];
            if (emailExist) {
                data.push({key: 'email', error: 'email is in use'})
            }
            if (usernameExist) {
                data.push({key: 'username', error: 'username is in use'});
            }
            if (password.length < 7) validationErrors.push({key: 'password', error: 'password didnt meet requirements' })

            next();
        }
        //if this array has more than 0 elements, respond with the array of errors
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}