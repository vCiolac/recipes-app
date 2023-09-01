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
          'Lentils - 1 cup ',
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
          'Lentils - 1 cup ',
          'Onion - 1 large',
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
          'Onion - 1 large',
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
});
