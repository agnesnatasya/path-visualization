import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Title } from './components/Title';
import { InfoBar } from "./components/InfoBar";
import Grids from "./components/Grids/Grids.js";

function App() {
  return (
    <div className="App">
      <Title />
      <InfoBar />
      <Grids />
    </div>
  );
}

export default App;
