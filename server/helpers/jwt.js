const jwt = require('jsonwebtoken');
const secretKey = 'dwiki'


//encode atau encrypt
const signToken = (payload) => {
    return jwt.sign(payload, secretKey)
}

//decode atau decrypt
const verifyToken = (token) => {
    return jwt.verify(token, secretKey)
}

module.exports = { signToken, verifyToken }