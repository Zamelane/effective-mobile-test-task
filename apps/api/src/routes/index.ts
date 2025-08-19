import express from 'express'
import { userRoutes } from './user'
import { authRoutes } from './auth'
import { checkAuthPlugin } from '../middlewares/auth'
import { notFoundHandler } from '../middlewares/notFound'

export const apiRouter = express
  .Router()
  .use(authRoutes)
  .use(checkAuthPlugin)
  .use(userRoutes)
  .use(notFoundHandler)
