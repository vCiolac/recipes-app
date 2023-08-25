import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';
import mockFetch from '../Mocks/mockFetch';

describe('Testando comportamento do Recipes', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  beforeEach(async () => {
    global.fetch = vi.fn().mockImplementation(mockFetch as any);
  });

  test('Testa se os botões de categoria estão aparecendo em meals', async () => {
    renderWithRouter(<App />, { route: '/meals' });
    expect(global.fetch).toHaveBeenCalledTimes(4);
    expect(await screen.findByRole('heading', { name: /recipes app/i })).toBeInTheDocument();

    const button1 = await screen.findByRole('button', { name: /beef/i });
    const button2 = await screen.findByRole('button', { name: /breakfast/i });
    const button3 = await screen.findByRole('button', { name: /chicken/i });
    const button4 = await screen.findByRole('button', { name: /dessert/i });
    const button5 = await screen.findByRole('button', { name: /goat/i });

    expect(button1).toBeInTheDocument();
    expect(button2).toBeInTheDocument();
    expect(button3).toBeInTheDocument();
    expect(button4).toBeInTheDocument();
    expect(button5).toBeInTheDocument();

    const mealCardIMG = await screen.findByRole('img', { name: /corba/i });
    expect(mealCardIMG).toBeInTheDocument();

    const mealCardName = await screen.findByText(/corba/i);
    expect(mealCardName).toBeInTheDocument();
  });

  test('Testa se os botões de categoria estão aparecendo em drinks', async () => {
    renderWithRouter(<App />, { route: '/drinks' });

    const button1 = await screen.findByRole('button', { name: /ordinary drink/i });
    const button2 = await screen.findByRole('button', { name: /cocktail/i });
    const button3 = await screen.findByRole('button', { name: /shake/i });
    const button4 = await screen.findByRole('button', { name: /other \/ unknown/i });
    const button5 = await screen.findByRole('button', { name: /cocoa/i });

    expect(button1).toBeInTheDocument();
    expect(button2).toBeInTheDocument();
    expect(button3).toBeInTheDocument();
    expect(button4).toBeInTheDocument();
    expect(button5).toBeInTheDocument();

    const mealCardIMG = await screen.findByRole('img', { name: /gg/i });
    expect(mealCardIMG).toBeInTheDocument();

    const mealCardName = await screen.findByText(/gg/i);
    expect(mealCardName).toBeInTheDocument();
  });

  test('Testa se ao clicar em um botão das categorias de meals, é exibidos as receitas referentes a aquela categoria', async () => {
    renderWithRouter(<App />, { route: '/meals' });

    expect(global.fetch).toHaveBeenCalledTimes(4);
    expect(await screen.findByRole('heading', { name: /recipes app/i })).toBeInTheDocument();

    const button1 = await screen.findByRole('button', { name: /beef/i });
    await userEvent.click(button1);
    expect(global.fetch).toHaveBeenCalledTimes(5);

    const firstMeal = await screen.findByRole('img', { name: /beef and mustard pie/i });
    expect(firstMeal).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /beef/i }));
    expect(await screen.findByRole('img', { name: /corba/i })).toBeInTheDocument();
  });

  test('Testa se ao clicar em um botão das categorias de drinks, é exibidos as receitas referentes a aquela categoria', async () => {
    renderWithRouter(<App />, { route: '/drinks' });

    expect(global.fetch).toHaveBeenCalledTimes(4);
    expect(await screen.findByRole('heading', { name: /recipes app/i })).toBeInTheDocument();

    const cocktailBtn = await screen.findByRole('button', { name: /cocktail/i });
    await userEvent.click(cocktailBtn);
    expect(global.fetch).toHaveBeenCalledTimes(5);

    expect(await screen.findByRole('img', { name: /155 belmont/i })).toBeInTheDocument();

    const btnAll = screen.getByRole('button', { name: /all/i });
    await userEvent.click(btnAll);

    const firstDrink = await screen.findByRole('img', { name: /gg/i });
    expect(firstDrink).toBeInTheDocument();
  });

  test('Testa se ao realizar uma pesquisa, as receitas correspondentes são exibidas', async () => {
    renderWithRouter(<App />, { route: '/meals' });

    expect(global.fetch).toHaveBeenCalledTimes(4);
    expect(await screen.findByRole('heading', { name: /recipes app/i })).toBeInTheDocument();
    const btnSearchBar = screen.getByRole('img', { name: /lupa de pesquisa/i });

    await userEvent.click(btnSearchBar);

    const searchBar = await screen.findByPlaceholderText(/search/i);
    await userEvent.type(searchBar, 'egg');

    const ingredientOption = screen.getByTestId('ingredient-search-radio');
    await userEvent.click(ingredientOption);

    const btnSearch = screen.getByRole('button', { name: /search/i });
    await userEvent.click(btnSearch);

    expect(global.fetch).toHaveBeenCalledTimes(5);
    expect(await screen.findByRole('img', { name: /beef lo mein/i })).toBeInTheDocument();
  });

  test('Testa se a pessoa usuária é redirecionada para a tela de detalhes quando ela clicar no card de uma comida', async () => {
    renderWithRouter(<App />, { route: '/meals' });

    expect(global.fetch).toHaveBeenCalledTimes(4);
    expect(await screen.findByRole('heading', { name: /recipes app/i })).toBeInTheDocument();

    const firstMeal = await screen.findByRole('img', { name: /corba/i });
    await userEvent.click(firstMeal);

    expect(window.location.pathname).toContain('52977');
  });

  test('Testa se a pessoa usuária é redirecionada para a tela de detalhes quando ela clicar no card de uma bebida', async () => {
    renderWithRouter(<App />, { route: '/drinks' });

    expect(global.fetch).toHaveBeenCalledTimes(4);
    expect(await screen.findByRole('heading', { name: /recipes app/i })).toBeInTheDocument();

    const firstDrink = await screen.findByRole('img', { name: /gg/i });
    await userEvent.click(firstDrink);

    expect(window.location.pathname).toContain('15997');
  });
});
