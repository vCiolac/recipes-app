import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('Testando a página de "Profile"', () => {
  test('testando se os elementos são renderizados na tela', async () => {
    renderWithRouter(<App />, { route: '/profile' });

    const btnDone = screen.getByTestId('profile-done-btn');
    expect(btnDone).toBeInTheDocument();
    const btnFavorite = screen.getByTestId('profile-favorite-btn');
    expect(btnFavorite).toBeInTheDocument();
    const btnLogout = screen.getByTestId('profile-logout-btn');
    expect(btnLogout).toBeInTheDocument();
  });
});
