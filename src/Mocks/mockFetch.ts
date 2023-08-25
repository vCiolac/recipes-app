import { BeefMealsMock } from './beefMealsMock';
import { DrinksCategoryMock, MealsCategoryMock } from './offlineCategories';
import { DrinksMock, MealsMock } from './offlineRecipes';
import { CocktailDrinksMock } from './cocktailDrinksMock';
import { AllMealsMock } from './mealsMock';
import { EggMealsMock } from './eggMealsMock';

const mockFetch = (url: any) => Promise.resolve({

  json: () => {
    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') { return Promise.resolve(MealsCategoryMock); }
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') { return Promise.resolve(AllMealsMock); }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') { return Promise.resolve(DrinksCategoryMock); }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') { return Promise.resolve(DrinksMock); }
    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef') { return Promise.resolve(BeefMealsMock); }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail') { return Promise.resolve(CocktailDrinksMock); }
    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=egg') { return Promise.resolve(EggMealsMock); }
    if (url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977') { return Promise.resolve(MealsMock); }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997') { return Promise.resolve(DrinksMock); }
  },
});

export default mockFetch;
