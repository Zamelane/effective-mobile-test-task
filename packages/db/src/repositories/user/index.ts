import { DbType } from "../../database";
import { getById } from "./user.get";
import { insert } from "./user.insert";
import { list } from "./user.list";
import { update } from "./user.update";

export class UserRepository {
  constructor(protected db: DbType) {
    //this.db = db
  }

  getById = getById
  insert = insert
  update = update
  list = list
}