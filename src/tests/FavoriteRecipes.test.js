import { screen, waitFor } from '@testing-library/react';
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

    const btnFilterAll = screen.getByTestId('filter-by-all-btn');
    const btnFilterMeal = screen.getByTestId('filter-by-meal-btn');
    const btnFilterDrink = screen.getByTestId('filter-by-drink-btn');

    userEvent.click(btnFilterAll);
    userEvent.click(btnFilterMeal);
    userEvent.click(btnFilterDrink);
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

  test('Bõtoes rederizam em meals', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const mealCorba = await screen.findByRole('img', {
      name: /Corba/i,
    });
    userEvent.click(mealCorba);

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

  test('Bõtoes share em meals', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const mealCorba = await screen.findByText('Corba');
    userEvent.click(mealCorba);

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

    // expect(shareBtn).toBeInTheDocument();
    await waitFor(() => {
      const shareBtn = screen.getByTestId('share-btn');
      userEvent.click(shareBtn);
    });

    // userEvent.click(shareBtn);
    // const sharelink = await screen.findByText(/link copied!/i);
    // expect(sharelink).not.toBeInTheDocument();
  });
});
