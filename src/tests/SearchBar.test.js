import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouter } from '../helpers/renderWithRouter';

describe('Testando o componente <SearchBar.js />', () => {
  const testEmail = 'teste@teste.com';
  window.alert = jest.fn();
  it('Verifica se o componente está sendo renderizado na tela', async () => {
    const { history } = renderWithRouter(<App />);
    const usernameField = screen.getByPlaceholderText('Username');
    const passwordField = screen.getByPlaceholderText('Password');
    const loginBtn = screen.getByRole('button', /entrar/i);
    expect(loginBtn).toBeDisabled();
    userEvent.type(usernameField, 'teste');
    expect(loginBtn).toBeDisabled();
    userEvent.type(passwordField, '1234');
    expect(loginBtn).toBeDisabled();
    userEvent.clear(usernameField);
    userEvent.clear(passwordField);
    userEvent.type(usernameField, testEmail);
    userEvent.type(passwordField, '1234567');
    expect(loginBtn).toBeEnabled();
    expect(history.location.pathname).toBe('/');
    act(() => {
      userEvent.click(loginBtn);
    });
    await waitFor(() => {
      const storedEmail = JSON.parse(localStorage.getItem('user'));
      expect(storedEmail).toEqual({ email: testEmail });
      expect(history.location.pathname).toBe('/meals');
      expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
      expect(screen.getByTestId('search-top-btn')).toBeInTheDocument();
      expect(screen.getByTestId('page-title')).toBeInTheDocument();
      const searchBar = screen.getByTestId('search-top-btn');
      userEvent.click(searchBar);
      expect(screen.getByTestId('search-input')).toBeInTheDocument();
      expect(screen.getByText(/ingrediente/i)).toBeInTheDocument();
      expect(screen.getByText(/name/i)).toBeInTheDocument();
      expect(screen.getByText(/first letter/i)).toBeInTheDocument();
      const searchIngredient = screen.getByTestId('ingredient-search-radio');
      userEvent.click(searchIngredient);
      expect(searchIngredient).toBeChecked();
      const searchName = screen.getByTestId('name-search-radio');
      userEvent.click(searchName);
      expect(searchName).toBeChecked();
      const searchFirstLetter = screen.getByTestId('first-letter-search-radio');
      userEvent.click(searchFirstLetter);
      expect(searchFirstLetter).toBeChecked();
      const searchInput = screen.getByTestId('search-input');
      userEvent.type(searchInput, 'xablau');
      userEvent.click(screen.getByTestId('ingredient-search-radio'));

      act(() => {
        userEvent.click(screen.getByTestId('exec-search-btn'));
      });

      waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
      });
    });
  });
});
