import { dbInstance } from '@effective-mobile-tt/db/src/index'
import boxen from 'boxen'
import express from 'express'
import cors from 'cors'
import { checkAuthPlugin, jwtReader } from './middlewares/auth'
import { env } from './config/env'
import { errorHandler } from './middlewares/error'
import { notFoundHandler } from './middlewares/notFound'
import { apiRouter } from './routes'

const PORT = env.API_PORT

const app = express()

app
  .use(
    cors({
      origin: '*',
    }),
  )
  // Обработчики токена
  .use(jwtReader)
  .use(checkAuthPlugin)
  // Статика и api-роуты
  .use(express.static('../../web/build'))
  .use('/api', apiRouter)
  // Обработчики ошибок
  .use(notFoundHandler)
  .use(errorHandler)

async function main() {
  try {
    await dbInstance.connect()
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }

  app.listen(PORT, () => {
    console.log(
      boxen(`🚀 Server running at http://127.0.0.1:${PORT}`, {
        title: 'Server info',
        padding: 1,
        margin: { top: 2, bottom: 2 },
        borderColor: 'green',
      }),
    )
  })
}

main()
