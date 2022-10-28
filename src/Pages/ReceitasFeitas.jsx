import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Context from '../context/Context';
import shareIcon from '../images/shareIcon.svg';

function ReceitasFeitas() {
  /*     function recipesDone() {
    const storage = getStorage('doneRecipes');
    return storage || [];
  } */

  const [ReceitasFeitass, setReceitasFeitas] = useState('');
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
    // mock localstorage
    /*     setStorage([
      {
        id: '53013',
        type: 'comida',
        area: 'American',
        category: 'Beef',
        alcoholicOrNot: '',
        name: 'Big Mac',
        image:
          'https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg',
      }]); */
    // mock localstorage
    setReceitasFeitas([
      {
        id: '52785',
        type: 'meals',
        area: 'Indian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Dal fry',
        image:
          'https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg',
        doneDate: '27/10/2022',
        tags: ['Curry', 'Vegetarian'],
      },
    ]);
  }, []);

  useEffect(() => {
    setTitle('Done Recipes');
    setShowIcon(false);
  }, [setTitle, setShowIcon]);

  function deletes(id) {
    const filtered = ReceitasFeitass.filter((item) => item.id !== id);
    // setStorage('ReceitasFeitas', filtered);
    setReceitasFeitas(filtered);
  }

  return (
    <div>
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
      {ReceitasFeitass.length === 0 ? (
        <h3>Sem Receitas Favoritas!</h3>
      ) : (
        ReceitasFeitass.map(
          (
            { category,
              id, type, doneDate, tags, image, area, alcoholicOrNot, name },
            index,
          ) => (
            <div data-testid={ `${index}-recipe-card` } key={ index }>
              <Link to={ `/${type}/${id}` }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ image }
                  alt={ name }
                />
              </Link>
              <div>
                {type === 'meals'
                  ? mealInfo(index, category, area)
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
                        // data-testid="0-Pasta-horizontal-tag"
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

                <button name="apagar" type="button" onClick={ () => deletes(id) }>
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

export default ReceitasFeitas;
