import React, { useEffect } from "react";
import * as d3 from 'd33';
import './StreamGraph.css';


function Donut(props) {

    useEffect(() => {

        largeAirports();


        // top 3 most active large airports
        function largeAirports() {
            var w = 500,
    h = 250,
    r = 100,
    color = d3.scale.category20c();
 
    var data = [{"label":"Chicago O'Hare International Airport", "value":55765}, 
            {"label":"Dallas Fort Worth International Airport", "value":52717}, 
            {"label":"Hartsfield Jackson Atlanta International Airport", "value":45781}];

    var vis3 = d3.select("#donut_large")
        .append("svg:svg")
        .data([data])
        .attr("width", w)
        .attr("height", h)
        .append("svg:g")
        .attr("transform", "translate(" + 150 + "," + r * 1.1 + ")")
    
    var arc_large = d3.svg.arc()
        .innerRadius(50)
        .outerRadius(r);

    var arcOver = d3.svg.arc()
        .innerRadius(55)
        .outerRadius(r + 10);
    
    var pie = d3.layout.pie()
        .value(function(d) { return d.value; });
    
    var arcs = vis3.selectAll("g.slice_large")
        .data(pie)
        .enter()
        .append("svg:g")
        .attr("class", "slice_large")
        .on("mouseover", function(d) {
            d3.select(this).select("path").transition()
            .duration(100)
                .attr("d", arcOver);
            centerText3.text(d3.select(this).datum().data.label +
            " - " + d3.select(this).datum().data.value );
        })
        .on("mouseout", function(d) {
            d3.select(this).select("path").transition()
            .duration(100)
            .attr("d", arc_large);
            centerText3.text( "" );
        });

    var centerText3 = vis3.append("text")
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .style("stroke", "white")

    arcs.append("svg:path")
        .attr("fill", function(d, i) { return color(i); } )
        .attr("d", arc_large);
    
        }

    });


    return (
        <div className="">
            <svg id="donut_large"></svg>
        </div>
    )
}   

export default Donut;
