import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../../context/context';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import styles from './RecipesCard.module.css';
import useLocalStorage from '../../Hooks/useLocalStorage';
import { InProgressType, RecipeDoneType, UrlInfoType } from '../../types';

function RecipesCard() {
  const [urlInfo, setUrlInfo] = useState<UrlInfoType>({
    pathname: 'meals',
    idRecipe: '',
  });
  const { idRecipe, pathname } = urlInfo;
  const [sharedLink, setSharedLink] = useState(false);
  const [ingredientsList, setIngredientsList] = useState<string[]>([]);
  const { mealDetails, drinksDetails, loadingMeals } = useContext(Context);
  const location = useLocation();
  const isMeal: any = location.pathname.includes('meals') ? mealDetails : drinksDetails;
  const { localStorageValue: localStorageChecked,
    updateValue: setLocalStorageChecked,
  } = useLocalStorage('inProgressRecipes', {} as InProgressType);
  const { clipboard } = navigator;
  const recipeLink = `${window.location.origin}${window.location.pathname.slice(0, -12)}`;
  const {
    localStorageValue: favoriteRecipes,
    updateValue: setFavoriteRecipes,
  } = useLocalStorage('favoriteRecipes', [] as any[]);
  const {
    localStorageValue: doneRecipes,
    updateValue: setDoneRecipes,
  } = useLocalStorage('doneRecipes', [] as RecipeDoneType[]);
  const navigate = useNavigate();

  const handleSharedLink = () => {
    clipboard.writeText(recipeLink).then(
      () => {
        setSharedLink(true);
      },
    );
  };

  useEffect(() => {
    const currPathname = location.pathname.split('/')[1] as 'meals' | 'drinks';
    const currIdRecipe = location.pathname.split('/')[2];
    setUrlInfo({ pathname: currPathname, idRecipe: currIdRecipe });

    const storedValue = localStorage.getItem('inProgressRecipes');
    if (!storedValue) {
      setLocalStorageChecked({ ...localStorageChecked,
        [currPathname]: { [currIdRecipe]: [] } });
    } else if (!JSON.parse(storedValue)[currPathname]
      || !JSON.parse(storedValue)[currPathname][currIdRecipe]) {
      setLocalStorageChecked({ ...JSON.parse(storedValue),
        [currPathname]: {
          ...JSON.parse(storedValue)[currPathname],
          [currIdRecipe]: [],
        } });
    }
    if (isMeal[0]) {
      const newIngredientsList = Array
        .from({ length: 20 }, (value, ingIndex: any) => ingIndex + 1).map((num) => {
          const ingredients = isMeal[0][`strIngredient${num}`];
          const measures = isMeal[0][`strMeasure${num}`];
          if (ingredients && measures) return `${ingredients} - ${measures}`;
          if (ingredients && !measures) return `${ingredients}`;
          return '';
        }).filter((ingredient) => ingredient.length > 1);
      setIngredientsList(newIngredientsList);
    }
  }, [location.pathname, isMeal]);

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    const { id } = event.currentTarget;

    const newCheckedRecipes = localStorageChecked[pathname][idRecipe].includes(id)
      ? localStorageChecked[pathname][idRecipe].filter((item) => item !== id)
      : [...localStorageChecked[pathname][idRecipe], id];
    setLocalStorageChecked({ ...localStorageChecked,
      [pathname]: { ...localStorageChecked[pathname], [idRecipe]: newCheckedRecipes } });
  }

  const handleFavoriteRecipe = () => {
    const newFavorite = {
      id: idRecipe,
      type: pathname.slice(0, -1),
      nationality: isMeal[0].strArea || '',
      category: isMeal[0].strCategory || '',
      alcoholicOrNot: isMeal[0].strAlcoholic || '',
      name: isMeal[0].strMeal || isMeal[0].strDrink,
      image: isMeal[0].strMealThumb || isMeal[0].strDrinkThumb,
    };
    if (favoriteRecipes.some((fav) => fav.id === idRecipe)) {
      const isAlreadyFav = favoriteRecipes.filter((fav) => fav.id !== idRecipe);
      setFavoriteRecipes(isAlreadyFav);
    } else {
      setFavoriteRecipes([...favoriteRecipes, newFavorite]);
    }
  };
  const isFav = favoriteRecipes.some((recipe: any) => recipe.id === idRecipe);

  const handleDoneRecipe = () => {
    const newDoneRecipe = {
      id: idRecipe,
      nationality: isMeal[0].strArea || '',
      name: isMeal[0].strMeal || isMeal[0].strDrink,
      category: isMeal[0].strCategory || '',
      image: isMeal[0].strMealThumb || isMeal[0].strDrinkThumb,
      tags: isMeal[0].strTags?.split(',') || [],
      alcoholicOrNot: isMeal[0].strAlcoholic || '',
      type: pathname.slice(0, -1),
      doneDate: new Date().toISOString(),
    };
    setDoneRecipes([...doneRecipes, newDoneRecipe]);
    navigate('/done-recipes');
  };

  if (loadingMeals) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 data-testid="recipe-title">
        {isMeal[0].strMeal
         || isMeal[0].strDrink}
      </h1>
      <img
        data-testid="recipe-photo"
        src={ isMeal[0].strMealThumb || isMeal[0].strDrinkThumb }
        alt={ isMeal[0].strMeal || isMeal[0].strDrink }
      />

      <section data-testid="recipe-category">
        <h3>Categorie</h3>
        {pathname === 'meals' ? isMeal[0].strCategory : isMeal[0].strAlcoholic}
      </section>

      <div>
        <h3>Ingredients</h3>
        <ul className={ styles.ingredientsList }>
          {ingredientsList.map((item, index) => (
            <li key={ item }>
              <label
                className={ (localStorageChecked[pathname]
                && localStorageChecked[pathname][idRecipe]?.includes(item))
                  ? `${styles.recipeChecked}` : '' }
                data-testid={ `${index}-ingredient-step` }
                htmlFor={ item }
              >
                <input
                  onChange={ (event) => handleChange(event) }
                  key={ item }
                  type="checkbox"
                  id={ item }
                  checked={ (localStorageChecked[pathname]
                    ? localStorageChecked[pathname][idRecipe]?.includes(item) : false) }
                />
                {item}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <section>
        <h3>Instructions</h3>
        <p data-testid="instructions">{isMeal[0].strInstructions}</p>
      </section>

      {isMeal[0].strYoutube && (
        <section>
          <h3>Video</h3>
          <iframe
            title="video"
            width="360"
            data-testid="video"
            src={ `http://www.youtube.com/embed/${isMeal[0].strYoutube.slice(32)}` }
          />
        </section>)}

      <button
        data-testid="finish-recipe-btn"
        disabled={ ingredientsList.length
          !== localStorageChecked[pathname]?.[idRecipe].length }
        onClick={ handleDoneRecipe }
      >
        Finish Recipe
      </button>
      {sharedLink && <span>Link copied!</span>}

      <button data-testid="share-btn" onClick={ handleSharedLink }>
        <img src={ shareIcon } alt="Share Recipe" />
      </button>

      <button onClick={ handleFavoriteRecipe }>
        <img
          data-testid="favorite-btn"
          src={ !isFav ? whiteHeartIcon : blackHeartIcon }
          alt="Favorite Recipe"
        />
      </button>
    </div>
  );
}
export default RecipesCard;
