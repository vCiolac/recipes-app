import { useState } from 'react';
import { RadioType } from '../../types';

function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const [radio, setRadio] = useState<RadioType>('ingredient');
  const [searchResults, setSearchResults] = useState();

  const searchFood = async () => {
    try {
      if (radio === 'ingredient') {
        const ingredientURL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`;
        const response = await fetch(ingredientURL);
        const data = await response.json();
        setSearchResults(data);
      }
      if (radio === 'name') {
        const nameURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
        const response = await fetch(nameURL);
        const data = await response.json();
        setSearchResults(data);
      }
      if (radio === 'first letter') {
        const firstLetterURL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`;
        const response = await fetch(firstLetterURL);
        const data = await response.json();
        setSearchResults(data);
      }
      setSearchInput('');
    } catch (error) {
      window.alert('Your search must have only 1 (one) character');
    }
  };

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

      <button onClick={ searchFood } data-testid="exec-search-btn">Search</button>
    </div>
  );
}

export default SearchBar;
