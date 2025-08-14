import { DbType } from "../../database";
import { getById } from "./user.get";
import { insert } from "./user.insert";

export class UserRepository {
  constructor(protected db: DbType) {
    //this.db = db
  }

  getById = getById
  insert = insert
}