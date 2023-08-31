import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Context } from '../../context/context';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import plateIcon from '../../images/mealIcon.png';
import drinkIcon from '../../images/drinkIcon.png';
import Footer from '../../components/Footer/Footer';
import { DrinksType, InProgressType, MealType } from '../../types';
import styles from './RecipeDetails.module.css';
import useLocalStorage from '../../Hooks/useLocalStorage';
import {
  getSixRecipes,
} from '../../components/RecipesDetailsHelpers/RecipesDetailsHelpers';

function renderDetailsSection(detailsMap: any, isMeal: boolean) {
  return (
    <div>
      <h1 data-testid="recipe-title">
        {detailsMap[0].strMeal || detailsMap[0].strDrink}
      </h1>
      <img
        data-testid="recipe-photo"
        className="recipe-photo"
        src={ detailsMap[0].strMealThumb || detailsMap[0].strDrinkThumb }
        alt={ detailsMap[0].strMeal || detailsMap[0].strDrink }
      />
      <span data-testid="recipe-category">
        {isMeal ? detailsMap[0].strCategory : detailsMap[0].strAlcoholic}
      </span>
      <p data-testid="instructions">{detailsMap[0].strInstructions}</p>
      <iframe
        title="video"
        width="560"
        height="315"
        data-testid="video"
        src={ detailsMap[0].strYoutube }
      />
    </div>
  );
}

function renderIngredients(detailsMap: any) {
  return (
    <div className="ingredients">
      <div>
        <h3>Ingredient</h3>
        {Array.from({ length: 20 }, (_, ingIndex) => ingIndex + 1).map((num) => {
          const ingredient = detailsMap[0][`strIngredient${num}`];
          if (ingredient) {
            return (
              <p key={ num } data-testid={ `${num - 1}-ingredient-name-and-measure` }>
                {ingredient}
              </p>
            );
          }
          return null;
        })}
      </div>
      <div>
        <h3>Measure</h3>
        {Array.from({ length: 20 }, (_, ingIndex) => ingIndex + 1).map((num) => {
          const measure = detailsMap[0][`strMeasure${num}`];
          if (measure) {
            return (
              <p key={ num } data-testid={ `${num - 1}-ingredient-name-and-measure` }>
                {measure}
              </p>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

function renderCarousel(sixRecipes: any) {
  return (
    <motion.div whileTap={ { cursor: 'grabbing' } } className={ styles.carousel }>
      <motion.div
        className={ styles.inner }
        drag="x"
        dragConstraints={ { left: -700, right: 0 } }
      >
        {sixRecipes?.map((recipe: any, index: number) => (
          <motion.div
            key={ index }
            data-testid={ `${index}-recommendation-card` }
            className={ styles.itemCard }
          >
            <span data-testid={ `${index}-recommendation-title` }>
              {recipe.strMeal || recipe.strDrink}
            </span>
            <img
              className={ styles.img }
              src={ recipe.strMealThumb || recipe.strDrinkThumb }
              alt={ recipe.strMeal || recipe.strDrink }
              data-testid={ `${index}-recommendation-img` }
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

function RecipesDetails() {
  const {
    mealDetails,
    drinksDetails,
    loadingDetails,
    mealInf,
    drinkInf,
  } = useContext(Context);

  const location = useLocation();
  const [isMeal, setRecipeType] = useState(location.pathname.includes('meals'));
  const [details, setDetails] = useState<MealType[] | DrinksType[]>([]);
  const {
    localStorageValue: inProgressRecipes,
    updateValue: setInProgressRecipes,
  } = useLocalStorage('inProgressRecipes', {} as InProgressType);
  const {
    localStorageValue: favoriteRecipes,
    updateValue: setFavoriteRecipes,
  } = useLocalStorage('favoriteRecipes', [] as any[]);

  const [sharedLink, setSharedLink] = useState(false);

  useEffect(() => {
    setDetails(isMeal ? mealDetails : drinksDetails);
  }, [isMeal, mealDetails, drinksDetails]);

  const headerTitle = isMeal ? 'Meals' : 'Drinks';
  const titleLow = isMeal ? 'meals' : 'drinks';
  const iconTitle = isMeal ? plateIcon : drinkIcon;
  const detailsMap: any = isMeal ? mealDetails : drinksDetails;
  const navigate = useNavigate();
  const sixRecipes = getSixRecipes(isMeal, mealInf, drinkInf);
  const recipeId = detailsMap[0]?.idMeal || detailsMap[0]?.idDrink;

  const handleStartRecipe = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    navigate(`/${titleLow}/${recipeId}/in-progress`);
  };

  const isInProgress = inProgressRecipes[isMeal ? 'meals' : 'drinks']?.[recipeId];
  const handleButtonName = !isInProgress ? 'Start Recipe' : 'Continue Recipe';
  const { clipboard } = navigator;
  const recipeLink = `${window.location.origin}${window.location.pathname}`;

  const handleSharedLink = () => {
    clipboard.writeText(recipeLink).then(
      () => {
        setSharedLink(true);
      },
    );
  };

  const handleFavoriteRecipe = () => {
    const newFavorite = {
      id: recipeId,
      type: isMeal ? 'meal' : 'drink',
      nationality: detailsMap[0].strArea || '',
      category: detailsMap[0].strCategory || '',
      alcoholicOrNot: detailsMap[0].strAlcoholic || '',
      name: detailsMap[0].strMeal || detailsMap[0].strDrink,
      image: detailsMap[0].strMealThumb || detailsMap[0].strDrinkThumb,
    };
    if (favoriteRecipes.some((fav) => fav.id === recipeId)) {
      const isAlreadyFav = favoriteRecipes.filter((fav) => fav.id !== recipeId);
      setFavoriteRecipes(isAlreadyFav);
    } else {
      setFavoriteRecipes([...favoriteRecipes, newFavorite]);
    }
  };
  const isFav = favoriteRecipes.some((recipe: any) => recipe.id === recipeId);

  if (loadingDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className={ styles.details }>
        {renderDetailsSection(detailsMap, isMeal)}
        {renderIngredients(detailsMap)}
        {renderCarousel(sixRecipes)}
        <button
          className={ styles.startRecipe }
          type="button"
          data-testid="start-recipe-btn"
          onClick={ handleStartRecipe }
          // disabled={ isInProgress }
        >
          {handleButtonName}
        </button>
        {sharedLink && <span>Link copied!</span>}
        <button
          className={ styles.shareBtn }
          data-testid="share-btn"
          onClick={ handleSharedLink }
        >
          <img src={ shareIcon } alt="Share Recipe" />
        </button>

        <button
          className={ styles.favBtn }
          onClick={ handleFavoriteRecipe }
        >
          <img
            data-testid="favorite-btn"
            src={ !isFav ? whiteHeartIcon : blackHeartIcon }
            alt="Favorite Recipe"
          />
        </button>
      </div>
      <Footer setRecipeType={ setRecipeType } />
    </div>
  );
}

export default RecipesDetails;
