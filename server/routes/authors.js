const express = require("express");
const authorControllerClass = require("../controllers/authors");

class AuthorRouter {
    constructor() {
        this.router = express.Router();
        this.controller = new authorControllerClass();
        this.initRoutes();
    }

    initRoutes() {
        this.router.get('/author', this.controller.getAllAuthors);
        this.router.get('/author/:id', this.controller.getAuthorById);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new AuthorRouter().getRouter();