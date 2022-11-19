import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import shareIcon from '../images/shareIcon.svg';
import '../styles/RecipeDetails.css';

export default function ShareButton({ id, index }) {
  const history = useHistory();
  const {
    location: { pathname },
  } = history;
  const [copied, setCopy] = useState(false);
  const handleShareButt = () => {
    const urlMealorDrink = `http://localhost:3000${pathname}`;
    const urlDoneRecipe = `http://localhost:3000${pathname}`;
    if (urlMealorDrink.includes('/in-progress')) {
      const newUrl = urlMealorDrink.replace('/in-progress', '');
      setCopy(true);
      copy(newUrl);
    }
    if (urlDoneRecipe.includes('/done-recipes')) {
      const urlRecipes = urlMealorDrink.replace(
        '/done-recipes',
        `/meals/${id}`,
      );
      setCopy(true);
      copy(urlRecipes);
    }
    setCopy(true);
    copy(urlMealorDrink);
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
        <img
          src={ shareIcon }
          alt="Icone de compartilhar"
          data-testid={ `${index}-horizontal-share-btn` }
        />
      </button>
      {copied && <p className="linkCopy">Link copied!</p>}
    </div>
  );
}

ShareButton.propTypes = {
  // You can declare that a prop is a specific JS type. By default, these
  // are all optional.
  id: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
};
