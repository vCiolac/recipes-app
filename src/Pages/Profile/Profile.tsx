import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import profileIcon from '../../images/profileIconBlue.svg';
import useLocalStorage from '../../Hooks/useLocalStorage';
import profileSvg from '../../images/profileIcon.svg';
import styles from './Profile.module.css';
import doneRecipes from '../../images/DoneRecipesButton.svg';
import favoriteRecipes from '../../images/FavoriteRecipesButton.svg';
import logout from '../../images/LogoutButton.svg';

function Profile() {
  const {
    localStorageValue: userEmail,
    updateValue: setUserEmail,
  } = useLocalStorage('user', {} as any);

  const navigate = useNavigate();
  const handleDoneRecipes = () => {
    navigate('/done-recipes');
  };
  const handleRecipesFavorite = () => {
    navigate('/favorite-recipes');
  };
  const handleLogout = () => {
    setUserEmail({});
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      <Header
        title="Profile"
        profileIcon={ profileIcon }
        iconTitle={ profileSvg }
      />
      <div className={ styles.container }>
        <h1 data-testid="profile-email">{ userEmail.email }</h1>
        <div>
          <button
            className={ styles.doneRecipesBtn }
            onClick={ handleDoneRecipes }
            data-testid="profile-done-btn"
          >
            <img src={ doneRecipes } alt="Done Recipes Button" />
            Done Recipes
          </button>
          <hr />
          <button
            className={ styles.favoriteRecipesBtn }
            onClick={ handleRecipesFavorite }
            data-testid="profile-favorite-btn"
          >
            <img src={ favoriteRecipes } alt="Favorite Recipes Button" />
            Favorite Recipes
          </button>
          <hr />
          <button
            onClick={ handleLogout }
            data-testid="profile-logout-btn"
          >
            <img src={ logout } alt="Logout Button" />
            Logout
          </button>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Profile;
