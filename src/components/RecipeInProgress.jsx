import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import '../styles/RecipeInProgress.css';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function RecipeInProgress(props) {
  const [heartIcon, setHeartIcon] = useState(whiteHeartIcon);
  const [copied, setCopied] = useState(null);
  /* const [finishedRecipe, setFinishedRecipe] = useState(false); */
  const [currentRecipeInProgress, setCurrentRecipeInProgress] = useState(null);
  const [currentIngredientList, setCurrentIngredientList] = useState([]);
  const [checkboxes, setCheckboxes] = useState({});
  const [allChecked, setAllChecked] = useState(false);
  const location = useLocation();
  const { pathname } = location;
  const { match: { params: { id } } } = props;
  const fetchRecipe = () => {
    const BASE_URL = pathname.includes('/meals') ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}` : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(BASE_URL)
      .then((response) => response.json())
      .then((data) => {
        setCurrentRecipeInProgress(pathname.includes('/meals')
          ? data.meals[0] : data.drinks[0]);
      });
  };

  const name = currentRecipeInProgress?.strMeal || currentRecipeInProgress?.strDrink;
  const src = currentRecipeInProgress?.strMealThumb
  || currentRecipeInProgress?.strDrinkThumb;
  const category = currentRecipeInProgress?.category;
  const alcoholic = currentRecipeInProgress?.strAlcoholic;
  const instructions = currentRecipeInProgress?.strInstructions;
  const favoriteRecipe = () => {
    const obj = {
      id: currentRecipeInProgress.idMeal || currentRecipeInProgress.idDrink,
      type: currentRecipeInProgress.idMeal ? 'meal' : 'drink',
      nationality: currentRecipeInProgress.strArea || '',
      category: currentRecipeInProgress.strCategory || '',
      alcoholicOrNot: currentRecipeInProgress.strAlcoholic || '',
      name: currentRecipeInProgress.strMeal || currentRecipeInProgress.strDrink,
      image: currentRecipeInProgress.idMeal
        ? currentRecipeInProgress.strMealThumb : currentRecipeInProgress.strDrinkThumb,
    };
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isFavorite = favoriteRecipes.some((recipe) => (recipe.id === id));
    if (isFavorite) {
      const newFavorites = favoriteRecipes.filter((recipe) => recipe.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes, obj]));
    }
    const favoritedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setHeartIcon(favoritedRecipes
      .some((recipe) => (recipe.id === id)) ? blackHeartIcon : whiteHeartIcon);
  };
  useEffect(() => {
    fetchRecipe();
    const favoritedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setHeartIcon(favoritedRecipes
      .some((recipe) => (recipe.id === id)) ? blackHeartIcon : whiteHeartIcon);
  }, []);

  useEffect(() => {
    if (currentRecipeInProgress) {
      const ingredients = Object.values(Object.entries(currentRecipeInProgress)
        .filter((entry) => entry[0].includes('Ingredient'))
        .filter((ingredient) => ingredient[1] !== '' && ingredient[1] !== null))
        .map((value) => value[1]);
      const amounts = Object.entries(currentRecipeInProgress)
        .filter((entry) => entry[0].includes('Measure'))
        .filter((amount) => amount[1] !== '' && amount[1] !== null)
        .map((value) => value[1]);
      const ingredientList = ingredients
        .map((ingredient, index) => `${ingredient} ${amounts[index]}`);
      setCurrentIngredientList(ingredientList);
    }
  }, [currentRecipeInProgress]);

  useEffect(() => {
    if (currentRecipeInProgress) {
      const ingredients = Object.values(Object.entries(currentRecipeInProgress))
        .filter((entry) => entry[0].includes('Ingredient'))
        .filter((ingredient) => ingredient[1] !== '' && ingredient[1] !== null)
        .map((value) => value[1]);

      const newCheckboxesState = {};
      ingredients.forEach((ingredient, index) => {
        newCheckboxesState[index] = false;
      });
      setCheckboxes(newCheckboxesState);
    }
  }, [currentRecipeInProgress]);

  useEffect(() => {
    setAllChecked(Object.values(checkboxes).every((isChecked) => isChecked));
  }, [checkboxes]);

  const handleCheckboxChange = (index) => {
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [index]: !prevCheckboxes[index],
    }));
  };

  return (
    <div className="recipe-in-progress">
      <h1 data-testid="recipe-title">{ name }</h1>
      <img data-testid="recipe-photo" src={ src } alt={ name } />
      <p data-testid="recipe-category">{ category }</p>
      <p>{ alcoholic }</p>
      {currentIngredientList && (
        <div className="ingredient-container">
          <h3>Ingredients</h3>
          <ul>
            {currentIngredientList?.map((ingredient, index) => (
              <label
                className="renatogaucho"
                data-testid={ `${index}-ingredient-step` }
                key={ index }
                htmlFor=""
              >
                <li>
                  <input
                    type="checkbox"
                    checked={ checkboxes[index] || false }
                    onChange={ (event) => {
                      event.target.classList.add('crossed');
                      handleCheckboxChange(index);
                    } }
                  />
                  <span>{ingredient}</span>
                </li>
              </label>
            ))}
          </ul>
        </div>
      )}
      <h3>Insctructions</h3>
      <p data-testid="instructions">{ instructions }</p>
      <p>{copied}</p>
      <div className="recipe-in-progress-btn">
        <button
          data-testid="share-btn"
          onClick={ () => {
            setCopied('Link copied!');
            copy(`http://localhost:3000/${pathname.includes('meals') ? 'meals' : 'drinks'}/${id}`);
          } }
        >
          <img src={ shareIcon } alt="" />
        </button>
        <button
          data-testid="favorite-btn"
          onClick={ () => favoriteRecipe() }
          src={ heartIcon }
        >
          <img
            src={ heartIcon }
            alt=""
          />
        </button>
        <Link to="/done-recipes">
          <button
            disabled={ !allChecked }
            data-testid="finish-recipe-btn"
          >
            Finalizar
          </button>
        </Link>
      </div>
    </div>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.any,
  params: PropTypes.any,
  id: PropTypes.any,
}.isRequired;
