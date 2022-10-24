import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';

function Header() {
  const { email } = useContext(Context);
  const history = useHistory();
  history.push('/profile');
  return (
    <div>
      <div>{email}</div>
      { history.location.pathname === '/profile'
        ? (
          <div>
            <h1>Profile</h1>
          </div>
        )
        : (
          <div>
            <h1>
              APP de Receitas
            </h1>
          </div>)}
      <button
        type="button"
        profile-top-btn
      >
        Perfil
      </button>
      <div>
        <input
          type="text"
          id="search"
          placeholder="Buscar receitas"
          data-testid="search-input"
        />
      </div>
    </div>
  );
}

export default Header;
