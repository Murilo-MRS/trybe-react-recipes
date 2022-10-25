import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './utils/renderWith';

const email = 'email@email.com';
const password = '1234567';
const passwordTestId = 'password-input';
const emailTestId = 'email-input';
const btnTestId = 'login-submit-btn';

it('Testa funcionamento do botao', () => {
  const { history } = renderWithRouter(<App />);
  const buttonLogin = screen.getByTestId(btnTestId);
  const inputEmail = screen.getByTestId(emailTestId);
  const inputPassword = screen.getByTestId(passwordTestId);

  userEvent.type(inputEmail, email);
  userEvent.type(inputPassword, password);

  expect(buttonLogin).toBeEnabled();

  userEvent.click(buttonLogin);

  expect(history.location.pathname).toBe('/meals');

  const btnProfile = screen.getByTestId('profile-top-btn');
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
});
