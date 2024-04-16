class ApiError extends Error {
  constructor({
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack,
  } = {}) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
  notFound() {
    return {
      statusCode: 404,
      message: "Data not found",
    };
  }
  serverError() {
    return {
      statusCode: 500,
      message: "Internal server error",
    };
  }
  invalidMongodbObjectId() {
    return {
      statusCode: 400,
      message: "Invalid id.",
    };
  }
}

export default ApiError;
