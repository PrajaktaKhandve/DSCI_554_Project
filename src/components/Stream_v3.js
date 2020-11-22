import React, { useRef, useEffect } from "react";
import * as d3 from 'd33';
import './StreamGraph.css';
import data from '../data/stream_data.csv';


function StreamGraph(props) {
    
    const svgRef = useRef();

    // d3.csv(data, function (data) {
    //     console.log("from d3 - data: ", data);
    // });

    useEffect(() => {
        // all dom elems have been rendered
        chart(data, "inferno");

var datearray = [];
var colorrange = [];

function chart(csvpath, color) {

if (color === "blue") {
  colorrange = ["#045A8D", "#2B8CBE", "#74A9CF", "#A6BDDB", "#D0D1E6", "#F1EEF6"];
}
else if (color === "pink") {
  colorrange = ["#980043", "#DD1C77", "#DF65B0", "#C994C7", "#D4B9DA", "#F1EEF6"];
}
else if (color === "orange") {
  colorrange = ["#B30000", "#E34A33", "#FC8D59", "#FDBB84", "#FDD49E", "#FEF0D9"];
}
else if (color === "inferno"){
    colorrange = ["#1e0946", "#330360", "#53046f", "#D4B9DA", "#8c1e6a", "#c93c48", "#e85d22", "#fea600", "#f9ce1c", "#000"]
}
var strokecolor = colorrange[0];

var format = d3.time.format("%m/%d/%y");

var margin = {top: 20, right: 90, bottom: 60, left: 90};
var width = document.body.clientWidth - margin.left - margin.right - 840;
var height = 350;

var tooltip = d3.select(".chart")
    .append("div")
    .style("position", "relative")
    .style("z-index", "1")
    .style("visibility", "visible")
    .style("bottom", "5px")
    .style("left", '40%')
    .style("color", "black");

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height-10, 0]);

var z = d3.scale.ordinal()
    .range(colorrange);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(d3.time.months);

var yAxis = d3.svg.axis()
    .scale(y);

// var yAxisr = d3.svg.axis()
//     .scale(y);

var stack = d3.layout.stack()
    .offset("wiggle")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.date; })
    .y(function(d) { return d.value; });

var nest = d3.nest()
    .key(function(d) { return d.key; });

var area = d3.svg.area()
    .interpolate("cardinal")
    .x(function(d) { return x(d.date); })
    .y0(function(d) { return y(d.y0); })
    .y1(function(d) { return y(d.y0 + d.y); });

var svg = d3.select(".chart").select("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height+ margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // eslint-disable-next-line
var graph = d3.csv(csvpath, function(data) {
  data.forEach(function(d) {
    d.date = format.parse(d.date);
    d.value = +d.value;
  });

  var layers = stack(nest.entries(data));

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.y0 + d.y; })]);

  svg.selectAll(".layer")
      .data(layers)
    .enter().append("path")
      .attr("class", "layer")
      .attr("d", function(d) { return area(d.values); })
      .style("fill", function(d, i) { return z(i); });

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + width + ", 0)")
      .call(yAxis.orient("right"));

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis.orient("left"));

  svg.selectAll(".layer")
    .attr("opacity", 1)
    .on("mouseover", function(d, i) {
      svg.selectAll(".layer").transition()
      .duration(250)
      .attr("opacity", function(d, j) {
        return j !== i ? 0.6 : 1;
    })})

    .on("mousemove", function(d, i) {
    //   var mousex = d3.mouse(this);
    //   mousex = mousex[0];
    //   var invertedx = x.invert(mousex);
    //   invertedx = invertedx.getMonth() + invertedx.getDate();
      var selected = (d.values);
      for (var k = 0; k < selected.length; k++) {
        datearray[k] = selected[k].date
        datearray[k] = datearray[k].getMonth() + datearray[k].getDate();
      }

    //   var mousedate = datearray.indexOf(invertedx);
      
      
      if (d.key === "Chicago O'Hare International Airport"){
          return d3.select(this)
            .classed("hover", true)// eslint-disable-next-line
            .attr("stroke", strokecolor)// eslint-disable-next-line
            .attr("stroke-width", "0.5px"), tooltip.html("<p><strong>" + d.key + "</strong><br>" + "January - 52887" + "<br>" + "February - 53366" + "<br>" + "March - 50476" + "<br>" + "April - 18927" + "<br>" + "May - 17980" + "<br>" + "June - 18858" + "<br>" + "July - 40424" + "<br>" + "August - 42375" + "<br>" + "September - 32756" + "<br>" + "</p>").style("visibility", "visible");
      }
      else if (d.key === "Hartsfield Jackson Atlanta International Airport"){
        return d3.select(this)
            .classed("hover", true)
            .attr("stroke", strokecolor)// eslint-disable-next-line
            .attr("stroke-width", "0.5px"), // eslint-disable-next-line
            tooltip.html( "<p><strong>" + d.key + "</strong><br>" + "January - 48738"+ "<br>" + "February - 47286" +"<br>" + "March - 42443" +"<br>" + "April - 14479" +"<br>" + "May - 13258" +"<br>" + "June - 18044" + "<br>" + "July - 39034" + "<br>"+ "August - 46658" + "<br>"+ "September - 32732" + "<br>" + "</p>" ).style("visibility", "visible");
      }
      else if (d.key === "Los Angeles International Airport"){
        return d3.select(this)
            .classed("hover", true)
            .attr("stroke", strokecolor)// eslint-disable-next-line
            .attr("stroke-width", "0.5px"), // eslint-disable-next-line
            tooltip.html( "<p><strong>" + d.key + "</strong><br>" + "January - 39205"+ "<br>" + "February - 39099" +"<br>" + "March - 35819" +"<br>" + "April - 12394" +"<br>" + "May - 11693" +"<br>" + "June - 14363" + "<br>" + "July - 24803" + "<br>"+ "August - 26722" + "<br>"+ "September - 21049" + "<br>" + "</p>" ).style("visibility", "visible");
      }
      else if (d.key === "McCarran International Airport"){
        return d3.select(this)
            .classed("hover", true)
            .attr("stroke", strokecolor)// eslint-disable-next-line
            .attr("stroke-width", "0.5px"), // eslint-disable-next-line
            tooltip.html( "<p><strong>" + d.key + "</strong><br>" + "January - 35657"+ "<br>" + "February - 33759" +"<br>" + "March - 25244" +"<br>" + "April - 8034" +"<br>" + "May - 9270" +"<br>" + "June - 14974" + "<br>" + "July - 23193" + "<br>"+ "August - 24424" + "<br>"+ "September - 19282" + "<br>" + "</p>" ).style("visibility", "visible");
      }
      else if (d.key === "Dallas Fort Worth International Airport"){
        return d3.select(this)
            .classed("hover", true)
            .attr("stroke", strokecolor)// eslint-disable-next-line
            .attr("stroke-width", "0.5px"), // eslint-disable-next-line
            tooltip.html( "<p><strong>" + d.key + "</strong><br>" + "January - 35031"+ "<br>" + "February - 35441" +"<br>" + "March - 32900" +"<br>" + "April - 15129" +"<br>" + "May - 17473" +"<br>" + "June - 20115" + "<br>" + "July - 40424" + "<br>"+ "August - 41582" + "<br>"+ "September - 26456" + "<br>" + "</p>" ).style("visibility", "visible");
      }
      else if (d.key === "Phoenix Sky Harbor International Airport"){
        return d3.select(this)
            .classed("hover", true)
            .attr("stroke", strokecolor)// eslint-disable-next-line
            .attr("stroke-width", "0.5px"), // eslint-disable-next-line
            tooltip.html( "<p><strong>" + d.key + "</strong><br>" + "January - 31111"+ "<br>" + "February - 30972" +"<br>" + "March - 29872" +"<br>" + "April - 12712" +"<br>" + "May - 11276" +"<br>" + "June - 14545" + "<br>" + "July - 22405" + "<br>"+ "August - 23189" + "<br>"+ "September - 18996" + "<br>" + "</p>" ).style("visibility", "visible");
      }
      else if (d.key === "London Heathrow Airport"){
        return d3.select(this)
            .classed("hover", true)
            .attr("stroke", strokecolor)// eslint-disable-next-line
            .attr("stroke-width", "0.5px"), // eslint-disable-next-line
            tooltip.html( "<p><strong>" + d.key + "</strong><br>" + "January - 30557"+ "<br>" + "February - 30173" +"<br>" + "March - 22586" +"<br>" + "April - 4224" +"<br>" + "May - 5206" +"<br>" + "June - 5763" + "<br>" + "July - 11611" + "<br>"+ "August - 14989" + "<br>"+ "September - 11780" + "<br>" + "</p>" ).style("visibility", "visible");
      }
      else if (d.key === "San Francisco International Airport"){
        return d3.select(this)
            .classed("hover", true)
          .attr("stroke", strokecolor)
          // eslint-disable-next-line
            .attr("stroke-width", "0.5px"), // eslint-disable-next-line
            tooltip.html( "<p><strong>" + d.key + "</strong><br>" + "January - 29074"+ "<br>" + "February - 29013" +"<br>" + "March - 25238" +"<br>" + "April - 6741" +"<br>" + "May - 7379" +"<br>" + "June - 9744" + "<br>" + "July - 15370" + "<br>"+ "August - 16623" + "<br>"+ "September - 13495" + "<br>" + "</p>" ).style("visibility", "visible");
      }
      else if (d.key === "Newark Liberty International Airport"){
        return d3.select(this)
            .classed("hover", true)
            .attr("stroke", strokecolor)// eslint-disable-next-line
            .attr("stroke-width", "0.5px"), // eslint-disable-next-line
            tooltip.html( "<p><strong>" + d.key + "</strong><br>" + "January - 29049"+ "<br>" + "February - 28105" +"<br>" + "March - 24366" +"<br>" + "April - 3819" +"<br>" + "May - 3868" +"<br>" + "June - 6369" + "<br>" + "July - 14728" + "<br>"+ "August - 16054" + "<br>"+ "September - 12666" + "<br>" + "</p>" ).style("visibility", "visible");
      }
      else if (d.key === "General Edward Lawrence Logan International Airport"){
        return d3.select(this)
            .classed("hover", true)
            .attr("stroke", strokecolor)// eslint-disable-next-line
            .attr("stroke-width", "2px"), // eslint-disable-next-line
            tooltip.html( "<p><strong>" + d.key + "</strong><br>" + "January - 27457"+ "<br>" + "February - 27045" +"<br>" + "March - 24520" +"<br>" + "April - 6868" +"<br>" + "May - 6453" +"<br>" + "June - 9095" + "<br>" + "July - 15609" + "<br>"+ "August - 15474" + "<br>"+ "September - 12270" + "<br>" + "</p>" ).style("visibility", "visible");
      }
      
    })
    .on("mouseout", function(d, i) {
      svg.selectAll(".layer")
      .transition()
      .duration(250)
      .attr("opacity", "1");
      
      if (d.key === "Chicago O'Hare International Airport"){
        return d3.select(this)
      .classed("hover", false)// eslint-disable-next-line
      .attr("stroke-width", "0px"),// eslint-disable-next-line
      tooltip.html( "<p>" + d.key + "<br>" + "January - 52887"+ "</p>" )
      .style("visibility", "hidden");
      }
      else if (d.key === "Hartsfield Jackson Atlanta International Airport"){
        return d3.select(this)
      .classed("hover", false)// eslint-disable-next-line
      .attr("stroke-width", "0px"),// eslint-disable-next-line
      tooltip.html( "<p>" + d.key + "<br>" + "January - 52887"+ "</p>" )
      .style("visibility", "hidden");
      }
      else if (d.key === "Los Angeles International Airport"){
        return d3.select(this)
      .classed("hover", false)// eslint-disable-next-line
      .attr("stroke-width", "0px"),// eslint-disable-next-line
      tooltip.html( "<p>" + d.key + "<br>" + "January - 52887"+ "</p>" )
      .style("visibility", "hidden");
      }
      else if (d.key === "McCarran International Airport"){
        return d3.select(this)
      .classed("hover", false)// eslint-disable-next-line
      .attr("stroke-width", "0px"),// eslint-disable-next-line
      tooltip.html( "<p>" + d.key + "<br>" + "January - 52887"+ "</p>" )
      .style("visibility", "hidden");
      }
      else if (d.key === "Dallas Fort Worth International Airport"){
        return d3.select(this)
      .classed("hover", false)// eslint-disable-next-line
      .attr("stroke-width", "0px"),// eslint-disable-next-line
      tooltip.html( "<p>" + d.key + "<br>" + "January - 52887"+ "</p>" )
      .style("visibility", "hidden");
      }
      else if (d.key === "Phoenix Sky Harbor International Airport"){
        return d3.select(this)
      .classed("hover", false)// eslint-disable-next-line
      .attr("stroke-width", "0px"),// eslint-disable-next-line
      tooltip.html( "<p>" + d.key + "<br>" + "January - 52887"+ "</p>" )
      .style("visibility", "hidden");
      }
      else if (d.key === "London Heathrow Airport"){
        return d3.select(this)
      .classed("hover", false)// eslint-disable-next-line
      .attr("stroke-width", "0px"),// eslint-disable-next-line
      tooltip.html( "<p>" + d.key + "<br>" + "January - 52887"+ "</p>" )
      .style("visibility", "hidden");
      }
      else if (d.key === "San Francisco International Airport"){
        return d3.select(this)
      .classed("hover", false)// eslint-disable-next-line
      .attr("stroke-width", "0px"),// eslint-disable-next-line
      tooltip.html( "<p>" + d.key + "<br>" + "January - 52887"+ "</p>" )
      .style("visibility", "hidden");
      }
      else if (d.key === "Newark Liberty International Airport"){
        return d3.select(this)
      .classed("hover", false)// eslint-disable-next-line
      .attr("stroke-width", "0px"),// eslint-disable-next-line
      tooltip.html( "<p>" + d.key + "<br>" + "January - 52887"+ "</p>" )
      .style("visibility", "hidden");
      }
      else if (d.key === "General Edward Lawrence Logan International Airport"){
        return d3.select(this)
      .classed("hover", false)// eslint-disable-next-line
      .attr("stroke-width", "0px"),// eslint-disable-next-line
      tooltip.html( "<p>" + "<strong>" + d.key + "</strong>" + "<br>" + "January - 52887"+ "</p>" )
      .style("visibility", "hidden");
      }

  })   
});
}
});


  return (
      
      <div className="chart">
            <svg ref={svgRef}></svg>
        </div>
    )
}   

export default StreamGraph;