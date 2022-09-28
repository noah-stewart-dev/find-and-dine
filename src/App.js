import './App.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Selector from './components/Selector';
import Platter from './components/Platter';
import FindButton from './components/FindButton';

import priceImg from './images/price.png';
import distanceImg from './images/distance.png';

function App() {
  const [price, setPrice] = useState(null);
  const [distance, setDistance] = useState(null);
  const [locationDetails, setLocationDetails] = useState({});
  const [spinPlate, setSpinPlate] = useState(null);

  useEffect(() => {
    document.title = "Find & Dine";
    getCount();
  }, []);

  const getCount = async () => {
    const count = await axios.get('/.netlify/functions/getCount');

    document.getElementById('found-count').innerHTML = count.data.result.value;
  };

  return (
    <div className='App'>
      <div className='app-container'>
        <h1 className='title-header'>Find & Dine</h1>
        <Platter className='plate' locationDetails={locationDetails} startSpin={spinPlate}></Platter>
        <Selector className='price-selector' groupIdIndex={0} img={priceImg} value1='1' value2='2' value3='3' selectedValue={setPrice}></Selector>
        <Selector className='distance-selector' groupIdIndex={3} img={distanceImg} value1='1610' value2='16100' value3='48300' selectedValue={setDistance}></Selector>
        <FindButton selectedPrice={price} selectedDistance={distance} locationDetails={setLocationDetails} setPlateSpinning={setSpinPlate}></FindButton>
        <h2 className='footer'>We've helped people dine <span id="found-count"></span> times</h2>
      </div>
    </div>
  );
}

export default App;