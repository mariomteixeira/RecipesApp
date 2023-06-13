import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouter } from '../helpers/renderWithRouter';

describe('Testando o componente <Header.js />', () => {
  const testEmail = 'teste@teste.com';
  it('Verifica se o componente está sendo renderizado na tela Profile', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/'));
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
      const profileBtn = screen.getByTestId('profile-top-btn');
      userEvent.click(profileBtn);
      expect(screen.getByText(/profile/i)).toBeInTheDocument();
      expect(history.location.pathname).toBe('/profile');
    });
  });
});
