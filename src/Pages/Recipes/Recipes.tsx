import { useContext, useEffect, useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { Context } from '../../context/context';
import Header from '../../components/Header/Header';
import searchIcon from '../../images/searchIcon.svg';
import profileIcon from '../../images/profileIcon.svg';
import plateIcon from '../../images/icone-prato.png';
import drinkIcon from '../../images/icone-bebida.png';
import Footer from '../../components/Footer/Footer';

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
    if (recipesToDisplay.length >= 12) {
      return recipesToDisplay.slice(0, 12);
    }
    return recipesToDisplay;
  };

  const twelveRecipes = filteredRecipes.length > 1
    ? filteredRecipes.slice(0, 12) : getTwelveRecipes();
  const headerTitle = isMeal ? 'Meals' : 'Drinks';
  const iconTitle = isMeal ? plateIcon : drinkIcon;

  const getFiveCategories = () => {
    return categories.slice(0, 5);
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

  return (
    <div>
      <Header
        title={ headerTitle }
        searchIcon={ searchIcon }
        profileIcon={ profileIcon }
        iconTitle={ iconTitle }
      />
      <div>
        {fiveCategories.map((category, index) => (
          <button
            key={ index }
            data-testid={ `${category}-category-filter` }
            onClick={ () => handleCategories(category) }
          >
            {category}
          </button>
        ))}
        <div>
          <button
            onClick={ () => setButtonName('') }
            data-testid="All-category-filter"
          >
            All
          </button>
        </div>
      </div>
      <div className="cards">
        {twelveRecipes.map((recipe: any, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
            className="recipe-card"
          >
            <span data-testid={ `${index}-card-name` }>
              {recipe.strMeal || recipe.strDrink}
            </span>
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
          </div>
        ))}
      </div>
      <Footer setRecipeType={ setRecipeType } />
    </div>
  );
}

export default Recipes;
