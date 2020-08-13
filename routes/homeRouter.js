const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('OH MY GOD KERMIT NO')
})

module.exports = router