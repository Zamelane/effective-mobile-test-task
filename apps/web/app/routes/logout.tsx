import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '~/context'

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
