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
    '/done-recipes': 'Done Recipes',
    '/profile': 'Profile',
    '/favorite-recipes': 'Favorite Recipes',
    '/meals': 'Meals',
    '/drinks': 'Drinks',
  };

  return (
    <div className="page-title">
      <div className='teste'>
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
      </div>
      {clickedBar && <SearchBar />}
      <p className="page-title-name" data-testid="page-title">
        {routeName[locPath]}
      </p>
    </div>
  );
}
