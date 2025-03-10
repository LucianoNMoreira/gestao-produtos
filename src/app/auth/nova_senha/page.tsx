'use client'
import { FormEvent, Suspense } from 'react'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

function NovasenhaForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const senha = formData.get('senha')
    const confirmacao_senha = formData.get('confirmacao_senha')

    if (senha != confirmacao_senha) {
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
      router.push('/login')
    } catch (e) {
      console.log("Erro de login", e)
      alert("Ocorreu um erro ao gerar sua nova senha")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="password" name="senha" placeholder="Sua nova senha" required autoFocus />
      <input type="password" name="confirmacao_senha" placeholder="Confirme sua senha" required />
      <button type="submit">Alterar senha</button>
    </form>
  )
}

export default function Pagina() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NovasenhaForm />
    </Suspense>
  )
}