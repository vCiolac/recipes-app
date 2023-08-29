import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { vi } from 'vitest';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';
import mockFetch from '../Mocks/mockFetch';

describe('Testando comportamento do Footer', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  beforeEach(async () => {
    global.fetch = vi.fn().mockImplementation(mockFetch as any);
    window.alert = vi.fn(() => {});
  });

  test('Testa se ao clicar no botão de drinks a página é redirecionada', async () => {
    renderWithRouter(<App />, { route: '/meals' });
    expect(global.fetch).toHaveBeenCalledTimes(4);

    const title = await screen.findByRole('heading', { name: /meals/i });
    expect(title).toBeInTheDocument();

    const button = await screen.findByRole('img', { name: /drink/i });
    userEvent.click(button);

    const newTitle = await screen.findByRole('heading', { name: 'Drinks' });
    expect(newTitle).toBeInTheDocument();
  });

  test('Testa se ao clicar no botão de meals a página é redirecionada', async () => {
    renderWithRouter(<App />, { route: '/drinks' });
    expect(global.fetch).toHaveBeenCalledTimes(4);

    const h1 = await screen.findByRole('heading', { name: 'Drinks' });
    expect(h1).toBeInTheDocument();

    const button = screen.getByRole('img', { name: /meal/i });
    userEvent.click(button);

    const newTitle = await screen.findByRole('heading', { name: 'Meals' });
    expect(newTitle).toBeInTheDocument();
  });
});
