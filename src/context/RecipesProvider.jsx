import PropTypes from 'prop-types';
import React, { useState, useMemo } from 'react';
import RecipesContext from './RecipesContext';

export default function RecipesProvider({ children }) {
  const [email, setEmail] = useState('');
  const [passwordLength, setPasswordLength] = useState(0);
  const store = useMemo(() => ({
    email,
    setEmail,
    passwordLength,
    setPasswordLength,
  }), [email, passwordLength]);
  return (
    <RecipesContext.Provider value={ store }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.any,
}.isRequired;
