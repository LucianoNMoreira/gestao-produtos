'use client'
import { FormEvent } from 'react'
import axios, { AxiosResponse } from 'axios'

export default function Pagina() {

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
 
    try {
      const response = await axios.post("/api/v1/auth/recuperar_senha", {
        email: email
      })
      console.log('response', response)
      alert("Você receberá um e-mail com as instruções para recuperar sua senha")
    } catch(e) {
      console.log("Erro de login", e)
      alert("Ocorreu um erro ao solicitar sua nova senha")
    }
  }
 
  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="email" required autoFocus />
      <button type="submit">Solicitar nova senha</button>
    </form>
  )
}
