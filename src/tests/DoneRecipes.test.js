import { screen } from '@testing-library/react';
import { meals } from '../../cypress/mocks/meals';
import App from '../App';
import { renderWithRouter } from '../helpers/renderWithRouter';

describe('Testando o componente DoneRecipes', () => {
  it('Testando se a página contém um título', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(meals),
    });
    const { history } = renderWithRouter(<App />, { initialEntries: ['/done-recipes'] });
    await screen.findByText('Done Recipes');
    expect(history.location.pathname).toBe('/done-recipes');
  });
});
