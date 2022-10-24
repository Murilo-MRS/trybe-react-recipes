import { screen } from '@testing-library/react';
import React from 'react';
import Profile from '../Pages/Profile';
import renderWithRouter from './utils/renderWith';

test('Testa botões na pagina', () => {
  renderWithRouter(<Profile />);

  const tituloProfile = screen.getByText(/Favorite Recipes/i);
  const btnRecFeitas = screen.getByRole('button', { name: /Done Recipes/i });
  const btnRecFav = screen.getByRole('button', { name: /Favorite Recipes/i });
  const btnSair = screen.getByRole('button', { name: /Logout/i });

  expect(tituloProfile).toBeInTheDocument();
  expect(btnRecFeitas).toBeInTheDocument();
  expect(btnRecFav).toBeInTheDocument();
  expect(btnSair).toBeInTheDocument();
});
