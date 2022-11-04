import React from 'react';
import { useHistory } from 'react-router-dom';
import AllDrink from '../images/iconsFigma/iconsMeals/DrinkIcon.svg';
import All from '../images/iconsFigma/iconsMeals/MealIcon.svg';
import '../styles/Footer.css';

export default function Footer() {
  const history = useHistory();

  const redirectToDrinks = () => {
    history.push('/drinks');
  };

  const redirectToMeals = () => {
    history.push('/meals');
  };

  return (
    <footer data-testid="footer" className="footer-container">
      <button
        type="button"
        src={ AllDrink }
        data-testid="drinks-bottom-btn"
        onClick={ () => redirectToDrinks() }
      >
        <img
          src={ AllDrink }
          alt="drinks button"
        />
      </button>
      <button
        type="button"
        src={ All }
        data-testid="meals-bottom-btn"
        onClick={ () => redirectToMeals() }
      >
        <img
          src={ All }
          alt="meals button"
        />
      </button>
    </footer>
  );
}
