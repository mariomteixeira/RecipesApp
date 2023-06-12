import PropTypes from 'prop-types';
import React, { useState, useMemo, useCallback/* , useEffect */ } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import RecipesContext from './RecipesContext';

export default function RecipesProvider({ children }) {
  const [email, setEmail] = useState('');
  const [passwordLength, setPasswordLength] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchString, setSearchString] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentRecipeDetails, setCurrentRecipeDetails] = useState({});

  const history = useHistory();
  const executeSearch = useCallback(async () => {
    let BASE_URL = '';
    const { pathname } = history.location;
    if (pathname === '/meals') {
      BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';
    } else {
      BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';
    }
    if (searchString.length === 0) return;
    let url = '';
    if (searchType === 'ingredient') {
      url = `${BASE_URL}filter.php?i=${searchString}`;
    } else if (searchType === 'name') {
      url = `${BASE_URL}search.php?s=${searchString}`;
    } else if (searchType === 'first-letter') {
      if (searchString.length !== 1) {
        global.alert('Your search must have only 1 (one) character');
        return;
      }
      url = `${BASE_URL}search.php?f=${searchString}`;
    }
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      const data = await response.json();
      const results = pathname === '/meals' ? data.meals : data.drinks;
      setSearchResults(results);
      return results;
    } catch (error) {
      console.error('Failed to fetch:', error);
    }
  }, [searchType, searchString, history.location]);

  const store = useMemo(() => ({
    email,
    setEmail,
    passwordLength,
    setPasswordLength,
    username,
    setUsername,
    password,
    setPassword,
    searchType,
    setSearchType,
    searchString,
    setSearchString,
    searchResults,
    setSearchResults,
    executeSearch,
    currentRecipeDetails,
    setCurrentRecipeDetails,
  }), [username,
    password,
    searchType,
    searchString,
    searchResults,
    executeSearch,
    email,
    passwordLength,
  ]);

  return (
    <RecipesContext.Provider value={ store }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.any,
}.isRequired;
