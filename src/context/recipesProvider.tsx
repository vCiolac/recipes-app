import { useFetchDrinks } from '../Hooks/useFetchDrinks';
import { useFetchMeals } from '../Hooks/useFetchMeals';
import { Context } from './context';

type RecipesProps = {
  children: React.ReactNode;
};
function RecipesProvider({ children }: RecipesProps) {
  const { mealInf, loadingMeals, mealCategories } = useFetchMeals();
  const { drinkInf, loadingDrink, drinksCategories } = useFetchDrinks();

  return (
    <Context.Provider
      value={ {
        mealInf,
        loadingMeals,
        drinkInf,
        loadingDrink,
        mealCategories,
        drinksCategories } }
    >
      {children}
    </Context.Provider>
  );
}
export default RecipesProvider;
