import { useFetchCategories } from '../Hooks/useFetchCategories';
import { useFetchDrinks } from '../Hooks/useFetchDrinks';
import { useFetchMeals } from '../Hooks/useFetchMeals';
import { Context } from './context';

type RecipesProps = {
  children: React.ReactNode;
};
function RecipesProvider({ children }: RecipesProps) {
  const { mealInf, loadingMeals, mealCategories } = useFetchMeals();
  const { drinkInf, loadingDrink, drinksCategories } = useFetchDrinks();
  const {
    mealFilterCategories,
    loadingCategories,
    drinksFilterCategories,
    setButtonName,
  } = useFetchCategories();

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
        setButtonName,
      } }
    >
      {children}
    </Context.Provider>
  );
}
export default RecipesProvider;
