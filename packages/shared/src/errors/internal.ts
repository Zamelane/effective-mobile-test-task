export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly details?: unknown
  ) {
    super(message)
    this.name = this.constructor.name
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = 'Unauthorized', details?: unknown) {
    super(401, 'UNAUTHORIZED', message, details)
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = 'Forbidden', details?: unknown) {
    super(403, 'FORBIDDEN', message, details)
  }
}

export class NotFoundError extends ApiError {
  constructor(message = 'Not Found', details?: unknown) {
    super(404, 'NOT_FOUND', message, details)
  }
}

export class ConflictError extends ApiError {
  constructor(message = 'Conflict', details?: unknown) {
    super(409, 'CONFLICT', message, details)
  }
}

export class InternalServerError extends ApiError {
  constructor(message = 'Internal Server Error', details?: unknown) {
    super(500, 'INTERNAL_ERROR', message, details)
  }
}