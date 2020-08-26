const User = require('../models/User') //this requires the User model
const {Router} = require('express');
const findUser = require('../middleware/findUser');
//uppercase indicates that it's a class
//backend validation: 1. ensure email/username aren't duplicates, check password length, validate email and username for constraints before mongoose does it for us
const router = new Router();

router.patch('/login', (req, res) => {
        console.log(req.body, 'LoginTest');
        const userObj = await User.findOne({email: req.body.email})
            try {
                res.json({message: 'success!'})
            }
            catch (error){
                console.error(error.message);
    
                res.status(500).json({
                    message: error.message
                })
    }
router.post(
    '/register',
    async (req, res) => {
        const {email, username, password} = req.body //this is a concept called object destructuring
        //if you want an alius for the name, then :alias
        // = to set a default value
        // const email = req.body.email
        // const password = req.body.password

        // if (email === undefined) {
        //     email = 'default email'
        // }

        // const username = req.body.username === undefined? 'default username' : req.body.username ;
        if (email === undefined || username === undefined || password === undefined) {
            return res.status(400).json({message: 'Failure to input correct information'})  //error status 400 because it's the users fault
        }
        try {
            const emailExist = User.findOne({email: email}) !== null;
            const usernameExist = User.findOne({username: username}) !== null;
            if (!emailExist || !usernameExist) {
                const data = [];
                if (!emailExist) {
                    data.push('email')
                }
                if (!usernameExist) {
                    data.push('username');
                }
                return res.status(409).json({message:'data already in use', data: data})
            }
            await User.create(req.body);
            res.json({message: 'success!'})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
        }
)
//to update information
router.put('/update/:id', async (req, res) => {
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