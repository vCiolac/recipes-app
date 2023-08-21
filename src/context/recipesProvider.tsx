import { useFetchDrinks } from '../Hooks/useFetchDrinks';
import { useFetchMeals } from '../Hooks/useFetchMeals';
import { Context } from './context';

type RecipesProps = {
  children: React.ReactNode;
};
function RecipesProvider({ children }: RecipesProps) {
  const { mealInf, loadingMeals } = useFetchMeals();
  const { drinkInf, loadingDrink } = useFetchDrinks();

  return (
    <Context.Provider value={ { mealInf, loadingMeals, drinkInf, loadingDrink } }>
      {children}
    </Context.Provider>
  );
}
export default RecipesProvider;
