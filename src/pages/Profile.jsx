import { useHistory } from 'react-router-dom';
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Profile.css';

export default function Profile() {
  const history = useHistory();
  localStorage.setItem('user', JSON.stringify({ email: 'email@mail.com' }));
  localStorage.setItem('doneRecipes', '[]');
  localStorage.setItem('favoriteRecipes', '[]');
  localStorage.setItem('inProgressRecipes', '{}');
  const username = JSON.parse(localStorage.getItem('user'));
  return (
    <>
      <div className="profile">
        <Header />
        <h1>Perfil</h1>
        <span data-testid="profile-email">{username.email}</span>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => { localStorage.clear(); history.push('/'); } }
        >
          Logout
        </button>
      </div>
      <Footer />
    </>
  );
}
