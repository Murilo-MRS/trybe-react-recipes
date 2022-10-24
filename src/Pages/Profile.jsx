import React from 'react';
import { useHistory } from 'react-router-dom';

// import Context from '../context/Context';

function Profile() {
  const history = useHistory();
  const redirectToDoneRecipes = () => {
    history.push('/done-recipes');
  };

  const redirectToFavoriteRecipes = () => {
    history.push('/favorite-recipes');
  };

  const logout = () => {
    localStorage.clear();
    history.push('/');
  };
  // const { email } = useContext(Context);
  const emailInStorage = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <span data-testid="profile-email">{emailInStorage.email}</span>
      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ redirectToDoneRecipes }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ redirectToFavoriteRecipes }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ logout }
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
