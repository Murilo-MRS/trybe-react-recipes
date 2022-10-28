import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './utils/renderWith';

describe('Teste de botões categorias', () => {
  test('Bõtoes rederizam em meals', () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const categoryBtn = screen.getAllByTestId(/-category-filter/i);
    expect(categoryBtn).toBe(5);
  });

  test('Bõtoes rederizam em drinks', () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    const categoryBtn = screen.getAllByTestId(/-category-filter/i);
    expect(categoryBtn).toBe(5);
  });
});
