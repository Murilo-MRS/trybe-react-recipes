import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './utils/renderWith';

const email = 'email@email.com';
const password = '1234567';
const passwordTestId = 'password-input';
const emailTestId = 'email-input';
const wrongEmail = 'emailcom@';
const wrongPassword = '0000';

test('Testando renderizacao de tela de login', () => {
  renderWithRouter(<App />);
  const buttonLogin = screen.getByTestId('login-submit-btn');
  const inputEmail = screen.getByTestId(emailTestId);
  const inputPassword = screen.getByTestId(passwordTestId);
  expect(inputEmail).toBeInTheDocument();
  expect(inputPassword).toBeInTheDocument();
  expect(buttonLogin).toBeInTheDocument();
});

it('Testa funcionamento do botao', () => {
  const { history } = renderWithRouter(<App />);

  const buttonLogin = screen.getByTestId('login-submit-btn');
  const inputEmail = screen.getByTestId(emailTestId);
  const inputPassword = screen.getByTestId(passwordTestId);

  expect(buttonLogin).toBeDisabled();

  userEvent.type(inputEmail, wrongEmail);
  userEvent.type(inputPassword, password);

  expect(buttonLogin).toBeDisabled();

  userEvent.clear(inputEmail);
  userEvent.clear(inputPassword);

  userEvent.type(inputEmail, email);
  userEvent.type(inputPassword, wrongPassword);

  expect(buttonLogin).toBeDisabled();

  userEvent.clear(inputEmail);
  userEvent.clear(inputPassword);

  userEvent.type(inputEmail, email);
  userEvent.type(inputPassword, password);

  expect(buttonLogin).toBeEnabled();

  userEvent.click(buttonLogin);

  expect(JSON.parse(localStorage.getItem('user'))).toEqual({ email });
  expect(history.location.pathname).toBe('/meals');
});
