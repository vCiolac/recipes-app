import { useEffect, useState } from 'react';

export type DrinksType = {
  idDrink: string;
  strDrink: string;
  strDrinkAlternate: null;
  strTags: null;
  strVideo: null;
  strCategory: string;
  strIBA: null;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strInstructionsES: null;
  strInstructionsDE: string;
  strInstructionsFR: null;
  strInstructionsIT: string;
  strInstructionsZH_HANS: null;
  strInstructionsZH_HANT: null;
  strDrinkThumb: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: null;
  strIngredient5: null;
  strIngredient6: null;
  strIngredient7: null;
  strIngredient8: null;
  strIngredient9: null;
  strIngredient10: null;
  strIngredient11: null;
  strIngredient12: null;
  strIngredient13: null;
  strIngredient14: null;
  strIngredient15: null;
  strMeasure1: string;
  strMeasure2: null;
  strMeasure3: null;
  strMeasure4: null;
  strMeasure5: null;
  strMeasure6: null;
  strMeasure7: null;
  strMeasure8: null;
  strMeasure9: null;
  strMeasure10: null;
  strMeasure11: null;
  strMeasure12: null;
  strMeasure13: null;
  strMeasure14: null;
  strMeasure15: null;
  strImageSource: null;
  strImageAttribution: null;
  strCreativeCommonsConfirmed: string;
  dateModified: string;
};

export function useFetchDrinks() {
  const [drinkInf, setDrinkInf] = useState<DrinksType[]>([]);
  const [loadingDrink, setloadingDrink] = useState(true);
  async function fetchApi() {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const drinksData = await response.json();
    return drinksData;
  }
  useEffect(() => {
    const dataFetch = async () => {
      setloadingDrink(true);
      const responseAPI = await fetchApi();
      console.log(responseAPI);
      if (responseAPI) setDrinkInf(responseAPI.drinks);
      setloadingDrink(false);
    };
    dataFetch();
  }, []);
  return { drinkInf, loadingDrink };
}
