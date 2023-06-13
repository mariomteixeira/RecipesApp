import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from '../helpers/renderWithRouter';

describe('Testando o componente <Footer.js />', () => {
  it('Teste se o componente contém o texto "Footer"', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/drinks'));
    const footer = screen.getByTestId('drinks-bottom-btn');
    expect(footer).toBeInTheDocument();
  });
  it('Testa se ao clicar nas duas imagens é feito o redirecionamento correto', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));
    const images = screen.getAllByRole('img');
    userEvent.click(images[0]);
    expect(window.location.href).toBe('http://localhost/');
    userEvent.click(images[1]);
    expect(window.location.href).toBe('http://localhost/');
  });
});
