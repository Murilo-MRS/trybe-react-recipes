import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import arrowLeft from '../images/btnVoltar.svg';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const { title, showIcon } = useContext(Context);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const history = useHistory();
  const profilePush = () => history.push('/profile');

  const handleSearchBtn = () => setShowSearchInput(!showSearchInput);
  return (
    <header>
      <div>
        <h1 data-testid="page-title">{title}</h1>
      </div>
      <button
        data-testid="btn-back"
        onClick={ () => { window.history.back(); } }
        type="button"
      >
        <img
          alt="btn de voltar"
          src={ arrowLeft }
        />
      </button>
      <button
        type="button"
        data-testid="profile-top-btn"
        name="profile-top-btn"
        id="profile-top-btn"
        src={ profileIcon }
        onClick={ profilePush }
      >
        <img
          src={ profileIcon }
          alt="Ir para perfil"
        />
      </button>
      {showIcon && (
        <button
          src={ searchIcon }
          data-testid="search-top-btn"
          type="button"
          onClick={ handleSearchBtn }
        >
          <img src={ searchIcon } alt="Icone de pesquisa" />
        </button>
      )}
      {showSearchInput && (
        <input
          type="text"
          id="search"
          placeholder="Buscar receitas"
          data-testid="search-input"
        />
      )}
    </header>
  );
}

export default Header;
