import { Button } from "./ui/button";
import { DatePicker } from "./ui/datePicker";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useState } from "react";
import { UserUpdateZodSchema } from "@effective-mobile-tt/shared";
import { updateUser } from "~/api/updateUser";
import type { UserResponse } from "~/api/login";
import { Form } from "react-router";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { Spinner } from "./spinner";
import { toast } from "sonner";

export type FormErrors = Record<string, string[]> | string | null

export type FormField = {
  title: string
  name: string
  type: 'email' | 'text' | 'password' | 'date'
  required?: boolean
}

const fields: FormField[] = [
  { title: 'Фамилия', name: 'lastName', type: 'text', required: true },
  { title: 'Имя', name: 'firstName', type: 'text', required: true },
  { title: 'Отчество', name: 'middleName', type: 'text' },
  { title: 'Дата рождения', name: 'birthDate', type: 'date', required: true },
  { title: 'Эл. почта', name: 'email', type: 'email', required: true },
  // { title: 'Пароль', name: 'password', type: 'password' },
]

type EditSheetProps = {
  children: React.ReactNode
  user: UserResponse
  setUser: StateAction<UserResponse>
}
export function EditUserSheet({
  children,
  user,
  setUser,
}: EditSheetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [errors, setErrors] = useState<FormErrors>(null)
  const [loading, setLoading] = useState(false)

  const getError = (key: string) => {
    if (errors && typeof errors !== 'string') {
      return errors[key] || []
    }
    return []
  }

  const updateHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setErrors(null)
      setLoading(true)
      e.preventDefault()

      const formData = new FormData(e.currentTarget)
      const credentialsValidationResult = UserUpdateZodSchema.safeParse(
        Object.fromEntries(formData.entries()),
      )

      if (!credentialsValidationResult.success) {
        const errors = credentialsValidationResult.error.flatten().fieldErrors
        setErrors(errors)
        return
      }

      const res = await updateUser(user.id, credentialsValidationResult.data)

      if ('error' in res) {
        setErrors(res.error)
        return
      }

      setUser({
        ...user,
        ...res
      })

      toast.success('Пользователь обновлен')
      setIsOpen(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        {children}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Редактирование пользователя</SheetTitle>
          <SheetDescription>Это действие необратимо</SheetDescription>
        </SheetHeader>

        {
          errors && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>Ошибка обновления данных</AlertTitle>
              <AlertDescription>
                <p>{typeof errors === 'string' ? errors : 'Исправьте ошибки ввода:'}</p>
                {
                  typeof errors !== 'string' && (
                    <ul className="list-inside list-disc text-sm">
                      { Object.keys(errors).map((key, i) => (
                        <li key={i}>{errors[key]}</li>
                      )) }
                      { Object.keys(errors).length === 0 && <li>Ошибка сервера</li> }
                    </ul>
                  )
                }
              </AlertDescription>
            </Alert>
          )
        }

        <Form id="updateForm" onSubmit={updateHandler}>
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            {fields.map((field, key) => (
              <div key={key} className='grid gap-3'>
                <Label htmlFor={field.name}>
                  {field.title}
                  {field.required && <span className="text-red-500">*</span>}
                </Label>
                {field.type === 'date' ? (
                  <DatePicker
                    id={field.name}
                    name={field.name}
                    defaultValue={(user as unknown as { [key: string]: string | number })[field.name] ?? ""}
                    required />
                ) : (
                  <Input
                    id={field.name}
                    name={field.name}
                    defaultValue={(user as unknown as { [key: string]: string | number })[field.name] ?? ""}
                    type={field.type}
                    placeholder={field.title}
                    required={field.required}
                  />
                )}
                {getError(field.name).map((err, key) => (
                  <p key={key} className='text-sm text-red-500'>
                    {err}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </Form>
        <SheetFooter>
          <Button type="submit" form="updateForm">
            {
              loading
                ? <Spinner  />
                : 'Сохранить изменения'
            }
          </Button>
          <SheetClose asChild>
            <Button variant="outline">Отмена</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}