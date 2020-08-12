const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('No this is Patrick')
})

module.exports = router