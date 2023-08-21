import Header from '../../components/Header/Header';
import searchIcon from '../../images/searchIcon.svg';
import profileIcon from '../../images/profileIcon.svg';
import plateIcon from '../../images/icone-prato.png';

function Meals() {
  return (
    <div>
      <Header
        title="Meals"
        searchIcon={ searchIcon }
        profileIcon={ profileIcon }
        iconTitle={ plateIcon }
      />
    </div>
  );
}

export default Meals;
