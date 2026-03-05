const articleDbModel = require('../models/article');
const articleModel = new articleDbModel();

class articleController {
  constructor() {}

  // Show all articles
  async getAllArticles(req, res) {
    const articles = await articleModel.findAll();
    res.render('index', {
      articles: articles,
      noArticles: articles.length === 0,
      user: req.session.user
    });
  }

  // Show single article
  async getArticleBySlug(req, res) {
    const article = await articleModel.findOne(req.params.slug);
    if (!article) {
      return res.render('index', { articles: [], msg: 'Article not found', user: req.session.user });
    }
    res.render('article', { article: article, user: req.session.user });
  }

  // Show "Create Article" form (GET)
  async showCreateForm(req, res) {
    res.render('createArticle', { user: req.session.user });
  }

  // Handle form submission (POST)
  async createArticle(req, res) {
    const newArticle = {
      name: req.body.name,
      slug: req.body.slug,
      image: req.body.image,
      body: req.body.body,
      published: new Date().toISOString().slice(0, 19).replace('T', ' '),
      author_id: req.body.author_id
    };

    await articleModel.create(newArticle);
    res.redirect('/article/');
  }

  async showUpdateForm(req, res) {
    const article = await articleModel.findById(req.params.id)
    if (!article) {
        return res.redirect('/article/')
    }

    res.render('editArticle', {
        article: article,
        user: req.session.user
    })
  }

  async updateArticle(req, res) {
      const updateData = {}

      if (req.body.name !== undefined) updateData.name = req.body.name
      if (req.body.slug !== undefined) updateData.slug = req.body.slug
      if (req.body.image !== undefined) updateData.image = req.body.image
      if (req.body.body !== undefined) updateData.body = req.body.body
      if (req.body.author_id !== undefined) updateData.author_id = req.body.author_id

      await articleModel.update(req.params.id, updateData)

      res.redirect('/article/')
  }

  async deleteArticle(req, res) {
    await articleModel.delete(req.params.id);
    res.redirect('/article/');
  }
}

module.exports = articleController;