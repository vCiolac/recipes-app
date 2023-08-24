import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';
import { DrinksMock, MealsMock } from '../Mocks/offlineRecipes';
import { DrinksCategoryMock, MealsCategoryMock } from '../Mocks/offlineCategories';

describe('Testando comportamento do Recipes', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  beforeEach(async () => {
    const fetch = (url: any) => Promise.resolve({

      json: () => {
        if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') { return Promise.resolve(MealsCategoryMock); }
        if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') { return Promise.resolve(MealsMock); }
        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') { return Promise.resolve(DrinksCategoryMock); }
        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') { return Promise.resolve(DrinksMock); }
      },
    });

    vi.spyOn(global, 'fetch').mockImplementation(fetch as any);

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
  });

  test('Testa se os botões de categoria estão aparecendo em meals', async () => {
    renderWithRouter(<App />, { route: '/meals' });

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
});
