import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Context from '../context/Context';
import shareIcon from '../images/shareIcon.svg';
import '../styles/RecipeDetails.css';

function ReceitasFinalizadas() {
  const [ReceitasFeitas, setReceitasFeitas] = useState([]);
  const { setTitle, setShowIcon } = useContext(Context);

  function mealInfo(index, category, area) {
    return (
      <p data-testid={ `${index}-horizontal-top-text` }>
        {`${area} - ${category}`}
      </p>
    );
  }

  function drinkInfo(index, alcoholicOrNot) {
    return (
      <p data-testid={ `${index}-horizontal-top-text` }>{`${alcoholicOrNot}`}</p>
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

  function deletes(id) {
    const filtered = ReceitasFeitas.filter((item) => item.id !== id);
    // setStorage('ReceitasFeitas', filtered);
    setReceitasFeitas(filtered);
  }

  return (
    <div className="Fundobranco">
      <Header />
      <h1>Receitas Feitas</h1>
      <div>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => {} }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          type="button"
          onClick={ () => {} }
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => {} }
        >
          Drink
        </button>
      </div>
      {ReceitasFeitas.length === 0 ? (
        <h3>Sem Receitas Favoritas!</h3>
      ) : (
        ReceitasFeitas.map(
          (
            { category,
              id, type, doneDate, tags, image, nationality, alcoholicOrNot, name },
            index,
          ) => (
            <div data-testid={ `${index}-recipe-card` } key={ index }>
              <Link to={ `/${type}/${id}` }>
                <img
                  className="recipe-image"
                  data-testid={ `${index}-horizontal-image` }
                  src={ image }
                  alt={ name }
                />
              </Link>
              <div>
                {type === 'meals'
                  ? mealInfo(index, category, nationality)
                  : drinkInfo(index, alcoholicOrNot)}
                <Link to={ `/${type}/${id}` }>
                  <p data-testid={ `${index}-horizontal-name` }>{name}</p>
                  <p data-testid={ `${index}-horizontal-done-date` }>
                    Feita em:
                    {doneDate}
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
                </Link>
                <button
                  type="button"
                  data-testid="share-btn"
                  onClick={ () => {} }
                >
                  <img
                    src={ shareIcon }
                    alt="share-icon"
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                </button>
                <button
                  name="apagar"
                  type="button"
                  onClick={ () => deletes(id) }
                >
                  Apagar
                </button>
              </div>
            </div>
          ),
        )
      )}
    </div>
  );
}

export default ReceitasFinalizadas;
