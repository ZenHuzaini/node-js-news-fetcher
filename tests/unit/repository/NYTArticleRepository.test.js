const NYTArticleRepository = require("../../../persistence/repository/NYTArticleRepository");
const sinon = require("sinon");
const expect = require("chai").expect;
const mongoose = require("mongoose");
require("./sinon-mongoose");

describe("New York Time Favorite Article Repository Flow", () => {
  const mockData = { data: "test" };
  const idMock = "1234";
  let nytArticleRepository;
  let mockNYTArticleModel;
  const favoriteArticleModel = mongoose.model("favoriteArticleModel", {});

  beforeEach(() => {
    mockNYTArticleModel = sinon.mock(favoriteArticleModel);
    nytArticleRepository = new NYTArticleRepository({ favoriteArticleModel });
  });

  afterEach(() => {
    mockNYTArticleModel.verify();
    mockNYTArticleModel.restore();
  });

  it("should return all of the favorite articles", async () => {
    mockNYTArticleModel
      .expects("find")
      .withArgs()
      .chain("exec")
      .resolves(mockData);

    const result = await nytArticleRepository.find();
    expect(result).to.be.equal(mockData);
  });

  it("should be able to save the new favorite article", async () => {
    mockNYTArticleModel
      .expects("create")
      .withArgs(mockData)
      .chain("exec")
      .resolves(mockData);

    const result = await nytArticleRepository.add(mockData);
    console.log(result);
    expect(JSON.stringify(result)).to.be.equal(JSON.stringify(mockData));
  });

  it("should be able to delete the article if id is provided", async () => {
    mockNYTArticleModel
      .expects("findOneAndDelete")
      .withArgs(idMock)
      .chain("exec")
      .resolves(mockData);

    const result = await nytArticleRepository.removeById(idMock);
    console.log(result);
    expect(JSON.stringify(result)).to.be.equal(JSON.stringify(mockData));
  });

  it("should be able to update the article if id and required param is provided", async () => {
    mockNYTArticleModel
      .expects("findByIdAndUpdate")
      .withArgs(idMock, {
        data: "test",
      })
      .chain("exec")
      .resolves(mockData);

    const result = await nytArticleRepository.updateById(idMock, {
      data: "test",
    });

    expect(JSON.stringify(result)).to.be.equal(JSON.stringify(mockData));
  });
});
