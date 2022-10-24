import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../context/Context';

function Meals() {
  const { setTitle, setShowIcon } = useContext(Context);
  useEffect(() => {
    setTitle('Meals');
    setShowIcon(true);
  }, [setTitle, setShowIcon]);
  return (
    <div>
      <Header />
      <h1>Meals component</h1>
      <Footer />
    </div>
  );
}

export default Meals;
