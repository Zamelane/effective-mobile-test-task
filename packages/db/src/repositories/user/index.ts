import { DbType } from '../../database'
import { getById } from './user.get'
import { insert } from './user.insert'
import { list } from './user.list'
import { update } from './user.update'
import { findByCredentials } from './user.find'
import { checkEmail } from './user.checkEmail'

export class UserRepository {
  constructor(protected db: DbType) {
    //this.db = db
  }

  find = findByCredentials
  getById = getById
  insert = insert
  update = update
  list = list
  checkEmail = checkEmail
}
