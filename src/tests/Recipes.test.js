import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../helpers/renderWithRouter';
import App from '../App';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';
import mealCategories from '../../cypress/mocks/mealCategories';
import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import drinksByIngredient from '../../cypress/mocks/drinksByIngredient';

describe('Recipes', () => {
  // Ajuda do Gilliady <3 Salvou minha vida
  it('Testando o componente Recipes', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(mealCategories)
        .mockResolvedValueOnce(meals)
        .mockResolvedValueOnce(meals)
        .mockResolvedValueOnce(mealsByIngredient)
        .mockResolvedValueOnce(drinks)
        .mockResolvedValueOnce(drinkCategories)
        .mockResolvedValueOnce(drinks)
        .mockResolvedValueOnce(drinks)
        .mockResolvedValueOnce(drinksByIngredient)
        .mockResolvedValueOnce(meals),
    });
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });
    await screen.findByText('Corba');
    const [link] = screen.getAllByRole('link');
    act(() => userEvent.click(link));
    // console.log(fetch.mock.calls);
    expect(history.location.pathname).toBe('/meals/52977');
    act(() => history.push('/drinks'));
    await screen.findByText('GG');
    const [link2] = screen.getAllByRole('link');
    act(() => userEvent.click(link2));
    expect(history.location.pathname).toBe('/drinks/15997');
  });
});
