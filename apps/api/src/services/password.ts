import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

export class PasswordService {
  /**
   * Хеширование пароля
   * @param password
   * @returns
   */
  static async hash(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS)
  }

  /**
   * Сравнение пароля с хешем
   * @param password
   * @param hash
   * @returns
   */
  static async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }
}
