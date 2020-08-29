const { createModel } = require("./DatabaseConnection");
const nytFavoriteArticleSchema = require("./schema/NYTFavoriteArticleSchema");

module.exports = {
  favoriteArticleModel: createModel(
    "FavoriteArticleSchema",
    nytFavoriteArticleSchema
  ),
};
