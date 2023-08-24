import { useState } from 'react';
import { useFetchCategories } from '../Hooks/useFetchCategories';
import { useFetchDrinks } from '../Hooks/useFetchDrinks';
import { useFetchMeals } from '../Hooks/useFetchMeals';
import { useFetchDetails } from '../Hooks/useFetchDetails';
import { Context } from './context';
import { DrinksType, MealType } from '../types';

type RecipesProps = {
  children: React.ReactNode;
};
function RecipesProvider({ children }: RecipesProps) {
  const [filteredRecipes, setFilteredRecipes] = useState<MealType[] | DrinksType[]>([]);
  const { mealInf, loadingMeals, mealCategories } = useFetchMeals();
  const { drinkInf, loadingDrink, drinksCategories } = useFetchDrinks();
  const {
    mealFilterCategories,
    loadingCategories,
    drinksFilterCategories,
    setButtonName,
    buttonName,
  } = useFetchCategories();

  const {
    mealDetails,
    drinksDetails,
    loadingDetails,
    detailId,
    setDetailId,
  } = useFetchDetails();

  const handleFilteredRecipes = (recipe: MealType[] | DrinksType[]) => {
    setFilteredRecipes(recipe);
  };

  return (
    <Context.Provider
      value={ {
        mealInf,
        loadingMeals,
        drinkInf,
        loadingDrink,
        mealCategories,
        drinksCategories,
        mealFilterCategories,
        loadingCategories,
        drinksFilterCategories,
        buttonName,
        setButtonName,
        mealDetails,
        drinksDetails,
        loadingDetails,
        detailId,
        setDetailId,
        handleFilteredRecipes,
        filteredRecipes,
      } }
    >
      {children}
    </Context.Provider>
  );
}
export default RecipesProvider;
