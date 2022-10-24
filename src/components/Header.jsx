import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const { title, showIcon } = useContext(Context);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const history = useHistory();
  const profilePush = () => {
    history.push('/profile');
  };
  return (
    <div>
      <div>
        <h1 data-testid="page-title">{title}</h1>
      </div>
      <button
        src={ profileIcon }
        type="button"
        onClick={ profilePush }
        data-testid="profile-top-btn"
      >
        <img
          src={ profileIcon }
          alt="Icone de redirecionamento para o perfil"
        />
      </button>
      {showIcon && (
        <button
          src={ searchIcon }
          data-testid="search-top-btn"
          type="button"
          onClick={ () => setShowSearchInput(!showSearchInput) }
        >
          <img src={ searchIcon } alt="Icone de pesquisa" />
        </button>
      )}
      {showSearchInput && (
        <input
          type="text"
          id="search"
          placeholder="Buscar receitas"
        />
      )}
    </div>
  );
}

export default Header;
