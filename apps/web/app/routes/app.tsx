import { CircleUserIcon, DoorClosedIcon, DoorOpenIcon, ScrollTextIcon, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import { useAuth } from "~/context";

const menu: Array<{
  icon: LucideIcon
  text: string
  href: string
  isAdmin: boolean
}> = [
    { icon: CircleUserIcon, text: "Мой профиль", href: "/app/user/:id", isAdmin: false },
    { icon: ScrollTextIcon, text: 'Список пользователей', href: '/app/users/1', isAdmin: true },
  ]

export default function Layout() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [isHover, setIsHover] = useState(false)

  if (!user) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="flex flex-col px-3 py-7 gap-7">
      <Card>
        <CardContent className="flex gap-2">
          {
            menu.map((item, key) => {
              if (item.isAdmin && user.role !== 'admin') {
                return
              }

              item.href = item.href.replace(':id', user.id.toString())

              return (
                <Button
                  key={key}
                  onClick={() => navigate(item.href)}
                  className="cursor-pointer"
                >
                  <item.icon />
                  {item.text}
                </Button>
              )
            })
          }
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size='icon'
                variant='outline'
                className="cursor-pointer ml-auto"
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                onClick={() => navigate('/logout')}
              >
                {
                  isHover
                    ? <DoorOpenIcon />
                    : <DoorClosedIcon />
                }
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Выйти</p>
            </TooltipContent>
          </Tooltip>
        </CardContent>
      </Card>
      <Outlet />
    </div>
  )
}