import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Context } from '../../context/context';
import shareIcon from '../../images/shareIcon.svg';
import favoriteIcon from '../../images/favoriteIcon.png';
import styles from './RecipesCard.module.css';

function RecipesCard() {
  const { mealDetails, drinksDetails, loadingMeals } = useContext(Context);
  const location = useLocation();
  const isMeal: any = location.pathname.includes('meals') ? mealDetails : drinksDetails;

  function handleChange(event: React.FormEvent<HTMLLabelElement>) {
    const { className } = event.currentTarget;
    event.currentTarget.className = className
    === `${styles.recipeChecked}` ? '' : `${styles.recipeChecked}`;
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
              className=""
              data-testid={ `${index}-ingredient-step` }
              key={ item }
              htmlFor={ item }
              onChange={ (event) => handleChange(event) }
            >
              <input
                key={ item }
                type="checkbox"
                id={ item }
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
