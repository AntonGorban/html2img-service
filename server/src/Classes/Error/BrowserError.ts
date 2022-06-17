export class BrowserError extends Error {
  constructor(errorMessage: string) {
    super(errorMessage || "что-то пошло не так");

    this.name = "BrowserError";
  }
}
