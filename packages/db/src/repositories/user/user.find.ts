import { eq } from "drizzle-orm";
import { UserRepository } from ".";
import { users } from "../../models";

export async function findByCredentials(
  this: UserRepository,
  email: string
) {
  const result = await this.db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)

  return result[0] ?? null
}