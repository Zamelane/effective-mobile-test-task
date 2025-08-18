import { api } from "~/lib/fetcher";
import type { ErrorResponse } from "~/types";
import type { UserResponse } from "./login";

type GetUserResponse =
  | UserResponse
  | ErrorResponse

export async function getUser(userId: number): Promise<UserResponse | string> {
  try {
    const result = await api.get<GetUserResponse>(`users/${userId}`).json();

    if ('id' in result) {
      return result;
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