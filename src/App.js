import React from 'react';
import logo from './logo.svg';
import './App.css';
import Barchart from './Barchart';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <div className='App-header'>
      <h2>d3ia dashboard</h2>
      </div>
      <div>
      <Barchart data={[5,10,1,3]} size={[500,500]} />
      </div>
      </header>
    </div>
  );
}

export default App;
