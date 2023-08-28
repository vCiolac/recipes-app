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
  return (
    <div>
      <Header
        title="Done Recipes"
        profileIcon={ profileIcon }
        iconTitle={ doneIcon }
      />
      <button
        data-testid="filter-by-all-btn"
      >
        All

      </button>
      <button
        data-testid="filter-by-meal-btn"
      >
        Meals

      </button>
      <button
        data-testid="filter-by-drink-btn"
      >
        Drinks

      </button>
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

    </div>
  );
}

export default DoneRecipes;
