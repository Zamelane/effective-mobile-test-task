import { eq } from "drizzle-orm";
import { UserRepository } from ".";
import { UserChangeRoleZod, UserUpdateZod, USerChangeStatusZod } from "@effective-mobile-tt/shared/src/index";
import { users } from "../../models";

export async function update(
  this: UserRepository,
  userId: number,
  value: Partial<UserUpdateZod & UserChangeRoleZod & USerChangeStatusZod>
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