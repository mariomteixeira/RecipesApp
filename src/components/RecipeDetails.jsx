import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import '../styles/RecipeDetails.css';
import RecommendedRecipes from './RecommendedRecipes';

export default function RecipeDetails(props) {
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [currentIngredients, setCurrentIngredients] = useState(null);
  const [currentAmounts, setCurrentAmounts] = useState(null);
  const [recommendedRecipes, setRecommendedRecipes] = useState(null);
  const { match: { params: { id } } } = props;
  const location = useLocation();
  const { pathname } = location;
  const fetchRecipe = () => {
    const BASE_URL = pathname.includes('/meals') ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}` : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(BASE_URL)
      .then((response) => response.json())
      .then((data) => setCurrentRecipe(pathname.includes('/meals')
        ? data.meals[0] : data.drinks[0]));
  };
  const getIngredientsAndAmounts = () => {
    const ingredients = Object.values(Object.entries(currentRecipe)
      .filter((entry) => entry[0].includes('Ingredient'))
      .filter((ingredient) => ingredient[1] !== '' && ingredient[1] !== null))
      .map((value) => value[1]);
    setCurrentIngredients(ingredients);
    const amounts = Object.entries(currentRecipe)
      .filter((entry) => entry[0].includes('Measure'))
      .filter((amount) => amount[1] !== '' && amount[1] !== null)
      .map((value) => value[1]);
    setCurrentAmounts(amounts);
  };
  const fetchRecommendedRecipe = () => {
    const BASE_URL = pathname.includes('/meals') ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    fetch(BASE_URL)
      .then((response) => response.json())
      .then((data) => setRecommendedRecipes(pathname
        .includes('/meals') ? data.drinks.slice(0, '6') : data.meals.slice(0, '6')));
  };

  useEffect(() => {
    fetchRecipe();
    fetchRecommendedRecipe();
  }, []);

  useEffect(() => {
    if (currentRecipe) getIngredientsAndAmounts();
  }, [currentRecipe]);

  return (
    <>
      {currentRecipe && pathname.includes('/drinks') ? (
        <div>
          <h1 data-testid="recipe-title">{currentRecipe?.strDrink}</h1>
          <p data-testid="recipe-category">{currentRecipe?.strAlcoholic}</p>
          <img
            data-testid="recipe-photo"
            src={ currentRecipe?.strDrinkThumb }
            alt={ currentRecipe.strDrink }
          />
          <p data-testid="instructions">{currentRecipe?.strInstructions}</p>
          <p>{currentRecipe.strAlcoholic}</p>
          <ul>
            {currentIngredients?.map((ingredient, index) => (
              <li
                key={ Math.random() }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${ingredient} ${currentAmounts[index]}`}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h1 data-testid="recipe-title">{currentRecipe?.strMeal}</h1>
          <p data-testid="recipe-category">{currentRecipe?.strCategory}</p>
          <img
            data-testid="recipe-photo"
            src={ currentRecipe?.strMealThumb }
            alt={ currentRecipe?.strMeal }
          />
          <p data-testid="instructions">{currentRecipe?.strInstructions}</p>
          <ul>
            {currentIngredients?.map((ingredient, index) => (
              <li
                key={ Math.random() }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${ingredient} ${currentAmounts[index]}`}
              </li>
            ))}
          </ul>
          <iframe
            width="480"
            height="360"
            src={ currentRecipe?.strYoutube.replace('watch?v=', 'embed/') }
            title={ `${currentRecipe?.strMeal} video` }
            frameBorder="0"
            allow="accelerometer;
          autoplay;
          clipboard-write;
          encrypted-media;
          gyroscope;
          picture-in-picture;
          web-share"
            allowFullScreen
            data-testid="video"
          />
        </div>
      )}
      <button
        className="start-recipe-btn"
        data-testid="start-recipe-btn"
        type="button"
      >
        Start Recipe
      </button>
      <div className="recommended-recipes">
        {recommendedRecipes?.map((recommendedRecipe, index) => (
          <RecommendedRecipes
            key={ index }
            /* recommendedRecipe={ recommendedRecipe } */
            name={ pathname.includes('meal')
              ? recommendedRecipe.strDrink : recommendedRecipe.strMeal }
            index={ index }
            src={ pathname.includes('meal')
              ? recommendedRecipe?.strDrinkThumb : recommendedRecipe?.strMealThumb }
          />
        ))}
      </div>
    </>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.any,
}.isRequired;
