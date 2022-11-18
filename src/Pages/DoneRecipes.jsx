import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';
import Context from '../context/Context';
import { setStorage } from '../helpers/Storage';
import '../styles/doneRecipes.css';
import '../styles/RecipeDetails.css';

function ReceitasFinalizadas() {
  const [ReceitasFeitas, setReceitasFeitas] = useState([]);
  const { setTitle, setShowIcon } = useContext(Context);
  const doneRecipesFromStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  function mealInfo(index, category, nationality) {
    return (
      <p data-testid={ `${index}-horizontal-top-text` }>
        {`${nationality} - ${category}`}
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
    setStorage('doneRecipes', filtered);
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
          onClick={ () => setReceitasFeitas(doneRecipesFromStorage) }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          type="button"
          onClick={
            () => setReceitasFeitas(doneRecipesFromStorage
              .filter((e) => e.type.includes('meal')))
          }
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={
            () => setReceitasFeitas(doneRecipesFromStorage
              .filter((e) => e.type.includes('drink')))
          }
        >
          Drink
        </button>
      </div>
      {ReceitasFeitas.length === 0 ? (
        <h3>Sem Receitas Feitas!</h3>
      ) : (
        ReceitasFeitas.map(
          (
            { category,
              id, type, doneDate, tags, image, nationality, alcoholicOrNot, name },
            index,
          ) => (
            <div data-testid={ `${index}-recipe-card` } key={ index }>
              <Link to={ type.includes('meal') ? `/meals/${id}` : `/drinks/${id}` }>
                <img
                  className="recipe-image"
                  data-testid={ `${index}-horizontal-image` }
                  src={ image }
                  alt={ name }
                />
              </Link>
              <div>
                <Link to={ type.includes('meal') ? `/meals/${id}` : `/drinks/${id}` }>
                  {type.includes('meal')
                    ? mealInfo(index, category, nationality)
                    : drinkInfo(index, alcoholicOrNot)}
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
                <ShareButton id={ id } index={ index } />
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
