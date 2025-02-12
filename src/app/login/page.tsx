'use client'
import axios from 'axios'
import { FormEvent } from 'react'
import Cookies from 'js-cookie'
 
export default function Pagina() {

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const login = formData.get('login')
    const senha = formData.get('senha')
 
    try {
        const response = await axios.post('http://localhost:3000/api/v1/auth/login', {
            login: login,
            senha: senha
        })

        Cookies.set('session', response.data.jwt)
        window.location.href = '/'
    } catch (e) {

    }
 
  }
 
  return (
    <form onSubmit={handleSubmit}>
      <input type="login" name="login" placeholder="login" required />
      <input type="senha" name="senha" placeholder="senha" required />
      <button type="submit">Login</button>
    </form>
  )
}
