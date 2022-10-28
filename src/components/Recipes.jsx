import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useHistory } from 'react-router';
import Context from '../context/Context';

function Recipes() {
  const { drinksCategoryList, mealsCategoryList } = useContext(Context);
  const history = useHistory();
  const { location: { pathname } } = history;
  const foodPath = pathname.includes('/meals');
  const MAX = 5;
  // const drinkPath = pathname.includes('/drinks');

  return (
    <ButtonGroup>
      {
        foodPath ? (
          mealsCategoryList?.slice(0, MAX).map((e, index) => (
            <Button
              variant="primary"
              key={ index }
              data-testid={ `${e.strCategory}-category-filter` }
              onClick={ () => console.log('click') }
            >
              {e.strCategory}
            </Button>
          ))
        ) : (
          drinksCategoryList?.slice(0, MAX).map((e, index) => (
            <Button
              variant="success"
              key={ index }
              data-testid={ `${e.strCategory}-category-filter` }
              onClick={ () => console.log('click') }
            >
              {e.strCategory}
            </Button>
          ))
        )
      }
    </ButtonGroup>
  );
}

export default Recipes;
