import { DBUser } from "@effective-mobile-tt/db/src/models";
import NodeCache from "node-cache";

class CacheService<T> {
  private cache = new NodeCache({
    stdTTL: 5,
    checkperiod: 120
  });

  constructor() {}

  get(key: string | number): T | undefined {
    return this.cache.get<T>(key);
  }

  set(key: string, value: T) {
    this.cache.set(key, value);
  }

  delete(key: string) {
    this.cache.del(key);
  }

  clear() {
    this.cache.del(this.cache.keys())
  }
}

export const usersCache = new CacheService<DBUser>()