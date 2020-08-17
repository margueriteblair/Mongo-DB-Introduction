const User = require('../models/User') //this requires the User model
const {Router} = require('express');
//uppercase indicates that it's a class

const router = new Router();

router.patch(
    '/login',
    (req, res) => {
        console.log(req.body, 'LoginTest');

        try {
            res.json({message: 'success!'})
        }
        catch (error){
            console.error(error.message);

            res.status(500).json({
                message: error.message
            })
        }
    }
)

router.post(
    '/register',
    async (req, res) => {
        console.log('test', req.body);

        try {
            await User.create(req.body);
            res.json({message: 'success!'})
        } catch {
            res.status(500).json({message: Error.message})
        }
        }
)

module.exports = router;