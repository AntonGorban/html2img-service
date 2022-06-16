import { ErrorObject } from "ajv";

export class ValidationError extends Error {
  public readonly info: ErrorObject;

  constructor(error: ErrorObject) {
    super(error.message || "что-то пошло не так");

    this.name = "ValidationError";
    this.info = error;
  }
}
