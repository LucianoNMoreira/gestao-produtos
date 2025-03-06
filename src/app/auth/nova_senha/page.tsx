'use client'
import { FormEvent } from 'react'
import axios, { AxiosResponse } from 'axios'
import { useSearchParams } from 'next/navigation'

export default function Pagina() {

  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const senha = formData.get('senha')
    const confirmacao_senha = formData.get('confirmacao_senha')

    if(senha != confirmacao_senha) {
      alert("As senhas não conferem")
      return
    }
 
    try {
      const response = await axios.post("/api/v1/auth/nova_senha", {
        token: token,
        senha: senha
      })
      console.log('response', response)

      alert("Você alterou sua senha!")
      window.location.href = '/login'
    } catch(e) {
      console.log("Erro de login", e)
      alert("Ocorreu um erro ao gerar sua nova senha")
    }
  }
 
  return (
    <form onSubmit={handleSubmit}>
      <input type="password" name="senha" placeholder="Sua nova senha" required autoFocus />
      <input type="password" name="confirmacao_senha" placeholder="Confirme sua senha" required/>
      <button type="submit">Alterar senha</button>
    </form>
  )
}
