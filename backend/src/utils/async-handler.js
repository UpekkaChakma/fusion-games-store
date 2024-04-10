import handleError from "./handle-error.js";

const asyncHandler = (reqHandler) => {
  return (req, res, next) => {
    reqHandler(req, res, next).catch((error) => {});
  };
};

export default asyncHandler;
