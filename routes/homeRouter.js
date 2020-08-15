const express = require('express');

const router = express.Router();

router.get('/',
     (req, res) => {
    res.sendfile(process.cwd() + '/public/index.html')
    //console.log(req.body)
});

router.get('/login',
    (req, res) => {
        const filePath = process.cwd() + '/public/login.html'
        res.sendFile(filePath);
    })

module.exports = router