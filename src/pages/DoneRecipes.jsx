import { Image } from 'react-bootstrap';
import Header from '../components/Header';
import All from '../images/All.svg';
import drinks from '../images/drinks.svg';
import foods from '../images/foods.svg';
import '../styles/DoneRecipes.css';

export default function DoneRecipes() {
  return (
    <div className="done-container">
      <Header />
      <div className="btn-head">
        <button type="button" data-testid="filter-by-all-btn">
          <Image src={ All } alt="All" fluid />
        </button>
        <button type="button" data-testid="filter-by-food-btn">
          <Image src={ foods } alt="Foods" fluid />
        </button>
        <button type="button" data-testid="filter-by-drink-btn">
          <Image src={ drinks } alt="Drinks" fluid />
        </button>
      </div>
      <img data-testid={ `${index}-horizontal-image` } alt="img" />
      <h2 data-testid={ `${index}-horizontal-top-text` }>recipe</h2>
      <h2 data-testid={ `${index}-horizontal-name` }>name</h2>
      <text data-testid={ `${index}-horizontal-done-date` }>texto</text>
      <input data-testid={ `${index}-horizontal-share-btn` } />
      <h2 data-testid={ `${index}-${tagName}-horizontal-tag` }>tags</h2>
    </div>
  );
}
