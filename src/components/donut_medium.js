import React, { useEffect } from "react";
import * as d3 from 'd33';
import './StreamGraph.css';


function Donut(props) {

    useEffect(() => {

        mediumAirports();

// top 3 most active medium airports
        function mediumAirports() {
            var w = 500,
    h = 250,
    r = 100,
    color = d3.scale.category20b();
 
    var data = [{"label":"Centennial Airport", "value":21191}, 
            {"label":"Phoenix-Mesa-Gateway Airport", "value":19745}, 
            {"label":"Van Nuys Airport", "value":18428}];

    var vis2 = d3.select("#donut_medium")
        .append("svg:svg")
        .data([data])
        .attr("width", w)
        .attr("height", h)
        .append("svg:g")
        .attr("transform", "translate(" + 150 + "," + r * 1.1 + ")")
    
    var arc_medium = d3.svg.arc()
        .innerRadius(50)
        .outerRadius(r);

    var arcOver = d3.svg.arc()
        .innerRadius(55)
        .outerRadius(r + 10);
    
    var pie = d3.layout.pie()
        .value(function(d) { return d.value; });
    
    var arcs = vis2.selectAll("g.slice_medium")
        .data(pie)
        .enter()
        .append("svg:g")
        .attr("class", "slice_medium")
        .on("mouseover", function(d) {
            d3.select(this).select("path").transition()
            .duration(100)
            .attr("d", arcOver);
            centerText2.text( d3.select(this).datum().data.label + " - " +
                d3.select(this).datum().data.value );
            })
        .on("mouseout", function(d) {
            d3.select(this).select("path").transition()
            .duration(100)
            .attr("d", arc_medium);
            centerText2.text( "" );
        });

    var centerText2 = vis2.append("text")
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .style("stroke", "white")

    arcs.append("svg:path")
        .attr("fill", function(d, i) { return color(i+3); } )
        .attr("d", arc_medium);


        }

    });


    return (
        <div className="">
            <svg id="donut_medium"></svg>
        </div>
    )
}   

export default Donut;
