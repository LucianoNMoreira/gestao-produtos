'use client'

import axios, { AxiosResponse } from 'axios'
import { ProdutoType } from './types'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {
  const [produtos, setProdutos] = useState<ProdutoType[]>([])
  const [qtde, setQtde] = useState<number>(0)

  const carregarDados = async () => {
    axios.get('http://localhost:3000/api/v1/produtos').then((resp: AxiosResponse) => setProdutos(resp.data))
    axios.get('http://localhost:3000/api/v1/relatorios/quantidade').then((resp: AxiosResponse) => {
      setQtde(resp.data[0] ? resp.data[0].total : 0)
    })

  }

  useEffect(() => {
    carregarDados()
  }, [])

  const removerProduto = async (id: string) => {
    await axios.delete(`http://localhost:3000/api/v1/produtos/${id}`)
    carregarDados()
  }

  return (
    <>
      <h1>Produtos</h1>
      <p><strong>Quantidade de produtos:</strong> {qtde}</p>

      <a href='/produtos/novo'>Cadastrar novo produto</a>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Valor</th>
            <th>Estoque</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          { produtos.map((p: ProdutoType) =>
            <tr key={p._id}>
              <td><a href={`/produtos/${p._id}`}>{p.nome}</a></td>
              <td>{p.valor}</td>
              <td>{p.estoque}</td>
              <td>
                <a href={`/produtos/${p._id}/editar`}>Editar</a>
                | 
                <button onClick={() => removerProduto(p._id!)}>Remover</button>
              </td>
            </tr>
          ) }
        </tbody>
      </table>
    </>
  )
}
