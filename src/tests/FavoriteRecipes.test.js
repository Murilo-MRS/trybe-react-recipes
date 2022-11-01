import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './utils/renderWith';

describe('Teste da tela de favoritos', () => {
  test('Renderizacoes na tela ', () => {
    renderWithRouter(<App />, { initialEntries: ['/favorite-recipes'] });
    const semReceitas = screen.getByRole('heading', {
      name: /sem receitas favoritas!/i,
    });
    expect(semReceitas).toBeInTheDocument();
  });

  test('Bõtoes rederizam em drinks', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    const drinkA1 = await screen.findByRole('img', {
      name: /a1/i,
    });
    userEvent.click(drinkA1);
    const btnFavoritar = await screen.findByRole('img', {
      name: /icone de favoritar/i,
    });
    userEvent.click(btnFavoritar);
    const iconeProfile = screen.getByRole('img', {
      name: /ir para perfil/i,
    });
    userEvent.click(iconeProfile);
    const btnFavoriteRecipes = screen.getByRole('button', {
      name: /favorite recipes/i,
    });
    userEvent.click(btnFavoriteRecipes);
    /*     const drinkA1Favoritado = screen.getByRole('img', {
      name: /a1/i,
    });
    expect(drinkA1Favoritado).toBeInTheDocument(); */
    const deleteBtn = screen.getByRole('img', {
      name: /icone de favoritar/i,
    });
    userEvent.click(deleteBtn);
  });
});
