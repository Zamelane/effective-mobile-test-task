import { asc, getTableColumns } from 'drizzle-orm'
import { UserRepository } from '.'
import { users } from '../../models'

export async function list(
  this: UserRepository,
  page: number = 1,
  pageSize: number = 8,
) {
  const { password, email, ...nonPwCols } = getTableColumns(users)
  const usersList = await this.db
    .select(nonPwCols)
    .from(users)
    .orderBy(asc(users.id))
    .offset((page - 1) * pageSize)
    .limit(pageSize)

  return usersList
}
