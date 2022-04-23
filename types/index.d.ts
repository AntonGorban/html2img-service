export type ObjectWithGivenValues<O extends { [key: string]: any }, T> = {
  [key in keyof O]: T;
};

export const enum ApiMethods {
  /** Read */
  GET = "get",
  /** Create */
  POST = "post",
  /** Update / Replace */
  PUT = "put",
  /** Partial Update / Modify*/
  PATCH = "patch",
  /** Delete */
  DELETE = "delete",
}
