import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';
import mockFetch from '../Mocks/mockFetch';

describe('Testando a página de "Done Recipes"', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  beforeEach(async () => {
    global.fetch = vi.fn().mockImplementation(mockFetch as any);
    window.alert = vi.fn(() => {});
  });
  test('testando se os elementos são renderizados na tela', async () => {
    renderWithRouter(<App />, { route: '/done-recipes' });

    const h1 = screen.getByRole('heading', { level: 1, name: 'Done Recipes' });
    expect(h1).toBeInTheDocument();

    const FilterAll = screen.getByRole('button', { name: 'All' });
    const FilterMeals = screen.getByRole('button', { name: 'Meals' });
    const FilterDrinks = screen.getByRole('button', { name: 'Drinks' });

    expect(FilterAll).toBeInTheDocument();
    expect(FilterMeals).toBeInTheDocument();
    expect(FilterDrinks).toBeInTheDocument();
    await userEvent.click(FilterMeals);
    await userEvent.click(FilterAll);
    await userEvent.click(FilterDrinks);
  });
  test('testa o done recipe btn', async () => {
    const mockFunc = vi.spyOn(Storage.prototype, 'setItem');
    const finishRecipe = {
      meals: {
        52977: [
          'Lentils - 1 cup ',
          'Onion - 1 large',
          'Carrots - 1 large',
          'Tomato Puree - 1 tbs',
          'Cumin - 2 tsp',
          'Paprika - 1 tsp ',
          'Mint - 1/2 tsp',
          'Thyme - 1/2 tsp',
          'Black Pepper - 1/4 tsp',
          'Red Pepper Flakes - 1/4 tsp',
          'Vegetable Stock - 4 cups ',
          'Water - 1 cup ',
          'Sea Salt - Pinch',
        ],
      },
    };

    renderWithRouter(<App />, { route: '/meals/52977/in-progress' });
    const doneBtn = await screen.findByTestId('finish-recipe-btn');
    expect(doneBtn).toBeInTheDocument();
    const firstIng = await screen.findByTestId('0-ingredient-step');
    const secondIng = await screen.findByTestId('1-ingredient-step');
    const thirdIng = await screen.findByTestId('2-ingredient-step');
    const fourthIng = await screen.findByTestId('3-ingredient-step');
    const fifthIng = await screen.findByTestId('4-ingredient-step');
    const sixthIng = await screen.findByTestId('5-ingredient-step');
    const seventhIng = await screen.findByTestId('6-ingredient-step');
    const eighthIng = await screen.findByTestId('7-ingredient-step');
    const ninthIng = await screen.findByTestId('8-ingredient-step');
    const tenthIng = await screen.findByTestId('9-ingredient-step');
    const eleventhIng = await screen.findByTestId('10-ingredient-step');
    const twelfthIng = await screen.findByTestId('11-ingredient-step');
    const thirteenthIng = await screen.findByTestId('12-ingredient-step');

    await userEvent.click(firstIng);
    await userEvent.click(secondIng);
    await userEvent.click(thirdIng);
    await userEvent.click(fourthIng);
    await userEvent.click(fifthIng);
    await userEvent.click(sixthIng);
    await userEvent.click(seventhIng);
    await userEvent.click(eighthIng);
    await userEvent.click(ninthIng);
    await userEvent.click(tenthIng);
    await userEvent.click(eleventhIng);
    await userEvent.click(twelfthIng);
    await userEvent.click(thirteenthIng);
    console.log(JSON.parse(localStorage.getItem('inProgressRecipes') || '{}'));

    await userEvent.click(doneBtn);
    const localInprogress = await JSON.parse(localStorage.getItem('inProgressRecipes') || '{}');
    expect(Object.keys(localInprogress.meals['52977'])).toHaveLength(13);
    expect(localInprogress).toEqual(finishRecipe);
    expect(mockFunc).toHaveBeenCalled();
  });
  test('Testa se o usuário clicar para compartilhar o link é copiado para o clipboard', async () => {
    renderWithRouter(<App />, { route: '/done-recipes' });

    const shareButton = await screen.findByRole('img', { name: /share recipe/i });
    await userEvent.click(shareButton);

    const text = await screen.findByText(/link copied!/i);
    expect(text).toHaveTextContent('Link copied!');
  });
  test('test se doneRecipe foi salvo no localStorage', async () => {
    const doneRecipe = [
      {
        id: '52977',
        nationality: 'Turkish',
        name: 'Corba',
        category: 'Side',
        image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
        tags: [
          'Soup',
        ],
        alcoholicOrNot: '',
        type: 'meal',
      },
    ];
    renderWithRouter(<App />, { route: 'done-recipes' });
    const localDone = await JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    expect(localDone).toMatchObject(doneRecipe);
  });
});
