import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../../components/Header/Header';
import profileIcon from '../../images/profileIcon.png';
import favoriteIcon from '../../images/favoriteIcon.png';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import goldenHeart from '../../images/Favorites/heart.svg';
import shareIcon from '../../images/Favorites/Share.svg';
import AllMeals from '../../images/Favorites/foods.svg';
import AllDrinks from '../../images/Favorites/drinks.svg';
import fastFood from '../../images/Favorites/All.svg';
import useLocalStorage from '../../Hooks/useLocalStorage';
import { RecipeDoneType } from '../../types';
import styles from './FavoriteRecipes.module.css';
import Footer from '../../components/Footer/Footer';

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
    );
  };

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
      <div>
        <Header
          title="Favorites"
          profileIcon={ profileIcon }
          iconTitle={ favoriteIcon }
        />
      </div>
      <div className={ styles.categories }>
        <button
          className={ styles.mapCategories }
          onClick={ handleAll }
          data-testid="filter-by-all-btn"
        >
          <img src={ fastFood } alt="All" />
        </button>
        <button
          className={ styles.mapCategories }
          onClick={ handleMeal }
          data-testid="filter-by-meal-btn"
        >
          <img src={ AllMeals } alt="Meals" />
        </button>
        <button
          className={ styles.mapCategories }
          onClick={ handleDrink }
          data-testid="filter-by-drink-btn"
        >
          <img src={ AllDrinks } alt="Drinks" />
        </button>
      </div>
      <div>
        {favoriteRecipes
      && (
        <div className={ styles.allCards }>
          {recipes?.map((recipe: any, index: number) => (
            <div
              className={ styles.card }
              key={ index }
              data-testid={ `${index}-recommendation-card` }
            >
              <div>
                <NavLink to={ `/${recipe.type}s/${recipe.id}` }>
                  <span
                    className={ styles.name }
                    data-testid={ `${index}-horizontal-name` }
                  >
                    {recipe.name }
                  </span>
                </NavLink>
                <span
                  className={ styles.spans }
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {recipe.nationality !== '' && `${recipe.nationality} - `}
                  {recipe.category}
                  {recipe.alcoholicOrNot !== '' && `- ${recipe.alcoholicOrNot}`}
                </span>
                <div>
                  <button
                    onClick={ () => handleSharedLink(recipe.id, recipe.type) }
                  >
                    {sharedLink
                && (
                  <span
                    className={ styles.spans }
                  >
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
                      src={ !isFavorite(recipe.id) ? whiteHeartIcon : goldenHeart }
                      alt="Favorite Recipe"
                    />
                  </button>
                </div>
                {recipe.tags?.map((tag: any, i: number) => (
                  <span
                    className={ styles.spans }
                    key={ i }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    {tag}
                  </span>
                ))}
                <span
                  className={ styles.spans }
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  {recipe.doneDate }
                </span>
                {' '}
              </div>
              <NavLink to={ `/${recipe.type}s/${recipe.id}` }>
                <img
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                />
              </NavLink>
            </div>))}
        </div>
      )}
      </div>
      <Footer />
    </div>
  );
}

export default FavoriteRecipes;
