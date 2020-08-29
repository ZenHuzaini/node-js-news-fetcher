const {
  SUCCESS,
  ERROR,
  NO_DATA,
  REQUIRED_ARGUMENT_NOT_PROVIDED,
  sendResponse,
} = require("../controllers/NYTArticleController/Constants");
const axios = require("axios");
const { articleLink, bookLink } = {
  articleLink: `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${process.env.NYT_KEY}`,
  bookLink: `https://api.nytimes.com/svc/books/v3/lists.json?api-key=${process.env.NYT_KEY}`,
};

class NYTArticleService {
  constructor(dependencies) {
    this.nytArticleRepository = dependencies.nytArticleRepository;

    this.checkArticle = this.checkArticle.bind(this);
    this.checkArticleBasedOnId = this.checkArticleBasedOnId.bind(this);
    this.checkBook = this.checkBook.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
    this.getArticles = this.getArticles.bind(this);
    this.modifyArticle = this.modifyArticle.bind(this);
    this.saveArticle = this.saveArticle.bind(this);
    this.validValues = this.validValues.bind(this);
  }

  async validValues(value) {
    const validSortValues = ["newest", "oldest", "relevance"];
    const result = validSortValues.find((word) => word === value);
    if (!result) {
      return REQUIRED_ARGUMENT_NOT_PROVIDED;
    }
    return SUCCESS;
  }

  async checkArticle(query, sort = "oldest") {
    try {
      const { data } = await axios.get(
        `${articleLink}&q=${query}&sort=${sort}`
      );
      return { status: SUCCESS, data: data.response.docs };
    } catch (error) {
      console.log(error);
      return { status: ERROR };
    }
  }

  async checkArticleBasedOnId(articleId) {
    try {
      const { data } = await axios.get(
        `${articleLink}&fq=_id:("${articleId}")`
      );
      return { status: SUCCESS, data: data.response.docs };
    } catch (error) {
      console.log(error);
      return { status: ERROR };
    }
  }

  async checkBooks(type = "hardcover-fiction") {
    try {
      const { data } = await axios.get(`${bookLink}&list=${type}`);
      return { status: SUCCESS, data: data.results };
    } catch (error) {
      console.log(error);
      return { status: ERROR };
    }
  }

  async checkBook(type = "hardcover-fiction", searchQuery) {
    let newBooks = [];
    try {
      const { data } = await axios.get(`${bookLink}&list=${type}`);
      data.results.forEach(({ book_details }) => {
        let isThere = book_details.some((element) =>
          element.description.includes(searchQuery)
        );

        if (isThere) {
          newBooks.push(book_details);
        }
      });

      return {
        status: SUCCESS,
        data: newBooks.length == 0 ? "No Entry Found" : newBooks,
      };
    } catch (error) {
      console.log(error);
      return { status: ERROR };
    }
  }

  async getArticles() {
    try {
      const data = await this.nytArticleRepository.find();
      return { status: SUCCESS, data };
    } catch (error) {
      console.log(error);
      return { status: ERROR };
    }
  }

  async saveArticle(params) {
    try {
      const data = await this.nytArticleRepository.add(params);
      return { status: SUCCESS, data };
    } catch (error) {
      console.log(error);
      return { status: ERROR };
    }
  }

  async modifyArticle(params) {
    try {
      const { _id, ...content } = params;
      const data = await this.nytArticleRepository.updateById(_id, content);
      return { status: SUCCESS, data };
    } catch (error) {
      console.log(error);
      return ERROR;
    }
  }

  async deleteArticle(id) {
    try {
      const data = await this.nytArticleRepository.removeById(id);
      return { status: SUCCESS, data };
    } catch (error) {
      console.log(error);
      return ERROR;
    }
  }
}

module.exports = NYTArticleService;
