const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendfile(process.cwd() + '/public/index.html')
})

module.exports = router