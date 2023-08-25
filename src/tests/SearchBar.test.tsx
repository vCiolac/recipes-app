import { vi } from 'vitest';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import mockFetch from '../Mocks/mockFetch';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';

describe('Testes referentes a SearchBar', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  beforeEach(async () => {
    global.fetch = vi.fn().mockImplementation(mockFetch as any);
    window.alert = vi.fn(() => {});
  });

  test('Testa se na rota /meals, se após pesquisar por chicken o input seja limpo', async () => {
    renderWithRouter(<App />, { route: '/meals' });

    const spyglassButton = await screen.findByRole('button', { name: /lupa de pesquisa/i });
    await userEvent.click(spyglassButton);

    const searchInput = await screen.findByRole('textbox');
    await userEvent.type(searchInput, 'chicken');

    const ingredientRadio = await screen.findByText(/ingredient/i);
    await userEvent.click(ingredientRadio);

    const searchButton = await screen.findByRole('button', { name: /search/i });
    await userEvent.click(searchButton);

    expect(searchInput).toHaveValue('');
  });

  test('Testa se na rota /drinks, se após pesquisar por tequila o input seja limpo', async () => {
    renderWithRouter(<App />, { route: '/drinks' });

    const spyglassButton = await screen.findByRole('button', { name: /lupa de pesquisa/i });
    await userEvent.click(spyglassButton);

    const searchInput = await screen.findByRole('textbox');
    await userEvent.type(searchInput, 'tequila');

    const ingredientRadio = await screen.findByText(/ingredient/i);
    await userEvent.click(ingredientRadio);

    const searchButton = await screen.findByRole('button', { name: /search/i });
    await userEvent.click(searchButton);

    expect(searchInput).toHaveValue('');
  });

  test('Testa se na rota /meals ao clicar em name apareca 12 recipes na tela.', async () => {
    renderWithRouter(<App />, { route: '/meals' });

    const spyglassButton = await screen.findByRole('button', { name: /lupa de pesquisa/i });
    await userEvent.click(spyglassButton);

    const nameRadio = await screen.findByText(/name/i);
    await userEvent.click(nameRadio);

    const searchButton = await screen.findByRole('button', { name: /search/i });
    await userEvent.click(searchButton);
  });

  test('Testa se na rota /drinks ao clicar em name apareca 12 recipes na tela.', async () => {
    renderWithRouter(<App />, { route: '/drinks' });

    const spyglassButton = await screen.findByRole('button', { name: /lupa de pesquisa/i });
    await userEvent.click(spyglassButton);

    const nameRadio = await screen.findByText(/name/i);
    await userEvent.click(nameRadio);

    const searchButton = await screen.findByRole('button', { name: /search/i });
    await userEvent.click(searchButton);
  });

  test('Testa se na rota /meals ao clicar em firstLetter e digitar "a" apareca 12 recipes na tela com essa letra.', async () => {
    renderWithRouter(<App />, { route: '/meals' });

    const spyglassButton = await screen.findByRole('button', { name: /lupa de pesquisa/i });
    await userEvent.click(spyglassButton);

    const searchInput = await screen.findByRole('textbox');
    await userEvent.type(searchInput, 'a');

    const firstLetterRadio = await screen.findByText(/first letter/i);
    await userEvent.click(firstLetterRadio);

    const searchButton = await screen.findByRole('button', { name: /search/i });
    await userEvent.click(searchButton);
  });

  test('Testa se na rota /drinks ao clicar em firstLetter e digitar "a" apareca 12 recipes na tela com essa letra.', async () => {
    renderWithRouter(<App />, { route: '/drinks' });

    const spyglassButton = await screen.findByRole('button', { name: /lupa de pesquisa/i });
    await userEvent.click(spyglassButton);

    const searchInput = await screen.findByRole('textbox');
    await userEvent.type(searchInput, 'a');

    const firstLetterRadio = await screen.findByText(/first letter/i);
    await userEvent.click(firstLetterRadio);

    const searchButton = await screen.findByRole('button', { name: /search/i });
    await userEvent.click(searchButton);
  });
});
