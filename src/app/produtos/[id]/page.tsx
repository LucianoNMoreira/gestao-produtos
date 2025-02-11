import Produto from '@/db/models/produto'
import { ReactNode } from 'react'

export async function generateMetadata({ params, searchParams }: any, parent: any) {
    const { id } = await params

    const produto = await Produto.findById(id)
  
    return {
      title: produto.nome,
      description: `Página do produto ${produto.nome}`
    }
  }
  
  export default async function Page({ params }: any) : Promise<ReactNode> {
    const { id } = await params
  
    const produto = await Produto.findById(id)

    return (
      <>
        <h1>{ produto.nome }</h1>
        <p>Valor: R$ {produto.valor}</p>
        <p>Estoque: {produto.estoque}</p>
      </>
    )
  }