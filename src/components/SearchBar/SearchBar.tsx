import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DrinksType, MealType, RadioType } from '../../types';
import { Context } from '../../context/context';
import styles from './SearchBar.module.css';

function SearchBar() {
  const { handleFilteredRecipes, filteredRecipes } = useContext(Context);
  const [searchInput, setSearchInput] = useState('');
  const [radio, setRadio] = useState<RadioType>('ingredient');
  const location = useLocation();
  const navigate = useNavigate();
  const ingredientString = 'ingredient';
  const nameString = 'name';
  const firstLetterString = 'first letter';

  const searchFoods = async () => {
    try {
      if (radio === ingredientString) {
        const ingredientURL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`;
        const response = await fetch(ingredientURL);
        const data = await response.json();
        setSearchInput('');
        return data.meals;
      }
      if (radio === nameString) {
        const nameURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
        const response = await fetch(nameURL);
        const data = await response.json();
        setSearchInput('');
        return data.meals;
      }
      if (radio === firstLetterString) {
        const firstLetterURL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`;
        const response = await fetch(firstLetterURL);
        const data = await response.json();
        setSearchInput('');
        return data.meals;
      }
    } catch (error) {
      window.alert('Your search must have only 1 (one) character');
    }
  };

  const searchDrinks = async () => {
    try {
      if (radio === ingredientString) {
        const ingredientURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`;
        const response = await fetch(ingredientURL);
        const data = await response.json();
        setSearchInput('');
        return data.drinks;
      }
      if (radio === nameString) {
        const nameURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`;
        const response = await fetch(nameURL);
        const data = await response.json();
        setSearchInput('');
        return data.drinks;
      }
      if (radio === firstLetterString) {
        const firstLetterURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`;
        const response = await fetch(firstLetterURL);
        const data = await response.json();
        setSearchInput('');
        return data.drinks;
      }
    } catch (error) {
      window.alert('Your search must have only 1 (one) character');
    }
  };

  const searchByPathName = async () => {
    if (location.pathname === '/meals') {
      const meals = await searchFoods();
      if (!meals) {
        return window.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
      handleFilteredRecipes(meals);
    }
    if (location.pathname === '/drinks') {
      const drinks = await searchDrinks();
      if (!drinks) {
        return window.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
      handleFilteredRecipes(drinks);
    }
  };

  useEffect(() => {
    if (location.pathname === '/meals' && filteredRecipes.length === 1) {
      const searchMealsResults = filteredRecipes as MealType[];
      navigate(`/meals/${searchMealsResults[0].idMeal}`);
    }
    if (location.pathname === '/drinks' && filteredRecipes.length === 1) {
      const searchDrinksResults = filteredRecipes as DrinksType[];
      navigate(`/drinks/${searchDrinksResults[0].idDrink}`);
    }
  }, [navigate, filteredRecipes, location]);

  return (
    <div className={ styles.container }>
      <input
        className={ styles.searchInput }
        onChange={ (event) => setSearchInput(event.target.value) }
        type="text"
        placeholder="Search"
        data-testid="search-input"
        value={ searchInput }
      />

      <div className={ styles.filters }>
        <label htmlFor="ingredient">
          <input
            onClick={ () => setRadio('ingredient') }
            data-testid="ingredient-search-radio"
            type="radio"
            name="radio-search"
            id="ingredient"
          />
          Ingredient
        </label>

        <label htmlFor="name">
          <input
            onClick={ () => setRadio('name') }
            data-testid="name-search-radio"
            type="radio"
            name="radio-search"
            id="name"
          />
          Name
        </label>

        <label htmlFor="firstLetter">
          <input
            onClick={ () => setRadio('first letter') }
            data-testid="first-letter-search-radio"
            type="radio"
            name="radio-search"
            id="firstLetter"
          />
          First letter
        </label>

        <button onClick={ searchByPathName } data-testid="exec-search-btn">Search</button>

      </div>
    </div>
  );
}

export default SearchBar;
