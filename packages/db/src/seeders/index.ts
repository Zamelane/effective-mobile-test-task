import { dbInstance } from ".."
import { UserRepository } from "../repositories"
import { firstNames, generateRandomBirthDate, generateRandomEmail, lastNames, middleNames } from "./data"
import { PasswordService } from '@effective-mobile-tt/api/src/services/password';
import { capitalizeFirstLetter } from "./utils";

const USERS_COUNT = 100

async function main() {
  try {
    await dbInstance.connect()
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }

  const ur = new UserRepository(dbInstance.db)

  await ur.insert({
    firstName: 'Admin',
    lastName: 'Adminovich',
    email: 'admin@admin.com',
    role: 'admin',
    birthDate: new Date('10-10-2010'),
    password: await PasswordService.hash('admin!'),
  }).catch(() => {
    console.log('Админ уже есть, скипаю...\n')
  })

  console.log('Админка:')
  console.log(' - login: admin@admin.com')
  console.log(' - password: admin!')

  console.log('\n\nПрогресс сидинга: ')

  for (let i = 0; i < USERS_COUNT; i++) {
    try {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]!
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]!
      const middleName = middleNames[Math.floor(Math.random() * middleNames.length)]!
      await ur.insert({
        firstName,
        lastName,
        middleName,
        email: generateRandomEmail(),
        birthDate: generateRandomBirthDate(),
        password: await PasswordService.hash(capitalizeFirstLetter(lastName) + capitalizeFirstLetter(firstName) + '!')
      })
      process.stdout.write('.')
    } catch (error) {
      console.error(`\nОшибка вставки пользователя ${i + 1}:`, error)
      break
    }
  }

  console.log('\nУспешно вставлены', USERS_COUNT, 'пользователей')
  process.exit(0)
}

main()