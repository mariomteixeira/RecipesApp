import { screen, waitFor } from '@testing-library/react';
import copy from 'clipboard-copy';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from '../helpers/renderWithRouter';

jest.mock('clipboard-copy');

describe('Testando o componente DoneRecipes', () => {
  const doneRecipes = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];
  it('Testando se a página contém um título', async () => {
    const Arrabiata = 'Spicy Arrabiata Penne';
    const Aquamarine = 'Aquamarine';

    Storage.prototype.getItem = jest.fn().mockReturnValue(JSON.stringify(doneRecipes));
    copy.mockImplementation(() => {});
    const { history } = renderWithRouter(<App />, { initialEntries: ['/done-recipes'] });
    await screen.findByText('Done Recipes');
    expect(history.location.pathname).toBe('/done-recipes');
    await waitFor(() => expect(localStorage.getItem).toHaveBeenCalled());
    const recipe1Name = await screen.findByText(Arrabiata);
    const recipe2Name = await screen.findByText(Aquamarine);
    expect(recipe1Name).toBeInTheDocument();
    expect(recipe2Name).toBeInTheDocument();
    const copyButton = await screen.findByTestId('0-horizontal-share-btn');
    expect(copyButton).toBeInTheDocument();
    userEvent.click(copyButton);
    expect(copy).toHaveBeenCalled();
    const copied = await screen.findByText('Link copied!');
    expect(copied).toBeInTheDocument();
    const copyButton2 = await screen.findByTestId('1-horizontal-share-btn');
    expect(copyButton2).toBeInTheDocument();
    userEvent.click(copyButton2);
    expect(copy).toHaveBeenCalled();
    const copied2 = await screen.findByText('Link copied!');
    expect(copied2).toBeInTheDocument();
    const mealsBtn = await screen.findByTestId('filter-by-meal-btn');
    expect(mealsBtn).toBeInTheDocument();
    userEvent.click(mealsBtn);
    const recipe1Name2 = await screen.findByText(Arrabiata);
    expect(recipe1Name2).toBeInTheDocument();
    // const recipeAqua = screen.findByTestId('1-horizontal-name');
    // expect(recipeAqua).not.toBeInTheDocument();
    const allBtn = await screen.findByTestId('filter-by-all-btn');
    expect(allBtn).toBeInTheDocument();
    userEvent.click(allBtn);
    const recipe1Name3 = await screen.findByText(Arrabiata);
    const recipe2Name3 = await screen.findByText(Aquamarine);
    expect(recipe1Name3).toBeInTheDocument();
    expect(recipe2Name3).toBeInTheDocument();
    const drinksBtn = await screen.findByTestId('filter-by-drink-btn');
    expect(drinksBtn).toBeInTheDocument();
    userEvent.click(drinksBtn);
    const recipe2Name2 = await screen.findByText(Aquamarine);
    expect(recipe2Name2).toBeInTheDocument();
  });
});
