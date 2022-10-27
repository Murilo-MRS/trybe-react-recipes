import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import {
  fetchDrinksByFirstLetter,
  fetchDrinksByIngredient,
  fetchDrinksByName,
  fetchFoodsByFirstLetter,
  fetchFoodsByIngredient,
  // eslint-disable-next-line comma-dangle
  fetchFoodsByName,
} from '../services/Api';

function SearchBar() {
  const { setFoods, setDrinks } = useContext(Context);
  const [radioValue, setRadioValue] = useState();
  const [searchInput, setSearchInput] = useState('');
  const history = useHistory();
  const fLetter = 'First letter';
  const errorMsg = 'Sorry, we haven\'t found any recipes for these filters.';

  const alertRedirect = (array, section, key) => {
    if (array === null) {
      return global.alert(errorMsg);
    }
    if (array.length === 1) {
      history.push(`/${section}/${array[0][key]}`);
    }
  };

  const handleClickMeals = async () => {
    if (radioValue === 'Ingredient') {
      const searchData = await fetchFoodsByIngredient(searchInput);
      alertRedirect(searchData, 'meals', 'idMeal');
      setFoods(searchData);
    }
    if (radioValue === 'Name') {
      const searchData = await fetchFoodsByName(searchInput);
      alertRedirect(searchData, 'meals', 'idMeal');
      setFoods(searchData);
    }
    if (radioValue === fLetter) {
      if (searchInput.length >= 2) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        const searchData = await fetchFoodsByFirstLetter(searchInput);
        alertRedirect(searchData, 'meals', 'idMeal');
        setFoods(searchData);
      }
    }
  };

  const handleClickDrinks = async () => {
    if (radioValue === 'Ingredient') {
      const searchData = await fetchDrinksByIngredient(searchInput);
      alertRedirect(searchData, 'drinks', 'idDrink');
      setDrinks(searchData);
    }
    if (radioValue === 'Name') {
      const searchData = await fetchDrinksByName(searchInput);
      alertRedirect(searchData, 'drinks', 'idDrink');
      setDrinks(searchData);
    }
    if (radioValue === fLetter) {
      if (searchInput.length >= 2) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        const searchData = await fetchDrinksByFirstLetter(searchInput);
        alertRedirect(searchData, 'drinks', 'idDrink');
        setDrinks(searchData);
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        id="search"
        value={ searchInput }
        placeholder="Buscar receitas"
        data-testid="search-input"
        onChange={ ({ target }) => setSearchInput(target.value) }
      />
      <label htmlFor="search-radio">
        Ingredient
        <input
          name="search-radio"
          value="Ingredient"
          type="radio"
          data-testid="ingredient-search-radio"
          checked={ radioValue === 'Ingredient' }
          onChange={ ({ target }) => setRadioValue(target.value) }
        />
      </label>
      <label htmlFor="search-radio">
        Name
        <input
          name="search-radio"
          value="Name"
          type="radio"
          data-testid="name-search-radio"
          checked={ radioValue === 'Name' }
          onChange={ ({ target }) => setRadioValue(target.value) }
        />
      </label>
      <label htmlFor="search-radio">
        First letter
        <input
          name="search-radio"
          value="First letter"
          type="radio"
          data-testid="first-letter-search-radio"
          checked={ radioValue === fLetter }
          onChange={ ({ target }) => setRadioValue(target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={
          history.location.pathname === '/meals'
            ? handleClickMeals
            : handleClickDrinks
        }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
