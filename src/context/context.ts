import { createContext } from 'react';
import { MealType } from '../Hooks/useFetchMeals';
import { DrinksType } from '../Hooks/useFetchDrinks';

export type RecipesContext = {
  mealInf: MealType[];
  drinkInf: DrinksType[];
  loadingMeals: boolean;
  loadingDrink: boolean;

};

export const Context = createContext({} as RecipesContext);
