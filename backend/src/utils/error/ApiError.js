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
      message: this.message || "Data not found",
      errors: this.errors,
    };
  }
  serverError() {
    return {
      statusCode: 500,
      message: "Internal server error",
      errors: this.errors,
    };
  }
  invalidMongodbObjectId() {
    return {
      statusCode: 400,
      message: "Invalid mongodb id.",
      errors: this.errors,
    };
  }
}

export default ApiError;
