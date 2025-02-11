import axios from 'axios'

export default async function Home() {
  
  const produtos = (await axios.get('http://localhost:3000/api/v1/produtos')).data
  const qtde = (await axios.get('http://localhost:3000/api/v1/relatorios/quantidade')).data[0].total

  console.debug('produtos', produtos)

  return (
    <>
      <h1>Produtos</h1>
      <p><strong>Quantidade de produtos:</strong> {qtde}</p>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Valor</th>
            <th>Estoque</th>
          </tr>
        </thead>

        <tbody>
          { produtos.map((p: any) =>
            <tr key={p._id}>
              <td>{p._id}</td>
              <td>{p.nome}</td>
              <td>{p.valor}</td>
              <td>{p.estoque}</td>
            </tr>
          ) }
        </tbody>
      </table>
    </>
  )
}
