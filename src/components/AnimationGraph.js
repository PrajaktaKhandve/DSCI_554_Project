import '../App/App.css';
import React, {useRef, useEffect} from "react";
import {select,bisector, json, interpolateNumber, scaleLog, scaleLinear, scaleSqrt, schemeCategory10, axisBottom, axisLeft} from "d3";

function AnimationGraph(props) {
  //console.log(props.month);
 
  const svgRef = useRef();
  const d3 = require("d3");

useEffect(() => {
  //after all the dom elems have been rendered
 
  var svg = select("#chart");
  svg.selectAll("*").remove();

  


});


  return (
    <svg id="chart" ref={svgRef} ></svg>

  );
}

export default AnimationGraph;
