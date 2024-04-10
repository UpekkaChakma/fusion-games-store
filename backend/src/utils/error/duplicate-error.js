import ApiError from "./ApiError.js";

const handleDuplicateError = (error) => {
  const errorField = Object.keys(error.keyValue)[0];
  return new ApiError({
    statusCode: 409,
    message: "Duplicate Key error",
    errors: [
      {
        errorField: errorField,
        message: `This ${errorField} is already used, please choose a different one.`,
      },
    ],
  });
};

export default handleDuplicateError;
