import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { DrinksMock, MealsMock } from '../Mocks/offlineRecipes';
import { DrinksCategoryMock, MealsCategoryMock } from '../Mocks/offlineCategories';

describe('Testando comportamento do Recipes', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  beforeEach(async () => {
    global.fetch = vi.fn()
      .mockResolvedValue(DrinksMock)
      .mockResolvedValueOnce(MealsMock)
      .mockResolvedValueOnce(DrinksCategoryMock)
      .mockResolvedValueOnce(MealsCategoryMock);
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(global.fetch).toBeCalledTimes(4);
  });
  test('Testa se os botões de categoria estão aparecendo em meals', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const button1 = await screen.getByRole('button', { name: /beef/i });
    const button2 = await screen.getByRole('button', { name: /breakfast/i });
    const button3 = await screen.getByRole('button', { name: /chicken/i });
    const button4 = await screen.getByRole('button', { name: /dessert/i });
    const button5 = await screen.getByRole('button', { name: /goat/i });

    expect(button1).toBeInTheDocument();
    expect(button2).toBeInTheDocument();
    expect(button3).toBeInTheDocument();
    expect(button4).toBeInTheDocument();
    expect(button5).toBeInTheDocument();

    const mealCardIMG = await screen.getByRole('img', { name: /corba/i });
    expect(mealCardIMG).toBeInTheDocument();

    const mealCardName = await screen.getByText(/corba/i);
    expect(mealCardName).toBeInTheDocument();
  });

  test('Testa se os botões de categoria estão aparecendo em drinks', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const button1 = await screen.getByRole('button', { name: /ordinary drink/i });
    const button2 = await screen.getByRole('button', { name: /cocktail/i });
    const button3 = await screen.getByRole('button', { name: /shake/i });
    const button4 = await screen.getByRole('button', { name: /other \/ unknown/i });
    const button5 = await screen.getByRole('button', { name: /cocoa/i });

    expect(button1).toBeInTheDocument();
    expect(button2).toBeInTheDocument();
    expect(button3).toBeInTheDocument();
    expect(button4).toBeInTheDocument();
    expect(button5).toBeInTheDocument();

    const mealCardIMG = await screen.getByRole('img', { name: /gg/i });
    expect(mealCardIMG).toBeInTheDocument();

    const mealCardName = await screen.getByText(/gg/i);
    expect(mealCardName).toBeInTheDocument();
  });
});
