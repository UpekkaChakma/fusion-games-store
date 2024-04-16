import handleError from "./error/handle-error.js";

const asyncHandler = (reqHandler) => {
  return (req, res, next) => {
    reqHandler(req, res, next).catch((error) => {
      console.log(error);
      const errorData = handleError(error);
      res.status(errorData?.statusCode).json(errorData);
    });
  };
};

export default asyncHandler;
