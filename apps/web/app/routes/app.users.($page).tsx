import { z } from 'zod'
import type { Route } from './+types/app.users.($page)'
import { getUserList } from '~/api/getUserList'
import { Card, CardContent } from '~/components/ui/card'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'
import { useState } from 'react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Folder,
  FolderOpen,
} from 'lucide-react'
import { useNavigate } from 'react-router'

const loaderArgsZodSchema = z.coerce
  .number('Ожидалось число в номере страницы')
  .positive('Ожидалось положительное число в номере страницы')
  .min(1, 'Ожидалось число в номере страницы, которое больше 0')
  .default(1)

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const validationResult = loaderArgsZodSchema.safeParse(params.page)

  if (!validationResult.success) {
    return validationResult.error.message
  }

  const res = await getUserList(validationResult.data)

  return res
}

export function meta({ loaderData }: Route.MetaArgs) {
  return [
    {
      title:
        typeof loaderData !== 'string'
          ? `Просмотр страницы №${loaderData.page}`
          : 'Страница просмотра списка пользователей',
    },
    { name: 'description', content: 'Страница списка пользователей' },
  ]
}

export default function Component({
  params,
  loaderData,
}: Route.ComponentProps) {
  const navigate = useNavigate()

  if (typeof loaderData === 'string') {
    return (
      <div className='flex flex-col gap-2'>
        <p>Ошибка:</p>
        {loaderData}
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-2'>
      <Card className='w-full flex flex-col items-center gap-2'>
        <CardContent className='w-full'>
          <Table>
            <TableCaption>
              <p>Список пользователей (страница №{loaderData.page ?? 1})</p>
              <p>
                Оффсет: {loaderData.pageSize}, получено {loaderData.data.length}{' '}
                эл.
              </p>
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className='w-20'>Id</TableHead>
                <TableHead>Фамилия</TableHead>
                <TableHead>Имя</TableHead>
                <TableHead>Отчество</TableHead>
                <TableHead>Роль</TableHead>
                <TableHead className='w-5'>Действие</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loaderData.data.map((user) => {
                return (
                  <TableRow className={cn(!user.isActive && 'text-red-400')}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.middleName}</TableCell>
                    <TableCell
                      className={cn(user.role === 'admin' && 'text-indigo-500')}
                    >
                      {user.role === 'admin' ? 'Админ' : 'Пользователь'}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant='outline'
                        className='cursor-pointer w-full group'
                        onClick={() => navigate('/app/user/' + user.id)}
                      >
                        <Folder className='group-hover:hidden' />
                        <FolderOpen className='hidden group-hover:block' />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>

          <div className='flex justify-end gap-2 items-center'>
            <Button
              size='sm'
              variant='outline'
              disabled={loaderData.page <= 1}
              onClick={() => navigate('/app/users/' + (loaderData.page - 1))}
            >
              <ChevronLeftIcon /> Предыдущая
            </Button>
            <Button
              size='sm'
              variant='outline'
              disabled={loaderData.data.length < loaderData.pageSize}
              onClick={() => navigate('/app/users/' + (loaderData.page + 1))}
            >
              Следующая <ChevronRightIcon />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
