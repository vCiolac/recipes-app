import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DrinksType, MealType, RadioType } from '../../types';

function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const [radio, setRadio] = useState<RadioType>('ingredient');
  const [searchMealsResults, setSearchMealsResults] = useState<MealType[]>([]);
  const [searchDrinksResults, setSearchDrinksResults] = useState<DrinksType[]>([]);
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
        setSearchMealsResults(data.meals);
      }
      if (radio === nameString) {
        const nameURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
        const response = await fetch(nameURL);
        const data = await response.json();
        setSearchMealsResults(data.meals);
      }
      if (radio === firstLetterString) {
        const firstLetterURL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`;
        const response = await fetch(firstLetterURL);
        const data = await response.json();
        setSearchMealsResults(data.meals);
      }
      setSearchInput('');
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
        setSearchDrinksResults(data.drinks);
      }
      if (radio === nameString) {
        const nameURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`;
        const response = await fetch(nameURL);
        const data = await response.json();
        setSearchDrinksResults(data.drinks);
      }
      if (radio === firstLetterString) {
        const firstLetterURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`;
        const response = await fetch(firstLetterURL);
        const data = await response.json();
        setSearchDrinksResults(data.drinks);
      }
      setSearchInput('');
    } catch (error) {
      window.alert('Your search must have only 1 (one) character');
    }
  };

  const searchByPathName = () => {
    if (location.pathname === '/meals') {
      searchFoods();
    }
    if (location.pathname === '/drinks') {
      searchDrinks();
    }
  };

  useEffect(() => {
    if (location.pathname === '/meals' && searchMealsResults.length === 1) {
      navigate(`/meals/${searchMealsResults[0].idMeal}`);
    }
    if (location.pathname === '/drinks' && searchDrinksResults.length === 1) {
      navigate(`/drinks/${searchDrinksResults[0].idDrink}`);
    }
  }, [navigate, searchMealsResults, location, searchDrinksResults]);

  return (
    <div>
      <input
        onChange={ (event) => setSearchInput(event.target.value) }
        type="text"
        placeholder="Search"
        data-testid="search-input"
        value={ searchInput }
      />
      <input
        onClick={ () => setRadio('ingredient') }
        data-testid="ingredient-search-radio"
        type="radio"
        name="radio-search"
        id="ingredient"
      />
      Ingredient
      <input
        onClick={ () => setRadio('name') }
        data-testid="name-search-radio"
        type="radio"
        name="radio-search"
        id="name"
      />
      Name
      <input
        onClick={ () => setRadio('first letter') }
        data-testid="first-letter-search-radio"
        type="radio"
        name="radio-search"
        id="firstLetter"
      />
      First letter

      <button onClick={ searchByPathName } data-testid="exec-search-btn">Search</button>
    </div>
  );
}

export default SearchBar;
