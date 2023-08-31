import { vi } from 'vitest';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import mockFetch from '../Mocks/mockFetch';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';

describe('Testes referentes à página de Receitas em Progresso', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  beforeEach(async () => {
    global.fetch = vi.fn().mockImplementation(mockFetch as any);
    window.alert = vi.fn(() => {});
  });

  const path = '/meals/52977/in-progress';
  const ingStep = '0-ingredient-step';

  test('Testa se a imagem, nome, ingredientes e descrição da receita estão presentes na tela', async () => {
    renderWithRouter(<App />, { route: path });

    const recipeImg = await screen.findByRole('img', { name: /corba/i });
    const recipeName = await screen.findByRole('heading', { name: /corba/i });
    const recipeIngredients = await screen.findAllByRole('checkbox');
    const recipeDescription = await screen.findByTestId('instructions');
    const recipeFinishButton = await screen.findByRole('button', { name: /finish recipe/i });

    expect(recipeImg).toBeInTheDocument();
    expect(recipeName).toHaveTextContent('Corba');
    expect(recipeIngredients).toHaveLength(13);
    expect(recipeDescription).toBeInTheDocument();
    expect(recipeFinishButton).toBeInTheDocument();
  });

  test('Testa se salva no localStorage as informações necessárias', async () => {
    const objValue = {
      meals: {
        52977: [],
      },
    };

    renderWithRouter(<App />, { route: '/meals/52977' });

    const startBtn = await screen.findByTestId('start-recipe-btn');
    await userEvent.click(startBtn);

    const localStorageDt = await JSON.parse(localStorage.getItem('inProgressRecipes') || '{}');
    expect(localStorageDt).toEqual(objValue);
  });

  test('testa se os valores do localStorage mudam de acordo com o input', async () => {
    const withLentis = {
      meals: {
        52977: [
          'Lentils',
        ],
      },
    };
    renderWithRouter(<App />, { route: path });

    const lentilsInput = await screen.findByTestId(ingStep);
    await userEvent.click(lentilsInput);

    const localStorageDt = await JSON.parse(localStorage.getItem('inProgressRecipes') || '{}');
    expect(localStorageDt).toEqual(withLentis);
  });

  test('testa se os valores do localStorage mudam de acordo com o input', async () => {
    const withLentisAndOnion = {
      meals: {
        52977: [
          'Lentils',
          'Onion',
        ],
      },
    };
    renderWithRouter(<App />, { route: path });

    const onionInput = await screen.findByTestId('1-ingredient-step');
    await userEvent.click(onionInput);
    const localStgeDt = await JSON.parse(localStorage.getItem('inProgressRecipes') || '{}');

    expect(localStgeDt).toEqual(withLentisAndOnion);
  });

  test('testa se ao clicar no input ele retira o valor do localStorage', async () => {
    const onlyWithOnion = {
      meals: {
        52977: [
          'Onion',
        ],
      },
    };
    renderWithRouter(<App />, { route: path });

    const lentilsInput = await screen.findByTestId(ingStep);
    await userEvent.click(lentilsInput);
    const localStgredt = await JSON.parse(localStorage.getItem('inProgressRecipes') || '{}');
    expect(localStgredt).toEqual(onlyWithOnion);
  });

  test('testa se ao clicar em favoritos adiciona e remove do localstorage', async () => {
    const favObj = [
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
    renderWithRouter(<App />, { route: path });
    const localFavorite = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    expect(localFavorite).toEqual([]);
    const favoriteBtn = await screen.findByTestId('favorite-btn');

    await userEvent.click(favoriteBtn);
    const localFavorite2 = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    expect(localFavorite2).toEqual(favObj);

    await userEvent.click(favoriteBtn);
    const localFavorite3 = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    expect(localFavorite3).toEqual([]);
  });
  test('testa o share btn', async () => {
    renderWithRouter(<App />, { route: path });
    const shareBtn = await screen.findByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();
    await userEvent.click(shareBtn);
  });
  test('testa o done recipe btn', async () => {
    const mockFunc = vi.spyOn(Storage.prototype, 'setItem');
    const finishRecipe = {
      meals: {
        52977: [
          'Onion',
          'Lentils',
          'Carrots',
          'Tomato Puree',
          'Cumin',
          'Paprika',
          'Mint',
          'Thyme',
          'Black Pepper',
          'Red Pepper Flakes',
          'Vegetable Stock',
          'Water',
          'Sea Salt',
        ],
      },
    };

    renderWithRouter(<App />, { route: path });
    const doneBtn = await screen.findByTestId('finish-recipe-btn');
    expect(doneBtn).toBeInTheDocument();
    const firstIng = await screen.findByTestId(ingStep);
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
