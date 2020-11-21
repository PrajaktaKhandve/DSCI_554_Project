import React, { Component } from 'react'
import '../App/App.css'
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'

class Barchart extends Component {
   constructor(props){
      super(props)
      this.state = {
         width: 0,
         height: 0
       };
      this.createBarChart = this.createBarChart.bind(this)
   }

   getWidth(){
      return this.chartRef.current.parentElement.offsetWidth;
  }
  getHeight(){
      return this.chartRef.current.parentElement.offsetHeight;
  }

   componentDidMount() {
      let width = this.getWidth()
        let height = this.getHeight();
        this.setState({width: width, height: height}, ()=> {
         this.createBarChart();
        });
      this.createBarChart()
   }
   componentDidUpdate() {
      let width = this.getWidth()
        let height = this.getHeight();
        this.setState({width: width, height: height}, ()=> {
         this.createBarChart();
        });
      
   }
   createBarChart() {
      const node = this.node
      const dataMax = max(this.props.data)
      const yScale = scaleLinear()
         .domain([0, dataMax])
         .range([0, this.props.size[1]])
   select(node)
      .selectAll('rect')
      .data(this.props.data)
      .enter()
      .append('rect')
   
   select(node)
      .selectAll('rect')
      .data(this.props.data)
      .exit()
      .remove()
   
   select(node)
      .selectAll('rect')
      .data(this.props.data)
      .style('fill', '#fe9922')
      .attr('x', (d,i) => i * 25)
      .attr('y', d => this.props.size[1] - yScale(d))
      .attr('height', d => yScale(d))
      .attr('width', 25)
   }
render() {
      return <svg ref={node => this.node = node}>
      </svg>
   }
}
export default Barchart