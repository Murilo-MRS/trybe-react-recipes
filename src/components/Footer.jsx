import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

export default function Footer() {
  const history = useHistory();
  return (
    <div data-testid="footer" className="footer-container">
      <button
        type="button"
        src={ drinkIcon }
        data-testid="drinks-bottom-btn"
        onClick={ () => history.push('/drinks') }
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
        onClick={ () => history.push('/meals') }
      >
        <img
          src={ mealIcon }
          alt="meals button"
        />
      </button>
    </div>
  );
}
