import { useContext } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import RecipesContext from '../context/RecipesContext';
import '../styles/Recipes.css';

export default function Recipes() {
  const { searchResults } = useContext(RecipesContext);
  const { pathname } = useLocation();
  return (
    <div className="recipe-list">
      {searchResults.length > 0 && searchResults.map((recipe, index) => (
        <Link
          key={ pathname === '/meals' ? recipe.idMeal : recipe.idDrink }
          to={ pathname === '/meals'
            ? `/meals/${recipe.idMeal}` : `/drinks/${recipe.idDrink}` }
        >
          <RecipeCard
            index={ index }
            id={ pathname === '/meals' ? recipe.idMeal : recipe.idDrink }
            name={ pathname === '/meals' ? recipe.strMeal : recipe.strDrink }
            thumb={ pathname === '/meals' ? recipe.strMealThumb : recipe.strDrinkThumb }
          />
        </Link>
      ))}
    </div>
  );
}
