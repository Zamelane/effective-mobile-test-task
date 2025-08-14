import { UserRepository } from ".";
import { ConflictError, type UserRegistrationZod } from '@effective-mobile-tt/shared';
import { DBUser, users } from "../../models";

export async function insert(
  this: UserRepository,
  value: UserRegistrationZod
): Promise<DBUser> {
  const [user] = await this.db
    .insert(users)
    .values({
      ...value,
      role: 'user',
    })
    .returning()
    .catch((e) => {
      console.error('Error inserting user', e);
      return [null]
    })

  if (user) {
    return user
  }

  throw new ConflictError('User already exists');
}