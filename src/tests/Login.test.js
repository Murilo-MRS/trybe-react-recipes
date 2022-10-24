import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './utils/renderWith';

const email = 'email@email.com';
const password = '123456';
const passwordTestId = 'password-input';
const emailTestId = 'email-input';
const buttonLogin = screen.getByRole('button', {
  name: /enter/i,
});
const inputEmail = screen.getByTestId(emailTestId);
const inputPassword = screen.getByTestId(passwordTestId);
const wrongEmail = 'emailcom@';
const wrongPassword = '0000';

test('Testando renderizacao de tela de login', () => {
  renderWithRouter(<App />);
  expect(inputEmail).toBeInTheDocument();
  expect(inputPassword).toBeInTheDocument();
  expect(buttonLogin).toBeInTheDocument();
});

it('Testa funcionamento do botao', () => {
  renderWithRouter(<App />);

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
});
