import { hot } from 'react-hot-loader/root';
import React from 'react';
import { 
  Route,
  Switch
} from 'react-router-dom'; 
import './App.css';
import RegionDiag from '../components/RegionDiag';
import Map from '../components/Map';
// import StreamGraph from '../components/StreamGraph';
import Stream from '../components/Stream_v3';
import Radial19 from '../components/Radial_19_v3';
import Radial20 from '../components/Radial_20_v3';
import Mapbox from '../components/Mapbox';
import Donuts from '../components/Donuts';
import './style.css';

var __html_homepage = require('./document.js');
var homepage = { __html: __html_homepage };

var __html_sanya = require('./Sanya.js');
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
        <Route path="/streamgraph">
            <Stream />
        </Route>
        <Route path="/radial_bar19">
            <Radial19 />
        </Route>
        <Route path="/radial_bar20">
            <Radial20 />
        </Route>
        <Route path="/mapbox">
            <Mapbox />
        </Route>
        <Route path="/donuts">
            <Donuts />
        </Route>
        
        
        </Switch> 
      </div>
  );
}

export default hot(App);
