import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';
import mockFetch from '../Mocks/mockFetch';

describe('Testando a tela de login', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  beforeEach(async () => {
    global.fetch = vi.fn().mockImplementation(mockFetch as any);
    window.alert = vi.fn(() => {});
  });

  test('Testa se os inputs de email e senha estão presentes na tela junto com o botão de entrar.', async () => {
    renderWithRouter(<App />, { route: '/' });
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByTestId('password-input');
    const entrarButton = screen.getByRole('button', { name: /enter/i });

    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveValue('');

    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveValue('');

    expect(entrarButton).toBeInTheDocument();
    expect(entrarButton).toBeDisabled();

    await userEvent.type(emailInput, 'teste@trybe.com');
    await userEvent.type(passwordInput, '1234abcd');
    expect(screen.getByRole('button', { name: /enter/i })).toBeEnabled();
    await userEvent.click(entrarButton);
  });
});
