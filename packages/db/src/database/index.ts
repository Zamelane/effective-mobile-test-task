import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from '../models'
import { env } from '../config'

export type Tx = NodePgDatabase<typeof schema>
export type DbType = Tx & { $client: Pool }

export class DatabaseService {
  private readonly pool: Pool
  public db: DbType

  constructor(connectionString: string) {
    this.pool = new Pool({ connectionString })
    this.db = drizzle(this.pool, { schema })
  }

  public async connect() {
    try {
      await this.pool.connect()
      console.debug('Successfully connected to the database')
    } catch (e) {
      console.error(e, 'Error connecting to the database')
      throw e
    }
  }

  public async disconnect() {
    await this.pool.end()
    console.debug('Successfully disconnected from the database')
  }

  public async transaction<T>(callback: (tx: Tx) => Promise<T>): Promise<T> {
    return this.db.transaction(async (tx) => {
      try {
        return callback(tx)
      } catch (error) {
        tx.rollback()
        console.error(error, 'Transaction failed, rolling back')
        throw error
      }
    })
  }
}

export const db = new DatabaseService(
  `postgres://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`,
)
