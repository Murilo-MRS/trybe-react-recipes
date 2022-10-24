import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Context from './Context';

const PASSWORD_MIN_SIZE = 6;

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enableFormButt, setEnableFormButt] = useState(true);

  const handleEmailChange = useCallback(({ target }) => {
    setEmail(target.value);
  }, [setEmail]);

  const handlePasswordChange = useCallback(({ target }) => {
    setPassword(target.value);
  }, [setPassword]);

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
    }),
    [email, handleEmailChange, password, handlePasswordChange, enableFormButt],
  );

  return <Context.Provider value={ appContext }>{children}</Context.Provider>;
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
