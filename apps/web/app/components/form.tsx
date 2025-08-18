import { Form } from 'react-router'
import { Button } from './ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Label } from './ui/label'
import { DatePicker } from './ui/datePicker'
import { Input } from './ui/input'

export type FormErrors = Record<string, string[]> | string | null

export type FormField = {
  title: string
  name: string
  type: 'email' | 'text' | 'password' | 'date'
}

export type AuthFormProps = {
  fields: Array<FormField>
  children: React.ReactNode
  errors: FormErrors
  handle: React.FormEventHandler<HTMLFormElement> | undefined
  isLoading?: boolean
  actionText: string
  loadingActionText?: string
}

export function AuthForm({
  children,
  fields,
  errors,
  handle,
  isLoading,
  loadingActionText,
  actionText,
}: AuthFormProps) {
  const getError = (key: string) => {
    if (errors && typeof errors !== 'string') {
      return errors[key] || []
    }
    return []
  }

  return (
    <Card className='w-full max-w-sm'>
      {children && <CardHeader>{children}</CardHeader>}
      <CardContent>
        {typeof errors === 'string' && (
          <p className='text-sm text-red-500 pb-3'>{errors}</p>
        )}
        <Form method='post' onSubmit={handle} className='flex flex-col gap-4'>
          <div className='flex flex-col gap-6'>
            {fields.map((field, key) => (
              <div key={key} className='grid gap-2'>
                <Label htmlFor={field.name}>{field.title}</Label>
                {field.type === 'date' ? (
                  <DatePicker id={field.name} name={field.name} required />
                ) : (
                  <Input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    placeholder={field.title}
                    required
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
          <Button type='submit' className='w-full' disabled={isLoading}>
            {isLoading ? loadingActionText : actionText}
          </Button>
        </Form>
      </CardContent>
    </Card>
  )
}
