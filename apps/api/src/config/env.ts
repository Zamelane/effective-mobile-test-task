import { z } from 'zod'
import dotenv from 'dotenv'
import boxen from 'boxen'

dotenv.config({ quiet: true })

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  API_PORT: z.coerce.number().int().positive().default(3000),
  API_JWT_SECRET: z.string().min(8),
})

const envParsed = envSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  API_PORT: process.env.API_PORT,
  API_JWT_SECRET: process.env.API_JWT_SECRET,
})

if (!envParsed.success) {
  const errors: string[] = []

  envParsed.error.issues.forEach((issue) => {
    errors.push(`- ${issue.path.join('.')}: ${issue.message}`)
  })

  console.error(
    boxen(errors.join('\n'), {
      title: '.env errors',
      padding: 1,
      margin: { top: 2, bottom: 2 },
      borderColor: 'red',
    }),
  )

  process.exit(1)
}

export const env = envParsed.data
