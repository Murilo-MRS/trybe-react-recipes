import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import profileIcon from '../images/iconsFigma/iconePerfil.svg';
import searchIcon from '../images/iconsFigma/iconePesquiar.svg';
import íconeRecipesApp from '../images/iconsFigma/iconeRecipesApp.svg';
import logoRecipesApp from '../images/iconsFigma/logoRecipesApp.svg';
import '../styles/header.css';
import SearchBar from './SearchBar';

function Header() {
  const { title, showIcon } = useContext(Context);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const history = useHistory();
  const profilePush = () => history.push('/profile');

  const handleSearchBtn = () => setShowSearchInput(!showSearchInput);
  return (
    <>
      <div className="menuNav">
        <div className="logoContainer">
          <img className="iconeHeader" src={ íconeRecipesApp } alt="íconeRecipesApp" />
          <img className="iconeLogo" src={ logoRecipesApp } alt="iconeLogo" />
          <div />
          {showIcon && (
            <button
              className="searchTopBtn"
              src={ searchIcon }
              data-testid="search-top-btn"
              type="button"
              onClick={ handleSearchBtn }
            >
              <img src={ searchIcon } alt="Icone de pesquisa" />
            </button>
          )}
          <button
            className="searchTopBtn"
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
        </div>

      </div>
      <div>
        <h1 data-testid="page-title">{title}</h1>
      </div>
      {showSearchInput && (
        <SearchBar />
      )}
    </>
  );
}

export default Header;
