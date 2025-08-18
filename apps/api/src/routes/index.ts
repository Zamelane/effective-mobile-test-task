import express from 'express'
import { userRoutes } from './user'
import { authRoutes } from './auth'
import { checkAuthPlugin } from '../middlewares/auth'

export const apiRouter = express
  .Router()
  .use(authRoutes)
  .use(checkAuthPlugin)
  .use(userRoutes)
