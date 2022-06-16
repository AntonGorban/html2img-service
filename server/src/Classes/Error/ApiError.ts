export class ApiError extends Error {
  public readonly status: number;

  constructor(status: number, message: string) {
    super();
    this.status = status || 500;
    this.message = message || "Internal Server Error";
  }

  /** Плохой запрос */
  static badRequest(message?: string) {
    return new ApiError(400, message || "Bad Request");
  }

  /** Не авторизован */
  static unauthorized(message?: string) {
    return new ApiError(401, message || "Unauthorized");
  }

  /** Запрещено */
  static forbidden(message?: string) {
    return new ApiError(403, message || "Forbidden");
  }

  /** Не найдено */
  static notFound(message?: string) {
    return new ApiError(404, message || "Not Found");
  }

  /** Внутренняя ошибка сервера */
  static internal(message?: string) {
    return new ApiError(500, message || "Internal Server Error");
  }
}
