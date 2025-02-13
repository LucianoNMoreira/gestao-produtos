'use client'
import { FormEvent } from 'react'
import { useUser } from '../Contexts/UserContext'
 
export default function Pagina() {

  const { login } = useUser()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const loginUsuario = formData.get('login')
    const senhaUsuario = formData.get('senha')
 
    await login(loginUsuario, senhaUsuario)
  }
 
  return (
    <form onSubmit={handleSubmit}>
      <input type="login" name="login" placeholder="login" required autoFocus />
      <input type="senha" name="senha" placeholder="senha" required />
      <button type="submit">Login</button>
    </form>
  )
}
