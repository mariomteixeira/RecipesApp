function SearchBar() {
  return (
    <>
      <button
      className="search-bar"
      data-testid="ingredient-search-radio"
      type="radio"
      >
        Ingrediente
      </button>
      <button
      className="search-bar"
      data-testid="name-search-radio"
      type="radio"
      >
        Name
      </button>
      <button
      className="search-bar"
      data-testid="first-letter-search-radio"
      type="radio"
      >
        First Letter
      </button>
      <button
      className="search-bar"
      data-testid="exec-search-btn"
      >
        Executar
      </button>
    </>
  );
}

export default SearchBar;