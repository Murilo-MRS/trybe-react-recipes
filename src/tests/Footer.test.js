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

it('Testando navegacao do Footer', () => {
  const { history } = renderWithRouter(<App />);
  const buttonLogin = screen.getByTestId(btnTestId);
  const inputEmail = screen.getByTestId(emailTestId);
  const inputPassword = screen.getByTestId(passwordTestId);

  userEvent.type(inputEmail, email);
  userEvent.type(inputPassword, password);

  expect(buttonLogin).toBeEnabled();

  userEvent.click(buttonLogin);

  expect(history.location.pathname).toBe('/meals');

  const btndrinks = screen.getByTestId('drinks-bottom-btn');
  const btnMeals = screen.getByTestId('meals-bottom-btn');
  expect(btndrinks).toBeInTheDocument();
  expect(btnMeals).toBeInTheDocument();

  userEvent.click(btnMeals);

  expect(history.location.pathname).toBe('/meals');

  userEvent.click(btndrinks);

  expect(history.location.pathname).toBe('/drinks');
});
