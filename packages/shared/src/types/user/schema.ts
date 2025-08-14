import { z } from 'zod';

export const UserRegistrationZodSchema = z.object({
  firstName: z.string().min(1).max(128),
  lastName: z.string().min(1).max(128),
  middleName: z.string().min(1).max(128),

  birthDate: z.date(),
  email: z.email(),
  password: z.string().min(8).max(256)
})

export const UserUpdateZodSchema = z.object({
  firstName: z.optional(z.string().min(1).max(128)),
  lastName: z.optional(z.string().min(1).max(128)),
  middleName: z.optional(z.string().min(1).max(128)),

  birthDate: z.optional(z.date()),
  email: z.optional(z.email()),
  password: z.optional(z.string().min(8).max(256))
})

export const UserChangeRoleZodSchema = z.object({
  role: z.enum(['user', 'admin'])
})

export type UserRegistrationZod = z.infer<typeof UserRegistrationZodSchema>
export type UserUpdateZod = z.infer<typeof UserUpdateZodSchema>
export type UserChangeRoleZod = z.infer<typeof UserChangeRoleZodSchema>