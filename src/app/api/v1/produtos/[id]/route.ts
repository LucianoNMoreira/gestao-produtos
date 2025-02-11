import { ProdutoType } from '@/app/types'
import Produto from '@/db/models/produto'
import { NextRequest } from 'next/server'

export async function GET(req:NextRequest, { params }: any) {
    const { id } = await params

    return Response.json(await Produto.findById(id))
}

export async function PUT(req:NextRequest, { params }: any) {
    const { id } = await params
    const data: ProdutoType = await req.json()

    return Response.json(await Produto.findOneAndUpdate(
        {_id: id},
        data
    ))
}

export async function DELETE(req:NextRequest, { params }: any) {
    const { id } = await params
    await Produto.deleteOne({_id: id})
    return Response.json({})
}
