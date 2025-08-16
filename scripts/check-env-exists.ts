import { copyFileSync, existsSync } from 'node:fs'

const envPath = '.env'
const envExamplePath = '.env.example'

const syncPaths = ['apps/web/.env', 'apps/api/.env', 'packages/db/.env']

if (!existsSync(envPath)) {
  console.log('⚡ .env not found, copying from .env.example...')
  copyFileSync(envExamplePath, envPath)
  console.log('✅ .env created successfully!')
} else {
  console.log('🔹 .env already exists, skipping copy.')
}

for (const path of syncPaths) {
  copyFileSync(envPath, path)
}
