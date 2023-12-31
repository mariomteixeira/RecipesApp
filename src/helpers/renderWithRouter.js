import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

function withRouter(component, history) {
  return (
    <Router history={ history }>
      { component }
    </Router>
  );
}

export function renderWithRouter(
  component,
  {
    initialEntries = ['/meals/51'],
    history = createMemoryHistory({ initialEntries }),
  } = {},
) {
  return {
    ...render(withRouter(component, history)),
    history,
  };
}
