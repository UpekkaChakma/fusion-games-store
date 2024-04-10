import { ZodIssueCode } from "zod";
import ApiError from "./ApiError.js";

const handleZodError = (zodError) => {
  if (Array.isArray(zodError.issues) && zodError.issues.length > 0) {
    const errors = getFormattedError(zodError.issues);
    return new ApiError({
      statusCode: 403,
      message: "Validation error",
      errors,
    });
  }
  return new ApiError({
    statusCode: 403,
    message: "Validation error",
    errors: {
      errorField: null,
      message: "Failed, provide only proper values.",
    },
  });
};

export default handleZodError;

const getFormattedError = (errors) => {
  return errors.map((obj) => {
    const length = obj.path.length;
    const fieldName = length > 1 ? obj.path[length - 2] : obj.path[length - 1];
    // obj.path[length - 1] == 0 ? obj.path[length - 2] : obj.path[length - 1];

    if (obj.code === ZodIssueCode.invalid_type) {
      return obj.received === "undefined"
        ? {
            errorField: fieldName,
            message: `${fieldName} field is required.`,
          }
        : {
            errorField: fieldName,
            message: `${obj.message}.`,
          };
    }

    if (obj.code === ZodIssueCode.invalid_string && obj.validation === "url") {
      return {
        errorField: fieldName,
        message: "Please provide only valid website url.",
      };
    }
    if (
      obj.code === ZodIssueCode.invalid_string &&
      obj.validation === "regex"
    ) {
      return {
        errorField: fieldName,
        message:
          "Only alphanumeric characters, hyphen, dot, and single whitespace allowed.",
      };
    }

    if (
      obj.code === ZodIssueCode.too_small ||
      obj.code === ZodIssueCode.too_big
    ) {
      switch (obj.type) {
        case "number":
          return {
            errorField: fieldName,
            message: `${fieldName} field must contain 3 to 90 alphabetic characters`,
          };
        case "string":
          return {
            errorField: fieldName,
            message: obj.message.replace("String", `${fieldName} field`),
          };
        case "array":
          return {
            errorField: fieldName,
            message: `The ${fieldName} field is empty, please fill it with proper value(s).`,
          };
        default:
          return {
            errorField: "",
            message: "Please don't provide empty field value.",
          };
      }
    }

    if (obj.code === ZodIssueCode.invalid_date) {
      return {
        errorField: fieldName,
        message: `Invalid date given at ${fieldName}.`,
      };
    }

    if (obj.code === ZodIssueCode.invalid_enum_value) {
      return {
        errorField: fieldName,
        message: `Please choose only from the list of predefined ${fieldName}.`,
      };
    }

    if (obj.code === ZodIssueCode.custom) {
      return {
        errorField: fieldName,
        message: `Failed, provide only proper values.`,
      };
    }
  });
};
