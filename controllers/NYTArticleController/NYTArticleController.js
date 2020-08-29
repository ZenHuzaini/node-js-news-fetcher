const {
  SUCCESS,
  ERROR,
  NO_DATA,
  REQUIRED_ARGUMENT_NOT_PROVIDED,
  sendResponse,
} = require("./Constants");

class NYTArticleController {
  constructor(dependencies) {
    this.nytArticleService = dependencies.nytArticleService;

    this.checkArticle = this.checkArticle.bind(this);
    this.checkArticleBasedOnId = this.checkArticleBasedOnId.bind(this);
    this.checkBook = this.checkBook.bind(this);
    this.checkBooks = this.checkBooks.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
    this.getArticles = this.getArticles.bind(this);
    this.modifyArticle = this.modifyArticle.bind(this);
    this.saveArticle = this.saveArticle.bind(this);
  }

  async checkArticle(req, res) {
    const { sort, searchQuery } = req.body;
    if (!sort || !searchQuery) {
      return sendResponse(res, {
        status: REQUIRED_ARGUMENT_NOT_PROVIDED,
      });
    }

    try {
      const data = await this.nytArticleService.checkArticle(searchQuery, sort);
      sendResponse(res, data);
    } catch (error) {
      console.error(error);
      sendResponse(res, { status: ERROR });
    }
  }

  async checkArticleBasedOnId(req, res) {
    const { idArticle } = req.body;
    if (!idArticle) {
      return sendResponse(res, {
        status: REQUIRED_ARGUMENT_NOT_PROVIDED,
      });
    }

    try {
      const data = await this.nytArticleService.checkArticleBasedOnId(
        idArticle
      );
      sendResponse(res, data);
    } catch (error) {
      console.error(error);
      sendResponse(res, { status: ERROR });
    }
  }

  async checkBook(req, res) {
    const { type, searchQuery } = req.body;
    if (!type && !searchQuery) {
      return sendResponse(res, {
        status: REQUIRED_ARGUMENT_NOT_PROVIDED,
      });
    }

    try {
      const data = await this.nytArticleService.checkBook(type, searchQuery);
      sendResponse(res, data);
    } catch (error) {
      console.error(error);
      sendResponse(res, { status: ERROR });
    }
  }

  async checkBooks(req, res) {
    const { type } = req.body;
    if (!type) {
      return sendResponse(res, {
        status: REQUIRED_ARGUMENT_NOT_PROVIDED,
      });
    }

    try {
      const data = await this.nytArticleService.checkBooks(type);
      sendResponse(res, data);
    } catch (error) {
      console.error(error);
      sendResponse(res, { status: ERROR });
    }
  }

  async getArticles(req, res) {
    try {
      const data = await this.nytArticleService.getArticles();
      sendResponse(res, data);
    } catch (error) {
      console.log(error);
      sendResponse(res, { result: ERROR });
    }
  }

  async saveArticle(req, res) {
    try {
      const data = await this.nytArticleService.saveArticle(req.body);
      sendResponse(res, data);
    } catch (error) {
      console.error(error);
      sendResponse(res, { status: ERROR });
    }
  }

  async modifyArticle(req, res) {
    try {
      const data = await this.nytArticleService.modifyArticle(req.body);
      sendResponse(res, data);
    } catch (error) {
      console.error(error);
      sendResponse(res, { status: ERROR });
    }
  }

  async deleteArticle(req, res) {
    try {
      const { id } = req.params;
      const data = await this.nytArticleService.deleteArticle(id);
      sendResponse(res, data);
    } catch (error) {
      console.error(error);
      sendResponse(res, { status: ERROR });
    }
  }
}

module.exports = NYTArticleController;
