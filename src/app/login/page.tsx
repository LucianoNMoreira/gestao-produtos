'use client'
import { FormEvent } from 'react'
import { useUser } from '../Contexts/UserContext'

import { signIn } from "next-auth/react"
 
export default function Pagina() {

  const { login } = useUser()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const loginUsuario = formData.get('login')
    const senhaUsuario = formData.get('senha')
 
    try {
      await login(loginUsuario, senhaUsuario)
    } catch(e) {
      console.log("Erro de login", e)
      alert("Usuário inválido")
    }
  }
 
  return (
    <form onSubmit={handleSubmit}>
      <input type="login" name="login" placeholder="login" required autoFocus />
      <input type="senha" name="senha" placeholder="senha" required />
      <button type="submit">Login</button>

      <hr/>
      <p>Ou</p>

      <button type="button" onClick={() => signIn("google", { redirectTo: "/" })}>Faça login com o Google</button>
    </form>
  )
}
