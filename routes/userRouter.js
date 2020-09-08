const User = require('../models/User') //this requires the User model
const {Router} = require('express');
const findUser = require('../middleware/findUser');
const validateUser = require('../middleware/validateRegister')
const passEncrypt = require('../middleware/passEncrypt')
const checkUserCred = require('../middleware/checkUserCred')
const createJWT = require('../middleware/createJWT');
//uppercase indicates that it's a class
//backend validation: 1. ensure email/username aren't duplicates, check password length, validate email and username for constraints before mongoose does it for us
const router = new Router();

router.patch('/login',
        checkUserCred,
        createJWT,
    //check the user's credntials and make sure they match what's in the db
    //JWT are stored ONLY on the frontend
        (req, res) => {
        console.log(req.body, 'LoginTest');

        const {email, username, password} = req.body
            try {
                res.json({token: req.createJWT})
            }
            catch (error){
                console.error(error.message);
    
                res.status(500).json({
                    message: error.message
                })
            }})

router.post(
    '/register',
    validateUser,
    passEncrypt,
    async (req, res) => {
        try {
            await User.create(req.body);
            res.status(201).json({message: 'success!'}) //201 is specific youve created a document in the DB
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
)
//to update information
router.put('/update/:id', findUser ,async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
        res.json(updatedUser)
        //await User.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}).then((user) => {
        //res.json(user)
     //   }) This is a returned promise that executes the new user object
    } catch (error) {
        const msg = error.message || error;
        console.log(msg)
        res.status(500).json({message: msg});
    }
})

router.delete('/delete/:id', findUser, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.userId);
        res.send(`Deleted User!`)
    } catch (error) {
        const msg = error.message || error;
        console.log(msg)
        res.status(500).json({message: msg});
    }
})


module.exports = router;