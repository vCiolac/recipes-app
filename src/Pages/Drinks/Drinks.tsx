import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import searchIcon from '../../images/searchIcon.svg';
import profileIcon from '../../images/profileIcon.svg';
import drinkIcon from '../../images/drinkIcon.svg';

function Drinks() {
  return (
    <>
      <Header
        title="Drinks"
        searchIcon={ searchIcon }
        profileIcon={ profileIcon }
        iconTitle={ drinkIcon }
      />
      <Footer />
    </>
  );
}

export default Drinks;
