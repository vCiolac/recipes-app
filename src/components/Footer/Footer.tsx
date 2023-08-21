import { NavLink } from 'react-router-dom';
import drikIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import style from '../../styles/footer.module.css';

function Footer() {
  return (
    <footer data-testid="footer" className={ style.footer }>
      <NavLink to="/meals">
        <img src={ mealIcon } alt="meal" data-testid="meals-bottom-btn" />
      </NavLink>
      <NavLink to="/drinks">
        <img src={ drikIcon } alt="drink" data-testid="drinks-bottom-btn" />
      </NavLink>

    </footer>
  );
}

export default Footer;
