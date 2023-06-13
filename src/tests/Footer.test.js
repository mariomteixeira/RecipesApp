import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from '../helpers/renderWithRouter';

describe('Testando o componente <Footer.js />', () => {
  it('Teste se o componente contém o texto "Footer"', () => {
    renderWithRouter(<App />);
    const footer = screen.getByText(/drinks/i);
    expect(footer).toBeInTheDocument();
  });
  it('Testa se o componente possui 2 imagens', () => {
    renderWithRouter(<App />);
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(2);
  });
  it('Testa se ao clicar nas duas imagens é feito o redirecionamento correto', () => {
    renderWithRouter(<App />);
    const images = screen.getAllByRole('img');
    userEvent.click(images[0]);
    expect(window.location.href).toBe('http://localhost/');
    userEvent.click(images[1]);
    expect(window.location.href).toBe('http://localhost/');
  });
});
