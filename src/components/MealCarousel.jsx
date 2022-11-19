import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';
import React, { useContext, useRef } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Context from '../context/Context';
import '../styles/RecipeDetails.css';

function MealCarousel() {
  const carousel = useRef();
  const {
    location: { pathname },
  } = useHistory();

  const foodPath = pathname.includes('meals');
  const { foods, drinks } = useContext(Context);
  const MAX = 6;
  return (
    <div className="recipe-recom">
      <motion.div
        ref={ carousel }
        className="carousel"
        whileTap={ { cursor: 'grabbing' } }
      >
        <motion.div
          className="inner"
          drag="x"
          dragConstraints={ { right: 650, left: -680 } }
        >
          {!foodPath
            ? foods?.slice(0, MAX).map((e, index) => (
              <motion.div
                className="item"
                key={ e.idMeal }
                data-testid={ `${index}-recommendation-card` }
              >
                <img src={ e.strMealThumb } alt={ e.strMeal } />
                <Link to={ `/meals/${e.idMeal}` }>
                  { e.strMeal }
                </Link>
              </motion.div>
            ))
            : drinks?.slice(0, MAX).map((e, index) => (
              <motion.div
                className="item"
                key={ e.idDrink }
                data-testid={ `${index}-recommendation-card` }
              >
                <img src={ e.strDrinkThumb } alt={ e.strDrink } />
                <Link to={ `/drinks/${e.idDrink}` }>
                  { e.strDrink }
                </Link>
              </motion.div>
            ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default MealCarousel;
