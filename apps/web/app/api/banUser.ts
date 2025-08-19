import { api } from '~/lib/fetcher'
import type { ErrorResponse } from '~/types'
import type { UserResponse } from './login'

type GetUserResponse = UserResponse | ErrorResponse

export async function banUser(
  userId: number,
  _newStatus: boolean = false,
): Promise<UserResponse | string> {
  try {
    const result = await api
      .post<GetUserResponse>(
        `users/${userId}/` + (_newStatus ? 'unban' : 'ban'),
      )
      .json()

    if ('id' in result) {
      return result
    }

    if ('error' in result) {
      throw new Error(result.error.message)
    }

    console.error(result)
    throw new Error('Неопознанная ошибка (см. логи)')
  } catch (error) {
    return `${error}`
  }
}

export async function unbanUser(userId: number) {
  return banUser(userId, true)
}
