import PropTypes from 'prop-types';
import '../styles/RecipeCard.css';

export default function RecipeCard(props) {
  const { index, name, thumb } = props;
  if (index < Number('12')) {
    return (
      <div data-testid={ `${index}-recipe-card` } className="recipe-card">
        <p data-testid={ `${index}-card-name` }>{name}</p>
        <img data-testid={ `${index}-card-img` } src={ thumb } alt={ name } />
      </div>
    );
  }
}

RecipeCard.propTypes = {
  id: PropTypes.any,
  name: PropTypes.any,
  thumb: PropTypes.any,
}.isRequired;
