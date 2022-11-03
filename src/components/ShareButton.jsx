import copy from 'clipboard-copy';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import shareIcon from '../images/shareIcon.svg';

export default function ShareButton() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const [copied, setCopy] = useState(false);
  const handleShareButt = () => {
    const urlMealorDrink = `http://localhost:3000${pathname}`;
    setCopy(true);
    copy(urlMealorDrink);
  };

  return (
    <div>
      <button
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
