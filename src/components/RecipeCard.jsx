import PropTypes from 'prop-types';
import '../styles/RecipeCard.css';

export default function RecipeCard(props) {
  const { id, name, thumb } = props;
  return (
    <div data-testid={ `${id}-recipe-card` } className="recipe-card">
      {name}
      <img src={ thumb } alt={ name } />
    </div>
  );
}

RecipeCard.propTypes = {
  id: PropTypes.any,
  name: PropTypes.any,
  thumb: PropTypes.any,
}.isRequired;
