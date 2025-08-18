import { CardAction, CardDescription, CardTitle } from '~/components/ui/card'
import type { Route } from './+types/_root.registration'
import { Button } from '~/components/ui/button'
import { useNavigate } from 'react-router'
import { useAuth } from '~/context'
import { useState, type FormEvent } from 'react'
import { UserRegistrationZodSchema } from '@effective-mobile-tt/shared'
import { AuthForm, type FormErrors, type FormField } from '~/components/form'
import { registartion } from '~/api/registration'

const fields: FormField[] = [
  { title: 'Фамилия', name: 'firstName', type: 'text' },
  { title: 'Имя', name: 'lastName', type: 'text' },
  { title: 'Отчество', name: 'middleName', type: 'text' },
  { title: 'Дата рождения', name: 'birthDate', type: 'date' },
  { title: 'Эл. почта', name: 'email', type: 'email' },
  { title: 'Пароль', name: 'password', type: 'password' },
]

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Registration' },
    { name: 'description', content: 'Login page' },
  ]
}

export default function RegistrationPage() {
  return (
    <div className='flex justify-center items-center h-screen w-full'>
      <FormComponent />
    </div>
  )
}

function FormComponent() {
  const { setUser, setIsActual } = useAuth()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>(null)

  const handleRegistration = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors(null)

    try {
      const formData = new FormData(e.currentTarget)
      const credentialsValidationResult = UserRegistrationZodSchema.safeParse(
        Object.fromEntries(formData.entries()),
      )

      if (!credentialsValidationResult.success) {
        const errors = credentialsValidationResult.error.flatten().fieldErrors
        setErrors(errors)
        return
      }

      const result = await registartion(
        credentialsValidationResult.data,
        setUser,
        setIsActual,
      )

      if ('id' in result) {
        navigate('/app/user/' + result.id)
        return
      }

      if ('error' in result) {
        let error = result.error

        if (typeof error === 'string' && error.includes('UNAUTHORIZED')) {
          error = 'Неверный логин или пароль'
        }
        setErrors(error)
        return
      }

      setErrors(
        'Почему-то сервер вернул такой ответ, который клиент обработать не может :(',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthForm
      fields={fields}
      errors={errors}
      isLoading={isLoading}
      handle={handleRegistration}
      loadingActionText='Регистрирую...'
      actionText='Зарегистрироваться'
    >
      <CardTitle>Создайте свой аккаунт</CardTitle>
      <CardDescription>Заполните поля ниже</CardDescription>
      <CardAction>
        <Button variant='link' onClick={() => navigate('/')}>
          Войти
        </Button>
      </CardAction>
    </AuthForm>
  )
}
