import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../styles/Header.css';

export default function Header() {
  const history = useHistory();
  const locPath = history.location.pathname;
  const lSearch = locPath !== '/profile'
   && locPath !== '/done-recipes'
    && locPath !== '/favorite-recipes';

  const [clickedBar, setClickedBar] = useState();

  const profileClick = () => {
    history.push('/profile');
  };

  const searchClick = () => {
    setClickedBar(!clickedBar);
  };

  const routeName = {
    '/done-recipes': 'DONE RECIPES',
    '/profile': 'PROFILE',
    '/favorite-recipes': 'FAVORITE RECIPES',
    '/meals': 'MEALS',
    '/drinks': 'DRINKS',
  };

  return (
    <div className="header-container">
      <button
        src={ profileIcon }
        data-testid="profile-top-btn"
        onClick={ () => profileClick() }
        className="profile-btn"
      >
        <img src={ profileIcon } alt="Ícone de perfil" />
      </button>
      {lSearch && (
        <button
          src={ searchIcon }
          data-testid="search-top-btn"
          onClick={ () => searchClick() }
          className="search-btn"
        >
          <img src={ searchIcon } alt="Ícone de pesquisa" />
        </button>)}
      {clickedBar && <SearchBar />}
      <p className="page-title" data-testid="page-title">
        {routeName[locPath]}
      </p>
    </div>
  );
}
