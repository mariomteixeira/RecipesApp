import PropTypes from 'prop-types';
import '../styles/RecommendedRecipes.css';

export default function RecommendedRecipes({ name, index }) {
  return (
    <div className="recommended-recipe" data-testid={ `${index}-recommendation-card` }>
      <p data-testid={ `${index}-recommendation-title` }>{ name }</p>
    </div>
  );
}

RecommendedRecipes.propTypes = {
  recommendedRecipes: PropTypes.any,
}.isRequired;
