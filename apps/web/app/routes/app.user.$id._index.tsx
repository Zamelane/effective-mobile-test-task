import { getUser } from "~/api/getUser";
import type { Route } from "./+types/app.user.$id._index";
import z from 'zod';
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { CakeIcon, ClipboardCopyIcon, ClockFadingIcon, ClockPlusIcon, ConstructionIcon, CrownIcon, FingerprintIcon, MailIcon, type LucideIcon } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import { cn, compareObjects } from "~/lib/utils";
import { useAuth } from "~/context";

const loaderArgsZodSchema = z.coerce.number('Ожидалось число в id пользователя')
  .positive('Ожидалось положительное число в id пользователя')
  .min(1, 'Ожидалось число в id пользователя, которое больше 0')

export async function clientLoader({
  params
}: Route.ClientLoaderArgs) {
  const validationResult = loaderArgsZodSchema.safeParse(params.id)

  if (!validationResult.success) {
    return validationResult.error.message
  }

  const res = await getUser(validationResult.data)

  return res
}

export default function Component({
  params,
  loaderData
}: Route.ComponentProps) {
  if (typeof loaderData === 'string') {
    return (
      <div className="flex flex-col gap-2">
        <p>Ошибка:</p>
        {loaderData}
      </div>
    )
  }

  const { user, setUser } = useAuth()

  if (user && user.id === loaderData.id) {
    const { token, ...compare } = user
    if (!compareObjects(compare, loaderData)) {
      setUser({
        ...user,
        ...loaderData
      })
      console.log("Пользователь обновлён в локальном хранилище")
    }
  }

  const userInfo: Array<{
    icon: LucideIcon
    text: string | undefined | null
    color?: string
  }> = [
      { icon: FingerprintIcon, text: loaderData.id.toString() },
      { icon: MailIcon, text: loaderData.email },
      { icon: CakeIcon, text: loaderData.birthDate.toString().split('T')[0] },
      { icon: CrownIcon, text: loaderData.role === 'admin' ? 'Администратор' : 'Пользователь', color: loaderData.role === 'admin' ? 'text-indigo-600' : '' },
      { icon: ConstructionIcon, text: loaderData.isActive ? 'Не забанен' : 'Забанен', color: loaderData.isActive ? 'text-green-500' : 'text-red-500' },
      { icon: ClockPlusIcon, text: loaderData.createdAt.toString().split('T')[0] },
      { icon: ClockFadingIcon, text: loaderData.updatedAt.toString().split('T')[0] },
    ]

  return (
    <div className="flex flex-col gap-2">
      <Card className="w-full flex flex-col items-center gap-2">
        <Avatar className="size-36">
          <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
          <AvatarFallback>{((loaderData.firstName[0] ?? '?') + (loaderData.lastName[0] ?? '??')).toUpperCase()}</AvatarFallback>
        </Avatar>
        <Label className="text-2xl text-center">
          {loaderData.lastName} {loaderData.firstName} {loaderData.middleName}
        </Label>
      </Card>

      <Card>
        <CardContent className="flex flex-col gap-2">
          {
            userInfo.map((item, index) => (
              <div key={index} className="inline-flex items-center gap-4">
                <item.icon className={cn("min-w-6 min-h-6", item.color)} />
                <Input
                  className={item.color}
                  value={item.text || ""}
                  disabled
                />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className={item.color}
                      size='icon'
                      onClick={() => item.text && navigator.clipboard.writeText(item.text)}
                    >
                      <ClipboardCopyIcon />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="left" className={item.color}>
                    <p>Скопировать</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            ))
          }
        </CardContent>
      </Card>
    </div>
  )
}