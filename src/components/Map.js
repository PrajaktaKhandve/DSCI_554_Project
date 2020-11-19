import React, { Component } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import './Map.css';
import data from '../data/countries-50m.json';
import covid from '../data/covid19.json';
import flight from '../data/flight.json';
import coord from '../data/countries-coord.json';

class Map extends Component {
    constructor(props){
        super(props)
        this.drawMap = this.drawMap.bind(this);
        this.legend = this.legend.bind(this);
        this.ramp = this.ramp.bind(this); 
        this.loopMonth = this.loopMonth.bind(this);
        this.drawArc = this.drawArc.bind(this);
        this.margin = { top: 20, left: 0, bottom: 20, right: 0 };
        this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'];
        this.maxValues = [9802, 69554, 192084, 884003, 718092, 887192, 1921350, 1995178, 2621418];
        this.state = {
            month: 'January',
            max: 9802
        };
        this.world = data;
        this.covid19 = {};
        this.flight = {};
        this.coord = coord;
    }

    componentDidMount(){
        // wait every 5 sec to refresh to next month
        // this.interval = setInterval(this.loopMonth, 5000);
        console.log(window.innerWidth, window.innerHeight);
        this.loopMonth();
    }

    componentWillUnmount () {
        clearInterval(this.interval);
    }

    loopMonth () {
        var nextMonth = (this.months.indexOf(this.state.month) !== 8)?
                        this.months[this.months.indexOf(this.state.month)+1]: this.months[0];
        var nextMax = (this.maxValues.indexOf(this.state.max) !== 8)?
                    this.maxValues[this.maxValues.indexOf(this.state.max)+1]: this.maxValues[0];

        if (this.state.month !== 'August' || this.state.month !== 'September') {
            this.setState({
                month: nextMonth,
                max: nextMax
            })
        }
        d3.select("svg").selectAll("*").remove();
        this.drawMap();
        this.drawArc();
    }

    drawArc() {
        const node = this.node;
        var svg = d3.select(node)
                    .append('g')
                    .attr('transform', 'translate(' + this.margin.left + ', ' + this.margin.top + ')');
        var projection = d3.geoMercator()
                .scale(this.width/6)
                .translate([this.width/2, this.height/2]);

        var line = svg.append("g")
            .selectAll("path")
            .data(flight[this.state.month])
            .enter()
            .append("path");
        
        var strokeWidth = d3.scaleSqrt().domain([0, 200000]).range([0, 50]);

        line.attr("d", function(c) {
            var d = {
                source: projection( coord[c.source] ),
                target: projection( coord[c.destination] ),
                stroke: +c.count
            };
            var dx = d.target[0] - d.source[0],
            dy = d.target[1] - d.source[1],
            dr = Math.sqrt(dx * dx + dy * dy);
            return "M" + d.source[0] + "," + d.source[1] + "A" + dr + "," + dr +
            " 0 0,1 " + d.target[0] + "," + d.target[1];
        })
        .attr("class", d => { return (d.count > 100)? "arc": "hide"})
        .style("stroke-width", d => strokeWidth(d.count))
        .append('title')
        .text(d => `[${d.source}, ${d.destination}] has ${d.count} flight`);
    }

    drawMap() {
        const node = this.node;
        var svg = d3.select(node)
                    .append('g')
                    .attr('transform', 'translate(' + this.margin.left + ', ' + this.margin.top + ')');
        // var path = d3.geoPath(d3.geoMercator());
        //var format = d3.format(',.0f')
        var projection = d3.geoMercator()
                            .scale(this.width/6)
                            .translate([this.width/2, this.height/2]);
        var path = d3.geoPath()
                        .projection(projection);

        this.covid19 = {}
        covid.slice(1).map(item => this.covid19[item.Country] = +item[this.state.month]);
        this.covid19.title = `Confirmed cases in ${this.state.month}`;

        console.log("covid: ", this.covid19);
        console.log(this.state);
        
        //const logScale = d3.scaleLog().domain([1, this.state.max]);
        var color = d3.scaleSequentialLog([1, this.state.max], d3.interpolateRdPu);

        // Append Legend 
        svg.append("g")
            .attr("class", "legend")
            .attr("transform", "translate(" + this.width * 0.65+ ","+ this.height * 0.75 + ")")
            .append(() => this.legend({ color: color, title: this.covid19.title, width: this.width/3 }));  
        
        // Append Country 
        svg.append("g")
            .selectAll("path")
            .data(topojson.feature(this.world, this.world.objects.countries).features)
            .join("path")
            .attr("fill", d => color(this.covid19[d.properties.name] === undefined || this.covid19[d.properties.name] === 0 ? 1: this.covid19[d.properties.name]))
            .attr('d', path)
            .append('title')
            .text(d => `${d.properties.name}`);

        // Append Internal Connection between Countries
        svg.append('path')
            .datum(topojson.mesh(this.world, this.world.objects.countries, (a, b) => a !== b))
            .attr("class", "internal-connection")
            .attr('d', path);
    }

    // resize () {
    //     const node = this.node;
    //     var svg = d3.select(node);
    //     console.log(svg)
    //     var new_width = parseInt(svg.style('width')) - this.margin.left - this.margin.right;
    //     var new_height = parseInt(svg.style('height')) - this.margin.top - this.margin.bottom;
    //     // svg.attr('width', new_width)
    //     //     .attr('height', new_height)
        
    //     var projection = d3.geoMercator()
    //                         .scale(250)
    //                         .translate([this.width/2, this.height/2]);
    //     var path = d3.geoPath()
    //                     .projection(projection);

    //     console.log("covid: ", this.covid19);
    //     console.log(this.state);
    // }

    legend({
        color,
        title,
        tickSize = 6,
        width = 320,
        height = 44 + tickSize,
        marginTop = 18,
        marginRight = 0,
        marginBottom = 16 + tickSize,
        marginLeft = 0,
        ticks = width/64,
        tickFormat,
        tickValues
        } = {}) {

        const svg = d3.create("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("class", "legend")
            .attr("viewBox", [0, 0, width, height])
            .style("overflow", "visible")
            .style("display", "block");
        
        let x;
        
        // Continuous
        if (color.interpolator) {
            x = Object.assign(color.copy()
            .interpolator(d3.interpolateRound(marginLeft, width - marginRight)),
            { range() { return [marginLeft, width - marginRight]; } });
        
            svg.append("image")
            .attr("x", marginLeft)
            .attr("y", marginTop)
            .attr("width", width - marginLeft - marginRight)
            .attr("height", height - marginTop - marginBottom)
            .attr("preserveAspectRatio", "none")
            .attr("xlink:href", this.ramp(color.interpolator()).toDataURL());
        
            // scaleSequentialQuantile doesn’t implement ticks or tickFormat.
            if (!x.ticks) {
                if (tickValues === undefined) {
                    const n = Math.round(ticks + 1);
                    tickValues = d3.range(n).map(i => d3.quantile(color.domain(), i/(n - 1)));
                }
                if (typeof tickFormat !== "function") {
                    tickFormat = d3.format(tickFormat === undefined ? ",.0f" : tickFormat);
                }
            }
        }
        
        svg.append("g")
        .attr("transform", `translate(0, ${height - marginBottom})`)
        .call(d3.axisBottom(x)
            .ticks(ticks, typeof tickFormat === "string" ? tickFormat : undefined)
            .tickFormat(typeof tickFormat === "function" ? tickFormat : undefined)
            .tickSize(tickSize)
            .tickValues(tickValues))
        .call(g => g.selectAll(".tick line").attr("y1", marginTop + marginBottom - height))
        .call(g => g.select(".domain").remove())
        .call(g => g.append("text")
            .attr("y", marginTop + marginBottom - height - 6)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text(title));
        
        return svg.node();
    }
    
    ramp(color, n = 256) {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        d3.select(canvas).attr("width", n).attr("height", 1);
        for (let i = 0; i < n; ++i) {
            context.fillStyle = color(i/(n - 1));
            context.fillRect(i, 0, 1, 1);
        }
        return canvas;
    }
    
    render() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        return (
            <svg
                ref={ref => this.node = ref}
                className={"map"}
                width={this.width} 
                height={this.height} />
        )    
    }
}
export default Map;