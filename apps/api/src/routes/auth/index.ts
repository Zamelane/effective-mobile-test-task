import express from 'express'
import { loginRoute } from './login'
import { registrationRoute } from './registration'

export const authRoutes = express
  .Router()
  .use(loginRoute)
  .use(registrationRoute)
