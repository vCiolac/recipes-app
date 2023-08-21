import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import recipeAppIcon from '../../images/ícone-Recipes-app.png';
import SearchBar from '../SearchBar/SearchBar';
import { HeaderProps } from '../../types';

function Header({ title,
  searchIcon = undefined,
  profileIcon = undefined,
  iconTitle }: HeaderProps) {
  const navigate = useNavigate();

  const [hideSearch, setHideSearch] = useState(false);

  return (
    <header>
      <img src={ recipeAppIcon } alt="Ícone Recipes App" />
      <h1>Recipes App</h1>
      {searchIcon
      && (
        <button onClick={ () => setHideSearch(!hideSearch) }>
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="Lupa de Pesquisa"
          />
        </button>)}
      {profileIcon && (
        <button onClick={ () => navigate('/profile') }>
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="Ícone de Perfil"
          />
        </button>)}
      <img src={ iconTitle } alt="Ícone do Título" />
      <h1 data-testid="page-title">{title}</h1>
      {hideSearch
      && (
        <div>
          <SearchBar />
        </div>
      )}
    </header>
  );
}

export default Header;
