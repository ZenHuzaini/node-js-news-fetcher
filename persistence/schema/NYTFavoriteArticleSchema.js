const Schema = require("mongoose").Schema;

const nytFavoriteArticleSchema = new Schema(
  {
    idArticle: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = nytFavoriteArticleSchema;
