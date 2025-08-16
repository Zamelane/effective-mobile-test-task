import { NotFoundError } from '@effective-mobile-tt/shared/src/errors/internal'
import { Request, Response, NextFunction } from 'express'
export function notFoundHandler(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  next(new NotFoundError())
}
