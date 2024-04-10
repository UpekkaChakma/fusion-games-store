import { z } from "zod";

class ZString {
  constructor({ min = 3, max = 150, isOptional = false } = {}) {
    this.min = min;
    this.max = max;
    this.isOptional = isOptional;
  }
  removeMultiWhiteSpaces() {
    const parsedStr = z
      .string()
      .min(this.min)
      .max(this.max)
      .trim()
      .transform((value) => value.replace(/\s{2,}/g, " "));
    return this.isOptional ? parsedStr.optional() : parsedStr;
  }
  onlySpaceHyphenDotAlphabetNumChar() {
    const parsedStr = z
      .string()
      .min(this.min)
      .max(this.max)
      .trim()
      .regex(/^[a-zA-Z0-9-. ]+$/)
      .transform((value) => value.replace(/\s{2,}/g, " "));
    return this.isOptional ? parsedStr.optional() : parsedStr;
  }
}

export { ZString };
