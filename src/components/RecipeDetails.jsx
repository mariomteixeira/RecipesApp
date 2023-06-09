import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import '../styles/RecipeDetails.css';
import RecommendedRecipes from './RecommendedRecipes';

export default function RecipeDetails(props) {
  const history = useHistory();
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [currentRecipeDetails, setCurrentRecipeDetails] = useState({});
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
      .then((data) => {
        setCurrentRecipe(pathname.includes('/meals') ? data.meals[0] : data.drinks[0]);
        if (pathname.includes('/meals')) {
          setCurrentRecipeDetails({
            name: data.meals[0].strMeal,
            category: data.meals[0].strCategory,
            src: data.meals[0].strMealThumb,
            instructions: data.meals[0].strInstructions,
            link: data.meals[0].strYoutube,
          });
        } else {
          setCurrentRecipeDetails({
            name: data.drinks[0].strDrink,
            category: data.drinks[0].strCategory,
            src: data.drinks[0].strDrinkThumb,
            instructions: data.drinks[0].strInstructions,
            alcoholic: data.drinks[0].strAlcoholic,
          });
        }
      });
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
  const handleClick = () => {
    history.push(`${pathname}/in-progress`);
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
      {currentRecipe && (
        <div>
          <h1 data-testid="recipe-title">{currentRecipeDetails.name}</h1>
          <p data-testid="recipe-category">{currentRecipeDetails.alcoholic}</p>
          <p data-testid="recipe-category">{currentRecipeDetails.category}</p>
          <img
            data-testid="recipe-photo"
            src={ currentRecipeDetails.src }
            alt={ currentRecipeDetails.name }
          />
          <p data-testid="instructions">{currentRecipeDetails.instructions}</p>
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
            src={ currentRecipeDetails.link?.replace('watch?v=', 'embed/') }
            title={ `${currentRecipeDetails.name} video` }
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
        onClick={ () => handleClick() }
        type="button"
      >
        Start Recipe
      </button>
      <div className="recommended-recipes">
        {recommendedRecipes?.map((recommendedRecipe, index) => (
          <RecommendedRecipes
            key={ index }
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
