const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {

    try {
        const salt = await bcrypt.genSalt(10);
        console.log(salt + "this is salt")
        const oldPass = req.sanitized.password
        const encryptedPass = await bcrypt.hash((req.sanitized.password), salt);
        req.sanitized.password = encryptedPass
        console.log('e-pass:', encryptedPass);
        console.log(req.sanitized);
        next();
    } catch (error) {
        console.error(error.message || error)
        res.status(500).json({message: error.message, error: error})
    }
}