import {
  BadRequestError,
  UserRegistrationZodSchema as schema,
} from '@effective-mobile-tt/shared/src'
import express from 'express'
import { PasswordService } from '../../services/password'
import { db } from '@effective-mobile-tt/db/src'
import { UserService } from '../../services/user'

const UserRegistrationZodSchema = schema.extend({
  email: schema.shape.email.refine(async (email) => !(await db.user.checkEmail(email)), {
    message: 'Email уже занят',
    path: ['email'],
  })
})

export const registrationRoute = express
  .Router()
  .post('/registration', async (req, res) => {
    const validationResult = await UserRegistrationZodSchema.safeParseAsync(req.body)

    if (!validationResult.success) {
      const errors = validationResult.error.flatten()
      throw new BadRequestError('Validation error', {
        fieldErrors: errors,
      })
    }

    const hashedPassword = await PasswordService.hash(
      validationResult.data.password,
    )

    const user = await db.user.insert({
      ...validationResult.data,
      password: hashedPassword,
    })

    const authData = await UserService.login(
      user.email,
      validationResult.data.password,
    )

    const {
      user: { password, ...userInfo },
      token,
    } = authData

    res.json({ userInfo, token }).status(201)
  })
