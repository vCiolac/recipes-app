import { createContext } from 'react';
import { MealType } from '../Hooks/useFetchMeals';
import { DrinksType } from '../Hooks/useFetchDrinks';

export type RecipesContext = {
  mealInf: MealType[];
  drinkInf: DrinksType[];
  loadingMeals: boolean;
  loadingDrink: boolean;
  mealCategories: never[];
  drinksCategories: never[];
};

export const Context = createContext({} as RecipesContext);
