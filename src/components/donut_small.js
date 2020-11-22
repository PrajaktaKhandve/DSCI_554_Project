import React, { useEffect } from "react";
import * as d3 from 'd33';
import './StreamGraph.css';


function Donut(props) {

    useEffect(() => {

        smallAirports();

    // top 3 small airports - that are artive [having max number of flights]
        function smallAirports() {
            var w = 500,
            h = 220,
            r = 80,
            color = d3.scale.category20c();

    // processed separately - python
    var data = [{"label":"Phoenix Deer Valley Airport", "value":33260}, 
            {"label":"Falcon Field", "value":27651}, 
            {"label":"Scottsdale Airport", "value":20006}];

    var vis1 = d3.select("#donut_small")
        .append("svg:svg")
        .data([data])
        .attr("width", w)
        .attr("height", h)
        .append("svg:g")
        .attr("transform", "translate(" + 150 + "," + r * 1.1 + ")")
    
    var arc_small = d3.svg.arc()
        .innerRadius(35)
        .outerRadius(r);

    var arcOver = d3.svg.arc()
        .innerRadius(40)
        .outerRadius(r + 10);
    
    var pie = d3.layout.pie()
        .value(function(d) { return d.value; });
    
    var arcs = vis1.selectAll("g.slice_small")
        .data(pie)
        .enter()
        .append("svg:g")
        .attr("class", "slice_small")
        .on("mouseover", function(d) {
            d3.select(this).select("path").transition()
            .duration(100)
            .attr("d", arcOver);
            centerText1.text(
                d3.select(this).datum().data.label + " - " +
                d3.select(this).datum().data.value);
            })
        .on("mouseout", function(d) {
            d3.select(this).select("path").transition()
            .duration(100)
            .attr("d", arc_small);
            centerText1.text( "" );
        });

    var centerText1 = vis1.append("text")
        .attr("dy", ".2em")
        .style("text-anchor", "middle")
        .style("stroke", "white")
        .style("font-size", "15px")

    arcs.append("svg:path")
        .attr("fill", function(d, i) { return color(i); } )
        .attr("d", arc_small);
        }
    });


    return (
            <svg id="donut_small"></svg>
    
    )
}   

export default Donut;
