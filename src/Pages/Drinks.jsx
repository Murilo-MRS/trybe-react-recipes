import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../context/Context';

function Drink() {
  const { setTitle, setShowIcon } = useContext(Context);
  useEffect(() => {
    setTitle('Drinks');
    setShowIcon(true);
  }, [setTitle, setShowIcon]);
  return (
    <div>
      <Header />
      <h1>Drink component</h1>
      <Footer />
    </div>
  );
}

export default Drink;
