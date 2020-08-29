const awilix = require("awilix");
const container = awilix.createContainer();

const nytArticleController = require("./controllers/NYTArticleController/NYTArticleController");
const nytArticleService = require("./services/NYTArticleService");
const nytArticleRepository = require("./persistence/repository/NYTArticleRepository");

const buildContainer = () => {
  const { favoriteArticleModel } = require("./persistence/Models");

  container.register({
    favoriteArticleModel: awilix.asValue(favoriteArticleModel),
    nytArticleController: awilix.asClass(nytArticleController),
    nytArticleService: awilix.asClass(nytArticleService),
    nytArticleRepository: awilix.asClass(nytArticleRepository),
  });

  return {
    NYTArticleController: container.build(nytArticleController),
  };
};

module.exports = { buildContainer };
