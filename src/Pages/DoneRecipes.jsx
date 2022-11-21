import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';
import Context from '../context/Context';
import doneImg from '../images/iconsFigma/donerecipes.svg';
import '../styles/doneRecipes.css';

function ReceitasFinalizadas() {
  const [ReceitasFeitas, setReceitasFeitas] = useState([]);
  const { setTitle, setShowIcon } = useContext(Context);
  const doneRecipesFromStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  function mealInfo(index, category, nationality) {
    return (
      <p className="infoTitle" data-testid={ `${index}-horizontal-top-text` }>
        {`${nationality} - ${category}`}
      </p>
    );
  }

  function drinkInfo(index, alcoholicOrNot) {
    return (
      <p className="infoTitle" data-testid={ `${index}-horizontal-top-text` }>
        {`${alcoholicOrNot}`}
      </p>
    );
  }

  useEffect(() => {
    const recipesStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    setReceitasFeitas(recipesStorage);
  }, []);

  useEffect(() => {
    setTitle('Done Recipes');
    setShowIcon(false);
  }, [setTitle, setShowIcon]);

  return (
    <div className="recipes-page">
      <Header />
      <div className="imgDone">
        <img src={ doneImg } alt="imagem de done" />
        <h1 className="title-page">Done Recipes</h1>
      </div>
      <div className="container-categories">
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => setReceitasFeitas(doneRecipesFromStorage) }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          type="button"
          onClick={ () => setReceitasFeitas(
            doneRecipesFromStorage.filter((e) => e.type.includes('meal')),
          ) }
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => setReceitasFeitas(
            doneRecipesFromStorage.filter((e) => e.type.includes('drink')),
          ) }
        >
          Drink
        </button>
      </div>
      {ReceitasFeitas.length === 0 ? (
        <h3>Sem Receitas Feitas!</h3>
      ) : (
        ReceitasFeitas.map(
          (
            {
              category,
              id,
              type,
              doneDate,
              tags,
              image,
              nationality,
              alcoholicOrNot,
              name,
            },
            index,
          ) => (
            <div
              className="card-done-recipe"
              data-testid={ `${index}-recipe-card` }
              key={ index }
            >
              <Link
                to={ type.includes('meal') ? `/meals/${id}` : `/drinks/${id}` }
              >
                <img
                  className="recipe-image"
                  data-testid={ `${index}-horizontal-image` }
                  src={ image }
                  alt={ name }
                />
              </Link>
              <div>
                {type.includes('meal')
                  ? mealInfo(index, category, nationality)
                  : drinkInfo(index, alcoholicOrNot)}
                <p
                  className="infoName"
                  data-testid={ `${index}-horizontal-name` }
                >
                  {name}
                </p>
                <p data-testid={ `${index}-horizontal-done-date` }>
                  {`Feita em: ${doneDate}`}
                </p>
                <div>
                  {tags.map((tag) => (
                    <p
                      key={ tag }
                      data-testid={ `${index}-${tag}-horizontal-tag` }
                    >
                      {tag}
                    </p>
                  ))}
                </div>
              </div>
              <div className="shareBtnDone">
                <ShareButton id={ id } index={ index } />
              </div>
            </div>
          ),
        )
      )}
      <Footer />
    </div>
  );
}

export default ReceitasFinalizadas;
