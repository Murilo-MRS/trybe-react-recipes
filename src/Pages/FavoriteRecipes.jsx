import copy from 'clipboard-copy';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../context/Context';
import { getStorage, setStorage } from '../helpers/Storage';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import favoriteImg from '../images/iconsFigma/favoriterescipes.svg';
import shareIcon from '../images/shareIcon.svg';
import '../styles/doneRecipes.css';

function FavoriteRecipes() {
  const [copied, setCopy] = useState(false);
  function getfavoritesRecipe() {
    const storage = getStorage('favoriteRecipes');
    return storage || [];
  }

  const [FavoriteRecipess, setFavoriteRecipes] = useState('');
  const { setTitle, setShowIcon } = useContext(Context);

  function mealInfo(index, category, nationality) {
    return (
      <p className="infoTitle" data-testid={ `${index}-horizontal-top-text` }>
        {`${nationality} - ${category}`}
      </p>
    );
  }

  function drinkInfo(index, alcoholicOrNot) {
    return (
      <p
        className="infoTitle"
        data-testid={ `${index}-horizontal-top-text` }
      >
        {`${alcoholicOrNot}`}

      </p>
    );
  }

  useEffect(() => {
    setFavoriteRecipes(getfavoritesRecipe());
  }, []);

  useEffect(() => {
    setTitle('Favorite Recipes');
    setShowIcon(false);
  }, [setTitle, setShowIcon]);

  function deletes(id) {
    const filtered = FavoriteRecipess.filter((item) => item.id !== id);
    setStorage('favoriteRecipes', filtered);
    setFavoriteRecipes(filtered);
  }

  const sharebtn = (type, id) => {
    const urlMealorDrink = `http://localhost:3000/${type}s/${id}`;
    setCopy(true);
    copy(urlMealorDrink);
  };

  return (
    <div className="recipes-page">
      <Header />
      <div className="imgDone">
        <img src={ favoriteImg } alt="imagem de done" />
        <h1 className="title-page">Favorites</h1>
      </div>
      <div className="container-categories">
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => setFavoriteRecipes(getfavoritesRecipe()) }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          type="button"
          onClick={ () => setFavoriteRecipes(
            getfavoritesRecipe().filter((data) => data.type === 'meal'),
          ) }
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => setFavoriteRecipes(
            getfavoritesRecipe().filter((data) => data.type === 'drink'),
          ) }
        >
          Drink
        </button>
      </div>
      {FavoriteRecipess.length === 0 ? (
        <h3>Sem Receitas Favoritas!</h3>
      ) : (
        FavoriteRecipess.map(
          (
            { category, id, type, image, alcoholicOrNot, name, nationality },
            index,
          ) => (
            <div
              className="card-done-recipe"
              data-testid={ `${index}-recipe-card` }
              key={ index }
            >
              <Link to={ `/${type}s/${id}` }>
                <img
                  className="recipe-image"
                  data-testid={ `${index}-horizontal-image` }
                  src={ image }
                  alt={ name }
                />
              </Link>
              <div>
                {type === 'meal'
                  ? mealInfo(index, category, nationality)
                  : drinkInfo(index, alcoholicOrNot)}
                <Link to={ `/${type}s/${id}` }>
                  <p data-testid={ `${index}-horizontal-name` }>{name}</p>
                </Link>
                <div className="shareBtnDone">
                  <button
                    src={ shareIcon }
                    type="button"
                    data-testid="share-btn"
                    onClick={ () => sharebtn(type, id) }
                  >
                    <img
                      data-testid={ `${index}-horizontal-share-btn` }
                      src={ shareIcon }
                      alt="Icone de compartilhar"
                    />
                  </button>
                  <button
                    src={ blackHeartIcon }
                    type="button"
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    onClick={ () => deletes(id) }
                  >
                    <img src={ blackHeartIcon } alt="Icone de Favoritar" />
                  </button>
                  {copied && <p>Link copied!</p>}
                </div>
              </div>
            </div>
          ),
        )
      )}
      <Footer />
    </div>
  );
}

export default FavoriteRecipes;
