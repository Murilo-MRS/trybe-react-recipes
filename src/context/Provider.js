import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchDrinks, fetchFoods } from '../services/Api';
import Context from './Context';

const PASSWORD_MIN_SIZE = 6;

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enableFormButt, setEnableFormButt] = useState(true);
  const [title, setTitle] = useState('');
  const [showIcon, setShowIcon] = useState(true);
  // nao reutilizar
  const [foodsAPI, setFoodsAPI] = useState([]);
  // nao reutilizar
  const [drinksAPI, setDrinksAPI] = useState([]);
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const clearInputs = useCallback(() => {
    setEmail('');
    setPassword('');
  }, [setEmail]);

  const handleEmailChange = useCallback(({ target }) => {
    setEmail(target.value);
  }, [setEmail]);

  const handlePasswordChange = useCallback(({ target }) => {
    setPassword(target.value);
  }, [setPassword]);

  useEffect(() => {
    const requestApiDrinks = async () => {
      const drinksArr = await fetchDrinks();
      const foodsArr = await fetchFoods();
      setDrinksAPI(drinksArr);
      setFoodsAPI(foodsArr);
      setDrinks(drinksArr);
      setFoods(foodsArr);
    };
    requestApiDrinks();
  }, []);

  useEffect(() => {
    const regex = /\S+@\S+\.\S+/;
    const validEmail = regex.test(email);
    const validPassword = password.length > PASSWORD_MIN_SIZE;
    setEnableFormButt(!(validEmail && validPassword));
  }, [email, password]);

  const appContext = useMemo(
    () => ({
      email,
      handleEmailChange,
      password,
      handlePasswordChange,
      enableFormButt,
      title,
      setTitle,
      showIcon,
      setShowIcon,
      foods,
      setFoods,
      drinks,
      setDrinks,
      foodsAPI,
      drinksAPI,
      clearInputs,
    }),
    [
      email,
      handleEmailChange,
      password,
      handlePasswordChange,
      enableFormButt,
      title,
      setTitle,
      showIcon,
      setShowIcon,
      foods,
      drinks,
      setDrinks,
      foodsAPI,
      drinksAPI,
      clearInputs,
    ],
  );

  return <Context.Provider value={ appContext }>{children}</Context.Provider>;
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
