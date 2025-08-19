import { eq } from 'drizzle-orm'
import { UserRepository } from '.'
import { users } from '../../models'

export async function checkEmail(this: UserRepository, email: string) {
  const result = await this.db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1)

  return result[0] ? result[0].id : false
}
