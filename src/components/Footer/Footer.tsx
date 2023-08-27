import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import drikIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import style from './footer.module.css';
import { Context } from '../../context/context';

type RecipeTypeSelectorProps = {
  setRecipeType: React.Dispatch<React.SetStateAction<boolean>>;
};

function Footer({ setRecipeType }: RecipeTypeSelectorProps) {
  const { setButtonName } = useContext(Context);

  const handleClickMeal = () => {
    setRecipeType(true);
    setButtonName('');
  };

  const handleClickDrink = () => {
    setRecipeType(false);
    setButtonName('');
  };

  return (
    <footer data-testid="footer" className={ style.footer }>
      <NavLink to="/meals" onClick={ handleClickMeal }>
        <img src={ mealIcon } alt="meal" data-testid="meals-bottom-btn" />
      </NavLink>
      <NavLink to="/drinks" onClick={ handleClickDrink }>
        <img src={ drikIcon } alt="drink" data-testid="drinks-bottom-btn" />
      </NavLink>

    </footer>
  );
}

export default Footer;
