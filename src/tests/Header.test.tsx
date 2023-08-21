import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Meals from '../Pages/Meals/Meals';

describe('Testes referentes ao Header', () => {
  test('Testa se o header possui o nome Recipes App e seu respectivo ícone de imagem.', () => {
    render(
      <BrowserRouter>
        <Meals />
      </BrowserRouter>,
    );

    const appTitle = screen.getByRole('heading', { name: /recipes app/i });
    expect(appTitle).toBeInTheDocument();
    const iconTitle = screen.getByRole('img', { name: /ícone recipes app/i });
    expect(iconTitle).toBeInTheDocument();
  });

  test('Testa se ao clicar no botão de perfil o usuário é redirecionado para a rota /profile.', async () => {
    render(
      <BrowserRouter>
        <Meals />
      </BrowserRouter>,
    );

    const iconeDePerfil = screen.getByRole('img', { name: /ícone de perfil/i });
    await userEvent.click(iconeDePerfil);
    expect(screen.findByRole('heading', { name: /profile/i }));
  });
});
