import {
  BadRequestError,
  UserLoginZodSchema,
} from '@effective-mobile-tt/shared/src'
import express from 'express'
import { UserService } from '../../services/user'

export const loginRoute = express.Router().post('/login', async (req, res) => {
  const validationResult = UserLoginZodSchema.safeParse(req.body)

  if (!validationResult.success) {
    const errors = validationResult.error.flatten()
    throw new BadRequestError('Validation error', {
      fieldErrors: errors,
    })
  }

  const { email, password } = validationResult.data

  const authData = await UserService.login(email, password)

  const {
    user: { password: _, ...userInfo },
    token,
  } = authData

  res.json({ userInfo, token }).status(200)
})
