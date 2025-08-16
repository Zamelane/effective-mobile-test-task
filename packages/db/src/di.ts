import { DbType } from './database'
import { UserRepository } from './repositories'

export class DBContainer {
  constructor(private readonly getDatabaseInstance: () => DbType) {}

  private get instance(): DbType {
    return this.getDatabaseInstance()
  }

  private _user?: UserRepository

  get user() {
    return (this._user ??= new UserRepository(this.instance))
  }
}
