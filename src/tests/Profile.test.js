import { screen } from '@testing-library/react';
import React from 'react';
import Profile from '../Pages/Profile';
import renderWithRouter from './utils/renderWith';

discribe('Teste pagina Profile', () => {
  test('Testa botões na pagina', () => {
    renderWithRouter(<Profile />);
    const btnRecFeitas = screen.getByRole('button', { name: /receitas feitas/i });
    const btnRecFav = screen
      .getByRole('button', { name: /receitas favoritas/i });
    const btnSair = screen.getByRole('button', { name: /sair/i });
    expect(btnRecFeitas).toBeInTheDocument();
    expect(btnRecFav).toBeInTheDocument();
    expect(btnSair).toBeInTheDocument();
  });
});
