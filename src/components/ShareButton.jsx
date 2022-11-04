import copy from 'clipboard-copy';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import shareIcon from '../images/shareIcon.svg';
import '../styles/RecipeDetails.css';

export default function ShareButton() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const [copied, setCopy] = useState(false);
  const handleShareButt = () => {
    const urlMealorDrink = `http://localhost:3000${pathname}`;
    if (urlMealorDrink.includes('/in-progress')) {
      const newUrl = urlMealorDrink.replace('/in-progress', '');
      setCopy(true);
      copy(newUrl);
    } else {
      setCopy(true);
      copy(urlMealorDrink);
    }
  };

  return (
    <div>
      <button
        className="share-btn"
        src={ shareIcon }
        type="button"
        data-testid="share-btn"
        onClick={ handleShareButt }
      >
        <img src={ shareIcon } alt="Icone de compartilhar" />
      </button>
      {copied && <p>Link copied!</p>}
    </div>
  );
}
