import { setupServer } from 'msw/node'
import produtos_handlers from '../app/api/v1/produtos/route.msw'
import auth_login_handlers from '../app/api/v1/auth/login/route.msw'

export const server = setupServer(
	...produtos_handlers,
	...auth_login_handlers
)
