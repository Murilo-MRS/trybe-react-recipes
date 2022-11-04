import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { getStorage } from '../helpers/Storage';
import renderWithRouter from './utils/renderWith';

describe('Testar a barra de navegação', () => {
  it('testar first letter em drinks', async () => {
    const { history } = renderWithRouter(<App />, {
      initialEntries: ['/meals'],
    });

    await waitFor(() => {
      const {
        location: { pathname },
      } = history;
      const burek = screen.getByTestId('1-card-img');
      userEvent.click(burek);
      expect(pathname).toBe('/meals/53060');
    });
    const shareBtn = screen.getByTestId('share-btn');
    userEvent.click(shareBtn);
    const sharelink = screen.getByText(/link copied!/i);
    expect(sharelink).toBeInTheDocument();
    const favoritar = screen.getByRole('img', {
      name: /icone de favoritar/i,
    });
    userEvent.click(favoritar);
    const localStorageitem = getStorage();
    expect(localStorageitem).toBe(
      '{"id":"53060","type":"meals","nationality":"Croatian","category":"Side","name":"Burek","image":"https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg"}',
    );

    const startRecipe = screen.getByTestId('start-recipe-btn');
    expect(startRecipe).toBeInTheDocument();
    userEvent.click(startRecipe);
    act(() => {
      history.push(('/meals/53060'));
      // const getInProgressRecipes = localStorage.getItem('inProgressRecipes');
      // expect(getInProgressRecipes).toBe('{meals: {"53060":[]}}');
      const continueRecipe = screen.getByRole('button', { name: /continue recipe/i });
      expect(continueRecipe).toBeInTheDocument();
      userEvent.click(continueRecipe);
    });
  });
});
