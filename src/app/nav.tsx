'use client'

import React, { useEffect } from "react"
import { useUser } from "./Contexts/UserContext"
import Link from "next/link"

export default function Nav() {
  const { user, logout } = useUser()

  useEffect(() => {
    console.log('nav user', user)
  }, [user])

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
          | <button data-testid='link-logout' onClick={logout}>Sair</button>
        </>
      }

      {user &&
        <p>Olá, usuário {user.id}</p>
      }
    </nav>
  )
}
