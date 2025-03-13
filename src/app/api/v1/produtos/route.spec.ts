import axios from 'axios'

describe('API de produtos', () => {

  it('[GET] /api/v1/produtos', async () => {
    const response = await axios.get('/api/v1/produtos')
    expect(response.data.length).toBe(2)
  })

  it('[GET] /api/v1/produtos/1', async () => {
    const response = await axios.get('/api/v1/produtos/1')
    expect(response.data.id).toBe(1)
  })

})