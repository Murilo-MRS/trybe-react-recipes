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
const btnSearchTop = 'search-top-btn';
const btnSearchBar = 'exec-search-btn';
const ingredientRadio = 'ingredient-search-radio';
const nameRadio = 'name-search-radio';
const searchInput = 'search-input';
const firstLetterRadio = 'first-letter-search-radio';

describe('Testar a barra de navegação', () => {
  afterEach(() => jest.clearAllMocks());
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

    const searchIcon = screen.getByTestId(btnSearchTop);
    expect(searchIcon).toBeInTheDocument();
    userEvent.click(searchIcon);
    const ingredient = screen.getByTestId(ingredientRadio);
    const name = screen.getByTestId(nameRadio);
    const firstName = screen.getByTestId(firstLetterRadio);
    const btnSearch = screen.getByTestId(btnSearchBar);
    expect(ingredient).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(firstName).toBeInTheDocument();
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

    const searchIcon = screen.getByTestId(btnSearchTop);
    expect(searchIcon).toBeInTheDocument();
    userEvent.click(searchIcon);
    const btnSearch = screen.getByTestId(btnSearchBar);
    const inputShearch = screen.getByTestId(searchInput);

    const rice = 'rice';

    userEvent.type(inputShearch, rice);
    expect(inputShearch).toHaveValue(rice);
    const name = screen.getByTestId(nameRadio);
    userEvent.click(name);
    userEvent.click(btnSearch);

    // const searchArr = await screen.findAllByTestId(/-recipe-card/i);

    // expect(searchArr).toHaveLength(2);

    userEvent.clear(inputShearch);

    userEvent.type(inputShearch, 'u');
    expect(inputShearch).toHaveValue('u');
    const firstLetter = screen.getByTestId(firstLetterRadio);
    userEvent.click(firstLetter);
    userEvent.click(btnSearch);
    // const ingredient = screen.getByTestId(ingredientRadio);
    // userEvent.clear(inputShearch);
    // userEvent.type(inputShearch, rice);
    // expect(inputShearch).toHaveValue(rice);
    // userEvent.click(ingredient);
    // userEvent.click(btnSearch);
  });

  it('3 - testar pesquisa por ingredientes em meals', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const searchIcon = screen.getByTestId(btnSearchTop);

    userEvent.click(searchIcon);

    const inputShearch = screen.getByTestId(searchInput);
    const ingredient = screen.getByTestId(ingredientRadio);
    const btnSearch = screen.getByTestId(btnSearchBar);
    expect(inputShearch).toBeInTheDocument();
    expect(ingredient).toBeInTheDocument();

    userEvent.type(inputShearch, 'chicken');
    userEvent.click(ingredient);

    userEvent.click(btnSearch);

    expect(ingredient).toBeChecked();

    const name = screen.getByTestId(nameRadio);
    const sushi = 'sushi';
    userEvent.clear(inputShearch);
    userEvent.type(inputShearch, sushi);
    expect(inputShearch).toHaveValue(sushi);
    userEvent.click(name);
    userEvent.click(btnSearch);
    await waitFor(() => {
      const { location: { pathname } } = history;
      expect(pathname).toBe('/meals/53065');
    });
  });

  it('testar pesquisa por ingredientes em meals', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const searchIcon = screen.getByTestId(btnSearchTop);

    userEvent.click(searchIcon);

    const inputShearch = screen.getByTestId(searchInput);
    const ingredient = screen.getByTestId(ingredientRadio);
    const btnSearch = screen.getByTestId(btnSearchBar);
    expect(inputShearch).toBeInTheDocument();
    expect(ingredient).toBeInTheDocument();

    userEvent.type(inputShearch, 'vodka');
    expect(inputShearch).toHaveValue('vodka');
    userEvent.click(ingredient);

    userEvent.click(btnSearch);
    expect(ingredient).toBeChecked();
  });

  it('testar alert em drinks', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const searchIcon = screen.getByTestId(btnSearchTop);

    userEvent.click(searchIcon);

    const inputShearch = screen.getByTestId(searchInput);
    const firstName = screen.getByTestId(firstLetterRadio);
    const btnSearch = screen.getByTestId(btnSearchBar);

    userEvent.type(inputShearch, 'asdfadsfasd');
    expect(inputShearch).toHaveValue('asdfadsfasd');
    userEvent.click(firstName);

    userEvent.click(btnSearch);
  });

  it('testar alert em meals', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const searchIcon = screen.getByTestId(btnSearchTop);

    userEvent.click(searchIcon);

    const inputShearch = screen.getByTestId(searchInput);
    const firstName = screen.getByTestId(firstLetterRadio);
    const btnSearch = screen.getByTestId(btnSearchBar);

    userEvent.type(inputShearch, 'asdfasdf');
    expect(inputShearch).toHaveValue('asdfasdf');
    userEvent.click(firstName);

    userEvent.click(btnSearch);
  });

  it('testar first letter em meals', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const searchIcon = screen.getByTestId(btnSearchTop);

    userEvent.click(searchIcon);

    const inputShearch = screen.getByTestId(searchInput);
    const firstName = screen.getByTestId(firstLetterRadio);
    const btnSearch = screen.getByTestId(btnSearchBar);

    userEvent.type(inputShearch, 'y');
    expect(inputShearch).toHaveValue('y');
    userEvent.click(firstName);

    userEvent.click(btnSearch);
    await waitFor(() => {
      const { location: { pathname } } = history;
      expect(pathname).toBe('/meals/52871');
    });
  });

  it('testar first letter em drinks', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    const searchIcon = screen.getByTestId(btnSearchTop);

    userEvent.click(searchIcon);

    const inputShearch = screen.getByTestId(searchInput);
    const firstName = screen.getByTestId(firstLetterRadio);
    const btnSearch = screen.getByTestId(btnSearchBar);

    userEvent.type(inputShearch, '4');
    expect(inputShearch).toHaveValue('4');
    userEvent.click(firstName);

    userEvent.click(btnSearch);
    await waitFor(() => {
      const { location: { pathname } } = history;
      expect(pathname).toBe('/drinks/13581');
    });
  });

  it('testar nome em drinks', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    const searchIcon = screen.getByTestId(btnSearchTop);

    userEvent.click(searchIcon);

    const inputShearch = screen.getByTestId(searchInput);
    const btnSearch = screen.getByTestId(btnSearchBar);

    const name = screen.getByTestId(nameRadio);

    userEvent.type(inputShearch, '410 Gone');
    expect(inputShearch).toHaveValue('410 Gone');
    userEvent.click(name);

    userEvent.click(btnSearch);
    await waitFor(() => {
      const { location: { pathname } } = history;
      expect(pathname).toBe('/drinks/13581');
    });
  });
});
