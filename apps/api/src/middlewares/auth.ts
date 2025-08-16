import { Request, Response, NextFunction } from 'express'
import { expressjwt as jwt } from 'express-jwt'
import { env } from '../config/env'

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

export function checkAuthPlugin(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  console.log(`${request.method} ${request.path}`)
  next()
}
