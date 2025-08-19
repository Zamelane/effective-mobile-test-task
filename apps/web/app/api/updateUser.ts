import { api } from '~/lib/fetcher'
import type { UserRegistrationZod } from '@effective-mobile-tt/shared'
import type { ErrorResponse, ValidationErrorResponse } from '~/types'
import type { DBUser } from '@effective-mobile-tt/db/src/models/user/user.types'
import type { UserUpdateZod } from '@effective-mobile-tt/shared/src/types/user/schema';

export type UpdateProps = UserUpdateZod

export type UserResponse = ExcludeField<DBUser, 'password'>

export type UpdateUserResponse =
  | UserResponse
  | ValidationErrorResponse<ExtractFieldNames<UserRegistrationZod>>
  | ErrorResponse

export async function updateUser(
  userId: number,
  newData: UpdateProps
): Promise<UserResponse | { error: string } | { error: Record<string, string[]> }> {
  try {
    const res = await api
      .post<UpdateUserResponse>('users/' + userId, { json: newData })
      .json()

    if ('id' in res) {
      return res
    }

    if ('error' in res) {
      if (res.error.details) {
        return {
          error: res.error.details.fieldErrors.fieldErrors,
        }
      }
      console.error(res)
      throw new Error(
        `Server response status: ${res.error.status} (${res.error.code})`,
      )
    }

    throw new Error('Invalid response')
  } catch (error) {
    console.log(error)
    return {
      error: `${error}`,
    }
  }
}
