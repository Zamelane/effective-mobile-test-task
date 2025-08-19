import { dbInstance } from '@effective-mobile-tt/db/src/index'
import boxen from 'boxen'
import express from 'express'
import cors from 'cors'
import { jwtReader } from './middlewares/auth'
import { env } from './config/env'
import { errorHandler } from './middlewares/error'
import { apiRouter } from './routes'
import path from 'path'

const PORT = env.API_PORT

const app = express()

app
  .use(
    cors({
      origin: '*',
    }),
  )
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  // Обработчик токена
  .use(jwtReader)
  // Статика и api-роуты
  .use('/api', apiRouter)
  .use(express.static('../web/build/client'))
  .get(/\/(.*)/, (req, res) => {
    res.sendFile(path.join(process.cwd(), '../web/build/client/index.html'))
  })
  // Обработчик ошибок
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
