import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import Context from '../context/Context';
import '../styles/Div.css';

function Drink() {
  const { setTitle, setShowIcon, drinks } = useContext(Context);
  const MAX = 12;

  useEffect(() => {
    setTitle('Drinks');
    setShowIcon(true);
  }, [setTitle, setShowIcon]);
  return (
    <div>
      <Header />
      <h1>Drinks Component</h1>
      <Recipes />
      <section>
        {
          drinks?.slice(0, MAX).map((drink, index) => (
            <div
              data-testid={ `${index}-recipe-card` }
              key={ index }
              className="card-name"
            >
              <Link to={ `/drinks/${drink.idDrink}` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                  width="200px"
                />
                <p
                  className="card-name"
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
