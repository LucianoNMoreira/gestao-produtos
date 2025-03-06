/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { jwtDecode } from "jwt-decode"

describe('API de produtos', () => {

  it('[POST] /api/v1/auth/login', async () => {
    const response = await axios.post('/api/v1/auth/login', {
      login: 'admin',
      senha: 'admin'
    })
    const jwt: any = jwtDecode(response.data.token)
    expect(jwt.user.login).toBe('admin')
  })

})