import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Context } from '../../context/context';
import Header from '../../components/Header/Header';
import searchIcon from '../../images/searchIcon.svg';
import profileIcon from '../../images/profileIcon.svg';
import plateIcon from '../../images/icone-prato.png';
import drinkIcon from '../../images/icone-bebida.png';
import Footer from '../../components/Footer/Footer';
import { DrinksType, MealType } from '../../types';

function RecipesDetails() {
  const {
    mealDetails,
    drinksDetails,
    loadingDetails,
    detailId,
    setDetailId,
  } = useContext(Context);

  const location = useLocation();

  const [isMeal, setRecipeType] = useState(location.pathname.includes('meals'));
  const [details, setDetails] = useState<MealType[] | DrinksType[]>([]);

  useEffect(() => {
    setDetails(isMeal ? mealDetails : drinksDetails);
  }, [isMeal, mealDetails, drinksDetails]);

  const headerTitle = isMeal ? 'Meals' : 'Drinks';
  const iconTitle = isMeal ? plateIcon : drinkIcon;
  const detailsMap: any = isMeal ? mealDetails : drinksDetails;

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

      <div className="details">
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
            {detailsMap[0].strMealCategory || detailsMap[0].strDrinkCategory}
          </span>

          <p data-testid="instructions">
            {detailsMap[0].strInstructions}
          </p>

          <iframe
            title="video"
            width="560"
            height="315"
            src={ detailsMap[0].strYoutube }
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Measure</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 20 }, (value, ingIndex) => ingIndex + 1).map((num) => (
              <tr key={ num }>
                <td>{detailsMap[0][`strIngredient${num}`]}</td>
                <td>{detailsMap[0][`strMeasure${num}`]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer setRecipeType={ setRecipeType } />
    </div>
  );
}

export default RecipesDetails;
