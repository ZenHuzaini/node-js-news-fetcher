const { prepareServer } = require("../../server");
const expect = require("chai").expect;
const request = require("supertest");
const {
  SUCCESS,
  REQUIRED_ARGUMENT_NOT_PROVIDED,
} = require("../../controllers/NYTArticleController/Constants");

describe("New York Times Integartion Test Flow", function () {
  let server;
  let getServer;
  let requestAgent;

  before(async () => {
    getServer = await prepareServer();
    server = getServer.listen();
    requestAgent = request.agent(server);
  });

  after(() => {
    server.close();
  });

  describe("Getting Article - Search and sort", () => {
    it("Should response success with status code and real result when tring to get the article with proper argument", async () => {
      const response = await requestAgent
        .get("/api/article")
        .send({
          searchQuery: "harry",
          sort: "oldest",
        })
        .set("Accept", "application/json");

      expect(response.statusCode).to.equal(200);
      expect(response.text.includes(SUCCESS)).to.be.true;
    });

    it("Should response to provide required arguments. Returning status code and warning result when tring to get the article without proper argument", async () => {
      const response = await requestAgent
        .get("/api/article")
        .send()
        .set("Accept", "application/json");

      expect(response.statusCode).to.equal(405);
      expect(response.text.includes(REQUIRED_ARGUMENT_NOT_PROVIDED)).to.be.true;
    });
  });

  describe("Getting Article - Based on ID", () => {
    it("Should response success with status code and real result when tring to get the article with proper argument", async () => {
      const response = await requestAgent
        .get("/api/article/idbased")
        .send({
          idArticle: "nyt://article/80b8ed35-d195-591e-82e8-64840bc751b6",
        })
        .set("Accept", "application/json");

      expect(response.statusCode).to.equal(200);
      expect(response.text.includes(SUCCESS)).to.be.true;
    });

    it("Should response to provide required arguments. Returning status code and warning result when tring to get the article without proper argument", async () => {
      const response = await requestAgent
        .get("/api/article/idbased")
        .send()
        .set("Accept", "application/json");

      expect(response.statusCode).to.equal(405);
    });
  });

  describe("Getting all Books - Based on the type", () => {
    it("Should response success with status code and real result when tring to get the article with proper argument", async () => {
      const response = await requestAgent
        .get("/api/books")
        .send({
          type: "hardcover-fiction",
        })
        .set("Accept", "application/json");

      expect(response.statusCode).to.equal(200);
      expect(response.text.includes(SUCCESS)).to.be.true;
    });

    it("Should response to provide required arguments. Returning status code and warning result when tring to get the article without proper argument", async () => {
      const response = await requestAgent
        .get("/api/books")
        .send()
        .set("Accept", "application/json");

      expect(response.statusCode).to.equal(405);
    });
  });

  describe("Getting all Books - Based on the type and query", () => {
    it("Should response success with status code and real result when tring to get the article with proper argument", async () => {
      const response = await requestAgent
        .get("/api/book")
        .send({
          type: "hardcover-fiction",
          searchQuery: "woman",
        })
        .set("Accept", "application/json");

      expect(response.statusCode).to.equal(200);
      expect(response.text.includes(SUCCESS)).to.be.true;
    });

    it("Should response success with status code and result no data found when tring to get the article with proper argument", async () => {
      const response = await requestAgent
        .get("/api/book")
        .send({
          type: "hardcover-fiction",
          searchQuery: "fj",
        })
        .set("Accept", "application/json");

      expect(response.statusCode).to.equal(200);
      expect(response.text.includes(SUCCESS)).to.be.true;
    });

    it("Should response to provide required arguments. Returning status code and warning result when tring to get the article without proper argument", async () => {
      const response = await requestAgent
        .get("/api/book")
        .send()
        .set("Accept", "application/json");

      expect(response.statusCode).to.equal(405);
    });
  });
});
