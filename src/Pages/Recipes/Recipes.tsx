import { useContext, useEffect, useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { Context } from '../../context/context';
import Header from '../../components/Header/Header';
import searchIcon from '../../images/searchIcon.png';
import profileIcon from '../../images/profileIcon.png';
import plateIcon from '../../images/mealIcon.png';
import drinkIcon from '../../images/drinkIcon.png';
import Footer from '../../components/Footer/Footer';
import styles from './Recipes.module.css';
import allMealsImg from '../../images/ImagesPageRecipes/AllMeals.svg';
import beefImg from '../../images/ImagesPageRecipes/beef.svg';
import goatImg from '../../images/ImagesPageRecipes/goat.svg';
import chickenImg from '../../images/ImagesPageRecipes/chicken.svg';
import breakfastImg from '../../images/ImagesPageRecipes/breakfast.svg';
import dessertImg from '../../images/ImagesPageRecipes/dessert.svg';
import cocktailImg from '../../images/ImagesPageRecipes/cocktail.svg';
import cocoaImg from '../../images/ImagesPageRecipes/cocoa.svg';
import allDrinksImg from '../../images/ImagesPageRecipes/AllDrinks.svg';
import shakeImg from '../../images/ImagesPageRecipes/shake.svg';
import otherImg from '../../images/ImagesPageRecipes/other.svg';
import ordinaryDrinkImg from '../../images/ImagesPageRecipes/OrdinaryDrink.svg';

function Recipes() {
  const {
    mealInf,
    loadingMeals,
    drinkInf,
    loadingDrink,
    mealCategories,
    drinksCategories,
    setButtonName,
    buttonName,
    mealFilterCategories,
    drinksFilterCategories,
    loadingCategories,
    setDetailId,
    filteredRecipes,
  } = useContext(Context);

  const location = useLocation();

  const [isMeal, setRecipeType] = useState(location.pathname.includes('meals'));
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(isMeal ? mealCategories : drinksCategories);
  }, [isMeal, mealCategories, drinksCategories]);

  const getTwelveRecipes = () => {
    const recipesToDisplay = isMeal ? mealInf : drinkInf;

    if (buttonName) {
      const newArray = isMeal ? mealFilterCategories : drinksFilterCategories;
      if (newArray.length >= 12) {
        return newArray.slice(0, 12);
      }
      return newArray;
    }
    if (recipesToDisplay?.length >= 12) {
      return recipesToDisplay.slice(0, 12);
    }
    return recipesToDisplay;
  };

  const twelveRecipes = filteredRecipes?.length > 1
    ? filteredRecipes.slice(0, 12) : getTwelveRecipes();
  const headerTitle = isMeal ? 'Meals' : 'Drinks';
  const iconTitle = isMeal ? plateIcon : drinkIcon;

  const getFiveCategories = () => {
    return categories?.slice(0, 5);
  };

  const fiveCategories = getFiveCategories();

  const handleCategories = (category: string) => {
    if (buttonName === category) {
      return setButtonName('');
    }
    setButtonName(category);
  };

  if (loadingMeals || loadingDrink || loadingCategories) {
    return <div>Loading...</div>;
  }

  const allCategoriesImgs = {
    Beef: beefImg,
    Goat: goatImg,
    Chicken: chickenImg,
    Breakfast: breakfastImg,
    Dessert: dessertImg,
    'Ordinary Drink': ordinaryDrinkImg,
    Cocktail: cocktailImg,
    Shake: shakeImg,
    'Other / Unknown': otherImg,
    Cocoa: cocoaImg,
  };

  return (
    <div>
      <Header
        title={ headerTitle }
        searchIcon={ searchIcon }
        profileIcon={ profileIcon }
        iconTitle={ iconTitle }
      />
      <div>
        <div className={ styles.categories }>
          <button
            className={ styles.allBtn }
            onClick={ () => setButtonName('') }
            data-testid="All-category-filter"
          >
            <img src={ isMeal ? allMealsImg : allDrinksImg } alt="Recipes" />
            All
          </button>
          {fiveCategories?.map((category, index) => (
            <button
              className={ styles.mapCategories }
              key={ index }
              data-testid={ `${category}-category-filter` }
              onClick={ () => handleCategories(category) }
            >
              <img src={ allCategoriesImgs[category] } alt="Category" />
              {category}
            </button>
          ))}
          <div />
        </div>
        <div className={ styles.allCards }>
          {twelveRecipes?.map((recipe: any, index) => (
            <div
              className={ styles.card }
              key={ index }
              data-testid={ `${index}-recipe-card` }
            >
              <NavLink
                to={ isMeal ? `/meals/${recipe.idMeal} ` : `/drinks/${recipe.idDrink}` }
                onClick={ () => setDetailId(isMeal ? recipe.idMeal : recipe.idDrink) }
              >
                <img
                  src={ recipe.strMealThumb || recipe.strDrinkThumb }
                  alt={ recipe.strMeal || recipe.strDrink }
                  data-testid={ `${index}-card-img` }
                />
              </NavLink>
              <span data-testid={ `${index}-card-name` }>
                {recipe.strMeal || recipe.strDrink}
              </span>
            </div>
          ))}
        </div>
        <Footer setRecipeType={ setRecipeType } />
      </div>
    </div>
  );
}

export default Recipes;
