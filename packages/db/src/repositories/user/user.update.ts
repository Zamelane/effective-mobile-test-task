import { eq } from "drizzle-orm";
import { UserRepository } from ".";
import { UserChangeRoleZod, UserUpdateZod } from "@effective-mobile-tt/shared";
import { users } from "../../models";

export async function update(
  this: UserRepository,
  userId: number,
  value: UserUpdateZod & Partial<UserChangeRoleZod>
) {
  const [user] = await this.db
    .update(users)
    .set({
      ...value
    })
    .where(eq(users.id, userId))
    .returning()

  return user ?? null
}