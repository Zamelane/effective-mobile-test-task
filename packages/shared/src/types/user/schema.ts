import { z } from 'zod';

export const UserRegistrationZodSchema = z.object({
  firstName: z.string().min(1).max(128),
  lastName: z.string().min(1).max(128),
  middleName: z.string().min(1).max(128),

  birthDate: z.date(),
  email: z.email(),
  password: z.string().min(8).max(256)
})

export type UserRegistrationZod = z.infer<typeof UserRegistrationZodSchema>