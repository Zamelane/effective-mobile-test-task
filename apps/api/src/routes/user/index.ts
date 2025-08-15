import express from 'express';
import { userGetByIdRoute } from './user.getById';
import { userGetListRoute } from './user.getList';
export * from './user.getById'

export const userRoutes = express.Router()
  .use(userGetByIdRoute)
  .use(userGetListRoute)