import { NavLink } from 'react-router-dom';
import drikIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import style from '../../styles/footer.module.css';

type RecipeTypeSelectorProps = {
  setRecipeType: React.Dispatch<React.SetStateAction<boolean>>;
};

function Footer({ setRecipeType }: RecipeTypeSelectorProps) {
  return (
    <footer data-testid="footer" className={ style.footer }>
      <NavLink to="/meals" onClick={ () => setRecipeType(true) }>
        <img src={ mealIcon } alt="meal" data-testid="meals-bottom-btn" />
      </NavLink>
      <NavLink to="/drinks" onClick={ () => setRecipeType(false) }>
        <img src={ drikIcon } alt="drink" data-testid="drinks-bottom-btn" />
      </NavLink>

    </footer>
  );
}

export default Footer;
