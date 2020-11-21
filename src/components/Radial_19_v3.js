import React, { useRef, useEffect } from "react";
import * as d3 from 'd33';
import './StreamGraph.css';
import data from '../data/ranking_2019_count.csv';


function StreamGraph(props) {
    
    const svgRef = useRef();

    useEffect(() => {


        // d3.select("#svg201920").remove();
        var width = 400,
            height = 400,
            barHeight = height / 2 - 40;

        var formatNumber = d3.format("s");

        var color = d3.scale.ordinal()
            .range(["#F1EEF6","#FDD49E","#53046f","#e85d22","#80b1d3","#f9ce1c","#980043","#fccde5","#045A8D","#bc80bd"]);

        var svg = d3.select('.ranking19').select("svg")
        .attr("id", "svg19")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

        d3.csv(data, function(error, data) {
            if (data !== undefined) {
                // console.log("checking data: ", data);
                data.sort(function(a,b) { return b.value - a.value; });

        // var extent = d3.extent(data, function(d) { return d.value; });
        var barScale = d3.scale.linear()
            .domain([0,1000])
            .range([0, barHeight]);

        var keys = data.map(function(d,i) { return d.name; });
        var numBars = keys.length;

        var x = d3.scale.linear()
            .domain([0,1000])
            .range([0, -barHeight]);

        var xAxis = d3.svg.axis()
            .scale(x).orient("left")
            .ticks(4)
            .tickFormat(formatNumber);
            
                // eslint-disable-next-line
        var circles = svg.selectAll("circle")
                .data(x.ticks(4))
                .enter().append("circle")
                .attr("r", function(d) {return barScale(d);})
                .style("fill", "none")
                .style("stroke", "white")
                .style("stroke-dasharray", "2,2")
                .style("stroke-width",".5px");

        var arc19 = d3.svg.arc()
            .startAngle(function(d,i) { return (i * 2 * Math.PI) / numBars; })
            .endAngle(function(d,i) { return ((i + 1) * 2 * Math.PI) / numBars; })
            .innerRadius(0);
        
        var segments = svg.selectAll("path")
                .data(data)
                .enter().append("path")
                .each(function(d) { d.outerRadius = 0; })
                .style("fill", function (d) { return color(d.name); })
                .attr("d", arc19);

        segments.transition().ease("elastic").duration(1000).delay(function(d,i) {return (25-i)*100;})
                .attrTween("d", function(d,index) {
                    var i = d3.interpolate(d.outerRadius, barScale(+d.value));
                    return function(t) { d.outerRadius = i(t); return arc19(d,index); };
                });

        svg.append("circle")
            .attr("r", barHeight)
            .classed("outer", true)
            .style("fill", "none")
            .style("stroke", "white")
            .style("stroke-width","1.5px");

                
// eslint-disable-next-line
        var lines = svg.selectAll("line")
            .data(keys)
            .enter().append("line")
            .attr("y2", -barHeight - 20)
            .style("stroke", "white")
            .style("stroke-width",".5px")
            .attr("transform", function(d, i) { return "rotate(" + (i * 360 / numBars) + ")"; });

        svg.append("g")
            .attr("class", "x axis")
            .call(xAxis)
            .attr("stroke", "white");

        // Labels
        var labelRadius = barHeight * 1.025;

        var labels = svg.append("g")
            .classed("labels", true);

        labels.append("def")
                .append("path")
            .attr("id", "label-path")
                .attr("d", "m0 " + -labelRadius + " a" + labelRadius + " " + labelRadius + " 0 1,1 -0.01 0");

        labels.selectAll("text")
                .data(keys)
            .enter().append("text")
                .style("text-anchor", "middle")
                .style("font-weight","bold")
                .style("fill", function(d, i) {return "#fff";})
                .append("textPath")
                .attr("xlink:href", "#label-path")
                .attr("startOffset", function(d, i) {return i * 100 / numBars + 50 / numBars + '%';})
                .text(function(d) {return d.toUpperCase(); });
            }       
        });

    });


    return (
        <div className="ranking19">
            <svg ref={svgRef}></svg>
        </div>


    )
}   

export default StreamGraph;
