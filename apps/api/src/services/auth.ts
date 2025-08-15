import { db } from "@effective-mobile-tt/db/src"
import { PasswordService } from "./password"
import { UnauthorizedError } from "@effective-mobile-tt/shared/src"
import { env } from "../config/env"
import jwt from "jsonwebtoken"
import { usersCache } from "./cache"

import { Request } from "express"

export class AuthService {
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

    const isPasswordValid = await PasswordService.compare(
      password,
      user.password
    )

    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid credentials')
    }

    const token = jwt.sign(
      { userId: user.id.toString() },
      env.API_JWT_SECRET,
      { expiresIn: '11d' }
    )

    return {
      token,
      user
    }
  }

  /**
   * Проверяет, является ли пользователь администратором (с кешированием)
   * @param userId 
   * @returns 
   */
  static async checkIsAdmin(userId: number) {
    const userOnly = await this.getUserById(userId.toString())

    if (!userOnly) {
      return false
    }

    return userOnly.role === 'admin'
  }

  static async getUserById(userId: string) {
    const userCache = usersCache.get(userId.toString())
    const userOnly = userCache ? userCache : await db.user.getById(Number.parseInt(userId))

    if (!userCache && userOnly) {
      usersCache.set(userId.toString(), userOnly)
    }

    return userOnly
  }

  static async compareUserIdsByAuth(
    { auth }: Request,
    compareId: number
  ) {
    if (!auth) {
      return false
    }

    const currentUser = await this.getUserById(auth.userId)

    if (currentUser && currentUser.id === compareId) {
      return true
    }

    return false
  }
}