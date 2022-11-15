import './css/App.css';
import React, {useState, useRef, useLayoutEffect, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Flower from './components/Flower';

function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route exact path="/flower-cup" element={<Flower />} />
      </Routes>
    </div>
  );
}

export default App;
