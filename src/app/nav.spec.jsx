import React from 'react' // Adicione esta linha
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Nav from './nav'
import { UserProvider } from './Contexts/UserContext'
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'

describe('Nav', () => {
  it('Valida o estado inicial', () => {
    render(
      <UserProvider>
        <Nav />
      </UserProvider>
    )
    expect(screen.getByText('Início')).toBeInTheDocument()
    expect(screen.getByTestId('link-login')).toBeInTheDocument()
  })

  it('Link de logout', () => {
    const user = { id: '123', login: 'teste' }

    const mockLogout = jest.fn()

    const token = jwt.sign(
                            {
                                user: {
                                    id: user.id,
                                    login: user.login
                                }
                            }, 
                            'chave_secreta',
                            { expiresIn: '1h' }
                        )

    Cookies.set('session', token)
    
    render(
      <UserProvider>
        <Nav
          signOut={mockLogout}
        />
      </UserProvider>
    )

    const linkLogout = screen.getByTestId('link-logout')
    fireEvent.click(linkLogout)

    expect(mockLogout).toHaveBeenCalled()
  })
})
