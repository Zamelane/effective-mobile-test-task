import { getUser } from '~/api/getUser'
import type { Route } from './+types/app.user.$id._index'
import z from 'zod'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Card, CardContent } from '~/components/ui/card'
import { Label } from '~/components/ui/label'
import {
  ALargeSmallIcon,
  CakeIcon,
  ClipboardCopyIcon,
  ClockFadingIcon,
  ClockPlusIcon,
  ConstructionIcon,
  CrownIcon,
  FingerprintIcon,
  FlagIcon,
  HandHeartIcon,
  MailIcon,
  SquarePenIcon,
  type LucideIcon,
} from 'lucide-react'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~/components/ui/tooltip'
import { cn, compareObjects } from '~/lib/utils'
import { useAuth } from '~/context'
import { useEffect, useState } from 'react'
import { banUser, unbanUser } from '~/api/banUser'
import { useNavigate } from 'react-router'
import { EditUserSheet } from '~/components/editUserSheet'
import { toast } from 'sonner'

const loaderArgsZodSchema = z.coerce
  .number('Ожидалось число в id пользователя')
  .positive('Ожидалось положительное число в id пользователя')
  .min(1, 'Ожидалось число в id пользователя, которое больше 0')

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const validationResult = loaderArgsZodSchema.safeParse(params.id)

  if (!validationResult.success) {
    return validationResult.error.message
  }

  const res = await getUser(validationResult.data)

  return res
}

export function meta({ loaderData }: Route.MetaArgs) {
  return [
    {
      title:
        typeof loaderData !== 'string'
          ? `Просмотр пользователя "${loaderData.lastName} ${loaderData.firstName[0]}.${loaderData.middleName?.[0]}."`
          : 'Страница просмотра пользователя',
    },
    {
      name: 'description',
      content:
        'Детальная информация о пользователе' +
        (typeof loaderData === 'string'
          ? ''
          : `${loaderData.lastName} ${loaderData.firstName[0]}.${loaderData.middleName?.[0]}.`),
    },
  ]
}

export default function Component({
  params,
  loaderData,
}: Route.ComponentProps) {
  if (typeof loaderData === 'string') {
    return (
      <div className='flex flex-col gap-2'>
        <p>Ошибка:</p>
        {loaderData}
      </div>
    )
  }

  const { user, setUser } = useAuth()
  const [viewUser, setViewUser] = useState(loaderData)

  useEffect(() => {
    if (viewUser.id !== loaderData.id) {
      setViewUser(loaderData)
    }
    if (user && user.id === viewUser.id) {
      setUser({
        ...user,
        ...loaderData,
      })
    }
  }, [loaderData])

  const userInfo: Array<{
    icon: LucideIcon
    text: string | undefined | null
    color?: string
  }> = [
      { icon: FingerprintIcon, text: viewUser.id.toString() },
      {
        icon: ALargeSmallIcon,
        text: [viewUser.lastName, viewUser.firstName, viewUser.middleName].join(
          ' ',
        ),
      },
      { icon: MailIcon, text: viewUser.email },
      { icon: CakeIcon, text: viewUser.birthDate.toString().split('T')[0] },
      {
        icon: CrownIcon,
        text: viewUser.role === 'admin' ? 'Администратор' : 'Пользователь',
        color: viewUser.role === 'admin' ? 'text-indigo-600' : '',
      },
      {
        icon: ConstructionIcon,
        text: viewUser.isActive ? 'Не забанен' : 'Забанен',
        color: viewUser.isActive ? 'text-green-500' : 'text-red-500',
      },
      {
        icon: ClockPlusIcon,
        text: viewUser.createdAt.toString().split('T')[0],
      },
      {
        icon: ClockFadingIcon,
        text: viewUser.updatedAt.toString().split('T')[0],
      },
    ]

  // Блокировка (бан/разбран)
  const navigate = useNavigate()
  const [isBanLoading, setIsBanLoading] = useState(false)

  const banUserHandler = async () => {
    try {
      setIsBanLoading(true)

      const res = viewUser.isActive
        ? await banUser(viewUser.id)
        : await unbanUser(viewUser.id)

      if (typeof res === 'string') {
        // TODO: toast с ошибкой
        return
      }

      // Если взаимодействие было с авторизированным пользователем...
      if (user && user.id === res.id) {
        // TODO: перенести в общею логику запросов к api
        // Если забанили себя...
        if (!res.isActive) {
          // то выходим из системы
          navigate('/logout')
        }
        // Обновляем локальное хранилище
        setUser({
          ...user,
          ...res,
        })
      }

      // Обновляем данные на странице
      setViewUser(res)
        ; (res.isActive ? toast.success : toast.error)(
          'Пользователь ' + (res.isActive ? 'разбанен' : 'забанен'),
          {
            icon: res.isActive ? <HandHeartIcon /> : <FlagIcon />,
            description: `${res.lastName} ${res.firstName[0]}.${res.middleName?.[0]}.`,
            className: cn(
              res.isActive
                ? 'bg-gradient-to-l from-stone-100 via-teal-100 to-green-200'
                : 'bg-gradient-to-l from-stone-100 via-rose-100 to-red-200',
            ),
          },
        )
    } finally {
      setIsBanLoading(false)
    }
  }

  // Итоговый рендер
  return (
    <div className='flex flex-col gap-2'>
      <Card className='w-full flex flex-col items-center gap-2'>
        <Avatar className='size-36'>
          <AvatarImage src='https://github.com/shadcn.png' alt='Avatar' />
          <AvatarFallback className='text-5xl'>
            {(
              (viewUser.firstName[0] ?? '?') + (viewUser.lastName[0] ?? '??')
            ).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <Label className='text-2xl text-center'>
          {viewUser.lastName} {viewUser.firstName} {viewUser.middleName}
        </Label>
      </Card>

      <Card>
        <CardContent className='flex flex-col gap-2'>
          {userInfo.map((item, index) => (
            <div key={index} className='inline-flex items-center gap-4'>
              <item.icon className={cn('min-w-6 min-h-6', item.color)} />
              <Input className={item.color} value={item.text || ''} disabled />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className={item.color}
                    size='icon'
                    onClick={() => {
                      if (item.text) {
                        navigator.clipboard.writeText(item.text)
                        toast.success('Текст скопирован!', {
                          description: item.text,
                          icon: <item.icon />,
                        })
                      }
                    }}
                  >
                    <ClipboardCopyIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side='left' className={item.color}>
                  <p>Скопировать</p>
                </TooltipContent>
              </Tooltip>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardContent className='flex justify-center items-center gap-4'>
          <EditUserSheet user={viewUser} setUser={setViewUser}>
            <Button className='bg-gradient-to-r from-stone-100 via-teal-100 to-green-200'>
              <SquarePenIcon />
              Редактировать
            </Button>
          </EditUserSheet>
          <Button
            className={cn(
              viewUser.isActive
                ? 'bg-gradient-to-l from-stone-100 via-rose-100 to-red-200'
                : 'bg-gradient-to-l from-stone-100 via-teal-100 to-green-200',
            )}
            onClick={banUserHandler}
          >
            {viewUser.isActive ? (
              <>
                <FlagIcon />
                {isBanLoading ? 'Баню...' : 'Забанить'}
              </>
            ) : (
              <>
                <HandHeartIcon />
                {isBanLoading ? 'Разбаниваю...' : 'Разбанить'}
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
