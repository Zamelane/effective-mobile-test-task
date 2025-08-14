import { eq } from "drizzle-orm";
import { UserRepository } from ".";
import { users } from "../../models";

export async function getById(
  this: UserRepository,
  id: number
) {
  const result = await this.db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .limit(1)

  return result[0] ?? null
}