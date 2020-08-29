const sinon = require("sinon");
const expect = require("chai").expect;
const { mockRequest, mockResponse } = require("mock-req-res");
const Constants = require("../../../controllers/NYTArticleController/Constants");
const NYTArticleController = require("../../../controllers/NYTArticleController/NYTArticleController");
const NYTArticleService = require("../../../services/NYTArticleService");
const {
  SUCCESS,
} = require("../../../controllers/NYTArticleController/Constants");

describe("New York times Controller Flow", () => {
  let nYTArticleController;
  let nytArticleService;
  let mockNYTArticleService;
  let mockData = [
    {
      abstract:
        "A winterish aspect has been put on by the weather in Pennsylvania. At Harrisburg, ?? and ice were formed in the early part of the week. The nights are cool enough everywhere in the North for outside woollens. Steamboat building is carried on to a creditable extent at Pittsburgh.  ",
      web_url:
        "https://www.nytimes.com/1851/09/19/archives/news-by-the-mails.html",
      snippet: "",
      lead_paragraph: "",
      print_page: "2",
      source: "The New York Times",
      multimedia: [],
      headline: {
        main: "NEWS BY THE MAILS.",
        kicker: "1",
        content_kicker: null,
        print_headline: "NEWS BY THE MAILS.",
        name: null,
        seo: null,
        sub: null,
      },
      keywords: [],
      pub_date: "1851-09-19T05:00:00+0000",
      document_type: "article",
      news_desk: "None",
      section_name: "Archives",
      byline: {
        original: null,
        person: [],
        organization: null,
      },
      type_of_material: "Archives",
      _id: "nyt://article/63ccf00f-33d8-5dd8-b9e6-18fd25913c47",
      word_count: 0,
      uri: "nyt://article/63ccf00f-33d8-5dd8-b9e6-18fd25913c47",
    },
  ];

  beforeEach(() => {
    nytArticleService = new NYTArticleService({});
    mockNYTArticleService = sinon.mock(nytArticleService);
    nYTArticleController = new NYTArticleController({ nytArticleService });
  });

  afterEach(() => {
    mockNYTArticleService.verify();
    mockNYTArticleService.restore();
  });

  describe("Getting Article - Search and sort", () => {
    it("Should return 200 with response when the parameters are provided", async () => {
      const mockReq = mockRequest({
        body: {
          searchQuery: "harry",
          sort: "oldest",
        },
      });
      const mockRes = mockResponse();

      mockNYTArticleService
        .expects("checkArticle")
        .withArgs("harry", "oldest")
        .resolves({ status: SUCCESS, data: mockData });

      await nYTArticleController.checkArticle(mockReq, mockRes);
      expect(mockRes.status.calledWith(200)).to.be.true;
    });

    it("Should return 405 with response when the parameters are not provided", async () => {
      const mockReq = mockRequest({});
      const mockRes = mockResponse();

      await nYTArticleController.checkArticle(mockReq, mockRes);
      expect(mockRes.status.calledWith(405)).to.be.true;
    });
  });

  describe("Getting Article - Based on ID", () => {
    const idArticle = "b8ed35-d195-591e-82e8-64840bc751b6";
    it("Should return 200 with response when the parameters are provided", async () => {
      const mockReq = mockRequest({
        body: {
          idArticle,
        },
      });
      const mockRes = mockResponse();

      mockNYTArticleService
        .expects("checkArticleBasedOnId")
        .withArgs(idArticle)
        .resolves({ status: SUCCESS, data: mockData });

      await nYTArticleController.checkArticleBasedOnId(mockReq, mockRes);
      expect(mockRes.status.calledWith(200)).to.be.true;
    });

    it("Should return 405 with response when the parameters are not provided", async () => {
      const mockReq = mockRequest({});
      const mockRes = mockResponse();

      await nYTArticleController.checkArticleBasedOnId(mockReq, mockRes);
      expect(mockRes.status.calledWith(405)).to.be.true;
    });
  });

  describe("Getting Book based on the serach and type", () => {
    it("Should return 200 with response when the parameters are provided", async () => {
      const mockReq = mockRequest({
        body: {
          type: "hardcover-fiction",
          searchQuery: "something",
        },
      });
      const mockRes = mockResponse();

      mockNYTArticleService
        .expects("checkBook")
        .withArgs("hardcover-fiction", "something")
        .resolves({ status: SUCCESS, data: mockData });

      await nYTArticleController.checkBook(mockReq, mockRes);
      expect(mockRes.status.calledWith(200)).to.be.true;
    });

    it("Should return 405 with response when the parameters are not provided", async () => {
      const mockReq = mockRequest({});
      const mockRes = mockResponse();

      await nYTArticleController.checkBook(mockReq, mockRes);
      expect(mockRes.status.calledWith(405)).to.be.true;
    });
  });

  describe("Getting all Books based on the type", () => {
    it("Should return 200 with response when the parameters are provided", async () => {
      const mockReq = mockRequest({
        body: {
          type: "hardcover-fiction",
        },
      });
      const mockRes = mockResponse();

      mockNYTArticleService
        .expects("checkBooks")
        .withArgs("hardcover-fiction")
        .resolves({ status: SUCCESS, data: mockData });

      await nYTArticleController.checkBooks(mockReq, mockRes);
      expect(mockRes.status.calledWith(200)).to.be.true;
    });

    it("Should return 405 with response when the parameters are not provided", async () => {
      const mockReq = mockRequest({});
      const mockRes = mockResponse();

      await nYTArticleController.checkBooks(mockReq, mockRes);
      expect(mockRes.status.calledWith(405)).to.be.true;
    });
  });
});
