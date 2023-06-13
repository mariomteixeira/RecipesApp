import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import '../styles/RecipeInProgress.css';

export default function RecipeInProgress(props) {
  const history = useHistory();
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

  useEffect(() => {
    fetchRecipe();
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
    <div>
      <p>In Progress</p>
      <p data-testid="recipe-title">{ name }</p>
      <img data-testid="recipe-photo" src={ src } alt={ name } />
      <p data-testid="recipe-category">{ category }</p>
      <p>{ alcoholic }</p>
      {currentIngredientList && (
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
      )}
      <p data-testid="instructions">{ instructions }</p>
      <button data-testid="share-btn">Compartilhar</button>
      <button
        onClick={ () => history.push('/done-recipes') }
        data-testid="favorite-btn"
      >
        Favoritar
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
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.any,
  params: PropTypes.any,
  id: PropTypes.any,
}.isRequired;
