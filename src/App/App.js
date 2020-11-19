import { hot } from 'react-hot-loader/root';
import React from 'react';
import { 
  Route,
  Switch
} from 'react-router-dom'; 
import './App.css';
import Region from '../components/Region';
import Map from '../components/Map';
import video from "../data/videoplayback.mkv";
import './style.css';

var __html = require('./document.js');
var homepage = { __html: __html };

const HomePage = () => (
  <div>
    <div dangerouslySetInnerHTML={homepage}/>
    <video src={video} autoPlay muted loop></video>
  </div>
);

function App() {
  return (
      <div>
        <Switch> 
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/map">
            <div className="white-background">
              <Map/>
            </div>
          </Route>
          <Route path="/region">
            
            <Region />
          </Route>
        </Switch> 
      </div> 
  );
}

export default hot(App);
