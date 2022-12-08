import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

function FavShareButton({ type, id }) {
  const [copied, setCopy] = useState(false);

  const sharebtn = () => {
    const urlMealorDrink = `http://localhost:3000/${type}s/${id}`;
    setCopy(true);
    copy(urlMealorDrink);
  };

  return (
    <>
      <button
        src={ shareIcon }
        type="button"
        data-testid="share-btn"
        onClick={ sharebtn }
      >
        <img
          src={ shareIcon }
          alt="Icone de compartilhar"
        />
      </button>
      {copied && <p className="linkCopy">Link copied!</p>}
    </>
  );
}

FavShareButton.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default FavShareButton;
