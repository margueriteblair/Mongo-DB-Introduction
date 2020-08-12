//imported packages
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

let app = express();
const port = process.env.PORT || 3000






app.listen(port, () => {
    `Now successfully listening to ${port}.`
})