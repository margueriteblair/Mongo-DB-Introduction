const jwt = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET

module.exports = (req, res, next) => {
    try {
        req.createdJWT = jwt.sign({_id: req.userId}, jwtSecret, {expiresIn: "3h"});
        //we can choose how long we want our json token to be valid for 
        //makes it so that if you sit idle, it will sign you out


        next();
    } catch (error) {
        console.log(error.message || err);
        res.status(500).json({message: error.message, error: error})
    }
}