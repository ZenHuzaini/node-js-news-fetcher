const NYTArticleService = require("../../../services/NYTArticleService");
const NYTArticleRepository = require("../../../persistence/repository/NYTArticleRepository");
const expect = require("chai").expect;
const sinon = require("sinon");
const {
  SUCCESS,
  ERROR,
  NO_DATA,
  REQUIRED_ARGUMENT_NOT_PROVIDED,
} = require("../../../controllers/NYTArticleController/Constants");

describe("New York times Service Flow", () => {
  let mockNYTArticleService;
  let nytArticleService;
  let nytArticleRepository;
  let mockNYTArticleRepository;

  const idArticle = "b8ed35-d195-591e-82e8-64840bc751b6";
  const mockData = {
    status: "Operation has been successfully performed",
    data: [
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
        headline: [Object],
        keywords: [],
        pub_date: "1851-09-19T05:00:00+0000",
        document_type: "article",
        news_desk: "None",
        section_name: "Archives",
        byline: [Object],
        type_of_material: "Archives",
        _id: "nyt://article/63ccf00f-33d8-5dd8-b9e6-18fd25913c47",
        word_count: 0,
        uri: "nyt://article/63ccf00f-33d8-5dd8-b9e6-18fd25913c47",
      },
      {
        abstract:
          'We are now in the thick of the half-yearly railway gatherings, at which the shareholders congregate, in cager anticipation of the good things which directors have to announce for their benefit. Ever since the discolosure of the "dodges" by which the ex-railway potenlate, Hudson, contrived to make things "pleasant," these gatherings have been scrutinised for more closesly than used to be the case.  ',
        web_url:
          "https://www.nytimes.com/1851/09/20/archives/england-railway-reportsthe-queens-visit-to-scotlandbloomerism.html",
        snippet: "",
        lead_paragraph: "",
        print_page: "4",
        source: "The New York Times",
        multimedia: [],
        headline: [Object],
        keywords: [],
        pub_date: "1851-09-20T05:00:00+0000",
        document_type: "article",
        news_desk: "None",
        section_name: "Archives",
        byline: [Object],
        type_of_material: "Archives",
        _id: "nyt://article/97b0454f-e656-50c3-b77a-998379cbcfc1",
        word_count: 0,
        uri: "nyt://article/97b0454f-e656-50c3-b77a-998379cbcfc1",
      },
    ],
  };

  beforeEach(() => {
    nytArticleRepository = new NYTArticleRepository({});
    mockNYTArticleRepository = sinon.mock(nytArticleRepository);
    nytArticleService = new NYTArticleService({ nytArticleRepository });
    mockNYTArticleService = sinon.mock(nytArticleService);
  });

  afterEach(() => {
    mockNYTArticleService.verify();
    mockNYTArticleRepository.verify();

    mockNYTArticleService.restore();
    mockNYTArticleRepository.restore();
  });

  describe("Getting Article - Search and sort", () => {
    it("Should return 200 with response when the parameters are provided", async () => {
      mockNYTArticleService
        .expects("checkArticle")
        .withArgs("harry", "oldest")
        .resolves(mockData);

      const actual = await nytArticleService.checkArticle("harry", "oldest");
      expect(actual).to.be.eql(mockData);
    });

    it("Should return error if the server went wrong", async () => {
      mockNYTArticleService
        .expects("checkArticle")
        .withArgs("harry", "oldest")
        .rejects()
        .resolves({ status: ERROR });

      const actual = await nytArticleService.checkArticle("harry", "oldest");
      expect(actual).to.be.eql({ status: ERROR });
    });
  });

  describe("Getting Article - Based on ID", () => {
    it("Should return 200 with response when the parameters are provided", async () => {
      mockNYTArticleService
        .expects("checkArticleBasedOnId")
        .withArgs(idArticle)
        .resolves(mockData);

      const actual = await nytArticleService.checkArticleBasedOnId(idArticle);
      expect(actual).to.be.eql(mockData);
    });

    it("Should return error if the server went wrong", async () => {
      mockNYTArticleService
        .expects("checkArticleBasedOnId")
        .withArgs(idArticle)
        .rejects()
        .resolves({ status: ERROR });

      const actual = await nytArticleService.checkArticleBasedOnId(idArticle);
      expect(actual).to.be.eql({ status: ERROR });
    });
  });

  describe("Getting books - Based on only type", () => {
    it("Should return 200 with response when the parameters are provided", async () => {
      mockNYTArticleService
        .expects("checkBooks")
        .withArgs("hardcover-fiction")
        .resolves(mockData);

      const actual = await nytArticleService.checkBooks("hardcover-fiction");
      expect(actual).to.be.eql(mockData);
    });

    it("Should return error if the server went wrong", async () => {
      mockNYTArticleService
        .expects("checkBooks")
        .withArgs("hardcover-fiction")
        .rejects()
        .resolves({ status: ERROR });

      const actual = await nytArticleService.checkBooks("hardcover-fiction");
      expect(actual).to.be.eql({ status: ERROR });
    });
  });

  describe("Getting Book based on the search and type", () => {
    it("Should return 200 with response when the parameters are provided", async () => {
      mockNYTArticleService
        .expects("checkBook")
        .withArgs("hardcover-fiction", "something")
        .resolves(mockData);

      const actual = await nytArticleService.checkBook(
        "hardcover-fiction",
        "something"
      );
      expect(actual).to.be.eql(mockData);
    });

    it("Should return error if the server went wrong", async () => {
      mockNYTArticleService
        .expects("checkBook")
        .withArgs("hardcover-fiction", "something")
        .rejects()
        .resolves({ status: ERROR });

      const actual = await nytArticleService.checkBook(
        "hardcover-fiction",
        "something"
      );
      expect(actual).to.be.eql({ status: ERROR });
    });
  });
});
