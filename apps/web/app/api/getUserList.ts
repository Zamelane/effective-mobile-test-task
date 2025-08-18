import { api } from '~/lib/fetcher'
import type { ErrorResponse } from '~/types'
import type { UserResponse } from './login'

type Response = {
  data: UserResponse[]
  page: number
  pageSize: number
}

type GetUserResponse = Response | ErrorResponse

export async function getUserList(page: number): Promise<Response | string> {
  try {
    const result = await api.get<GetUserResponse>(`usersList/${page}`).json()

    if ('data' in result) {
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
