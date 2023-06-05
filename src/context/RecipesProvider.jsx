import PropTypes from 'prop-types';
import React, { useState, useMemo, useCallback } from 'react';
import RecipesContext from './RecipesContext';

export default function RecipesProvider({ children }) {

  const [email, setEmail] = useState('');
  const [passwordLength, setPasswordLength] = useState(0)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchString, setSearchString] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const executeSearch = useCallback(async () => {
    if (searchString.length === 0) return;

    let url = '';
    if (searchType === 'ingredient') {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchString}`;
    } else if (searchType === 'name') {
      url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchString}`;
    } else if (searchType === 'first-letter') {
      if (searchString.length !== 1) {
        global.alert('Your search must have only 1 (one) character');
        return;
      }
      url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchString}`;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      const data = await response.json();
      setSearchResults(data.meals);
    } catch (error) {
      console.error('Failed to fetch:', error);
    }
  }, [searchType, searchString]);

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
    executeSearch,
  }), [username, password, searchType, searchString, searchResults, executeSearch,email, passwordLength]);

  return (
    <RecipesContext.Provider value={ store }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.any,
}.isRequired;
