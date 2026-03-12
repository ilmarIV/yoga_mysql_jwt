const ArticleDbModel = require('../models/article');
const AuthorDbModel = require('../models/author');

const articleModel = new ArticleDbModel();
const authorModel = new AuthorDbModel();

class AuthorController {
  constructor() {}

  // GET /author
  async getAllAuthors(req, res) {
    try {
      const authors = await authorModel.findAll();
      res.status(200).json({ authors });
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch authors", error: err.message });
    }
  }

  // GET /author/:id
  async getAuthorById(req, res) {
    try {
      const author = await authorModel.findById(req.params.id);
      if (!author) {
        return res.status(404).json({ message: "Author not found" });
      }

      const articles = await articleModel.findMany(req.params.id);
      author['articles'] = articles;

      res.status(200).json({ author });
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch author", error: err.message });
    }
  }
}

module.exports = AuthorController;