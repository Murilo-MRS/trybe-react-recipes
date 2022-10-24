import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  return (
    <div data-testid="footer">
      <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="" />
      <img data-testid="meals-bottom-btn" src={ mealIcon } alt="" />
    </div>
  );
}
