import { useState } from 'react';
import recipeAppIcon from '../../images/ícone-Recipes-app.png';

type HeaderProps = {
  title: string,
  searchIcon?: string,
  profileIcon?: string
  iconTitle: string
};

function Header({ title,
  searchIcon = undefined,
  profileIcon = undefined,
  iconTitle }: HeaderProps) {
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
      {profileIcon && <img
        data-testid="profile-top-btn"
        src={ profileIcon }
        alt="Ícone de Perfil"
      />}
      <img src={ iconTitle } alt="Ícone do Título" />
      <h1 data-testid="page-title">{title}</h1>
      {hideSearch
      && <input type="text" placeholder="Search" data-testid="search-input" />}
    </header>
  );
}

export default Header;
