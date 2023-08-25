export function getSixRecipes(isMeal: boolean, mealInf: any, drinkInf: any) {
  const recipesToDisplay = !isMeal ? mealInf : drinkInf;
  if (recipesToDisplay?.length >= 6) {
    // const randomRecipes = recipesToDisplay.slice().sort(() => Math.random() - 0.5);
    return recipesToDisplay.slice(0, 6);
  }
  return recipesToDisplay;
}
