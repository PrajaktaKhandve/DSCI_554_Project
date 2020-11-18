import { hot } from 'react-hot-loader/root';
import React from 'react';
import { 
  Route,
  Switch
} from 'react-router-dom'; 
import './App.css';
import RegionDiag from '../components/RegionDiag';
import Map from '../components/Map';
import './style.css';

var __html_homepage = require('./document.js');
var homepage = { __html: __html_homepage };

var __html_sanya = require('./sanya.js');
var sanya = { __html: __html_sanya };

const HomePage = () => (
  <div dangerouslySetInnerHTML={homepage} />
);

const Sanya = () => (
  <div dangerouslySetInnerHTML={sanya} />
);

function App() {
  return (
      <div>
      {/* <nav className="navbar navbar-light">
      <ul className="nav navbar-nav"> 
          <li> 
            <Link to="/">Home</Link> 
          </li> 
          <li> 
            <Link to="/bar-chart">Bar Chart</Link> 
          </li> 
          <li> 
            <Link to="/map">Map</Link> 
          </li> 
          <li> 
            <Link to="/region">Region Wise</Link> 
          </li> 
        </ul> 
      </nav> */}

        <Switch> 
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/map">
            <Map />
          </Route>
          <Route path="/region">
            <RegionDiag />
          </Route>
          <Route path="/airports">
            <Sanya />
          </Route>
        </Switch> 
      </div> 
  );
}

export default hot(App);
