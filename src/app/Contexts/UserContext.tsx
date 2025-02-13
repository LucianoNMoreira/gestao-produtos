'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { jwtDecode } from "jwt-decode"

const UserContext = createContext<any>(null)
export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState()
  const [updatedAt, setUpdatedAt] = useState<Date>()
  const router = useRouter()

  const login = async (login: string, senha: string) => {
    console.log('UserContext login', login, senha)

    try {
        const response = await axios.post('http://localhost:3000/api/v1/auth/login', {
            login: login,
            senha: senha
        })

        Cookies.set('session', response.data.token)
        router.push('/')

        setUser(obterUsuarioToken(response.data.token))
    } catch(e) {
      router.push('/login')
    }
  }

  const logout = () => {
    Cookies.remove('session')
    setUser(undefined)
    router.push('/')
  }

  const obterUsuarioToken = (token: string) => {
    Cookies.set('session', token)

    const jwt: any = jwtDecode(token)
    return jwt.user
  }

  useEffect(() => {
    const token = Cookies.get('session')
    if (!user && token) {
        setUser(obterUsuarioToken(token))
        setUpdatedAt(new Date())
    }
  }, [user])

  useEffect(() => {
    console.debug('UserContext user', user)
    console.debug('UserContext updatedAt', updatedAt)
  }, [user, updatedAt])

  return (
		<UserContext.Provider value={{ user, login, logout }}>
			{children}
		</UserContext.Provider>
	)
}
