export class ApiError extends Error {
  public status: number
  public errors: unknown[]

  constructor(status: number, message: string, errors: unknown[] = []) {
    super(message)
    this.status = status
    this.errors = errors
  }

  static InternalServerError(message: string, errors: unknown[] = []) {
    return new ApiError(500, message, errors)
  }

  static UnauthorizedError() {
    return new ApiError(401, 'Пользователь не авторизован!')
  }

  static BadRequest(message: string, errors: unknown[] = []) {
    return new ApiError(400, message, errors)
  }
}
