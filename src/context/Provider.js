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
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);

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
      setDrinks(drinksArr);
      setFoods(foodsArr);
    };
    requestApiDrinks();
  }, []);

  // const logout = useCallback(() => {
  //   localStorage.getItem('user');
  // }, []);

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
    ],
  );

  return <Context.Provider value={ appContext }>{children}</Context.Provider>;
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
