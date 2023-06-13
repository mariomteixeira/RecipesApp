import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouter } from '../helpers/renderWithRouter';

describe('Test a página de Login', () => {
  const testEmail = 'teste@teste.com';
  it('Verifica se existem dois inputs e um botão na renderização inicial', () => {
    renderWithRouter(<App />);
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', /entrar/i)).toBeInTheDocument();
  });
  it('Verifica se o botão inicia desabilitado e se fica habilitado após a digitação correta nos campos', () => {
    renderWithRouter(<App />);
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
  });
  it('Verifica se, após inserir as informações corretas e clicar no botão, a rota muda', async () => {
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
    });
  });
});
