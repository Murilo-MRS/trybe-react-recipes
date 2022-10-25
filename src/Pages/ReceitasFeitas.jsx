import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Context from '../context/Context';

function ReceitasFeitas() {
  const { setTitle, setShowIcon } = useContext(Context);
  useEffect(() => {
    setTitle('Done Recipes');
    setShowIcon(false);
  }, [setTitle, setShowIcon]);
  return (
    <div>
      <Header />
      <h1>ReceitasFeitas component</h1>
    </div>
  );
}

export default ReceitasFeitas;
