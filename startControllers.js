function startControllers(app, { NYTArticleController }) {
  app.get("/article", NYTArticleController.checkArticle);
  app.get("/article/idbased", NYTArticleController.checkArticleBasedOnId);
  app.get("/books", NYTArticleController.checkBooks);
  app.get("/book", NYTArticleController.checkBook);

  app.get("/favoriteArticle", NYTArticleController.getArticles);
  app.post("/favoriteArticle", NYTArticleController.saveArticle);
  app.put("/favoriteArticle", NYTArticleController.modifyArticle);
  app.delete("/favoriteArticle/:id", NYTArticleController.deleteArticle);
}

module.exports = { startControllers };
