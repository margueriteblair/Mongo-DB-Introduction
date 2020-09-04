const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
    req.body.password = bcrypt.hash((req.body.password), 10)
}