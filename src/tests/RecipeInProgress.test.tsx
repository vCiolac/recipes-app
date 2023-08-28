import { vi } from 'vitest';
import { screen } from '@testing-library/dom';
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

  test('Testa se a imagem, nome, ingredientes e descrição da receita estão presentes na tela', async () => {
    renderWithRouter(<App />, { route: '/meals/52977/in-progress' });

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
});
