import '../App/App.css';
import React, {useEffect} from "react";
import {select,timeParse, min, line, extent, scaleLinear, timeFormat,scaleTime ,max, axisBottom, axisLeft} from "d3";
import data from '../data/linedata.json';

function MultiLine(props) {
  //const svgRef = useRef();
  
  useEffect(() => {

    //const svg = select(svgRef.current);

    draw("#asia","Asia");
    draw("#northamerica","North America");
    draw("#southamerica","South America");
    draw("#africa","Africa");
    draw("#oceanic","Oceanic");
    draw("#europe","Europe");
    
    //.append("svg");
    function draw(svgid,db){
    var svg = select(svgid);
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 300 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;
    var parseTime = timeParse("%B%Y");
    //console.log(data[db]);

    for(var i=0; i<data[db].length; i++){
        if (parseTime(data[db][i].month)==null){
            break;
        }
        else{
            data[db][i].month = parseTime(data[db][i].month);
        }
        //console.log(data[db][i].month);
    }

    // set the ranges
    var x = scaleTime().range([0, width]);
    var y = scaleLinear().range([height, 0]);

    // define the 1st line
    var valueline = line()
        .x(function(d) {return x(d.month); })
        .y(function(d) {return y(d.arrived); });

    // define the 2nd line
    var valueline2 = line()
        .x(function(d) { return x(d.month); })
        .y(function(d) { return y(d.departed); });

    var valueline3 = line()
        .x(function(d) { return x(d.month); })
        .y(function(d) { return y(d.covid); });

    svg.attr("width", 100+width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Scale the range of the data
    x.domain(extent(data[db], function(d) { return d.month; }));
    y.domain([min(data[db], function(d) {
        return Math.min(d.arrived, d.departed, d.covid); }), max(data[db], function(d) {
        return Math.max(d.arrived, d.departed, d.covid); })]);

    // Add the valueline path.
    svg.append("path")
        .data([data[db]])
        .attr("class", "line")
        .style("stroke", "blue")
        .style("fill","none")
        .attr("transform", "translate(100,0)")
        .attr("d", valueline);

    // Add the valueline2 path.
    svg.append("path")
        .data([data[db]])
        .attr("class", "line")
        .style("stroke", "red")
        .style("fill","none")
        .attr("transform", "translate(90,0)")
        .attr("d", valueline2);

    svg.append("path")
        .data([data[db]])
        .attr("class", "line")
        .style("stroke", "yellow")
        .style("fill","none")
        .attr("transform", "translate(90,0)")
        .attr("d", valueline3);

    // Add the X Axis
    svg.append("g")
        .attr("transform", "translate(90," + height + ")")
        .call(axisBottom(x).tickFormat(timeFormat("%b")).tickPadding(10));

    // Add the Y Ax is
    svg.append("g")
        .attr("transform", "translate(90,0)")
        .call(axisLeft(y));
    //}

    svg.append("text")
        .attr("dx", function(d){return 200})
        .attr("dy", function(d){return 200})
        .attr("fill","white")
	    .text(db);
    }
    });
    
        return (
        <div>
        <svg id="asia" ></svg>
        <svg id="northamerica" ></svg>  
        <svg id="southamerica" ></svg>  
        <svg id="africa" ></svg>  
        <svg id="oceanic" ></svg>   
        <svg id="europe" ></svg>
        </div>
        );
    }
    
    export default MultiLine;
    