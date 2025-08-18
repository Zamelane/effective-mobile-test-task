import { Button } from "~/components/ui/button";
import type { Route } from "./+types/_root._index";
import { CardAction, CardDescription, CardTitle } from "~/components/ui/card";
import { useNavigate } from "react-router";
import { useState, type FormEvent } from "react";
import { login } from "~/api/login";
import { UserLoginZodSchema } from "@effective-mobile-tt/shared";
import { useAuth } from "~/context";
import { AuthForm, type FormField } from "~/components/form";

const fields: FormField[] = [
  { title: 'Email', name: 'email', type: 'email' },
  { title: 'Пароль', name: 'password', type: 'password' },
]

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "description", content: "Login page" }
  ]
}

export default function Page({ }: Route.ComponentProps) {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <FormComponent />
    </div>
  )
}

function FormComponent() {
  const { setUser, setIsActual } = useAuth()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<
    | Record<string, string[]>
    | string
    | null
  >(null)

  const getError = (key: string) => {
    if (errors && typeof errors !== 'string') {
      return errors[key] || []
    }
    return []
  }

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors(null)

    try {
      const formData = new FormData(e.currentTarget)
      const credentialsValidationResult = UserLoginZodSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
      })

      if (!credentialsValidationResult.success) {
        const errors = credentialsValidationResult.error.flatten().fieldErrors
        setErrors(errors)
        return
      }

      const result = await login(
        credentialsValidationResult.data,
        setUser,
        setIsActual
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

      setErrors('Почему-то сервер вернул такой ответ, который клиент обработать не может :(')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthForm
      fields={fields}
      errors={errors}
      isLoading={isLoading}
      handle={handleLogin}
      loadingActionText="Вход..."
      actionText="Войти"
    >
      <CardTitle>Войдите в свой аккаунт</CardTitle>
      <CardDescription>
        Заполните поля ниже
      </CardDescription>
      <CardAction>
        <Button
          variant="link"
          onClick={() => navigate('/registration')}
        >
          Создать новый
        </Button>
      </CardAction>
    </AuthForm>
  )
}