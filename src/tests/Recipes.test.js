import { screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import Provider from '../context/Provider';
import renderWithRouter from './utils/renderWith';

const mealCategories = ['Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat', 'All'];
const drinkCategories = ['Ordinary Drink', 'Cocktail', 'Shake', 'Other/Unknown', 'Cocoa', 'All'];

describe.only('Teste de botões categorias', () => {
  test('Bõtoes rederizam em meals', async () => {
    renderWithRouter(<Provider><App /></Provider>, { initialEntries: ['/meals'] });

    await waitFor(() => {
      mealCategories.forEach((e) => (
        // screen.getByTestId(`${e}-category-filter`);
        expect(screen.getByTestId(`${e}-category-filter`)).toBeInTheDocument()
      ));
    });
  });

  test('Bõtoes rederizam em drinks', async () => {
    renderWithRouter(<Provider><App /></Provider>, { initialEntries: ['/drinks'] });

    await waitFor(() => {
      drinkCategories.forEach((e) => (
        // screen.getByTestId(`${e}-category-filter`);
        expect(screen.getByTestId(`${e}-category-filter`)).toBeInTheDocument()
      ));
    });

    // const categoryBtn = screen.findAllByTestId(/-category-filter/i);
    // await waitFor(() => {
    //   expect(categoryBtn).toHaveLength(6);
    // });
    // const removeAllBtn = screen.getByTestId('All-category-filter');
    // expect(removeAllBtn).toBeInTheDocument();
  });
});
