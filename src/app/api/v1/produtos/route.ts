import Produto from '@/db/models/produto'

export async function GET() {
    const produtos = await Produto.find()

    return Response.json(produtos)
}

export async function POST(req: any) {
    const json = await req.json()
    console.log('/api/v1/produtos POST', json)

    const produtos = await Produto.create(
        {
            nome: json.nome,
            valor: json.valor,
            estoque: json.estoque || 0
        }
    )

    return Response.json(produtos)
}
