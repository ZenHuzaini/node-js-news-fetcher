const Repository = require("./Repository");

class NYTArticleRepository extends Repository {
  constructor(dependencies) {
    super(dependencies.favoriteArticleModel);
  }
}

module.exports = NYTArticleRepository;
