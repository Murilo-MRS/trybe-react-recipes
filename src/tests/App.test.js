import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './utils/renderWith';

test('Farewell, front-end', () => {
  // Este arquivo pode ser modificado ou deletado sem problemas
  renderWithRouter(<App />);
  const linkElement = screen.getByText(/Email/i);
  expect(linkElement).toBeInTheDocument();
});
