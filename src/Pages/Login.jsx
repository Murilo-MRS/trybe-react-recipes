import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import '../styles/login.css';

function Login() {
  const { email,
    handleEmailChange,
    password,
    handlePasswordChange,
    enableFormButt } = useContext(Context);
  const history = useHistory();
  const handleFormClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };
  return (
    <div>
      <h1>Login App de Receitas</h1>
      <label htmlFor="Email">
        Email:
        <input
          type="email"
          data-testid="email-input"
          name="inputEmail"
          placeholder="Digite seu Email"
          value={ email }
          onChange={ handleEmailChange }
        />
      </label>
      <label htmlFor="Password">
        Senha:
        <input
          type="password"
          data-testid="password-input"
          placeholder="Digite a Senha"
          name="inputPassword"
          onChange={ handlePasswordChange }
          value={ password }
        />
      </label>
      <button
        className="login"
        type="button"
        data-testid="login-submit-btn"
        disabled={ enableFormButt }
        onClick={ handleFormClick }
      >
        Enter
      </button>
    </div>
  );
}

export default Login;
