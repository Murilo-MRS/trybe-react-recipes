import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import Context from './Context';

function Provider({ children }) {
  const [state, setState] = useState();

  const appContext = useMemo(
    () => (
      {
        state,
        setState,
      }
    ),
    [
      state,
    ],
  );

  return (
    <Context.Provider value={ appContext }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
