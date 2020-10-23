import { hot } from 'react-hot-loader/root';
import React from 'react';
import logo from '../logo.svg';
import './App.css';
import Route from '../routes/index';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <div className='App-header'>
        <h2>d3ia dashboard</h2>
      </div>
      </header>
        <Route />
    </div>
  );
}

export default hot(App);
