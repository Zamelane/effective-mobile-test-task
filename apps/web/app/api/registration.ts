import { api } from "~/lib/fetcher";
import type { UserRegistrationZod } from "@effective-mobile-tt/shared";
import type { ErrorResponse, ValidationErrorResponse } from "~/types";
import type { DBUser } from '@effective-mobile-tt/db/src/models/user/user.types';
import { type User } from "~/context";

export type RegistrationProps = UserRegistrationZod

export type UserResponse = ExcludeField<DBUser, 'password'>

export type LoginResponse =
  | { userInfo: UserResponse, token: string }
  | ValidationErrorResponse<ExtractFieldNames<UserRegistrationZod>>
  | ErrorResponse

export async function registartion(
  credentials: RegistrationProps,
  setUser: (user: User) => void,
  setIsActual: (isActual: boolean) => void
): Promise<
  User
  | { error: string }
  | { error: Record<string, string[]> }
> {

  try {
    const authData = await api.post<LoginResponse>("registration", { json: credentials }).json()

    console.log(authData)

    if ('token' in authData) {
      const user = {
        ...authData.userInfo,
        token: authData.token
      }
      setUser(user)
      setIsActual(true)
      return user
    }

    if ('error' in authData) {
      if (authData.error.details) {
        return {
          error: authData.error.details.fieldErrors.fieldErrors
        }
      }
      console.error(authData)
      throw new Error(`Server response status: ${authData.error.status} (${authData.error.code})`)
    }

    throw new Error('Invalid response')
  } catch (error) {
    console.log(error)
    return {
      error: `${error}`
    }
  }
}