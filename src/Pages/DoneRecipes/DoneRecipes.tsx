import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../../components/Header/Header';
import profileIcon from '../../images/profileIcon.svg';
import doneIcon from '../../images/DoneIcon.png';
import shareIcon from '../../images/shareIcon.svg';
import useLocalStorage from '../../Hooks/useLocalStorage';
import { RecipeDoneType } from '../../types';

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
      () => {
        console.error('Erro ao colar o link em seu clipboard');
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
      <Header
        title="Done Recipes"
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
      {doneRecipes
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

export default DoneRecipes;
