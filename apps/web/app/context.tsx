import type { DBUser } from '@effective-mobile-tt/db/src/models/user/user.types';
import { createContext, useContext, useEffect, useState } from 'react';

export type User = ExcludeField<DBUser, 'password'> & {
  token: string
}
type AuthContextType = {
  isActual: boolean
  user: User | null
  setUser: StateAction<User | null> | ((user: User | null) => void)
  setIsActual: StateAction<boolean>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isActual, setIsActual] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const setUserPreHandler = (user: User | null) => {
    localStorage.setItem('user', JSON.stringify(user))
    setUser(user)
  }

  useEffect(() => {
    const fromStorage = localStorage.getItem('user')

    if (fromStorage) {
      try {
        setUser(JSON.parse(fromStorage))
      } catch (e) {
        console.error('Error parsing user from storage', e)
      }
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      isActual,
      user,
      setUser: setUserPreHandler,
      setIsActual
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}