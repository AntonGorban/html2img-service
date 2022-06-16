export type ObjectWithGivenValues<O extends { [key: string]: any }, T> = {
  [key in keyof O]: T;
};
