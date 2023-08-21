import Header from '../../components/Header/Header';
import searchIcon from '../../images/searchIcon.svg';
import profileIcon from '../../images/profileIcon.svg';
import drinkIcon from '../../images/drinkIcon.svg';

function Drinks() {
  return (
    <div>
      <Header
        title="Drinks"
        searchIcon={ searchIcon }
        profileIcon={ profileIcon }
        iconTitle={ drinkIcon }
      />
    </div>
  );
}

export default Drinks;
