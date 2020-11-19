// v6 streamgraph try

// import React, { useRef, useEffect } from "react";
// import * as d3 from 'd3';
// import './StreamGraph.css';
// import data from '../data/stream_v3.csv';
// // import { csv, layout } from 'd3';
// import {swatches} from "@d3/color-legend"


// function StreamGraph(props) {

//     var margin = { top: 0, right: 30, bottom: 50, left: 30 };
//     var height = 500;
//     var width = 700;
    
//     const svgRef = useRef();

//     // d3.csv(data, function (data) {
//     //     console.log("from d3 - data: ", data);
//     // });

//     useEffect(() => {
//         // all dom elems have been rendered

//         // d3.csv(data, function (data) {
//         // console.log("from d3 - data: ", data);
//         // });
        
// d3.csv(data, function (data) {
//     //     console.log("from d3 - data: ", data);
//             var series = d3.stack()
//     .keys(data.columns.slice(1))
//     .offset(d3.stackOffsetWiggle)
//     .order(d3.stackOrderInsideOut)
//             (data)
// });
        
//         var xAxis = g => g
//     .attr("transform", `translate(0,${height - margin.bottom})`)
//     .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
//     .call(g => g.select(".domain").remove())
        
//            var color = d3.scaleOrdinal()
//     .domain(data.columns.slice(1))
//     .range(d3.schemeCategory10)

//         var y = d3.scaleLinear()
//     .domain([d3.min(series, d => d3.min(d, d => d[0])), d3.max(series, d => d3.max(d, d => d[1]))])
//             .range([height - margin.bottom, margin.top])
        
//         var x = d3.scaleUtc()
//     .domain(d3.extent(data, d => d.date))
//     .range([margin.left, width - margin.right])

//         var area = d3.area()
//     .x(d => x(d.data.date))
//     .y0(d => y(d[0]))
//             .y1(d => y(d[1]))
        
        
        
        
        
        
//         const svg = d3.create("svg")
//       .attr("viewBox", [0, 0, width, height]);

//   svg.append("g")
//     .selectAll("path")
//     .data(series)
//     .join("path")
//       .attr("fill", ({key}) => color(key))
//       .attr("d", area)
//     .append("title")
//       .text(({key}) => key);

//   svg.append("g")
//       .call(xAxis);

//   return svg.node();

//     });


//     return (
//         <div className="chart">
//             <svg ref={svgRef}></svg>
//         </div>
//     )
// }   

// export default StreamGraph;
