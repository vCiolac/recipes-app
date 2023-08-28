import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Context } from '../../context/context';
import shareIcon from '../../images/shareIcon.svg';
import favoriteIcon from '../../images/favoriteIcon.png';
import styles from './RecipesCard.module.css';
import useLocalStorage from '../../Hooks/useLocalStorage';
import { InProgressType } from '../../types';

function RecipesCard() {
  const { mealDetails, drinksDetails, loadingMeals } = useContext(Context);
  const location = useLocation();
  const isMeal: any = location.pathname.includes('meals') ? mealDetails : drinksDetails;
  const { localStorageValue: localStorageChecked,
    updateValue: setLocalStorageChecked,
  } = useLocalStorage('inProgressRecipes', {} as InProgressType);
  const pathname = location.pathname.split('/')[1] as 'meals' | 'drinks';
  const idRecipe = location.pathname.split('/')[2];

  function handleChange(event: React.FormEvent<HTMLLabelElement>) {
    const { htmlFor } = event.currentTarget;

    const newCheckedRecipes = localStorageChecked[pathname][idRecipe].includes(htmlFor)
      ? localStorageChecked[pathname][idRecipe].filter((item) => item !== htmlFor)
      : [...localStorageChecked[pathname][idRecipe], htmlFor];
    setLocalStorageChecked({ ...localStorageChecked,
      [pathname]: { [idRecipe]: newCheckedRecipes } });
  }

  if (loadingMeals) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ isMeal[0].strMealThumb || isMeal[0].strDrinkThumb }
        alt={ isMeal[0].strMeal || isMeal[0].strDrink }
      />
      <h1 data-testid="recipe-title">
        {isMeal[0].strMeal
         || isMeal[0].strDrink}
      </h1>
      <div>
        {Array.from({ length: 20 }, (value, ingIndex: any) => ingIndex + 1).map((num) => {
          const allIngredients = isMeal[0][`strIngredient${num}`];
          return allIngredients;
        }).filter((ingredient) => ingredient !== ''
         && ingredient !== null
         && ingredient !== undefined)
          .map((item, index) => (
            <label
              className={ localStorageChecked[pathname][idRecipe].includes(item)
                ? `${styles.recipeChecked}` : '' }
              data-testid={ `${index}-ingredient-step` }
              key={ item }
              htmlFor={ item }
              onChange={ (event) => handleChange(event) }
            >
              <input
                key={ item }
                type="checkbox"
                id={ item }
                checked={ localStorageChecked[pathname][idRecipe].includes(item) }
              />
              {item}
            </label>
          ))}
      </div>
      <button data-testid="share-btn">
        <img src={ shareIcon } alt="Share Recipe" />
      </button>
      <button data-testid="favorite-btn">
        <img src={ favoriteIcon } alt="Favorite Recipe" />
      </button>
      <span data-testid="recipe-category">
        {isMeal[0].strCategory}
      </span>
      <p data-testid="instructions">{isMeal[0].strInstructions}</p>
      <button data-testid="finish-recipe-btn">
        Finish Recipe
      </button>
    </div>
  );
}
export default RecipesCard;
