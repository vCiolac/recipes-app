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
    window.alert = vi.fn(() => {});
  });

  test('Testa se os botões de categoria estão aparecendo em meals', async () => {
    renderWithRouter(<App />, { route: '/meals' });
    expect(global.fetch).toHaveBeenCalledTimes(4);

    const button1 = await screen.findByTestId('Beef-category-filter');
    const button2 = await screen.findByTestId('Breakfast-category-filter');
    const button3 = await screen.findByTestId('Chicken-category-filter');
    const button4 = await screen.findByTestId('Dessert-category-filter');
    const button5 = await screen.findByTestId('Goat-category-filter');

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

    const button1 = await screen.findByTestId('Ordinary Drink-category-filter');
    const button2 = await screen.findByTestId('Cocktail-category-filter');
    const button3 = await screen.findByTestId('Shake-category-filter');
    const button4 = await screen.findByTestId('Other / Unknown-category-filter');
    const button5 = await screen.findByTestId('Cocoa-category-filter');

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

    const button1 = await screen.findByTestId('Beef-category-filter');
    await userEvent.click(button1);
    expect(global.fetch).toHaveBeenCalledTimes(5);

    const firstMeal = await screen.findByRole('img', { name: /beef and mustard pie/i });
    expect(firstMeal).toBeInTheDocument();

    await userEvent.click(button1);
    expect(firstMeal).toBeInTheDocument();
  });

  test('Testa se ao clicar em um botão das categorias de drinks, é exibidos as receitas referentes a aquela categoria', async () => {
    renderWithRouter(<App />, { route: '/drinks' });

    expect(global.fetch).toHaveBeenCalledTimes(4);

    const cocktailBtn = await screen.findByTestId('Cocktail-category-filter');
    await userEvent.click(cocktailBtn);
    expect(global.fetch).toHaveBeenCalledTimes(5);

    expect(await screen.findByRole('img', { name: /155 belmont/i })).toBeInTheDocument();

    const btnAll = await screen.findByTestId('All-category-filter');
    await userEvent.click(btnAll);

    const firstDrink = await screen.findByRole('img', { name: /gg/i });
    expect(firstDrink).toBeInTheDocument();
  });

  test('Testa se ao realizar uma pesquisa, as receitas correspondentes são exibidas', async () => {
    renderWithRouter(<App />, { route: '/meals' });

    expect(global.fetch).toHaveBeenCalledTimes(4);
    const btnSearchBar = await screen.findByRole('img', { name: /lupa de pesquisa/i });

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

    const firstMeal = await screen.findByRole('img', { name: /corba/i });
    await userEvent.click(firstMeal);

    expect(window.location.pathname).toContain('52977');
  });

  test('Testa se a pessoa usuária é redirecionada para a tela de detalhes quando ela clicar no card de uma bebida', async () => {
    renderWithRouter(<App />, { route: '/drinks' });

    expect(global.fetch).toHaveBeenCalledTimes(4);

    const firstDrink = await screen.findByRole('img', { name: /gg/i });
    await userEvent.click(firstDrink);

    expect(window.location.pathname).toContain('15997');
  });
});
