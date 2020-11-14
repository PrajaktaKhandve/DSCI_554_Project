import React, { Component } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import '../App/App.css';
import data from '../data/countries-50m.json';

class Map extends Component {
    constructor(props){
        super(props)
        this.drawMap = this.drawMap.bind(this);
        this.margin = { top: 20, left: 20, bottom: 20, right: 20 };
    }

    componentDidMount(){
        this.drawMap();
    }

    componentDidUpdate() {
        this.drawMap()
    }

    drawMap() {
        const node = this.node;
        var world = data;        
        var width = parseInt(d3.select(node).style("width")) - this.margin.left - this.margin.right;
        var height = parseInt(d3.select(node).style("height")) - this.margin.top - this.margin.bottom;
        var svg = d3.select(node)
                    .append('svg')
                    .attr("width", width)
                    .attr("height", height)
                    .append('g')
                    .attr('transform', 'translate(' + this.margin.left + ', ' + this.margin.top + ')');
        var path = d3.geoPath(d3.geoMercator());

        svg.append('path')
            .datum(topojson.feature(world, world.objects.countries))
            .attr('fill', '#ccc')
            .attr('d', path);

        svg.append('path')
            .datum(topojson.mesh(world, world.objects.countries, (a, b) => a !== b))
            .attr('fill', 'none')
            .attr('stroke', 'white')
            .attr('stroke-linejoin', 'round')
            .attr('d', path);

        d3.select(window).on('resize', this.resize);
    }

    render() {
        return (
            <svg ref={ref => this.node = ref} width={"1440"}  height={"720"} />
        )    
    }
}
export default Map;