const express = require("express");
const articleControllerClass = require("../controllers/articles");
const { authRequired, roleRequired } = require('../utils/auth');

class ArticleRouter {
    constructor() {
        this.router = express.Router();
        this.controller = new articleControllerClass();
        this.initRoutes();
    }

    initRoutes() {
        this.router.get('/article', this.controller.getAllArticles)
        this.router.get('/article/:slug', this.controller.getArticleBySlug)

        this.router.post('/article/create', authRequired, roleRequired('admin'), this.controller.createArticle)
        this.router.post('/article/update/:id', authRequired, roleRequired('admin'), this.controller.updateArticle)
        this.router.delete('/article/delete/:id', authRequired, roleRequired('admin'), this.controller.deleteArticle)
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new ArticleRouter().getRouter();
