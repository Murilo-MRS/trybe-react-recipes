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

it('Testando Navegacao do Header', () => {
  const { history } = renderWithRouter(<App />);
  const buttonLogin = screen.getByTestId(btnTestId);
  const inputEmail = screen.getByTestId(emailTestId);
  const inputPassword = screen.getByTestId(passwordTestId);

  userEvent.type(inputEmail, email);
  userEvent.type(inputPassword, password);

  expect(buttonLogin).toBeEnabled();

  userEvent.click(buttonLogin);

  expect(history.location.pathname).toBe('/meals');

  const burek = screen.getByText(/burek/i);

  const iten0DoMap = screen.getByTestId('0-recipe-card');

  expect(iten0DoMap).toBeInTheDocument();

  const iten11DoMap = screen.getByTestId('11-recipe-card');

  expect(iten11DoMap).toBeInTheDocument();

  userEvent.click(burek);

  expect(history.location.pathname).toBe('/comidas/53060');
});
