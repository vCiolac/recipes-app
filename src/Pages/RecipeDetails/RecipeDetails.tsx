import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Context } from '../../context/context';
import Header from '../../components/Header/Header';
import searchIcon from '../../images/searchIcon.svg';
import profileIcon from '../../images/profileIcon.svg';
import plateIcon from '../../images/icone-prato.png';
import drinkIcon from '../../images/icone-bebida.png';
import Footer from '../../components/Footer/Footer';
import { DrinksType, MealType } from '../../types';
import styles from './RecipeDetails.module.css';
import useLocalStorage from '../../Hooks/useLocalStorage';

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
    localStorageValue: doneRecipe,
    updateValue: setDoneRecipe,
  } = useLocalStorage('doneRecipe', [] as any[]);

  useEffect(() => {
    setDetails(isMeal ? mealDetails : drinksDetails);
  }, [isMeal, mealDetails, drinksDetails]);

  const headerTitle = isMeal ? 'Meals' : 'Drinks';
  const iconTitle = isMeal ? plateIcon : drinkIcon;
  const detailsMap: any = isMeal ? mealDetails : drinksDetails;

  const getSixRecipes = () => {
    const recipesToDisplay = !isMeal ? mealInf : drinkInf;
    if (recipesToDisplay?.length >= 6) {
      // const randomRecipes = recipesToDisplay.slice().sort(() => Math.random() - 0.5);
      return recipesToDisplay.slice(0, 6);
    }
    return recipesToDisplay;
  };

  const sixRecipes = getSixRecipes();

  const handleStartRecipe = () => {
    const recipeDone = {
      id: detailsMap[0].idMeal || detailsMap[0].idDrink,
      type: isMeal ? 'meal' : 'drink',
      nationality: detailsMap[0].strArea || '',
      category: detailsMap[0].strCategory || '',
      alcoholicOrNot: detailsMap[0].strAlcoholic || '',
      name: detailsMap[0].strMeal || detailsMap[0].strDrink,
      image: detailsMap[0].strMealThumb || detailsMap[0].strDrinkThumb,
      doneDate: detailsMap[0].dateModified || '',
      tags: [detailsMap[0].strTags] || [],
    };
    setDoneRecipe([...doneRecipe, recipeDone]);
  };

  const recipeId = detailsMap[0]?.idMeal || detailsMap[0]?.idDrink;
  const isInLocalStorage = doneRecipe.some((recipe: any) => recipe.id === recipeId);

  if (loadingDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header
        title={ headerTitle }
        searchIcon={ searchIcon }
        profileIcon={ profileIcon }
        iconTitle={ iconTitle }
      />

      <div className={ styles.details }>
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

          {isMeal && (
            <span data-testid="recipe-category">
              {detailsMap[0].strCategory}
            </span>
          )}
          {!isMeal && (
            <span data-testid="recipe-category">
              {detailsMap[0].strAlcoholic}
            </span>
          )}

          <p data-testid="instructions">
            {detailsMap[0].strInstructions}
          </p>

          <iframe
            title="video"
            width="560"
            height="315"
            data-testid="video"
            src={ detailsMap[0].strYoutube }
          />
        </div>
        <div className="ingredients">
          <div>
            <h3>Ingredient</h3>
            {Array.from({ length: 20 }, (value, ingIndex) => ingIndex + 1).map((num) => (
              <p key={ num } data-testid={ `${num - 1}-ingredient-name-and-measure` }>
                {detailsMap[0][`strIngredient${num}`]}
              </p>
            ))}
          </div>
          <div>
            <h3>Measure</h3>
            {Array.from({ length: 20 }, (value, ingIndex) => ingIndex + 1).map((num) => (
              <p key={ num } data-testid={ `${num - 1}-ingredient-name-and-measure` }>
                {detailsMap[0][`strMeasure${num}`]}
              </p>
            ))}
          </div>
        </div>
        <div className={ styles.carouselContainer }>
          <motion.div whileTap={ { cursor: 'grabbing' } } className={ styles.carousel }>
            <motion.div
              className={ styles.inner }
              drag="x"
              dragConstraints={ { left: -700, right: 0 } }
            >
              {sixRecipes?.map((recipe: any, index) => (
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
        </div>
      </div>
      <button
        className={ styles.startRecipe }
        type="button"
        data-testid="start-recipe-btn"
        onClick={ handleStartRecipe }
        disabled={ isInLocalStorage }
      >
        Start Recipe
      </button>
      <Footer setRecipeType={ setRecipeType } />
    </div>
  );
}

export default RecipesDetails;
