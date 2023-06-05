import React from 'react';
import './App.css';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import RecipesProvider from './context/RecipesProvider';
import Login from './pages/Login';
import Footer from './components/Footer';

function App() {
  return (
    <RecipesProvider>
      <div className="app-container">
        <h1 className="root">App de Receitas</h1>
        <div className="content">
          <Route exact path="/" component={ Login } />
        </div>
        {/* Passar as páginas e os outros componentes somente acima desta div */}
      </div>
      <Footer />
    </RecipesProvider>
  );
}

export default App;
