import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock do useRouter
const pushMock = jest.fn();
useRouter.mockReturnValue({ push: pushMock });
