import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';
import mockFetch from '../Mocks/mockFetch';

describe('Testes referentes ao Header', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  beforeEach(async () => {
    global.fetch = vi.fn().mockImplementation(mockFetch as any);
    window.alert = vi.fn(() => {});
  });

  test('Testa se o header possui o ícone de imagem do Recipes App.', async () => {
    renderWithRouter(<App />, { route: '/meals' });
    expect(global.fetch).toHaveBeenCalledTimes(4);

    const iconTitle = await screen.findByRole('img', { name: /ícone recipes app/i });
    expect(iconTitle).toBeInTheDocument();
  });

  test('Testa se ao clicar no botão de perfil o usuário é redirecionado para a rota /profile.', async () => {
    renderWithRouter(<App />, { route: '/meals' });
    expect(global.fetch).toHaveBeenCalledTimes(4);

    const iconeDePerfil = await screen.findByRole('img', { name: /ícone de perfil/i });
    await userEvent.click(iconeDePerfil);
    expect(await screen.findByRole('heading', { name: /profile/i })).toBeInTheDocument();
  });
});

test('Testa o botão de busca que, ao ser clicado, permite a visualização da barra de busca ou a esconda', async () => {
  renderWithRouter(<App />, { route: '/meals' });
  expect(global.fetch).toHaveBeenCalledTimes(4);

  const searchBtn = await screen.findByRole('img', { name: /lupa de pesquisa/i });
  await userEvent.click(searchBtn);
  const searchBar = screen.getByPlaceholderText(/search/i);

  expect(searchBar).toBeInTheDocument();

  await userEvent.click(searchBtn);
  expect(searchBar).not.toBeInTheDocument();
});
