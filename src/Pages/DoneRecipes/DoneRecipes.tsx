import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../../components/Header/Header';
import profileIcon from '../../images/profileIcon.png';
import doneIcon from '../../images/DoneIcon.png';
import AllMeals from '../../images/Favorites/foods.svg';
import AllDrinks from '../../images/Favorites/drinks.svg';
import fastFood from '../../images/Favorites/All.svg';
import shareIcon from '../../images/Favorites/shareIcon.svg';
import useLocalStorage from '../../Hooks/useLocalStorage';
import { RecipeDoneType } from '../../types';
import styles from './DoneRecipes.module.css';
import Footer from '../../components/Footer/Footer';

function DoneRecipes() {
  const {
    localStorageValue: doneRecipes,
    updateValue: setDoneRecipes,
  } = useLocalStorage('doneRecipes', [] as RecipeDoneType[]);
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

  const mealRecipes = doneRecipes.filter((recipe) => recipe.type === 'meal');
  const drinkRecipes = doneRecipes.filter((recipe) => recipe.type === 'drink');

  const getRecipes = () => {
    if (filteredRecipes === 'all') return doneRecipes;
    if (filteredRecipes === 'meal') return mealRecipes;
    if (filteredRecipes === 'drink') return drinkRecipes;
  };
  const recipes = getRecipes();

  return (
    <div>
      <div>
        <Header
          title="Done Recipes"
          profileIcon={ profileIcon }
          iconTitle={ doneIcon }
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
        {doneRecipes
      && (
        <div className={ styles.allCards }>
          <div className={ styles.doneContainer }>
            {recipes?.map((recipe: any, index: number) => (
              <div
                className={ styles.card }
                key={ index }
                data-testid={ `${index}-recommendation-card` }
              >
                <NavLink to={ `/${recipe.type}s/${recipe.id}` }>
                  <span
                    className={ styles.name }
                    data-testid={ `${index}-horizontal-name` }
                  >
                    {recipe.name }
                  </span>
                </NavLink>
                <span
                  className={ styles.topText }
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
                  {recipe.tags?.map((tag: any, i: number) => (
                    <span
                      className={ styles.tagss }
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
                    style={ { maxWidth: '100vw', maxHeight: '30vh' } }
                    src={ recipe.image }
                    alt={ recipe.name }
                    data-testid={ `${index}-horizontal-image` }
                  />
                </NavLink>
              </div>))}
          </div>
        </div>
      )}
      </div>
      <Footer />
    </div>
  );
}

export default DoneRecipes;
