import { ApiError, InternalServerError } from '@effective-mobile-tt/shared'
import { Request, Response, NextFunction } from 'express'
import { env } from '../config/env'

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let error: ApiError

  if (err instanceof ApiError) {
    error = err
  } else {
    console.error(err)
    error = new InternalServerError()
  }

  return res.status(error.status).json({
    error: {
      status: error.status,
      code: error.code,
      message: error.message,
      details: error.details,
      stack: env.NODE_ENV === 'development' ? error.stack : undefined,
    },
  })
}
