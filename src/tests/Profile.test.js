import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './utils/renderWith';

const email = 'email@email.com';
const password = '1234567';
const btnTestId = 'login-submit-btn';
const passwordTestId = 'password-input';
const emailTestId = 'email-input';

it('Testando Navegacao do Profile', () => {
  const { history } = renderWithRouter(<App />);
  const buttonLogin = screen.getByTestId(btnTestId);
  const inputEmail = screen.getByTestId(emailTestId);
  const inputPassword = screen.getByTestId(passwordTestId);

  userEvent.type(inputEmail, email);
  userEvent.type(inputPassword, password);

  expect(buttonLogin).toBeEnabled();

  userEvent.click(buttonLogin);

  expect(history.location.pathname).toBe('/meals');

  const btnProfile = screen.getByRole('button', {
    name: /ir para perfil/i,
  });
  const btnSearch = screen.getByTestId('search-top-btn');
  expect(btnProfile).toBeInTheDocument();
  expect(btnSearch).toBeInTheDocument();

  userEvent.click(btnSearch);

  const inputHandle = screen.getByTestId('search-input');

  expect(inputHandle).toBeInTheDocument();
  userEvent.click(btnSearch);

  expect(inputHandle).not.toBeInTheDocument();

  userEvent.click(btnProfile);

  expect(history.location.pathname).toBe('/profile');

  const tituloProfile = screen.getByText(/Favorite Recipes/i);
  const btnRecFeitas = screen.getByRole('button', { name: /Done Recipes/i });
  const btnRecFav = screen.getByTestId('profile-favorite-btn');
  const btnSair = screen.getByRole('button', { name: /Logout/i });

  expect(tituloProfile).toBeInTheDocument();
  expect(btnRecFeitas).toBeInTheDocument();
  expect(btnRecFav).toBeInTheDocument();
  expect(btnSair).toBeInTheDocument();

  userEvent.click(btnRecFeitas);

  expect(history.location.pathname).toBe('/done-recipes');

  const btnVoltar = screen.getByTestId('profile-top-btn');

  userEvent.click(btnVoltar);

  expect(history.location.pathname).toBe('/profile');

  const btnReceFav = screen.getByText(/favorite recipes/i);

  userEvent.click(btnReceFav);

  expect(history.location.pathname).toBe('/favorite-recipes');

  const btnnVoltar = screen.getByTestId('profile-top-btn');

  userEvent.click(btnnVoltar);

  expect(history.location.pathname).toBe('/profile');

  const btnnSair = screen.getByRole('button', { name: /Logout/i });

  userEvent.click(btnnSair);

  expect(history.location.pathname).toBe('/');
  expect(JSON.parse(localStorage.getItem('user'))).toEqual({ undefined });
});
