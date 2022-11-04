import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import Context from '../context/Context';
import iconeDrink from '../images/iconsFigma/iconsMeals/DrinkIcon.svg';
import '../styles/estiloDoGrid.css';

function Drink() {
  const { setTitle, setShowIcon, drinks } = useContext(Context);
  const MAX = 12;

  useEffect(() => {
    setTitle('Drinks');
    setShowIcon(true);
  }, [setTitle, setShowIcon]);
  return (
    <div className="mealsComponent">
      <Header />
      <div className="cabecalho-img-name">
        <img className="iconePrato" src={ iconeDrink } alt="iconeDrink" />
        <p>Drinks</p>
      </div>
      <Recipes />
      <section className="recipes-container">
        {
          drinks?.slice(0, MAX).map((drink, index) => (
            <div
              data-testid={ `${index}-recipe-card` }
              key={ index }
              className="card-name"
            >
              <Link to={ `/drinks/${drink.idDrink}` }>
                <img
                  className="card-name-img"
                  data-testid={ `${index}-card-img` }
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                />
                <p
                  className="card-text"
                  data-testid={ `${index}-card-name` }
                >
                  {drink.strDrink}
                </p>
              </Link>
            </div>
          ))
        }
      </section>
      <Footer />
    </div>
  );
}

export default Drink;
