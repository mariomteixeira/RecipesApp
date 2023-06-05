import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testando o componente <Footer.js />', () => {
  it('Teste se o componente contém o texto "Footer"', () => {
    render(<App />);
    const footer = screen.getByText(/Footer/i);
    expect(footer).toBeInTheDocument();
  });
  it('Testa se o componente possui 2 imagens', () => {
    render(<App />);
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(2);
  });
  it('Testa se ao clicar nas duas imagens é feito o redirecionamento correto', () => {
    render(<App />);
    const images = screen.getAllByRole('img');
    userEvent.click(images[0]);
    expect(window.location.href).toBe('http://localhost/');
    userEvent.click(images[1]);
    expect(window.location.href).toBe('http://localhost/');
  });
});
