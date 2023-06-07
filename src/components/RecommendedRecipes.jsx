import PropTypes from 'prop-types';

export default function RecommendedRecipes({ recommendedRecipes }) {
  console.log(recommendedRecipes);
  return (
    <p>Recommended</p>
  );
}

RecommendedRecipes.propTypes = {
  recommendedRecipes: PropTypes.any,
}.isRequired;
