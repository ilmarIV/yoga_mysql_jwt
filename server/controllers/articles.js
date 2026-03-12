const ArticleDbModel = require('../models/article');
const articleModel = new ArticleDbModel();

class ArticleController {
  constructor() {}

  // GET /article
  async getAllArticles(req, res) {
    try {
      const articles = await articleModel.findAll();
      res.status(200).json({ articles });
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch articles", error: err.message });
    }
  }

  // GET /article/:slug
  async getArticleBySlug(req, res) {
    try {
      const article = await articleModel.findOne(req.params.slug);
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      res.status(200).json({ article });
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch article", error: err.message });
    }
  }

  // POST /article/create
  async createArticle(req, res) {
    try {
      const newArticle = {
        name: req.body.name,
        slug: req.body.slug,
        image: req.body.image,
        body: req.body.body,
        published: new Date().toISOString().slice(0, 19).replace('T', ' '),
        author_id: req.body.author_id
      };

      const createdId = await articleModel.create(newArticle);
      res.status(201).json({ message: "Article created", articleId: createdId });
    } catch (err) {
      res.status(500).json({ message: "Failed to create article", error: err.message });
    }
  }

  // POST /article/update/:id
  async updateArticle(req, res) {
    try {
      const updateData = {};

      if (req.body.name !== undefined) updateData.name = req.body.name;
      if (req.body.slug !== undefined) updateData.slug = req.body.slug;
      if (req.body.image !== undefined) updateData.image = req.body.image;
      if (req.body.body !== undefined) updateData.body = req.body.body;
      if (req.body.author_id !== undefined) updateData.author_id = req.body.author_id;

      const updated = await articleModel.update(req.params.id, updateData);
      if (!updated) {
        return res.status(404).json({ message: "Article not found" });
      }

      res.status(200).json({ message: "Article updated", articleId: req.params.id });
    } catch (err) {
      res.status(500).json({ message: "Failed to update article", error: err.message });
    }
  }

  // DELETE /article/delete/:id
  async deleteArticle(req, res) {
    try {
      const deleted = await articleModel.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Article not found" });
      }
      res.status(200).json({ message: "Article deleted", articleId: req.params.id });
    } catch (err) {
      res.status(500).json({ message: "Failed to delete article", error: err.message });
    }
  }
}

module.exports = ArticleController;