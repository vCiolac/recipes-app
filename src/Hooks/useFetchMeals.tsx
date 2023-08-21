import { useEffect, useState } from 'react';

export type MealType = {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string;
  strMeasure17: string;
  strMeasure18: string;
  strMeasure19: string;
  strMeasure20: string;
  strSource: string;
  strImageSource: null;
  strCreativeCommonsConfirmed: null;
  dateModified: null;
};
export function useFetchMeals() {
  const [mealInf, setMealInf] = useState<MealType[]>([]);
  const [loadingMeals, setloadingMeals] = useState(true);
  const [mealCategories, setMealCategories] = useState<string[]>([]);

  async function fetchCategories() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    if (data && data.meals) {
      const categories = data.meals.map((meal: any) => meal.strCategory);
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
