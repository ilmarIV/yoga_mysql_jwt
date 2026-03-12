const jwt = require('jsonwebtoken')

const secret = "qwerty"
const expires_in = "15m"

const signToken = (payload) => {
    return jwt.sign(payload, secret, {expiresIn: expires_in || '1h'})
}

const verifyToken = (token) => {
    return jwt.verify(token, secret)
}

module.exports = { signToken, verifyToken }