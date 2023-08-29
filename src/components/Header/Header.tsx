import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import recipeAppIcon from '../../images/ícone-Recipes-app.png';
import SearchBar from '../SearchBar/SearchBar';
import { HeaderProps } from '../../types';
import styles from './Header.module.css';
import nameLogo from '../../images/logoName-Recipesapp.png';

function Header({ title,
  searchIcon = undefined,
  profileIcon = undefined,
  iconTitle }: HeaderProps) {
  const navigate = useNavigate();

  const [hideSearch, setHideSearch] = useState(false);

  return (

    <main>
      <header className={ styles.headerContainer }>
        <img
          className={ styles.recipeImg }
          src={ recipeAppIcon }
          alt="Ícone Recipes App"
        />
        <img className={ styles.nameLogoImg } src={ nameLogo } alt="Recipes App" />

        <nav>
          {searchIcon
      && (
        <button
          className={ styles.searchSpyglass }
          onClick={ () => setHideSearch(!hideSearch) }
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="Lupa de Pesquisa"
          />
        </button>)}
          {profileIcon && (
            <button
              className={ styles.profileIcon }
              onClick={ () => navigate('/profile') }
            >
              <img
                data-testid="profile-top-btn"
                src={ profileIcon }
                alt="Ícone de Perfil"
              />
            </button>)}
        </nav>
        <div className={ styles.divIconAndTitle }>
          <img className={ styles.recipeIcon } src={ iconTitle } alt="Ícone do Título" />
          <h1 data-testid="page-title">{title}</h1>
        </div>
      </header>
      {hideSearch
      && (
        <SearchBar />
      )}
    </main>
  );
}

export default Header;
