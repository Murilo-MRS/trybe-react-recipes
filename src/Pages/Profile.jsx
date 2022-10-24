import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../context/Context';
// import Context from '../context/Context';

function Profile() {
  const { setTitle, setShowIcon } = useContext(Context);
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
    localStorage.clear();
    history.push('/');
  };
  // const { email } = useContext(Context);
  const emailInStorage = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
}

export default Profile;
