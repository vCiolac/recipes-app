import Header from '../../components/Header/Header';
import profileIcon from '../../images/profileIcon.svg';
import favoriteIcon from '../../images/favoriteIcon.png';

function FavoriteRecipes() {
  return (
    <div>
      <Header
        title="Favorite Recipes"
        profileIcon={ profileIcon }
        iconTitle={ favoriteIcon }
      />
    </div>
  );
}

export default FavoriteRecipes;
