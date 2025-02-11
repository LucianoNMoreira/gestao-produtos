import Produto from '@/db/models/produto'

export async function GET(req:any, { params }: any) {
    const { id } = await params

    return Response.json(await Produto.findById(id))
}
