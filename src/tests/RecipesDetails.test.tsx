import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';
import mockFetch from '../Mocks/mockFetch';

describe('Testando comportamento do Recipes Details', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  beforeEach(async () => {
    global.fetch = vi.fn().mockImplementation(mockFetch as any);
    window.alert = vi.fn(() => {});
  });

  const path = '/meals/52977';
  test('testando se todas informacões são renderizadas na tela', async () => {
    renderWithRouter(<App />, { route: path });
    expect(global.fetch).toHaveBeenCalledTimes(5);
    expect(await screen.findByRole('heading', { name: /corba/i })).toBeInTheDocument();
    expect(await screen.findByAltText('Corba')).toBeInTheDocument();
    expect(await screen.findByText(/Pick through your lentils for any foreign debris/i)).toBeInTheDocument();
    expect(await screen.findByTitle(/video/i)).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: /ingredients/i })).toBeInTheDocument();
  });

  test('testa se ao clicar no botão "Start Recipe" é salvo no LocalStorage, ', async () => {
    const mockFunc = vi.spyOn(Storage.prototype, 'setItem');

    renderWithRouter(<App />, { route: path });
    expect(global.fetch).toHaveBeenCalledTimes(5);

    const button = await screen.findByRole('button', { name: 'Start Recipe' });

    await userEvent.click(button);

    expect(mockFunc).toHaveBeenCalled();
  });

  test('Testa se o usuário clicar para compartilhar o link é copiado para o clipboard', async () => {
    renderWithRouter(<App />, { route: path });

    const shareButton = await screen.findByRole('img', { name: /share recipe/i });
    await userEvent.click(shareButton);

    const text = await screen.findByText(/link copied!/i);
    expect(text).toHaveTextContent('Link copied!');
  });

  test('Testa se ao favoritar uma receita ela é adiciona ao LocalStorage.', async () => {
    const mockFunc = vi.spyOn(Storage.prototype, 'setItem');
    const obj = [
      {
        id: '52977',
        type: 'meal',
        nationality: 'Turkish',
        category: 'Side',
        alcoholicOrNot: '',
        name: 'Corba',
        image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      },
    ];

    renderWithRouter(<App />, { route: path });
    expect(global.fetch).toHaveBeenCalledTimes(5);

    const favButton = await screen.findByTestId('favorite-btn');
    expect(favButton).toBeInTheDocument();
    await userEvent.click(favButton);
    const favData = await JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    expect(favData).toEqual(obj);
    expect(mockFunc).toHaveBeenCalled();

    await userEvent.click(favButton);
    const favData2 = await JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    expect(favData2).toEqual([]);
  });
});
