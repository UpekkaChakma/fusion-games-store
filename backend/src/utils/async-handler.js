import handleError from "./handle-error.js";

const asyncHandler = (reqHandler) => {
  return (req, res, next) => {
    reqHandler(req, res, next).catch((error) => {
      console.log(error);
      const errorData = handleError(error);
      res
        .status(errorData?.statusCode || 500)
        .json(errorData || "Internal server error");
    });
  };
};

export default asyncHandler;
