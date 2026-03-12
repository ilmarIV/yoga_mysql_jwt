const express = require("express");
const userControllerClass = require("../controllers/users");

class UserRouter {
    constructor() {
        this.router = express.Router();
        this.controller = new userControllerClass();
        this.initRoutes();
    }

    initRoutes() {
        this.router.post('/users/register', this.controller.register);
        this.router.post('/users/login', this.controller.login);
        this.router.get('/users/logout', this.controller.logout);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new UserRouter().getRouter();