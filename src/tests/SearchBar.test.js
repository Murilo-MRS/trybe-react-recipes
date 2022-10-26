import { screen, waitFor } from '@testing-library/react';
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
  it('testar componentes da página', async () => {
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
    expect(firstName).toBeInTheDocument(); waitFor;
    userEvent.click(name);
    userEvent.click(firstName);
    userEvent.click(btnSearch);
  });
  it('testar componentes da página', async () => {
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
    const btnSearch = screen.getByTestId('exec-search-btn');
    const inputShearch = screen.getByTestId('search-input');

    const rice = 'rice';

    userEvent.type(inputShearch, rice);
    expect(inputShearch).toHaveValue(rice);
    const name = screen.getByTestId('name-search-radio');
    userEvent.click(name);
    userEvent.click(btnSearch);

    const searchArr = await screen.findByTestId(/-recipe-card/i, {}, { timeout: 5000 });

    expect(searchArr).toHaveLength(2);

    userEvent.clear(inputShearch);

    userEvent.type(inputShearch, 'a');
    expect(inputShearch).toHaveValue('a');
    const firstLetter = screen.getByTestId('first-letter-search-radio');
    userEvent.click(firstLetter);
    userEvent.click(btnSearch);
    const searchByLetter = await screen.findByTestId(/-recipe-card/i, {}, { timeout: 5000 });

    expect(searchByLetter).toHaveLength(4);
    const ingredient = screen.getByTestId('ingredient-search-radio');
    userEvent.clear(inputShearch);
    userEvent.type(inputShearch, rice);
    expect(inputShearch).toHaveValue(rice);
    userEvent.click(ingredient);
    userEvent.click(btnSearch);

    const sushi = 'sushi';
    userEvent.clear(inputShearch);
    userEvent.type(inputShearch, sushi);
    expect(inputShearch).toHaveValue(sushi);
    userEvent.click(name);
    userEvent.click(btnSearch);
    expect(history.location.pathname).toBe('/meals/53065');
  });

  it.only('testar chamada Api meals ingredients', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const searchIcon = screen.getByTestId('search-top-btn');

    userEvent.click(searchIcon);
    const inputShearch = screen.getByTestId('search-input');
    const ingredient = screen.getByTestId('ingredient-search-radio');
    userEvent.type(inputShearch, 'chicken');
    userEvent.click(ingredient);
  });
});
