import { useEffect, useState } from 'react';

export type MealCategoriesType = {
  strMeal: string,
  strMealThumb: string,
  idMeal: string;
};

export type DrinksCategoriesType = {
  strDrinks: string,
  strDrinksThumb: string,
  idDrinks: string;
};

export function useFetchCategories() {
  const [loadingCategories, setloadingCategories] = useState(true);
  const [buttonName, setButtonName] = useState('');
  const [
    mealFilterCategories,
    setMealFilterCategories,
  ] = useState<MealCategoriesType[]>([]);
  const [
    drinksFilterCategories,
    setDrinksFilterCategories,
  ] = useState<DrinksCategoriesType[]>([]);

  async function fetchMealCategories() {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${buttonName}`);
    const data = await response.json();
    console.log(data);
    if (data && data.meals) {
      const categories = data.meals.map((meal: any) => meal.strCategory);
      setMealFilterCategories(categories);
    }
  }

  async function fetchDrinksCategories() {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${buttonName}`);
    const data = await response.json();
    console.log(data);
    if (data && data.drinks) {
      const categories = data.drinks.map((drink: any) => drink.strCategory);
      setDrinksFilterCategories(categories);
    }
  }

  useEffect(() => {
    async function fetchData() {
      setloadingCategories(true);
      await Promise.all([fetchMealCategories(), fetchDrinksCategories()]);
      setloadingCategories(false);
    }
    fetchData();
  }, [buttonName]);

  return {
    mealFilterCategories,
    loadingCategories,
    drinksFilterCategories,
    setButtonName };
}
