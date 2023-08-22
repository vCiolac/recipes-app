import { createContext } from 'react';
import { MealType } from '../Hooks/useFetchMeals';
import { DrinksType } from '../Hooks/useFetchDrinks';
import { DrinksCategoriesType, MealCategoriesType } from '../Hooks/useFetchCategories';

export type RecipesContext = {
  mealInf: MealType[];
  drinkInf: DrinksType[];
  loadingMeals: boolean;
  loadingDrink: boolean;
  mealCategories: never[];
  drinksCategories: never[];
  mealFilterCategories: MealCategoriesType[];
  loadingCategories: boolean;
  drinksFilterCategories: DrinksCategoriesType[];
};

export const Context = createContext({} as RecipesContext);
