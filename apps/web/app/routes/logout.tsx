import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '~/context'
import type { Route } from './+types/logout'

export function meta({

}: Route.MetaArgs) {
  return [
    { title: 'Страница выход из аккаунта' },
    { name: 'description', content: 'Выход пользователя из системы' },
  ]
}

export default function LogoutPage() {
  const navigate = useNavigate()
  const { setUser, setIsActual } = useAuth()

  useEffect(() => {
    setUser(null)
    setIsActual(false)
    navigate('/')
  }, [])

  return <p>Выхожу из учётки ...</p>
}
