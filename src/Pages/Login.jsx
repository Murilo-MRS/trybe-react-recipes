import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Linkedin from '../components/Linkedin';
import Context from '../context/Context';
import logoRecipesApp from '../images/logoRecipesApp.png';
import tomate from '../images/tomate.png';
import '../styles/login.css';

function Login() {
  const {
    email,
    handleEmailChange,
    password,
    handlePasswordChange,
    enableFormButt,
  } = useContext(Context);
  const history = useHistory();

  const handleFormClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };
  // funcao que faz login apertando enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleFormClick();
    }
  };
  return (
    <>
      <img className="logoApp" src={ logoRecipesApp } alt="logoRecipesApp" />
      <img className="tomateimg" src={ tomate } alt="tomate" />

      <section className="login-card">
        <div className="card-title">
          <h1>LOGIN</h1>
        </div>
        <label htmlFor="Email">
          Email:
          <input
            type="email"
            data-testid="email-input"
            name="inputEmail"
            autoComplete="off"
            placeholder="Digite seu Email"
            value={ email }
            onChange={ handleEmailChange }
          />
        </label>
        <label htmlFor="Password">
          Senha:
          <input
            onKeyDown={ handleKeyDown }
            autoComplete="off"
            type="password"
            data-testid="password-input"
            placeholder="Digite a Senha"
            name="inputPassword"
            onChange={ handlePasswordChange }
            value={ password }
          />
        </label>
        <button
          className="btn"
          type="button"
          data-testid="login-submit-btn"
          disabled={ enableFormButt }
          onClick={ handleFormClick }
        >
          Enter
        </button>
      </section>
      <Linkedin />
    </>
  );
}

export default Login;
