import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';
import mockFetch from '../Mocks/mockFetch';

describe('Testando a página de "Profile"', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  beforeEach(async () => {
    global.fetch = vi.fn().mockImplementation(mockFetch as any);
    window.alert = vi.fn(() => {});
  });
  test('testando se os elementos são renderizados na tela', async () => {
    renderWithRouter(<App />, { route: '/profile' });

    const favoriteBtn = screen.getByTestId('profile-favorite-btn');
    const doneBtn = screen.getByTestId('profile-done-btn');
    const logoutBtn = screen.getByTestId('profile-logout-btn');

    expect(favoriteBtn).toBeInTheDocument();
    expect(doneBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
    await userEvent.click(favoriteBtn);
    expect(window.location.pathname).toBe('/favorite-recipes');
  });
  test('testando se o botão de "Done Recipes" redireciona para a página correta', async () => {
    renderWithRouter(<App />, { route: '/profile' });
    const doneBtn = screen.getByTestId('profile-done-btn');
    await userEvent.click(doneBtn);
    expect(window.location.pathname).toBe('/done-recipes');
  });
  test('testando o botão de "Logout"', async () => {
    renderWithRouter(<App />, { route: '/profile' });
    const logoutBtn = screen.getByTestId('profile-logout-btn');
    await userEvent.click(logoutBtn);
    const userStorage = await JSON.parse(localStorage.getItem('user') || '{}');
    expect(userStorage).toEqual({});
  });
});
