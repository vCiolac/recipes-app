import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testando a tela de login', () => {
  test('Testa se os inputs de email e senha estão presentes na tela junto com o botão de entrar.', async () => {
    // Este arquivo pode ser modificado ou deletado sem problemas
    render(<App />);

    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByTestId('password-input');
    const entrarButton = screen.getByRole('button', { name: 'Entrar' });

    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveValue('');

    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveValue('');

    expect(entrarButton).toBeInTheDocument();
    expect(entrarButton).toBeDisabled();

    await userEvent.type(emailInput, 'teste@trybe.com');
    await userEvent.type(passwordInput, '1234abcd');
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeEnabled();
    await userEvent.click(entrarButton);
  });
});
