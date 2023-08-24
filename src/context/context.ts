import { createContext } from 'react';
import { DrinksCategoriesType, MealCategoriesType } from '../Hooks/useFetchCategories';
import { MealType, DrinksType } from '../types';

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
  buttonName: string;
  setButtonName: React.Dispatch<React.SetStateAction<string>>;
  mealDetails: MealType[];
  drinksDetails: DrinksType[];
  loadingDetails: boolean;
  detailId: string;
  setDetailId: React.Dispatch<React.SetStateAction<string>>;
  handleFilteredRecipes: (recipe: MealType[] | DrinksType[]) => void;
  filteredRecipes: MealType[] | DrinksType[]
};

export const Context = createContext({} as RecipesContext);
