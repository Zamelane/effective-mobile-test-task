import { Request, Response, NextFunction } from 'express'
import { expressjwt as jwt } from 'express-jwt'
import { env } from '../config/env'
import { UserService } from '../services/user'
import { ForbiddenError } from '@effective-mobile-tt/shared'

export const jwtReader = jwt({
  secret: env.API_JWT_SECRET,
  algorithms: ['HS256'],
  credentialsRequired: false,
  getToken: function fromHeaderOrQuerystring(req) {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      return req.headers.authorization.split(' ')[1]
    }
    return undefined
  },
})

export async function checkAuthPlugin(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const isAllowed = request.auth
    ? (await UserService.getUserById(request.auth.userId))?.isActive || false
    : false

  if (!isAllowed) {
    console.log(`FORBIDDEN: ${request.method} ${request.path}`)
    throw new ForbiddenError()
  }

  console.log(`${request.method} ${request.path}`)
  next()
}
