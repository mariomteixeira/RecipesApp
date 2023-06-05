import { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function SearchBar() {
  const { setSearchType, setSearchString, executeSearch } = useContext(RecipesContext);

  const handleRadioChange = ({ target }) => {
    setSearchType(target.value);
  };

  const handleSearchChange = ({ target }) => {
    setSearchString(target.value);
  };

  const handleSearchClick = (event) => {
    event.preventDefault();
    executeSearch();
  };

  return (
    <form>
      <label htmlFor="ingredient-search-radio">
        <input
          id="ingredient-search-radio"
          className="search-bar"
          data-testid="ingredient-search-radio"
          type="radio"
          value="ingredient"
          onChange={ handleRadioChange }
        />
        Ingrediente
      </label>

      <label htmlFor="name-search-radio">
        <input
          id="name-search-radio"
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
          className="search-bar"
          data-testid="first-letter-search-radio"
          type="radio"
          value="first-letter"
          onChange={ handleRadioChange }
        />
        First Letter
      </label>

      <input
        type="text"
        onChange={ handleSearchChange }
        placeholder="Buscar Receita"
      />

      <button
        className="search-bar"
        data-testid="exec-search-btn"
        onClick={ handleSearchClick }
      >
        Executar
      </button>
    </form>
  );
}

export default SearchBar;
