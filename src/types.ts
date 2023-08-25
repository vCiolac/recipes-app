export type HeaderProps = {
  title: string,
  searchIcon?: string,
  profileIcon?: string
  iconTitle: string
};

export type RadioType = 'ingredient' | 'name' | 'first letter';

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

export interface RecipeDoneType {
  id: string;
  type: string;
  nationality: string;
  category: string;
  alcoholicOrNot: string;
  name: string;
  image: string;
  doneDate: string;
  tags: string[];
}
