import { ValidateFunction } from "ajv";
import lo from "lodash";

import { ValidationError } from "../Error/ValidationError";

export class Validator<T extends {}> {
  private readonly _validator: ValidateFunction;

  constructor(validator: ValidateFunction<T>) {
    this._validator = validator;
  }

  public readonly validate: (rawData: unknown) => T = (rawData) => {
    const data = lo.cloneDeep(rawData);

    const valid = this._validator(data);

    if (!valid) {
      if (!this._validator.errors) throw new Error("что-то пошло не так");
      throw new ValidationError(this._validator.errors[0]);
    }

    return data as T;
  };
}
