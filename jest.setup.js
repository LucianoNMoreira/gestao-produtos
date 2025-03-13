import { useRouter } from 'next/navigation'
import { server } from './src/test/msw_server'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

// Mock do useRouter
const pushMock = jest.fn();
useRouter.mockReturnValue({ push: pushMock })

// Executar msw
server.listen()

// Hooks do jest
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
