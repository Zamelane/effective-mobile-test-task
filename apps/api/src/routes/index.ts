import express from 'express'
import { userRoutes } from './user'
import { authRoutes } from './auth'

export const apiRouter = express.Router().use(authRoutes).use(userRoutes)
