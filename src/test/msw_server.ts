import { setupServer } from 'msw/node'
import produtos_handlers from '../app/api/v1/produtos/route.msw'

export const server = setupServer(
	...produtos_handlers
)
