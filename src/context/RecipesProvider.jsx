import PropTypes from 'prop-types';
import React, { useState, useMemo } from 'react';
import RecipesContext from './RecipesContext';

export default function RecipesProvider({ children }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const store = useMemo(() => ({
    username,
    setUsername,
    password,
    setPassword,
  }), []);
  return (
    <RecipesContext.Provider value={ store }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.any,
}.isRequired;
