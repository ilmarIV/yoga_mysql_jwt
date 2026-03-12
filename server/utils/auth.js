const { verifyToken } = require('./jwt')

const authRequired = (req, res, next) => {
    const header = req.headers.authorization || ''
    const [type, token] = header.split(' ')

    if (type !== 'Bearer' || !token) {
        return res.status(401).json({ message: 'Missing or invalid Auth header' })
    }

    try {
        const payload = verifyToken(token)
        req.user = payload
        next()
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' })
    }
}

const roleRequired = (...roles) => {
    return (req, res, next) => {
        if (!req.user) return res.status(401).json({ message: 'Not authenticated' })
        if (!roles.includes(req.user.role)) {
            return res.status(401).json({ message: 'Forbidden role' })
        }
        next()
    }
}

module.exports = { authRequired, roleRequired }