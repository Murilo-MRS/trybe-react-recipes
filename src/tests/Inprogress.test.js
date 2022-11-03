import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
// import Provider from '../context/Provider';
import renderWithRouter from './utils/renderWith';

describe('Teste component inprogress', () => {
  test('Verificando renderizacao', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals/52771/in-progress'] });
    const titleFood = await screen.findByRole('heading', {
      name: /spicy arrabiata penne/i,
    });
    const categoryFood = await screen.findByRole('heading', {
      name: /vegetarian/i,
    });

    expect(titleFood).toBeInTheDocument();
    expect(categoryFood).toBeInTheDocument();

    const view = await screen.findByText(/penne rigate 1 pound/i);

    const checkboxFood = await within(view).findByRole('checkbox');

    userEvent.click(checkboxFood);
  });

  /* est('Bõtoes rederizam em drinks', async () => {
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
  }); */
});
