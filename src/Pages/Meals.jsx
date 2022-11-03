import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import Context from '../context/Context';
import iconePrato from '../images/iconsFigma/iconePrato.png';
import '../styles/estiloDoGrid.css';

function Meals() {
  const { setTitle, setShowIcon, foods } = useContext(Context);
  const MAX = 12;

  useEffect(() => {
    setTitle('Meals');
    setShowIcon(true);
  }, [setTitle, setShowIcon]);

  return (
    <div className="mealsComponent">
      <Header />
      <div className="cabecalho-img-name">
        <img className="iconePrato" src={ iconePrato } alt="iconePrato" />
        <p>Meals</p>
      </div>
      <Recipes />
      <div className="recipes-container">
        {
          foods?.slice(0, MAX).map((food, index) => (
            <div
              data-testid={ `${index}-recipe-card` }
              key={ index }
              className="card-name"
            >
              <Link to={ `/meals/${food.idMeal}` }>
                <div>
                  <img
                    className="card-name-img"
                    data-testid={ `${index}-card-img` }
                    src={ food.strMealThumb }
                    alt={ food.strMeal }
                  />
                </div>
                <div className="card-text">
                  <p
                    data-testid={ `${index}-card-name` }
                  >
                    {food.strMeal}
                  </p>

                </div>

              </Link>
            </div>
          ))
        }
      </div>
      <Footer />
    </div>
  );
}

export default Meals;
