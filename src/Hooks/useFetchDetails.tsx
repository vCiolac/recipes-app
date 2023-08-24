import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DrinksType, MealType } from '../types';

export function useFetchDetails() {
  const location = useLocation();
  const [mealDetails, setMealDetails] = useState<MealType[]>([]);
  const [drinksDetails, setDrinksDetails] = useState<DrinksType[]>([]);
  const [loadingDetails, setloadingDetails] = useState(true);
  const [detailId, setDetailId] = useState(location.pathname.split('/')[2]);
  const [isMeal, setIsMeal] = useState(location.pathname.includes('meals'))

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

  async function fetchData() {
    setloadingDetails(true);
    if (isMeal) {
      await fetchMealsDetails();
      setloadingDetails(false);
    } else {
      await fetchDrinksDetails();
      setloadingDetails(false);
    }
  }

  useEffect(() => {
    setDetailId(location.pathname.split('/')[2]);
    setIsMeal(location.pathname.includes('meals'));
    if (detailId) {
      fetchData();
    }
  }, [detailId, isMeal]);

  return { mealDetails, drinksDetails, loadingDetails, detailId, setDetailId };
}
