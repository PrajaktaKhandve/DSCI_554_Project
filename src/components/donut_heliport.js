import React, { useEffect } from "react";
import * as d3 from 'd33';
import './StreamGraph.css';


function Donut(props) {

    useEffect(() => {
        
        heliports();


// top 3 most active heliports
        function heliports(){

    var w = 400,
    h = 220,
    r = 100,
    color = d3.scale.category20b();
    
    var data = [{"label":"Tecma Heliport", "value":516}, 
            {"label":"Marathon Kotroni Navy Helicopter Base", "value":448}, 
            {"label":"Leeds Heliport", "value":79}];

    var vis4 = d3.select("#donut_heliport")
        .append("svg:svg")
        .data([data])
        .attr("width", w)
        .attr("height", h)
        .append("svg:g")
        .attr("transform", "translate(" + 150 + "," + r * 1.1 + ")")
    
    var arc_heli = d3.svg.arc()
        .innerRadius(50)
        .outerRadius(r);

    var arcOver = d3.svg.arc()
        .innerRadius(55)
        .outerRadius(r + 10);
    
    var pie = d3.layout.pie()
        .value(function(d) { return d.value; });
    
    var arcs = vis4.selectAll("g.slice_heliport")
        .data(pie)
        .enter()
        .append("svg:g")
        .attr("class", "slice_heliport")
        .on("mouseover", function(d) {
            d3.select(this).select("path").transition()
            .duration(100)
            .attr("d", arcOver);
            centerText4.text( d3.select(this).datum().data.label  +" - " +
                d3.select(this).datum().data.value );
        })
        .on("mouseout", function(d) {
            d3.select(this).select("path").transition()
            .duration(100)
            .attr("d", arc_heli);
            centerText4.text( "" );
        });

    var centerText4 = vis4.append("text")
        .attr("dy", ".2em")
        .style("text-anchor", "middle")
                .style("stroke", "white")
            .style("font-size", "15px")

    arcs.append("svg:path")
        .attr("fill", function(d, i) { return color(i); } )
        .attr("d", arc_heli);
    
        }

    });


    return (
        
            <svg id="donut_heliport"></svg> 
        
    )
}   

export default Donut;
