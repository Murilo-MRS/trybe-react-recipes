import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../context/Context';
import '../styles/profile.css';

function Profile() {
  const { setTitle, setShowIcon, clearInputs } = useContext(Context);
  useEffect(() => {
    setTitle('Profile');
    setShowIcon(false);
  }, [setTitle, setShowIcon]);
  const history = useHistory();
  const redirectToDoneRecipes = () => {
    history.push('/done-recipes');
  };

  const redirectToFavoriteRecipes = () => {
    history.push('/favorite-recipes');
  };

  const logout = () => {
    clearInputs();
    localStorage.clear();
    history.push('/');
  };
  // const { email } = useContext(Context);
  const emailInStorage = JSON.parse(localStorage.getItem('user'));

  function getEmail() {
    return (
      <span type="text" data-testid="profile-email">
        {emailInStorage.email}
      </span>
    );
  }

  return (
    <>
      <Header />
      <div className="profileComponent">
        <p>{emailInStorage && getEmail()}</p>
        <button
          data-testid="profile-done-btn"
          type="button"
          onClick={ redirectToDoneRecipes }
        >
          Done Recipes
        </button>
        <button
          className="favoriteRecipes"
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
      <Footer />
    </>
  );
}

export default Profile;
