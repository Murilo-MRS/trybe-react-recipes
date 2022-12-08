import React from 'react';
import btnVoltar from '../images/btnVoltar.svg';
import '../styles/RecipeDetails.css';

function ButtonBack() {
  return (
    <button
      className="botao-voltar"
      type="button"
      onClick={ () => window.history.back() }
    >
      <img src={ btnVoltar } alt="img voltar" />
    </button>
  );
}

export default ButtonBack;
