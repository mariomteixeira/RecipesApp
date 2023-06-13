import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../helpers/renderWithRouter';
import App from '../pages/Profile';

describe('Teste o componente <Profile.js />', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify({ email: 'email@mail.com' }));
  });

  it('Verifica se a página contém as informações do usuário', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/profile'));
    const email = screen.getByTestId('profile-email');
    expect(email).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });

  it('Testa se a rota é alterada para a página de receitas feitas', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/profile'));
    const doneRecipes = screen.getByTestId('profile-done-btn');
    userEvent.click(doneRecipes);
    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
  });

  it('Testa se a rota é alterada para a página de receitas favoritas', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/profile'));
    const favoriteRecipes = screen.getByTestId('profile-favorite-btn');
    userEvent.click(favoriteRecipes);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorite-recipes');
  });

  it('Testa se ao clicar no botão de sair, a rota é alterada para a página de login', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/profile'));
    const logout = screen.getByTestId('profile-logout-btn');
    userEvent.click(logout);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
