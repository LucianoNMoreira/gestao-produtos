import { http, HttpResponse } from 'msw'
import jwt from 'jsonwebtoken'

const handlers = [
	http.post('/api/v1/auth/login', async () => {
		const user = {
			_id: '123',
			login: 'admin'
		}

		const token = jwt.sign(
			{
				user: {
					id: user._id,
					login: user.login
				}
			},
			'chave_secreta',
			{ expiresIn: '1h' }
		)

		return HttpResponse.json({
			token: token
		})
	})
]

export default handlers
