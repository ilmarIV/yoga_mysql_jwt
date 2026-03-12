const bcrypt = require('bcrypt')
const userDbModel = require('../models/user')
const { signToken } = require('../utils/jwt')

class userController {
    constructor() {
        this.model = new userDbModel()
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    async register(req, res) {
        try {
            const existingUser = await this.model.findOne(req.body.username)
            if (existingUser) {
                return res.status(400).json({ message: "Username already exists" })
            }

            if (req.body.password.length < 6) {
                return res.status(400).json({ message: "Password must be > 6 characters" })
            }

            //const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;
            //if (!req.body.password.match(passwordRegex)) {
            //    return res.status(400).json({ message: "Password must be > 6 characters and containt uppercase, lowercase" })
            //}

            const cryptPassword = await bcrypt.hash(req.body.password, 10)
            const registerUserId = await this.model.create({
                username: req.body.username,
                email: req.body.email,
                password: cryptPassword
            })

            if (!registerUserId) {
                return res.status(404).json({ error: "Session is not openned" })
            }

            const userData = await this.model.findById(registerUserId)
            res.status(201).json({
                message: "New usere successfully registered",
                user: userData
            })

        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }


    async showLoginForm(req, res) {
        res.render('login')
    }


    async login(req, res) {
        try {
            const user = await this.model.findOne(req.body.username)

            if (!user) {
                return res.status(400).json({ message: "Username does not exist" })
            }

            const passwordCompare = await bcrypt.compare(req.body.password, user.password)
            if (!passwordCompare) {
                return res.status(400).json({ message: "Password is incorrect" })
            }

            const token = signToken({
                id: user.id,
                username: user.username,
                role: user.role
            })
            res.status(201).json({
                message: "Login successful",
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    role: user.role
                }
            })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async logout(req, res) {
        req.session.destroy()
        res.status(201).json({ message: "Logout successful" })
    }
    
}

module.exports =  userController;