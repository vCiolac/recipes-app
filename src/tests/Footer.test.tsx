import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testando comportamento do Footer', () => {
  test('Testa se ao clicar no botão de drinks a página é redirecionada', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const title = await screen.findByRole('heading', { level: 1, name: 'Meals' });
    expect(title).toBeInTheDocument();

    const button = await screen.findByAltText('drink');
    userEvent.click(button);

    const newTitle = await screen.findByRole('heading', { level: 1, name: 'Drinks' });
    expect(newTitle).toBeInTheDocument();
  });

  test('Testa se ao clicar no botão de meals a página é redirecionada', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const h1 = await screen.findByRole('heading', { level: 1, name: 'Drinks' });
    expect(h1).toBeInTheDocument();

    const button = await screen.findByAltText('meal');
    userEvent.click(button);

    const newTitle = await screen.findByRole('heading', { level: 1, name: 'Meals' });
    expect(newTitle).toBeInTheDocument();
  });
});
