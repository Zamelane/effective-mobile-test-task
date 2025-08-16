import { BadRequestError, NotFoundError } from '@effective-mobile-tt/shared/src';
import express, { Request } from 'express';
import z from 'zod';
import { UserService } from '../../services/user';

const paramsZodSchema = z.object({
  id: z.coerce.number().nonnegative()
})

export const userBanRoute = express.Router()
  .post('/users/:id/ban', async (req, res) => {
    res.json({
      userInfo: await banRouteHandler(req, false)
    }).status(200)
  })
  .post('/users/:id/unban', async (req, res) => {
    res.json({
      userInfo: await banRouteHandler(req, true)
    }).status(200)
  })

function paramsValidate(req: Request) {
  const paramsValidationResult = paramsZodSchema.safeParse(req.params);

  if (!paramsValidationResult.success) {
    const errors = paramsValidationResult.error.flatten()
    throw new BadRequestError('Validation error', {
      fieldErrors: errors
    })
  }

  return paramsValidationResult.data
}

async function banRouteHandler(req: Request, isActive: boolean) {
  const params = paramsValidate(req)

  // Кинет ошибку при неудачной проверке
  await UserService.checkIsAdmin(req, true)

  const user = isActive
    ? await UserService.unbanUser(params.id)
    : await UserService.banUser(params.id)

  if (!user) {
    throw new NotFoundError(`User with ID ${params.id} not found`)
  }

  const { password, ...userInfo } = user

  return user
}