import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

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
    '/done-recipes': 'Done Recipes',
    '/profile': 'Profile',
    '/favorite-recipes': 'Favorite Recipes',
    '/meals': 'Meals',
    '/drinks': 'Drinks',
  };

  return (
    <div>
      <button
        src={ profileIcon }
        data-testid="profile-top-btn"
        onClick={ () => profileClick() }
      >
        <img src={ profileIcon } alt="Ícone de perfil" />
      </button>
      {lSearch && (
        <button
          src={ searchIcon }
          data-testid="search-top-btn"
          onClick={ () => searchClick() }
        >
          <img src={ searchIcon } alt="Ícone de pesquisa" />
        </button>)}
      {clickedBar && <SearchBar />}
      <p data-testid="page-title">
        {routeName[locPath]}
      </p>
    </div>
  );
}
