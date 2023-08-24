import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('Testando comportamento do Footer', () => {
  test('Testa se ao clicar no botão de drinks a página é redirecionada', async () => {
    renderWithRouter(<App />, { route: '/meals' });

    const title = await screen.findByRole('heading', { name: /meals/i });
    expect(title).toBeInTheDocument();

    const button = await screen.findByRole('img', { name: /drink/i });
    userEvent.click(button);

    const newTitle = await screen.findByRole('heading', { level: 1, name: 'Drinks' });
    expect(newTitle).toBeInTheDocument();
  });

  test('Testa se ao clicar no botão de meals a página é redirecionada', async () => {
    renderWithRouter(<App />, { route: '/drinks' });

    const h1 = await screen.findByRole('heading', { level: 1, name: 'Drinks' });
    expect(h1).toBeInTheDocument();

    const button = await screen.findByAltText('meal');
    userEvent.click(button);

    const newTitle = await screen.findByRole('heading', { level: 1, name: 'Meals' });
    expect(newTitle).toBeInTheDocument();
  });
});
