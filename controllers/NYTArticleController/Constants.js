const { SUCCESS, NO_DATA, ERROR, REQUIRED_ARGUMENT_NOT_PROVIDED } = {
  SUCCESS: "Operation has been successfully performed",
  NO_DATA: "No data!",
  ERROR: "something went wrong!",
  REQUIRED_ARGUMENT_NOT_PROVIDED: "required arguments are missing",
};

const sendResponse = (res, payload) => {
  res.status(responseStatuses[payload.status]).json({ ...payload });
};

const responseStatuses = {
  [SUCCESS]: 200,
  [NO_DATA]: 422,
  [ERROR]: 500,
  [REQUIRED_ARGUMENT_NOT_PROVIDED]: 405,
};

module.exports = {
  sendResponse,
  SUCCESS,
  NO_DATA,
  ERROR,
  REQUIRED_ARGUMENT_NOT_PROVIDED,
};
