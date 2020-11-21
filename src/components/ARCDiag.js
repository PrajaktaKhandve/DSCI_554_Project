import '../App/App.css';
import React, {useRef, useEffect, useState} from "react";
import {select, scaleOrdinal, scaleLinear, scalePoint, schemeSet3 } from "d3";
import data from '../data/nodes.json';

//const data = [10,5,20,60,40,70,30,60,70,90,100,30,20,10]

function ARCDiag(props) {
  //console.log(props.month);


 
  const svgRef = useRef();

  //function handleClick() {setMonth('February')};

var margin = {top: 0, right: 30, bottom: 50, left: 60},
  width = 650 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;


useEffect(() => {
  //after all the dom elems have been rendered
 
  const svg = select(svgRef.current);
  svg.selectAll("*").remove();
 // console.log(props.month);
  var month = props.month
    var allNodes = data[month].nodes.map(function(d){return d.continent});
    var allGroups = data[month].nodes.map(function(d){return d.continent});
    allGroups = [...new Set(allGroups)];
      //console.log(allGroups);

    var color = scaleOrdinal()
    .domain(allGroups)
    .range(schemeSet3);

    var maximumCovid = Number.MIN_VALUE;
    var minimumCovid = Number.MAX_VALUE;
    data[month].nodes.forEach(d=>{
      maximumCovid = Math.max(maximumCovid,d.covidcases)
      minimumCovid =  Math.min(minimumCovid,d.covidcases)
    }
    );
    //console.log(maximumCovid);
    //console.log(minimumCovid);
    //need to find the max and min number of covid cases on pass to the domain
    var size = scaleLinear()
    .domain([minimumCovid,maximumCovid])
    .range([3,12]);

    var maximumFlights = Number.MIN_VALUE;
    var minimumFlights = Number.MAX_VALUE;
    data[month].links.forEach(d=>{
      maximumFlights = Math.max(maximumFlights,d.count)
      minimumFlights =  Math.min(minimumFlights,d.count)
    }
    );

    //console.log(maximumFlights);
    //console.log(minimumFlights);

    var x = scalePoint()
    .range([0, width])
    .padding(0.9)
    .domain(allNodes);

    // In my input data, links are provided between nodes -id-, NOT between node names.
  // So I have to do a link between this id and the name
  var idToNode = {};
  data[month].nodes.forEach(function (n) {
    idToNode[n.continent] = n;
  });
//max of particular month number of flights

var widths = scaleLinear()
.domain([1,20000])
.range([1,10]);

  var links = svg
    .selectAll('mylinks')
    .data(data[month].links)
    .enter()
    .append('path')
    .attr("transform", "translate(10 0)")
    .attr('d', function (d) {
      var start = x(idToNode[d.source].continent)    // X position of start node on the X axis
      var end = x(idToNode[d.destination].continent)      // X position of end node
      return ['M', start, height-30,    // the arc starts at the coordinate x=start, y=height-30 (where the starting node is)
        'A',                            // This means we're gonna build an elliptical arc
        (start - end)/2, ',',    // Next 2 lines are the coordinates of the inflexion point. Height of this point is proportional with start - end distance
        (start - end)/2, 0, 0, ',',
        start < end ? 1 : 0, end, ',', height-30] // We always want the arc on top. So if end is before start, putting 0 here turn the arc upside down.
        .join(' ');
    })
    .style("fill", "none")
    .attr("stroke", "#6456B7")
    .style("stroke-width", function(d){return widths(d.count);});

    //console.log(links);

    var nodes = svg
    .selectAll("mynodes")
    //.transform="translate(100 300)"
    .data(data[month].nodes.sort(function(a,b) { return +b.covidcases - +a.covidcases }))
    .enter()
    .append("circle")
      .attr("transform", "translate(10 0)")
      .attr("cx", function(d){ return(x(d.continent))})
      .attr("cy", height-30)
      .attr("r", function(d){ return(2*size(d.covidcases))})
      .style("fill", function(d){ return color(d.continent)})
      .attr("stroke", "white")

    var labels = svg
    .selectAll("mylabels")
    .data(data[month].nodes)
    .enter()
    .append("text")
      .attr("x", 0)
      .attr("y", 0)
      .attr("fill","white")
      .text(function(d){ return(d.continent)} )
      .style("text-anchor", "end")
      //.attr("transform", "translate(100 0)")
      .attr("transform", function(d){ return( "translate(" + (x(d.continent)+10) + "," + (height-15) + ")rotate(-45)")})
      .style("font-size", 15)

      nodes
      .on('mouseover', function (i,d) {
         var str = "Details\n";
         str += d.continent +" region with "+ d.covidcases+ " covidcases for the month of " + props.month +"\n\n";
         data[props.month].links.forEach( function(link){
           if (link.source === d.continent){
              str += link.source + " to " + link.destination +" has "+ link.count +" flights" + "\n";
           }
         }
           
         )
         document.getElementById("detailsArcDiagram").innerText = str;
        nodes
          .style('opacity', .2)
          //console.log('d', d);
          //console.log('i',i);
          select(this)
          .style('opacity', 1)

        links
          .style('stroke', function (link_d) { return link_d.source === d.continent || link_d.destination === d.continent ? color(d.continent) : '#b8b8b8';})
          .style('stroke-opacity', function (link_d) { return link_d.source === d.continent || link_d.destination === d.continent ? 1 : .2;})
          .style('stroke-width', function (link_d) { return link_d.source === d.continent || link_d.destination === d.continent ? widths(link_d.count) : 1;})

         
        labels
          .style("font-size", function(label_d){ return label_d.continent === d.continent ? 16 : 2 } )
          .attr("y", function(label_d){ return label_d.continent === d.continent ? 10 : 0 } )
         
      })
      .on('mouseout', function (d) {
        nodes.style('opacity', 1)
        links
          .style('stroke', '#6456B7')
          .style('stroke-opacity', .8)
          .style('stroke-width', function(d){ return widths(d.count);})
        labels
          .style("font-size", 15 )
  
      })

      // List of groups

    });

  return (
    <div>
  
    <svg id="acrDiag" ref={svgRef} ></svg>
    </div>
  );
}

export default ARCDiag;
