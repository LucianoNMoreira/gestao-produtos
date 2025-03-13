'use client'

import React, { useEffect } from "react"
import { useUser } from "./Contexts/UserContext"
import Link from "next/link"

type NavProps = {
  signOut?: () => void
}

export default function Nav({ signOut }: NavProps) {
  const { user, logout } = useUser()

  useEffect(() => {
    console.log('nav user', user)
  }, [user])

  const sair = () => {
    console.debug(`Usuário ${user.login} está saindo`)
    logout()
    if (signOut) {
      signOut()
    }
  }

  return (
    <nav>
      <Link href='/'>Início</Link>

      {!user &&
        <>
          | <Link data-testid='link-login' href='/login'>Login</Link>
        </>
      }

      {user &&
        <>
        | <button data-testid='link-logout' onClick={sair}>Sair</button>
        </>
      }

      {user &&
        <p>Olá, usuário {user.id}</p>
      }
    </nav>
  )
}
