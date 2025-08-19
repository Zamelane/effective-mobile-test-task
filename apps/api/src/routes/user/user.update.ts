import {
  BadRequestError,
  NotFoundError,
  UserChangeRoleZodSchema,
  UserUpdateZodSchema,
} from '@effective-mobile-tt/shared/src'
import express, { Request } from 'express'
import z from 'zod'
import { UserService } from '../../services/user'
import { db } from '@effective-mobile-tt/db/src'

const paramsZodSchema = z.object({
  id: z.coerce.number().nonnegative(),
})

export const userUpdateRoute = express
  .Router()
  .post('/users/:id', async (req, res) => {
    const params = paramsValidate(req)
    const body = await bodyValidate(req)

    const user = await db.user.update(params.id, body)

    if (!user) {
      throw new NotFoundError(`User with ID ${params.id} not found`)
    }

    UserService.updateCacheUserById(user)

    const { password, ...userInfo } = user

    res
      .json(userInfo)
      .status(200)
  })

function paramsValidate(req: Request) {
  const paramsValidationResult = paramsZodSchema.safeParse(req.params)

  if (!paramsValidationResult.success) {
    const errors = paramsValidationResult.error.flatten()
    throw new BadRequestError('Validation error', {
      fieldErrors: errors,
    })
  }

  return paramsValidationResult.data
}

async function bodyValidate(req: Request) {
  const isAdmin = await UserService.checkIsAdmin(req)

  const bodyValidationSchema = isAdmin
    ? UserUpdateZodSchema.merge(UserChangeRoleZodSchema.partial())
    : UserUpdateZodSchema


  const bodyValidationResult = bodyValidationSchema.safeParse(req.body)

  if (!bodyValidationResult.success) {
    const errors = bodyValidationResult.error.flatten()
    throw new BadRequestError('Validation error', {
      fieldErrors: errors,
    })
  }

  return bodyValidationResult.data
}
