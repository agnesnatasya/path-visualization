import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Title } from './components/Title';
import Grids from "./components/Grids/Grids.js";

function App() {
  return (
    <div className="App">
      <Title />
      <Grids />
    </div>
  );
}

export default App;
