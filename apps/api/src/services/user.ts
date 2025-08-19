import { db } from '@effective-mobile-tt/db'
import { PasswordService } from './password'
import { ForbiddenError, UnauthorizedError } from '@effective-mobile-tt/shared'
import { env } from '../config/env'
import jwt from 'jsonwebtoken'
import { usersCache } from './cache'

import { Request } from 'express'
import { DBUser } from '@effective-mobile-tt/db/models'
import { converter } from '../lib/converter'

export class UserService {
  /**
   * Авторизирует пользователя, выдаёт токен при успешной операции
   * @param email
   * @param password
   * @returns
   */
  static async login(email: string, password: string) {
    const user = await db.user.find(email)

    if (!user) {
      throw new UnauthorizedError('Invalid credentials')
    }

    if (!user.isActive) {
      throw new ForbiddenError('User is banned')
    }

    const isPasswordValid = await PasswordService.compare(
      password,
      user.password,
    )

    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid credentials')
    }

    const token = jwt.sign({ userId: user.id.toString() }, env.API_JWT_SECRET, {
      expiresIn: '11d',
    })

    return {
      token,
      user,
    }
  }

  /**
   * Проверяет, является ли пользователь администратором (с кешированием)
   * @param userId
   * @returns
   */
  static async checkIsAdmin({ auth }: Request, throwError: boolean = false) {
    const userOnly = auth ? await this.getUserById(auth.userId) : null
    const isPremitted = userOnly && userOnly.role === 'admin'

    if (!isPremitted && throwError) {
      throw new UnauthorizedError('You are not allowed to view this user')
    }

    return isPremitted
  }

  static async getUserById(userId: string | number) {
    const userCache = usersCache.get(userId.toString())
    const userOnly = userCache
      ? userCache
      : await db.user.getById(converter(userId, 'number'))

    if (!userCache && userOnly) {
      usersCache.set(userId.toString(), userOnly)
    }

    return userOnly
  }

  static async updateCacheUserById(user: DBUser) {
    usersCache.set(converter(user.id, 'string'), user)
  }

  static async isAuthorized({ auth }: Request): Promise<DBUser | false> {
    const stauts = auth
      ? ((await this.getUserById(auth.userId)) ?? false)
      : false

    return stauts
  }

  static async compareUserIdsByAuth(req: Request, compareId: number) {
    const currentUser = await this.isAuthorized(req)

    if (currentUser && currentUser.id === compareId) {
      return true
    }

    return false
  }

  static async banUser(userId: number | string) {
    return this._ban(userId, false)
  }

  static async unbanUser(userId: number | string) {
    return this._ban(userId, true)
  }

  private static async _ban(userId: number | string, isActive: boolean) {
    return await db.user.update(converter(userId, 'number'), {
      isActive: isActive,
    })
  }
}
