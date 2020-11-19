import React, { useRef, useEffect } from "react";
import * as d3 from 'd33';
import './StreamGraph.css';


function Donut(props) {

    useEffect(() => {

        smallAirports();
        mediumAirports();
        largeAirports();
        heliports();

    
        function smallAirports() {
            var w = 670,
    h = 326,
    r = 150,
    color = d3.scale.category20c();

    var data = [{"label":"Phoenix Deer Valley Airport", "value":33260}, 
            {"label":"Falcon Field", "value":27651}, 
            {"label":"Scottsdale Airport", "value":20006}];

    var vis1 = d3.select("#donut_small")
        .append("svg:svg")
        .data([data])
        .attr("width", w)
        .attr("height", h)
        .append("svg:g")
        .attr("transform", "translate(" + 335 + "," + r * 1.1 + ")")
    
    var arc_small = d3.svg.arc()
        .innerRadius(80)
        .outerRadius(r);

    var arcOver = d3.svg.arc()
        .innerRadius(85)
        .outerRadius(r + 5);
    
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
            centerText1.text( d3.select(this).datum().data.label );
            })
        .on("mouseout", function(d) {
            d3.select(this).select("path").transition()
            .duration(100)
            .attr("d", arc_small);
            centerText1.text( "" );
        });

    var centerText1 = vis1.append("text")
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .style("stroke", "white")

    arcs.append("svg:path")
        .attr("fill", function(d, i) { return color(i); } )
        .attr("d", arc_small);
        }



        function mediumAirports() {
            var w = 670,
    h = 326,
    r = 150,
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
        .attr("transform", "translate(" + 335 + "," + r * 1.1 + ")")
    
    var arc_medium = d3.svg.arc()
        .innerRadius(80)
        .outerRadius(r);

    var arcOver = d3.svg.arc()
        .innerRadius(85)
        .outerRadius(r + 5);
    
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
            centerText2.text( d3.select(this).datum().data.label );
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


        function largeAirports() {
            var w = 670,
    h = 326,
    r = 150,
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
        .attr("transform", "translate(" + 335 + "," + r * 1.1 + ")")
    
    var arc_large = d3.svg.arc()
        .innerRadius(80)
        .outerRadius(r);

    var arcOver = d3.svg.arc()
        .innerRadius(85)
        .outerRadius(r + 5);
    
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
            centerText3.text( d3.select(this).datum().data.label );
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



        function heliports(){

    var w = 670,
    h = 326,
    r = 150,
    color = d3.scale.category20c();
    
    var data = [{"label":"Tecma Heliport", "value":516}, 
            {"label":"Marathon Kotroni Navy Helicopter Base", "value":448}, 
            {"label":"Leeds Heliport", "value":79}];

    var vis4 = d3.select("#donut_heliport")
        .append("svg:svg")
        .data([data])
        .attr("width", w)
        .attr("height", h)
        .append("svg:g")
        .attr("transform", "translate(" + 335 + "," + r * 1.1 + ")")
    
    var arc_heli = d3.svg.arc()
        .innerRadius(80)
        .outerRadius(r);

    var arcOver = d3.svg.arc()
        .innerRadius(85)
        .outerRadius(r + 5);
    
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
            centerText4.text( d3.select(this).datum().data.label );
        })
        .on("mouseout", function(d) {
            d3.select(this).select("path").transition()
            .duration(100)
            .attr("d", arc_heli);
            centerText4.text( "" );
        });

    var centerText4 = vis4.append("text")
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .style("stroke", "white")

    arcs.append("svg:path")
        .attr("fill", function(d, i) { return color(i); } )
        .attr("d", arc_heli);
    
        }

    });


    return (
        <div className="">
            <svg id="donut_small"></svg>
            <svg id="donut_medium"></svg>
            <svg id="donut_large"></svg>
            <svg id="donut_heliport"></svg>
            
        </div>
    )
}   

export default Donut;
