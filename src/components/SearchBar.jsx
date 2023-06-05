import { useContext } from 'react';
import { RecipesContext } from '../context/RecipesContext';

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
    <>
      <input
        className="search-bar"
        data-testid="ingredient-search-radio"
        type="radio"
        value="ingredient"
        onChange={ handleRadioChange }
      >
        Ingrediente
      </input>
      <label htmlFor="ingredient-search-radio">Ingredient</label>

      <input
        className="search-bar"
        data-testid="name-search-radio"
        type="radio"
        value="name"
        onChange={ handleRadioChange }
      >
        Name
      </input>
      <label htmlFor="name-search-radio">Name</label>

      <input
        className="search-bar"
        data-testid="first-letter-search-radio"
        type="radio"
        value="first-letter"
        onChange={ handleRadioChange }
      >
        First Letter
      </input>
      <label htmlFor="first-letter-search-radio">First Letter</label>

      <input
        type="text"
        onChange={ handleSearchChange }
        placeholder="Buscar Receita"
      />

      <input
        className="search-bar"
        data-testid="exec-search-btn"
        onClick={ handleSearchClick }
      >
        Executar
      </input>
    </>
  );
}

export default SearchBar;
