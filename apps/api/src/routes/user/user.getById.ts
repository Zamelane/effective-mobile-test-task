import { db } from '@effective-mobile-tt/db/src'
import {
  BadRequestError,
  NotFoundError,
} from '@effective-mobile-tt/shared/src/errors/internal'
import express from 'express'
import { UserService } from '../../services/user'

export const userGetByIdRoute = express
  .Router()
  .get('/users/:id', async (req, res) => {
    const userId = parseInt(req.params.id)

    if (isNaN(userId) || userId <= 0) {
      throw new BadRequestError('Invalid user ID')
    }

    const isPermitted =
      (await UserService.compareUserIdsByAuth(req, userId)) ||
      (await UserService.checkIsAdmin(req))

    if (!isPermitted) {
      throw new BadRequestError('You are not allowed to view this user')
    }

    const user = await db.user.getById(userId)

    if (!user) {
      throw new NotFoundError(`User with ID '${userId}' not found`)
    }

    res.json(user).status(200)
  })
