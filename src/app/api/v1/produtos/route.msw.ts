import { http, HttpResponse } from 'msw'

export const PRODUTOS = [
	{ id: 1, nome: 'Produto 1', valor: 100, estoque: 10 },
	{ id: 2, nome: 'Produto 2', valor: 200, estoque: 20 }
]

const handlers = [
	http.get('/api/v1/produtos', async () => HttpResponse.json(PRODUTOS) ),
	http.get('/api/v1/produtos/:id', async ({ params }) => {
		const id = Number(params.id)
		return HttpResponse.json(PRODUTOS.find(p => p.id === id))
	})
]

export default handlers
