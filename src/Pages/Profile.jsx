import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../context/Context';
import perfilImg from '../images/iconsFigma/Perfil.svg';
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
    <div className="profileComponent">
      <Header />
      <div className="imgDoneprofile">
        <img src={ perfilImg } alt="imagem de done" />
        <h1 className="title-profile">Profile</h1>
      </div>
      <p className="email-profile">{emailInStorage && getEmail()}</p>
      <div className="container-profile">

        <button
          data-testid="profile-done-btn"
          type="button"
          onClick={ redirectToDoneRecipes }
        >
          Done Recipes
        </button>
        <div className="line" />
        <button
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ redirectToFavoriteRecipes }
        >
          Favorite Recipes
        </button>
        <div className="line" />
        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ logout }
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
