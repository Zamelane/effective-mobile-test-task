import { db as dbInstance } from "./database";
import { DBContainer } from "./di";

export const db = new DBContainer(() => dbInstance.db)
export { dbInstance }