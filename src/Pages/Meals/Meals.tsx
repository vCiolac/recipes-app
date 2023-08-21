import Footer from '../../components/Footer';
import Header from '../../components/Header/Header';
import searchIcon from '../../images/searchIcon.svg';
import profileIcon from '../../images/profileIcon.svg';
import plateIcon from '../../images/icone-prato.png';

function Meals() {
  return (
    <>
      <Header
        title="Meals"
        searchIcon={ searchIcon }
        profileIcon={ profileIcon }
        iconTitle={ plateIcon }
      />
      <Footer />
    </>
  );
}

export default Meals;
