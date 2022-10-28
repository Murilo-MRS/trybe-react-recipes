import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
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
        src={ drinkIcon }
        data-testid="drinks-bottom-btn"
        onClick={ () => redirectToDrinks() }
      >
        <img
          src={ drinkIcon }
          alt="drinks button"
        />
      </button>
      <button
        type="button"
        src={ mealIcon }
        data-testid="meals-bottom-btn"
        onClick={ () => redirectToMeals() }
      >
        <img
          src={ mealIcon }
          alt="meals button"
        />
      </button>
    </footer>
  );
}
