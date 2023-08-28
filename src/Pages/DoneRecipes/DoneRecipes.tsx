import { useState } from 'react';
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
  const recipeLink = `${window.location.origin}${window.location.pathname}`;
  const [sharedLink, setSharedLink] = useState(false);
  const [allRecipes, setAllRecipes] = useState(true);
  const [mealsRecipes, setMealsRecipes] = useState(false);
  const [drinksRecipes, setDrinksRecipes] = useState(false);

  const handleSharedLink = () => {
    clipboard.writeText(recipeLink).then(
      () => {
        setSharedLink(true);
      },
      () => {
        console.error('Erro ao colar o link em seu clipboard');
      },
    );
  };
  console.log(doneRecipes[0]);
  const handleAll = () => {
    setAllRecipes(true);
    setMealsRecipes(false);
    setDrinksRecipes(false);
  };
  const handleMeal = () => {
    setAllRecipes(false);
    setMealsRecipes(true);
    setDrinksRecipes(false);
  };
  const handleDrink = () => {
    setAllRecipes(false);
    setMealsRecipes(false);
    setDrinksRecipes(true);
  };
  const isMeal = doneRecipes.filter((recipe) => recipe.type === 'meal');
  const isDrink = doneRecipes.filter((recipe) => recipe.type === 'drink');
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
      {allRecipes
      && (
        <div>
          {doneRecipes?.map((recipe: any, index: number) => (
            <div
              key={ index }
              data-testid={ `${index}-recommendation-card` }
            >
              <span data-testid={ `${index}-horizontal-name` }>
                {recipe.name }
              </span>
              <span data-testid={ `${index}-horizontal-top-text` }>
                {recipe.nationality}
                {' '}
                -
                {' '}
                {recipe.category }
              </span>
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
              />
              <button
                onClick={ handleSharedLink }
              >
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
      {mealsRecipes
      && (
        <div>
          {isMeal?.map((recipe: any, index: number) => (
            <div
              key={ index }
              data-testid={ `${index}-recommendation-card` }
            >
              <span data-testid={ `${index}-horizontal-name` }>
                {recipe.name }
              </span>
              <span data-testid={ `${index}-horizontal-top-text` }>
                {recipe.category }
              </span>
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
              />
              <button
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ handleSharedLink }
              >
                <img src={ shareIcon } alt="Share Recipe" />
              </button>
              {recipe.tags?.map((tag: any, i: number) => (
                <span
                  key={ i }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag[i]}
                </span>
              ))}
              <span data-testid={ `${index}-horizontal-done-date` }>
                {recipe.doneDate }
              </span>
              {' '}

            </div>))}
        </div>
      )}
      {drinksRecipes
      && (
        <div>
          {isDrink?.map((recipe: any, index: number) => (
            <div
              key={ index }
              data-testid={ `${index}-recommendation-card` }
            >
              <span data-testid={ `${index}-horizontal-name` }>
                {recipe.name }
              </span>
              <span data-testid={ `${index}-horizontal-top-text` }>
                {recipe.category }
              </span>
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
              />
              <button
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ handleSharedLink }
              >
                <img src={ shareIcon } alt="Share Recipe" />
              </button>
              {recipe.tags?.map((tag: any, i: number) => (
                <span
                  key={ i }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag[i]}
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
