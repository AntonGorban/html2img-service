import Ajv, { ErrorObject, JSONSchemaType } from "ajv";
import ajvErrors from "ajv-errors";
import ajvFormats from "ajv-formats";

import { Validator } from "./Validator";

export class Validation {
  private readonly _ajv: Ajv;

  constructor() {
    this._ajv = new Ajv({
      allErrors: true,
      removeAdditional: "all",
      useDefaults: true,
      coerceTypes: true,
    });

    this._activateAjvPlugins();
  }

  private readonly _activateAjvPlugins = () => {
    ajvErrors(this._ajv, { singleError: true });
    ajvFormats(this._ajv, { formats: ["uri"] });
  };

  public readonly addSchema: <T>(
    key: string,
    schema: JSONSchemaType<T>
  ) => void = (key, schema) => {
    this._ajv.addSchema(schema, key);
  };

  public readonly getSchema: <T>(key: string) => void = (key) => {
    this._ajv.getSchema(key);
  };

  public readonly generateValidator: <T>(
    schema: JSONSchemaType<T>,
    dataVar?: string
  ) => Validator<T> = (schema, dataVar) => {
    return new Validator(this._ajv.compile(schema), dataVar);
  };

  public getErrorMessage(errors: Array<ErrorObject>, dataVar?: string) {
    return this._ajv.errorsText(errors, { dataVar });
  }
}
