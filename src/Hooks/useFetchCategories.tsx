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

  const mealsOptions = ['Beef', 'Breakfast',
    'Chicken', 'Dessert', 'Goat'];

  async function fetchMealCategories() {
    if (buttonName && mealsOptions.includes(buttonName)) {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${buttonName}`);
        const data = await response.json();

        if (data && data.meals) {
          setMealFilterCategories(data.meals);
        }
      } catch (error) {
        setMealFilterCategories([]);
      }
    }
  }

  async function fetchDrinksCategories() {
    if (buttonName && !mealsOptions.includes(buttonName)) {
      try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${buttonName}`);
        const data = await response.json();

        if (data && data.drinks) {
          setDrinksFilterCategories(data.drinks);
        }
      } catch (error) {
        setDrinksFilterCategories([]);
      }
    }
  }

  useEffect(() => {
    async function fetchData() {
      setloadingCategories(true);
      if (buttonName) {
        await Promise.all([fetchMealCategories(), fetchDrinksCategories()]);
      } else {
        setMealFilterCategories([]);
        setDrinksFilterCategories([]);
      }
      setloadingCategories(false);
    }
    fetchData();
  }, [buttonName]);

  return {
    mealFilterCategories,
    loadingCategories,
    drinksFilterCategories,
    setButtonName,
    buttonName,
  };
}
