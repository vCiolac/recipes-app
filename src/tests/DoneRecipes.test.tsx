import { screen } from '@testing-library/react';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';

describe('Testando a página de "Done Recipes"', () => {
  test('testando se os elementos são renderizados na tela', () => {
    renderWithRouter(<App />, { route: '/done-recipes' });

    const h1 = screen.getByRole('heading', { level: 1, name: 'Done Recipes' });
    expect(h1).toBeInTheDocument();

    const FilterAll = screen.getByRole('button', { name: 'All' });
    const FilterMeals = screen.getByRole('button', { name: 'Meals' });
    const FilterDrinks = screen.getByRole('button', { name: 'Drinks' });

    expect(FilterAll).toBeInTheDocument();
    expect(FilterMeals).toBeInTheDocument();
    expect(FilterDrinks).toBeInTheDocument();
  });
});
