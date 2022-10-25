import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './utils/renderWith';

const passwordTestId = 'password-input';
const emailTestId = 'email-input';

test('Teste se App esta renderizando a rota correta', () => {
  // Este arquivo pode ser modificado ou deletado sem problemas
  const { history } = renderWithRouter(<App />);
  const buttonLogin = screen.getByTestId('login-submit-btn');
  const inputEmail = screen.getByTestId(emailTestId);
  const inputPassword = screen.getByTestId(passwordTestId);
  expect(inputEmail).toBeInTheDocument();
  expect(inputPassword).toBeInTheDocument();

  expect(buttonLogin).toBeInTheDocument();
  expect(history.location.pathname).toBe('/');
});
