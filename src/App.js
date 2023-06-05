import React from 'react';
import './App.css';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import RecipesProvider from './context/RecipesProvider';
import Login from './pages/Login';

function App() {
  return (
    <RecipesProvider>
      <h1>App de Receitas</h1>
      <Route exact path="/" component={ Login } />
    </RecipesProvider>
  );
}

export default App;
