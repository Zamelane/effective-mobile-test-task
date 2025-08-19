export const lastNames: string[] = [
  'Иванов',
  'Петров',
  'Сидоров',
  'Кузнецов',
  'Попов',
  'Волков',
  'Андреев',
  'Васильев',
  'Морозов',
  'Новиков',
  'Федоров',
  'Михайлов',
  'Соколов',
  'Александров',
  'Павлов',
  'Семенов',
  'Макаров',
  'Николаев',
  'Орлов',
  'Иванов'
];

export const firstNames: string[] = [
  'Александр',
  'Мария',
  'Дмитрий',
  'Анна',
  'Сергей',
  'Елена',
  'Иван',
  'Ольга',
  'Андрей',
  'Татьяна',
  'Никита',
  'Екатерина',
  'Михаил',
  'Юлия',
  'Павел',
  'Анастасия',
  'Роман',
  'Виктория',
  'Георгий',
  'Дарья'
];

export const middleNames: string[] = [
  'Александрович',
  'Михайловна',
  'Дмитриевич',
  'Сергеевна',
  'Иванович',
  'Петровна',
  'Владимирович',
  'Анатольевна',
  'Сергеевна',
  'Алексеевна',
  'Николаевич',
  'Ивановна',
  'Михайлович',
  'Павловна',
  'Викторович',
  'Андреевна',
  'Сергеевич',
  'Михайловна',
  'Иванович',
  'Дмитриевна'
];

// Функция для генерации случайного email
export function generateRandomEmail(): string {
  const firstNames = ['anna', 'alex', 'mike', 'john', 'jane', 'peter', 'maria', 'david', 'sarah', 'oliver'];
  const lastNames = ['smith', 'johnson', 'williams', 'brown', 'jones', 'garcia', 'miller', 'wilson', 'moore', 'taylor'];
  const domains = ['gmail.com', 'yahoo.com', 'mail.ru', 'outlook.com', 'hotmail.com'];

  const randomFirstNameIndex = Math.floor(Math.random() * firstNames.length);
  const randomLastNameIndex = Math.floor(Math.random() * lastNames.length);
  const randomDomainIndex = Math.floor(Math.random() * domains.length);
  const randomNumber = Math.floor(Math.random() * 1000);

  const emailParts = [
    firstNames[randomFirstNameIndex],
    lastNames[randomLastNameIndex],
    randomNumber.toString()
  ];

  return emailParts.join('.') + '@' + domains[randomDomainIndex];
}

// Функция для генерации случайной даты рождения
export function generateRandomBirthDate(): Date {
    const startYear = 1950;
    const endYear = 2005;
    
    const year = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * (
        // Определяем максимальное число дней в месяце
        month === 2 ? (year % 4 === 0 ? 29 : 28) :
        [4, 6, 9, 11].includes(month) ? 30 : 31
    )) + 1;
    
    return new Date(`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`);
}