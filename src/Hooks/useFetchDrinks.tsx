import { useEffect, useState } from 'react';
import { DrinksType } from '../types';

export function useFetchDrinks() {
  const [drinkInf, setDrinkInf] = useState<DrinksType[]>([]);
  const [loadingDrink, setloadingDrink] = useState(true);
  const [drinksCategories, setDrinksCategories] = useState<string[]>([]);

  async function fetchCategories() {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    if (data && data.drinks) {
      const categories = data.drinks.map((drink: any) => drink.strCategory);
      setDrinksCategories(categories);
    }
  }

  async function fetchDrinks() {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const drinksData = await response.json();
    if (drinksData && drinksData.drinks) {
      setDrinkInf(drinksData.drinks);
    }
  }

  useEffect(() => {
    async function fetchData() {
      setloadingDrink(true);
      await Promise.all([fetchCategories(), fetchDrinks()]);
      setloadingDrink(false);
    }
    fetchData();
  }, []);

  return { drinkInf, loadingDrink, drinksCategories };
}
