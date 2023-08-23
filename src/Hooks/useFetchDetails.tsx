import { useEffect, useState } from 'react';
import { DrinksType, MealType } from '../types';

export function useFetchDetails() {
  const [mealDetails, setMealDetails] = useState<MealType[]>([]);
  const [drinksDetails, setDrinksDetails] = useState<DrinksType[]>([]);
  const [loadingDetails, setloadingDetails] = useState(true);
  const [detailId, setDetailId] = useState('');

  async function fetchMealsDetails() {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${detailId}`);
    const data = await response.json();
    setMealDetails(data.meals);
  }

  async function fetchDrinksDetails() {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${detailId}`);
    const data = await response.json();
    setDrinksDetails(data.drinks);
  }

  useEffect(() => {
    async function fetchData() {
      setloadingDetails(true);
      await Promise.all([fetchMealsDetails(), fetchDrinksDetails()]);
      setloadingDetails(false);
    }
    fetchData();
  }, [detailId]);

  return { mealDetails, drinksDetails, loadingDetails, detailId, setDetailId };
}
