import { z } from 'zod'

export const UserLoginZodSchema = z.object({
  email: z.email('Некорректный email'),
  password: z
    .string()
    .min(8, 'Пароль должен быть не менее 8 символов')
    .max(256, 'Пароль должен быть не более 256 символов'),
})

export const UserRegistrationZodSchema = z.object({
  firstName: z.string().min(1).max(128),
  lastName: z.string().min(1).max(128),
  middleName: z.string().min(1).max(128),

  birthDate: z.coerce.date(),
  email: z.email(),
  password: z
    .string()
    .min(8, 'Пароль должен быть не менее 8 символов')
    .max(256, 'Пароль должен быть не более 256 символов')
    .regex(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
    .regex(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру'),
})

export const UserUpdateZodSchema = z.object({
  firstName: z.optional(z.string().min(1).max(128)),
  lastName: z.optional(z.string().min(1).max(128)),
  middleName: z.optional(z.string().min(1).max(128)),

  birthDate: z.optional(z.date()),
  email: z.optional(z.email()),
  password: z.optional(z.string().min(8).max(256)),
})

export const UserChangeRoleZodSchema = z.object({
  role: z.enum(['user', 'admin']),
})
export const UserChangeStatusZodSchema = z.object({
  isActive: z.boolean(),
})

export type UserLoginZod = z.infer<typeof UserLoginZodSchema>
export type UserRegistrationZod = z.infer<typeof UserRegistrationZodSchema>
export type UserUpdateZod = z.infer<typeof UserUpdateZodSchema>
export type UserChangeRoleZod = z.infer<typeof UserChangeRoleZodSchema>
export type USerChangeStatusZod = z.infer<typeof UserChangeStatusZodSchema>
