const User = require('../models/User') //this requires the User model
const {Router} = require('express');
const findUser = require('../middleware/findUser');
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
        } catch (error) {
            res.status(500).json({message: error.message})
        }
        }
)
//to update information
router.put('/update/:email', findUser, async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate({email: req.params.email}, req.body, {new: true})
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