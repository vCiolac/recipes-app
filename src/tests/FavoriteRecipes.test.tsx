import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';
import mockFetch from '../Mocks/mockFetch';

describe('Testando comportamento de Favorite Recipes', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  beforeEach(async () => {
    global.fetch = vi.fn().mockImplementation(mockFetch as any);
    window.alert = vi.fn(() => {});
  });
  test('testando se meal ao clicar em favoritos é salvo no localstorage', async () => {
    const CorbaFav = [
      {
        id: '52977',
        type: 'meal',
        nationality: 'Turkish',
        category: 'Side',
        alcoholicOrNot: '',
        name: 'Corba',
        image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      },
    ];
    const mockFunc = vi.spyOn(Storage.prototype, 'setItem');
    renderWithRouter(<App />, { route: '/meals/52977' });

    const favoriteBtn = await screen.findByTestId('favorite-btn');
    await userEvent.click(favoriteBtn);
    expect(mockFunc).toHaveBeenCalled();
    const favoriteRecipes = await JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    expect(favoriteRecipes).toEqual(CorbaFav);

    renderWithRouter(<App />, { route: '/favorite-recipes' });
    const allBtn = await screen.findByTestId('filter-by-all-btn');
    expect(allBtn).toBeInTheDocument();
    const mealBtn = await screen.findByTestId('filter-by-meal-btn');
    expect(mealBtn).toBeInTheDocument();
    const drinkBtn = await screen.findByTestId('filter-by-drink-btn');
    expect(drinkBtn).toBeInTheDocument();

    const mealCard = await screen.findByTestId('0-horizontal-name');
    expect(mealCard).toBeInTheDocument();
    const mealImg = await screen.findByTestId('0-horizontal-image');
    expect(mealImg).toBeInTheDocument();
    const mealCategory = await screen.findByTestId('0-horizontal-top-text');
    expect(mealCategory).toBeInTheDocument();
    const shareBtn = await screen.findByTestId('0-horizontal-share-btn');
    expect(shareBtn).toBeInTheDocument();
    const favBtn = await screen.findByTestId('0-horizontal-favorite-btn');
    expect(favBtn).toBeInTheDocument();

    await userEvent.click(shareBtn);
    await userEvent.click(mealBtn);
    expect(mealCard).toBeInTheDocument();

    await userEvent.click(allBtn);
    expect(mealCard).toBeInTheDocument();

    await userEvent.click(favBtn);
    expect(mealCard).not.toBeInTheDocument();
    const favoriteRecipes2 = await JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    expect(favoriteRecipes2).toEqual([]);

    await userEvent.click(drinkBtn);
    expect(mealCard).not.toBeInTheDocument();
  });
  test('testando se drink ao clicar em favoritos é salvo no localstorage', async () => {
    const GG = [
      {
        id: '15997',
        type: 'drink',
        nationality: '',
        category: 'Ordinary Drink',
        alcoholicOrNot: 'Optional alcohol',
        name: 'GG',
        image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
      },
    ];
    const mockFunc = vi.spyOn(Storage.prototype, 'setItem');

    renderWithRouter(<App />, { route: '/drinks/15997' });
    const favoriteBtn2 = await screen.findByTestId('favorite-btn');
    await userEvent.click(favoriteBtn2);
    expect(mockFunc).toHaveBeenCalled();
    const favoriteRps2 = await JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    expect(favoriteRps2).toEqual(GG);
    renderWithRouter(<App />, { route: '/favorite-recipes' });

    const alcoholicOrNot = await screen.findByTestId('0-horizontal-top-text');
    expect(alcoholicOrNot).toBeInTheDocument();
    const alcoholicText = await screen.findByText('Optional alcohol');
    expect(alcoholicText).toBeInTheDocument();
  });
});
