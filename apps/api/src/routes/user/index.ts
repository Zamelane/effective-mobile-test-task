import express from 'express'
import { userGetByIdRoute } from './user.getById'
import { userGetListRoute } from './user.getList'
import { userBanRoute } from './user.ban'
import { userUpdateRoute } from './user.update'
export * from './user.getById'

export const userRoutes = express
  .Router()
  .use(userGetByIdRoute)
  .use(userGetListRoute)
  .use(userBanRoute)
  .use(userUpdateRoute)
