import { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

export default function RecipeInProgress() {
  const {
    currentRecipeDetails, currentRecipeDetails: { currentIngredients, currentAmounts },
  } = useContext(RecipesContext);
  const name = currentRecipeDetails.strMeal || currentRecipeDetails.strDrink;
  const src = currentRecipeDetails.strMealThumb || currentRecipeDetails.strDrinkThumb;
  const { category } = currentRecipeDetails;
  const alcoholic = currentRecipeDetails?.strAlcoholic;
  const instructions = currentRecipeDetails.strInstructions;
  return (
    <div>
      <p>In Progress</p>
      <p data-testid="recipe-title">{ name }</p>
      <img data-testid="recipe-photo" src={ src } alt={ name } />
      <p data-testid="recipe-category">{ category }</p>
      <p>{ alcoholic }</p>
      <ul>
        {currentIngredients?.map((ingredient, index) => (
          <li
            key={ Math.random() }
          >
            {`${ingredient} ${currentAmounts[index]}`}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{ instructions }</p>
      <button data-testid="share-btn">Compartilhar</button>
      <button data-testid="favorite-btn">Favoritar</button>
      <button data-testid="finish-recipe-btn">Finalizar</button>
    </div>
  );
}
