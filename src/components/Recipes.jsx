import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import RecipesContext from '../context/RecipesContext';
import '../styles/Recipes.css';
import Categories from './Categories';

export default function Recipes() {
  const { setSearchResults, searchResults } = useContext(RecipesContext);
  const { pathname } = useLocation();
  useEffect(() => {
    let BASE_URL = '';
    BASE_URL = pathname === '/meals' ? 'https://www.themealdb.com/api/json/v1/1/search.php?s=' : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    fetch(BASE_URL)
      .then((response) => response.json())
      .then((data) => setSearchResults(pathname === '/meals' ? data.meals : data.drinks));
  }, []);
  return (
    <div className="recipe-card-container">
      <Categories />
      <div className="recipe-list">
        {searchResults?.length > 0 && searchResults
          .map((recipe, index) => index < Number('12') && (
            <Link
              className="recipe-card"
              key={ pathname === '/meals' ? recipe.idMeal : recipe.idDrink }
              to={ pathname === '/meals'
                ? `/meals/${recipe.idMeal}` : `/drinks/${recipe.idDrink}` }
              name={ pathname === '/meals' ? recipe.strMeal : recipe.strDrink }
            >
              <RecipeCard
                index={ index }
                id={ pathname === '/meals' ? recipe.idMeal : recipe.idDrink }
                name={ pathname === '/meals' ? recipe.strMeal : recipe.strDrink }
                thumb={ pathname === '/meals'
                  ? recipe.strMealThumb : recipe.strDrinkThumb }
              />
            </Link>
          ))}
      </div>
    </div>
  );
}
