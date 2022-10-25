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

/* it("Should call localStorage getItem on render", () => {
  render(<App axios={fakeAxios} />);
  expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
}); */

/* it("Should call localStorage setItem on text change", () => {
  const { queryByPlaceholderText } = render(<App axios={fakeAxios} />);

  const input = queryByPlaceholderText("Enter your name");
  fireEvent.change(input, { target: { value: "Daniel" } });

  expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
  expect(window.localStorage.setItem).toHaveBeenCalledWith(
    "name",
    '"Daniel"'
  );
}); */

/*
Ao clicar no botão, devemos fazer uma solicitação get para o endpoint e armazenar a resposta no armazenamento local.
it("Should call axios.get on click and call localStorage setItem on button click", async () => {
  const { getByDisplayValue, getByText } = render(<App axios={fakeAxios} />);

  const fetchButton = getByText("Fetch");
  fireEvent.click(fetchButton);
  await waitForElement(() => getByDisplayValue("Richard"));

  expect(fakeAxios.get).toHaveBeenCalledTimes(1);
  expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
  expect(window.localStorage.setItem).toHaveBeenCalledWith(
    "name",
    '"Richard"'
  );
}); */
