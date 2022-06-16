import { ErrorObject } from "ajv";

import { validation } from "../Validation/Validation";

export class ValidationError extends Error {
  public readonly info: ReadonlyArray<ErrorObject>;

  constructor(errors: Array<ErrorObject>, dataVar?: string) {
    super(
      validation.getErrorMessage([errors[0]], dataVar) || "что-то пошло не так"
    );

    this.name = "ValidationError";
    this.info = errors;
  }
}
