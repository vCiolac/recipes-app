import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../../components/Header/Header';
import profileIcon from '../../images/profileIcon.svg';
import doneIcon from '../../images/DoneIcon.png';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import useLocalStorage from '../../Hooks/useLocalStorage';
import { RecipeDoneType } from '../../types';

function FavoriteRecipes() {
  const {
    localStorageValue: favoriteRecipes,
    updateValue: setFavoriteRecipes,
  } = useLocalStorage('favoriteRecipes', [] as RecipeDoneType[]);

  const { clipboard } = navigator;
  const [sharedLink, setSharedLink] = useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState('all');

  const handleSharedLink = (id: string, type: string) => {
    const recipeLink = `${window.location.origin}/${type}s/${id}`;
    clipboard.writeText(recipeLink).then(
      () => {
        setSharedLink(true);
      },
      () => {
        console.error('Erro ao colar o link em seu clipboard');
      },
    );
  };

  console.log(favoriteRecipes);

  const handleAll = () => {
    setFilteredRecipes('all');
  };
  const handleMeal = () => {
    setFilteredRecipes('meal');
  };
  const handleDrink = () => {
    setFilteredRecipes('drink');
  };

  const mealRecipes = favoriteRecipes.filter((recipe) => recipe.type === 'meal');
  const drinkRecipes = favoriteRecipes.filter((recipe) => recipe.type === 'drink');

  const getRecipes = () => {
    if (filteredRecipes === 'all') return favoriteRecipes;
    if (filteredRecipes === 'meal') return mealRecipes;
    if (filteredRecipes === 'drink') return drinkRecipes;
  };
  const recipes = getRecipes();

  const handleFavoriteRecipe = (id: string) => {
    if (favoriteRecipes.some((fav) => fav.id === id)) {
      const isAlreadyFav = favoriteRecipes.filter((fav) => fav.id !== id);
      setFavoriteRecipes(isAlreadyFav);
    }
  };

  const isFavorite = (id: string) => {
    if (favoriteRecipes.some((fav) => fav.id === id)) {
      return true;
    }
  };

  return (
    <div>
      <Header
        title="Favorite Recipes"
        profileIcon={ profileIcon }
        iconTitle={ doneIcon }
      />
      <button
        onClick={ handleAll }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        onClick={ handleMeal }
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        onClick={ handleDrink }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {favoriteRecipes
      && (
        <div>
          {recipes?.map((recipe: any, index: number) => (
            <div
              key={ index }
              data-testid={ `${index}-recommendation-card` }
            >
              <NavLink to={ `/${recipe.type}s/${recipe.id}` }>
                <span
                  data-testid={ `${index}-horizontal-name` }
                >
                  {recipe.name }
                </span>
              </NavLink>
              <span data-testid={ `${index}-horizontal-top-text` }>
                {recipe.nationality}
                {' '}
                -
                {' '}
                {recipe.category }
                {recipe.alcoholicOrNot !== '' && ` - ${recipe.alcoholicOrNot}`}
              </span>
              <NavLink to={ `/${recipe.type}s/${recipe.id}` }>
                <img
                  style={ { maxWidth: '100vw', maxHeight: '30vh' } }
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                />
              </NavLink>
              <button
                onClick={ () => handleSharedLink(recipe.id, recipe.type) }
              >
                {sharedLink
                && (
                  <span>
                    Link copied!
                  </span>)}
                <img
                  src={ shareIcon }
                  alt="Share Recipe"
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </button>
              <button
                onClick={ () => handleFavoriteRecipe(recipe.id) }
              >
                <img
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ !isFavorite(recipe.id) ? whiteHeartIcon : blackHeartIcon }
                  alt="Favorite Recipe"
                />
              </button>
              {recipe.tags?.map((tag: any, i: number) => (
                <span
                  key={ i }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag}
                </span>
              ))}
              <span data-testid={ `${index}-horizontal-done-date` }>
                {recipe.doneDate }
              </span>
              {' '}
            </div>))}
        </div>
      )}
    </div>
  );
}

export default FavoriteRecipes;
