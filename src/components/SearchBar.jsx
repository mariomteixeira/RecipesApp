import { useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import RecipesContext from '../context/RecipesContext';
import HandleSearchClick from './HandleSearchClick';

function SearchBar() {
  const {
    setSearchType,
    setSearchString,
    executeSearch,
  } = useContext(RecipesContext);

  const history = useHistory();

  const handleRadioChange = ({ target }) => {
    setSearchType(target.value);
  };

  const handleSearchChange = ({ target }) => {
    setSearchString(target.value);
  };

  return (
    <form>
      <label htmlFor="ingredient-search-radio">
        <input
          id="ingredient-search-radio"
          className="search-bar"
          data-testid="ingredient-search-radio"
          name="radio-btn"
          type="radio"
          value="ingredient"
          onChange={ handleRadioChange }
        />
        Ingrediente
      </label>

      <label htmlFor="name-search-radio">
        <input
          id="name-search-radio"
          name="radio-btn"
          className="search-bar"
          data-testid="name-search-radio"
          type="radio"
          value="name"
          onChange={ handleRadioChange }
        />
        Name
      </label>

      <label htmlFor="first-letter-search-radio">
        <input
          id="first-letter-search-radio"
          name="radio-btn"
          className="search-bar"
          data-testid="first-letter-search-radio"
          type="radio"
          value="first-letter"
          onChange={ handleRadioChange }
        />
        First Letter
      </label>

      <input
        data-testid="search-input"
        type="text"
        onChange={ handleSearchChange }
        placeholder="Buscar Receita"
      />

      <button
        className="search-bar"
        data-testid="exec-search-btn"
        onClick={ () => HandleSearchClick(executeSearch, history) }
        type="button"
      >
        Executar
      </button>
    </form>
  );
}

export default SearchBar;
