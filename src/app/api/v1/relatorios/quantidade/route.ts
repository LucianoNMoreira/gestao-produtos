import Produto from '@/db/models/produto'

export async function GET() {
    const produtos = await Produto.aggregate([
        { $count: 'total' }
    ])

    return Response.json(produtos)
}
