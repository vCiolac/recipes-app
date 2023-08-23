import { useEffect, useState } from 'react';
import { MealType } from '../types';

export function useFetchMeals() {
  const [mealInf, setMealInf] = useState<MealType[]>([]);
  const [loadingMeals, setloadingMeals] = useState(true);
  const [mealCategories, setMealCategories] = useState<never[]>([]);

  async function fetchCategories() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    if (data && data.meals) {
      const categories = data.meals.map((meal: MealType) => meal.strCategory);
      setMealCategories(categories);
    }
  }

  async function fetchMeals() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const mealsData = await response.json();
    if (mealsData && mealsData.meals) {
      setMealInf(mealsData.meals);
    }
  }

  useEffect(() => {
    async function fetchData() {
      setloadingMeals(true);
      await Promise.all([fetchCategories(), fetchMeals()]);
      setloadingMeals(false);
    }
    fetchData();
  }, []);

  return { mealInf, loadingMeals, mealCategories };
}


