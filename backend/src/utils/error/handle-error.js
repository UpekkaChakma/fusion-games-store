import z from "zod";
import ApiError from "./ApiError.js";
import handleZodError from "./zod-error.js";
import handleDuplicateError from "./duplicate-error.js";

const handleError = (error) => {
  if (error.code === 11000) {
    return handleDuplicateError(error);
  }

  if (error instanceof z.ZodError) {
    return handleZodError(error);
  }

  if (error instanceof ApiError || error.statusCode) {
    return new ApiError({
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  return new ApiError({
    statusCode: 500,
    message: "Internal server error",
  });
};

export default handleError;
