import React from 'react';
import './App.css';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import RecipesProvider from './context/RecipesProvider';
import RecipeDetails from './components/RecipeDetails';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import FavoriteRecipes from './pages/FavoriteRecipes';
import DoneRecipes from './pages/DoneRecipes';
import RecipeInProgress from './components/RecipeInProgress';
import './images/bandeja.svg';

function App() {
  return (
    <RecipesProvider>
      <div className="app-container">
        <div className="content">
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Meals } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/meals/:id" component={ RecipeDetails } />
          <Route exact path="/meals/:id/in-progress" component={ RecipeInProgress } />
          <Route exact path="/drinks/:id" component={ RecipeDetails } />
          <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
        </div>
      </div>
    </RecipesProvider>
  );
}

export default App;
