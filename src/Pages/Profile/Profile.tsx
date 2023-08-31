import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import profileIcon from '../../images/profileIcon.svg';
import useLocalStorage from '../../Hooks/useLocalStorage';

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
        iconTitle={ profileIcon }
      />
      <div>
        <h1 data-testid="profile-email">{ userEmail.email }</h1>
        <button
          onClick={ handleDoneRecipes }
          data-testid="profile-done-btn"
        >
          Done Recipes
        </button>
        <button
          onClick={ handleRecipesFavorite }
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>
        <button
          onClick={ handleLogout }
          data-testid="profile-logout-btn"
        >
          Logout
        </button>
        <Footer />
      </div>
    </>
  );
}

export default Profile;
