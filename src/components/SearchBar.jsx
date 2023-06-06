import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import RecipesContext from '../context/RecipesContext';

function SearchBar() {
  const {
    setSearchType,
    setSearchString,
    executeSearch,
    searchResults,
  } = useContext(RecipesContext);

  const [alert, setAlert] = useState(false);
  const history = useHistory();

  const handleRadioChange = ({ target }) => {
    setSearchType(target.value);
  };

  const handleSearchChange = ({ target }) => {
    setSearchString(target.value);
  };

  const handleSearchClick = async (event) => {
    event.preventDefault();
    await executeSearch();
    setAlert(searchResults.length === 0);
    if (searchResults.length === 1) {
      const firstPath = history.location.pathname;
      history.push(`/${firstPath}/${searchResults[0].idMeal}`);
    }
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
        onClick={ handleSearchClick }
      >
        Executar
      </button>

      {alert && (
        <div>
          <p>Sorry, we haven't found any recipes for these filters.</p>
        </div>
      )}

    </form>
  );
}

export default SearchBar;
