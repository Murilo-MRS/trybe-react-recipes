import React from 'react';
import btnVoltar from '../images/btnVoltar.png';
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
