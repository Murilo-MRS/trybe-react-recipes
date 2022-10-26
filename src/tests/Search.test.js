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

describe('Testar a barra de navegação', () => {
  it('testar componentes da página', () => {
    const { history } = renderWithRouter(<App />);
    const buttonLogin = screen.getByTestId(btnTestId);
    const inputEmail = screen.getByTestId(emailTestId);
    const inputPassword = screen.getByTestId(passwordTestId);

    userEvent.type(inputEmail, email);
    userEvent.type(inputPassword, password);

    expect(buttonLogin).toBeEnabled();

    userEvent.click(buttonLogin);
    expect(history.location.pathname).toBe('/meals');

    const searchIcon = screen.getByTestId('search-top-btn');
    expect(searchIcon).toBeInTheDocument();
    userEvent.click(searchIcon);
    const ingredient = screen.getByTestId('ingredient-search-radio');
    const name = screen.getByTestId('name-search-radio');
    const firstName = screen.getByTestId('first-letter-search-radio');
    const btnSearch = screen.getByTestId('exec-search-btn');
    expect(ingredient).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(firstName).toBeInTheDocument();
    userEvent.click(name);
    userEvent.click(firstName);
    userEvent.click(btnSearch);
  });
});
