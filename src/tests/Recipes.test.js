import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
// import Provider from '../context/Provider';
import renderWithRouter from './utils/renderWith';

const mealCategories = ['Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat', 'All'];
const drinkCategories = ['Ordinary Drink', 'Cocktail', 'Shake', 'Other/Unknown', 'Cocoa', 'All'];

describe('Teste de botões categorias', () => {
  test('Bõtoes rederizam em meals', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    mealCategories.forEach(async (e) => (
      expect(await screen.findByTestId(`${e}-category-filter`)).toBeInTheDocument()
    ));
  });

  test('Bõtoes rederizam em drinks', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    await waitFor(() => {
      drinkCategories.forEach((e) => (
        expect(screen.getByTestId(`${e}-category-filter`)).toBeInTheDocument()
      ));
    });
  });

  test('Testando Botão remove All', () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const removeAll = screen.getByTestId(/All-category-filter/i);
    userEvent.click(removeAll);
  });

  test('Testando Botão remove All', () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    const removeAll = screen.getByTestId(/All-category-filter/i);
    userEvent.click(removeAll);
  });
});
