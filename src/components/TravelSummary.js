
import '../App/App.css';
import React, {useRef, useEffect} from "react";
import {select, scaleLinear, axisLeft, min, max } from "d3";
import data from '../data/barchartdata.json';

function TravelSummary(props) {
  //console.log(props.month);
 
  const svgRef = useRef();

  //function handleClick() {setMonth('February')};
useEffect(() => {
  
  var bardata1 = data[props.region];
  //console.log(bardata);


  var leftMargin = 50;  // Space to the left of first bar; accomodates y-axis labels
  var rightMargin = 10; // Space to the right of last bar
  var margin = {left: leftMargin, right: rightMargin, top: 10, bottom: 10};
  var barWidth = 30;  // Width of the bars
  var chartHeight = 200;  // Height of chart, from x-axis (ie. y=0)
  var chartWidth =100+ margin.left + bardata1.length * barWidth + margin.right;

  drawSafe(bardata1);
  drawEase(bardata1);
  question1(bardata1);
  question2(bardata1);



  function question1(bardata1){
    var color = (d) => {
        return d <0 ? "crimson" : "seagreen"
    }

    var svg = select('#question1');
    svg.selectAll("*").remove();

    svg.append("text")
    .attr("x", 100)
    .attr("y", 100)
    .text("How Easy to Travel?")
    .attr("font-family", "sans-serif")
    .attr("font-size", "20px")
    .attr("fill", "white")

    console.log(bardata1[bardata1.length-1].ease, color(bardata1[bardata1.length-1].ease));

    svg.append("rect")
    .attr("x", 60)
    .attr("y", 80)
    .attr("fill", color(bardata1[bardata1.length-1].ease))
    .attr("width", 20)
    .attr("height", 20);


  }

  function question2(bardata1){
    var color = (d) => {
        return d <0 ? "crimson" : "seagreen"
    }

    var svg = select('#question2');
    svg.selectAll("*").remove();

    
    svg.append("text")
    .attr("x", 100)
    .attr("y", 100)
    .text("How Safe to Travel?")
    .attr("font-family", "sans-serif")
    .attr("font-size", "20px")
    .attr("fill", "white")

    svg.append("rect")
    .attr("x", 60)
    .attr("y", 80)
    .attr("width", 20)
    .attr("height", 20)
    .attr("fill",color(bardata1[bardata1.length-1].safe));
  
  }

  function drawSafe(bardata){
    var color = (d) => {
        return d.safe <0 ? "crimson" : "seagreen"
    }
    console.log(bardata);
    var yScale = scaleLinear()
    .domain([0, max(bardata.map(d=> d.safe))])
    .range([0, chartHeight]);

    var yAxisScale = scaleLinear()
            .domain([min(bardata.map(d=> d.safe)), max(bardata.map(d=> d.safe))])
            .range([chartHeight - yScale(min(bardata.map(d=> d.safe))), 0 ]);

    var svg = select('#travelSummarySafety');

    svg.selectAll("*").remove();

    svg
    .attr('height', chartHeight + 100)
    .attr('width', chartWidth)
    .style('border', '1px solid')
    .attr("transform", "translate(20 0)")

    svg
    .selectAll("rect")
    .attr("transform", "translate(20 0)")
    .data(bardata)
    .enter()
    .append("rect")
    .attr("transform", "translate(70,0)")
    .attr("x", function(d, i) { return margin.left + i * barWidth; })
    .attr("y", function(d, i) { return chartHeight - Math.max(0, yScale(d.safe));})
    .attr("height", function(d) { return Math.abs(yScale(d.safe)); })
    .attr("width", barWidth)
    .style("fill", function(d) { return color(d); })
    .style("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", function(d, i) { return 1 /*- (i * (1/data.length)); */});

    var yAxis = axisLeft(yAxisScale);

    svg.append('g')
    .attr("transform", "translate(70,0)")
    /*.attr('transform', function(d) {
    return 'translate(' + margin.left + ', 0)';
    })*/
    .call(yAxis);

  }

  function drawEase(bardata){

    var color = (d) => {
        return d.ease <0 ? "crimson" : "seagreen"
    }

  /* This scale produces negative output for negatve input */
  var yScale = scaleLinear()
                 .domain([0, max(bardata.map(d=> d.ease))])
                 .range([0, chartHeight]);

  /*
   * We need a different scale for drawing the y-axis. It needs
   * a reversed range, and a larger domain to accomodate negaive values.
   */
  var yAxisScale = scaleLinear()
                     .domain([min(bardata.map(d=> d.ease)), max(bardata.map(d=> d.ease))])
                     .range([chartHeight - yScale(min(bardata.map(d=> d.ease))), 0 ]);

  var svg = select('#travelSummaryEase');

  svg.selectAll("*").remove();

  svg
      .attr('height', chartHeight + 100)
      .attr('width', chartWidth)
      .style('border', '1px solid');

  svg
    .selectAll("rect")
    .data(bardata)
    .enter()
    .append("rect")
      .attr("x", function(d, i) { return margin.left + i * barWidth; })
      .attr("y", function(d, i) { return chartHeight - Math.max(0, yScale(d.ease));})
      .attr("height", function(d) { return Math.abs(yScale(d.ease)); })
      .attr("width", barWidth)
      .style("fill", function(d) { return color(d); })
      .style("stroke", "black")
      .style("stroke-width", "1px")
      .attr("transform", "translate(70,0)")
      .style("opacity", function(d, i) { return 1 /*- (i * (1/data.length)); */});

  var yAxis = axisLeft(yAxisScale);
  
  svg.append('g')
  .attr("transform", "translate(70,0)")
  /*  .attr('transform', function(d) {
      return 'translate(' + margin.left + ', 0)';
    })*/
    
    .call(yAxis);

  }

 });

  return (
    
    <div className="App">
    <svg id="question1" ref={svgRef} ></svg>
    <svg id="travelSummaryEase" ref={svgRef} ></svg>
    <svg id="question2" ref={svgRef} ></svg>
    <svg id="travelSummarySafety" ref={svgRef} ></svg>
    </div>
  );
}

export default TravelSummary;
