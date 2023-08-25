import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Context } from '../../context/context';
import shareIcon from '../../images/shareIcon.svg';
import favoriteIcon from '../../images/favoriteIcon.png';

function RecipesCard() {
  const { mealDetails, drinksDetails, loadingMeals } = useContext(Context);
  const location = useLocation();

  const isMeal: any = location.pathname.includes('meals') ? mealDetails : drinksDetails;

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
