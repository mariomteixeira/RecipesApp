import React from 'react';
import './App.css';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import RecipesProvider from './context/RecipesProvider';
import RecipeDetails from './components/RecipeDetails';
import Login from './pages/Login';
import Footer from './components/Footer';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import FavoriteRecipes from './pages/FavoriteRecipes';
import DoneRecipes from './pages/DoneRecipes';

function App() {
  return (
    <RecipesProvider>
      <div className="app-container">
        <h1 className="root">App de Receitas</h1>
        <div className="content">
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Meals } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/meals/:id" component={ RecipeDetails } />
          <Route exact path="/drinks/:id" component={ RecipeDetails } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
        </div>
        {/* Passar as páginas e os outros componentes somente acima desta div */}
      </div>
      <Footer />
    </RecipesProvider>
  );
}

export default App;
