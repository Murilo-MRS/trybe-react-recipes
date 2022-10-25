import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../context/Context';
import '../styles/Div.css';

function Meals() {
  const { setTitle, setShowIcon, foods } = useContext(Context);
  const MAX = 12;

  useEffect(() => {
    setTitle('Meals');
    setShowIcon(true);
  }, [setTitle, setShowIcon]);

  return (
    <div>
      <Header />
      <h1>Meals component</h1>
      {
        foods?.slice(0, MAX).map((food, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            key={ index }
            className="card-name"
          >
            <Link to={ `/meals/${food.idMeal}` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ food.strMealThumb }
                alt={ food.strMeal }
                width="200px"
              />
              <p
                data-testid={ `${index}-card-name` }
              >
                {food.strMeal}
              </p>
            </Link>
          </div>
        ))
      }
      <Footer />
    </div>
  );
}

export default Meals;
