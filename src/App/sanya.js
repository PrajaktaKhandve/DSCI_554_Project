module.exports = `
<!DOCTYPE html>
<html>
<head>
<meta charset=utf-8 />
<title>Sanya Dashboard</title>
<meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
<script src='https://api.mapbox.com/mapbox.js/v3.3.1/mapbox.js'></script>
<link href='https://api.mapbox.com/mapbox.js/v3.3.1/mapbox.css' rel='stylesheet' />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
<!-- arc.js to make paths curved. -->
<script src='https://api.mapbox.com/mapbox.js/plugins/arc.js/v0.1.0/arc.js'></script>

<script src='https://api.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v1.0.0/leaflet.markercluster.js'></script>
<link href='https://api.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v1.0.0/MarkerCluster.css' rel='stylesheet' />
<link href='https://api.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v1.0.0/MarkerCluster.Default.css' rel='stylesheet' />

<style>
    body { margin:0; padding:0; background-color: white;}
    #map { position:absolute; top:20; left:20; bottom:0; width:98%; height:98%}
    #some_seconds{
        font-size: 22px;
        text-align: center;
        padding: 10px 10px 10px 10px;
        width: 100%;
        align-items: center;
    }
</style>
</head>

<body>


<!-- npm run start -->

<!-- MAPBOX -->

<!-- introduce two input elements -->
<h2>Choose any Airport and Visualize the impact of COVID in 2020: </h2>


<!-- value of airport is the same as the name [value == name of airport] -->

<label for="month">Month</label>
<select name="month" id="month">
    <option value="all_months">All Months</option>
    <option value="jan">January</option>
    <option value="feb">February</option>
    <option value="mar">March</option>
    <option value="apr">April</option>
    <option value="may">May</option>
    <option value="jun">June</option>
    <option value="jul">July</option>
    <option value="aug">August</option>
    <option value="sep">September</option>
</select>

<br>

<label for="airport">Airport</label>
<select name="airport" id="select">
    <option value="all_airports">All Airports</option>
</select>

<button type="button", onsubmit="runButton()", id="search">Submit!</button>
<h2 id = "some_seconds">(Submit to begin the visualization!)</h2>


<!-- script - fill out the dropdown - converting csv to array -->

<script>console.log("hello");</script>
<!-- data file - it's an array of [[lat,lng],[lat,lng]] pairs that define starting and ending locations of flight paths - handling above in the conditions statements -->
<!-- The path-start - to each line - animation -->

<style>
    /* to manage animation */
    .path-start {
        -webkit-transition:stroke-dashoffset 5s ease-in;
            -moz-transition:stroke-dashoffset 5s ease-in;
            -o-transition:stroke-dashoffset 5s ease-in;
                transition:stroke-dashoffset 5s ease-in;
    }

    .mapbox_container {
        position: relative;
        height: 900px;
        width: 1000px;
        display: block;
        margin-top: 20px;
        }

        #map {
        position: absolute;
        top: 0px;
        bottom: 0px;
        width: 100%;
        }

        body{
            background-color: #040c17;
            color: white;
        }
        .marker {
            background-image: url('mapbox-icon.png');
            background-size: cover;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
        }
        
        .mapboxgl-popup {
            max-width: 200px;
        }
        
        .mapboxgl-popup-content {
            text-align: center;
            font-family: 'Open Sans', sans-serif;
        }
</style>

<div class="mapbox_container">
    <div id='map' class='dark'></div>



<script src='../components/Mapbox.js'></script>
<link href='../components/Mapbox.js' rel='javascript' />
</div>






<!-- STREAM GRAPH -->
<h1>Top 10 busy airports during COVID - visualizing total number of flights</h1>

<style>

    .chart { 
    background: #fff;
    width: 100%;
    }

    p {
    font: 14px helvetica;
    }

    .axis path, .axis line {
    fill: none;
    stroke: #000;
    stroke-width: 2px;
    shape-rendering: crispEdges;
    }

</style>
<body>
<!-- <script src="https://d3js.org/d3.v2.js"></script> -->
<script src="https://d3js.org/d3.v3.min.js"></script>


<div class="chart"></div>

<script>

chart("../data/stream_data.csv", "inferno");

var datearray = [];
var colorrange = [];

function chart(csvpath, color) {

if (color == "blue") {
  colorrange = ["#045A8D", "#2B8CBE", "#74A9CF", "#A6BDDB", "#D0D1E6", "#F1EEF6"];
}
else if (color == "pink") {
  colorrange = ["#980043", "#DD1C77", "#DF65B0", "#C994C7", "#D4B9DA", "#F1EEF6"];
}
else if (color == "orange") {
  colorrange = ["#B30000", "#E34A33", "#FC8D59", "#FDBB84", "#FDD49E", "#FEF0D9"];
}
else if (color == "inferno"){
    colorrange = ["#1e0946", "#330360", "#53046f", "#D4B9DA", "#8c1e6a", "#c93c48", "#e85d22", "#fea600", "#f9ce1c", "#000"]
}
strokecolor = colorrange[0];

var format = d3.time.format("%m/%d/%y");

var margin = {top: 70, right: 70, bottom: 30, left: 70};
var width = document.body.clientWidth - margin.left - margin.right;
var height = 300;

var tooltip = d3.select(".chart")
    .append("div")
    .style("position", "relative")
    .style("z-index", "1")
    .style("visibility", "visible")
    .style("top", "10px")
    .style("left", '40%')
    .style("color", "black");

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height-10, 0]);

var z = d3.scale.ordinal()
    .range(colorrange);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(d3.time.months);

var yAxis = d3.svg.axis()
    .scale(y);

var yAxisr = d3.svg.axis()
    .scale(y);

var stack = d3.layout.stack()
    .offset("wiggle")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.date; })
    .y(function(d) { return d.value; });

var nest = d3.nest()
    .key(function(d) { return d.key; });

var area = d3.svg.area()
    .interpolate("cardinal")
    .x(function(d) { return x(d.date); })
    .y0(function(d) { return y(d.y0); })
    .y1(function(d) { return y(d.y0 + d.y); });

var svg = d3.select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var graph = d3.csv(csvpath, function(data) {
  data.forEach(function(d) {
    d.date = format.parse(d.date);
    d.value = +d.value;
  });

  var layers = stack(nest.entries(data));

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.y0 + d.y; })]);

  svg.selectAll(".layer")
      .data(layers)
    .enter().append("path")
      .attr("class", "layer")
      .attr("d", function(d) { return area(d.values); })
      .style("fill", function(d, i) { return z(i); });

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + width + ", 0)")
      .call(yAxis.orient("right"));

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis.orient("left"));

  svg.selectAll(".layer")
    .attr("opacity", 1)
    .on("mouseover", function(d, i) {
      svg.selectAll(".layer").transition()
      .duration(250)
      .attr("opacity", function(d, j) {
        return j != i ? 0.6 : 1;
    })})

    .on("mousemove", function(d, i) {
      mousex = d3.mouse(this);
      mousex = mousex[0];
      var invertedx = x.invert(mousex);
      invertedx = invertedx.getMonth() + invertedx.getDate();
      var selected = (d.values);
      for (var k = 0; k < selected.length; k++) {
        datearray[k] = selected[k].date
        datearray[k] = datearray[k].getMonth() + datearray[k].getDate();
      }

      mousedate = datearray.indexOf(invertedx);
    //   pro = d.values[mousedate].value;

      
      if (d.key == "Chicago O'Hare International Airport"){
        d3.select(this)
            .classed("hover", true)
            .attr("stroke", strokecolor)
            .attr("stroke-width", "0.5px"), 
            tooltip.html( "<p><strong>" + d.key + "</strong><br>" + "January - 52887"+ "<br>" + "February - 53366" +"<br>" + "March - 50476" +"<br>" + "April - 18927" +"<br>" + "May - 17980" +"<br>" + "June - 18858" + "<br>" + "July - 40424" + "<br>"+ "August - 42375" + "<br>"+ "September - 32756" + "<br>" + "</p>" ).style("visibility", "visible");
      }
      else if (d.key == "Hartsfield Jackson Atlanta International Airport"){
        d3.select(this)
            .classed("hover", true)
            .attr("stroke", strokecolor)
            .attr("stroke-width", "0.5px"), 
            tooltip.html( "<p><strong>" + d.key + "</strong><br>" + "January - 48738"+ "<br>" + "February - 47286" +"<br>" + "March - 42443" +"<br>" + "April - 14479" +"<br>" + "May - 13258" +"<br>" + "June - 18044" + "<br>" + "July - 39034" + "<br>"+ "August - 46658" + "<br>"+ "September - 32732" + "<br>" + "</p>" ).style("visibility", "visible");
      }
      else if (d.key == "Los Angeles International Airport"){
        d3.select(this)
            .classed("hover", true)
            .attr("stroke", strokecolor)
            .attr("stroke-width", "0.5px"), 
            tooltip.html( "<p><strong>" + d.key + "</strong><br>" + "January - 39205"+ "<br>" + "February - 39099" +"<br>" + "March - 35819" +"<br>" + "April - 12394" +"<br>" + "May - 11693" +"<br>" + "June - 14363" + "<br>" + "July - 24803" + "<br>"+ "August - 26722" + "<br>"+ "September - 21049" + "<br>" + "</p>" ).style("visibility", "visible");
      }
      else if (d.key == "McCarran International Airport"){
        d3.select(this)
            .classed("hover", true)
            .attr("stroke", strokecolor)
            .attr("stroke-width", "0.5px"), 
            tooltip.html( "<p><strong>" + d.key + "</strong><br>" + "January - 35657"+ "<br>" + "February - 33759" +"<br>" + "March - 25244" +"<br>" + "April - 8034" +"<br>" + "May - 9270" +"<br>" + "June - 14974" + "<br>" + "July - 23193" + "<br>"+ "August - 24424" + "<br>"+ "September - 19282" + "<br>" + "</p>" ).style("visibility", "visible");
      }
      else if (d.key == "Dallas Fort Worth International Airport"){
        d3.select(this)
            .classed("hover", true)
            .attr("stroke", strokecolor)
            .attr("stroke-width", "0.5px"), 
            tooltip.html( "<p><strong>" + d.key + "</strong><br>" + "January - 35031"+ "<br>" + "February - 35441" +"<br>" + "March - 32900" +"<br>" + "April - 15129" +"<br>" + "May - 17473" +"<br>" + "June - 20115" + "<br>" + "July - 40424" + "<br>"+ "August - 41582" + "<br>"+ "September - 26456" + "<br>" + "</p>" ).style("visibility", "visible");
      }
      else if (d.key == "Phoenix Sky Harbor International Airport"){
        d3.select(this)
            .classed("hover", true)
            .attr("stroke", strokecolor)
            .attr("stroke-width", "0.5px"), 
            tooltip.html( "<p><strong>" + d.key + "</strong><br>" + "January - 31111"+ "<br>" + "February - 30972" +"<br>" + "March - 29872" +"<br>" + "April - 12712" +"<br>" + "May - 11276" +"<br>" + "June - 14545" + "<br>" + "July - 22405" + "<br>"+ "August - 23189" + "<br>"+ "September - 18996" + "<br>" + "</p>" ).style("visibility", "visible");
      }
      else if (d.key == "London Heathrow Airport"){
        d3.select(this)
            .classed("hover", true)
            .attr("stroke", strokecolor)
            .attr("stroke-width", "0.5px"), 
            tooltip.html( "<p><strong>" + d.key + "</strong><br>" + "January - 30557"+ "<br>" + "February - 30173" +"<br>" + "March - 22586" +"<br>" + "April - 4224" +"<br>" + "May - 5206" +"<br>" + "June - 5763" + "<br>" + "July - 11611" + "<br>"+ "August - 14989" + "<br>"+ "September - 11780" + "<br>" + "</p>" ).style("visibility", "visible");
      }
      else if (d.key == "San Francisco International Airport"){
        d3.select(this)
            .classed("hover", true)
            .attr("stroke", strokecolor)
            .attr("stroke-width", "0.5px"), 
            tooltip.html( "<p><strong>" + d.key + "</strong><br>" + "January - 29074"+ "<br>" + "February - 29013" +"<br>" + "March - 25238" +"<br>" + "April - 6741" +"<br>" + "May - 7379" +"<br>" + "June - 9744" + "<br>" + "July - 15370" + "<br>"+ "August - 16623" + "<br>"+ "September - 13495" + "<br>" + "</p>" ).style("visibility", "visible");
      }
      else if (d.key == "Newark Liberty International Airport"){
        d3.select(this)
            .classed("hover", true)
            .attr("stroke", strokecolor)
            .attr("stroke-width", "0.5px"), 
            tooltip.html( "<p><strong>" + d.key + "</strong><br>" + "January - 29049"+ "<br>" + "February - 28105" +"<br>" + "March - 24366" +"<br>" + "April - 3819" +"<br>" + "May - 3868" +"<br>" + "June - 6369" + "<br>" + "July - 14728" + "<br>"+ "August - 16054" + "<br>"+ "September - 12666" + "<br>" + "</p>" ).style("visibility", "visible");
      }
      else if (d.key == "General Edward Lawrence Logan International Airport"){
        d3.select(this)
            .classed("hover", true)
            .attr("stroke", strokecolor)
            .attr("stroke-width", "2px"), 
            tooltip.html( "<p><strong>" + d.key + "</strong><br>" + "January - 27457"+ "<br>" + "February - 27045" +"<br>" + "March - 24520" +"<br>" + "April - 6868" +"<br>" + "May - 6453" +"<br>" + "June - 9095" + "<br>" + "July - 15609" + "<br>"+ "August - 15474" + "<br>"+ "September - 12270" + "<br>" + "</p>" ).style("visibility", "visible");
      }
      
    })
    .on("mouseout", function(d, i) {
     svg.selectAll(".layer")
      .transition()
      .duration(250)
      .attr("opacity", "1");
      
      if (d.key == "Chicago O'Hare International Airport"){
        d3.select(this)
      .classed("hover", false)
      .attr("stroke-width", "0px"),
      tooltip.html( "<p>" + d.key + "<br>" + "January - 52887"+ "</p>" )
      .style("visibility", "hidden");
      }
      else if (d.key == "Hartsfield Jackson Atlanta International Airport"){
        d3.select(this)
      .classed("hover", false)
      .attr("stroke-width", "0px"),
      tooltip.html( "<p>" + d.key + "<br>" + "January - 52887"+ "</p>" )
      .style("visibility", "hidden");
      }
      else if (d.key == "Los Angeles International Airport"){
        d3.select(this)
      .classed("hover", false)
      .attr("stroke-width", "0px"),
      tooltip.html( "<p>" + d.key + "<br>" + "January - 52887"+ "</p>" )
      .style("visibility", "hidden");
      }
      else if (d.key == "McCarran International Airport"){
        d3.select(this)
      .classed("hover", false)
      .attr("stroke-width", "0px"),
      tooltip.html( "<p>" + d.key + "<br>" + "January - 52887"+ "</p>" )
      .style("visibility", "hidden");
      }
      else if (d.key == "Dallas Fort Worth International Airport"){
        d3.select(this)
      .classed("hover", false)
      .attr("stroke-width", "0px"),
      tooltip.html( "<p>" + d.key + "<br>" + "January - 52887"+ "</p>" )
      .style("visibility", "hidden");
      }
      else if (d.key == "Phoenix Sky Harbor International Airport"){
        d3.select(this)
      .classed("hover", false)
      .attr("stroke-width", "0px"),
      tooltip.html( "<p>" + d.key + "<br>" + "January - 52887"+ "</p>" )
      .style("visibility", "hidden");
      }
      else if (d.key == "London Heathrow Airport"){
        d3.select(this)
      .classed("hover", false)
      .attr("stroke-width", "0px"),
      tooltip.html( "<p>" + d.key + "<br>" + "January - 52887"+ "</p>" )
      .style("visibility", "hidden");
      }
      else if (d.key == "San Francisco International Airport"){
        d3.select(this)
      .classed("hover", false)
      .attr("stroke-width", "0px"),
      tooltip.html( "<p>" + d.key + "<br>" + "January - 52887"+ "</p>" )
      .style("visibility", "hidden");
      }
      else if (d.key == "Newark Liberty International Airport"){
        d3.select(this)
      .classed("hover", false)
      .attr("stroke-width", "0px"),
      tooltip.html( "<p>" + d.key + "<br>" + "January - 52887"+ "</p>" )
      .style("visibility", "hidden");
      }
      else if (d.key == "General Edward Lawrence Logan International Airport"){
        d3.select(this)
      .classed("hover", false)
      .attr("stroke-width", "0px"),
      tooltip.html( "<p>" + "<strong>" + d.key + "</strong>" + "<br>" + "January - 52887"+ "</p>" )
      .style("visibility", "hidden");
      }

  })
    
});
}
</script>




<!-- KPI's -- ridgeline plot -->

<h2>Top 10 most affected airlines [Percentage decrease from 2019 to 2020]</h2>

<style>
table, th, td {
  border: .02px solid white;
}
</style>

<table style="width:100%">
  <tr>
    <th></th>
    <th>Airline</th> 
    <th>Percentage decrease</th>
    <th>2019 count</th>
    <th>2020 count</th>
  </tr>
  <tr>
      <td>1</td>
      <td>N829JP</td>
    <td>99.892 %</td>
    <td>933</td>
    <td>1</td>
  </tr>
  <tr>
      <td>2</td>
      <td>KAP639</td>
    <td>99.835 %</td>
    <td>607</td>
    <td>1</td>
  </tr>
  <tr>
      <td>3</td>
      <td>NDU641</td>
    <td>99.834 %</td>
    <td>604</td>
    <td>1</td>
  </tr>
  <tr>
      <td>4</td>
      <td>N535WK</td>
    <td>99.801 %</td>
    <td>504</td>
    <td>1</td>
  </tr>
  <tr>
      <td>5</td>
      <td>UUD</td>
    <td>99.797 %</td>
    <td>494</td>
    <td>1</td>
  </tr>
  <tr>
      <td>6</td>
      <td>HBTEC</td>
    <td>99.750 %</td>
    <td>807</td>
    <td>2</td>
  </tr>
  <tr>
      <td>7</td>
      <td>ADSBTEST</td>
    <td>99.746 %</td>
    <td>395</td>
    <td>1</td>
  </tr>
  <tr>
      <td>8</td>
      <td>N7673W</td>
    <td>99.727 %</td>
    <td>367</td>
    <td>1</td>
  </tr>
  <tr>
      <td>9</td>
      <td>RSCU521</td>
    <td>99.722 %</td>
    <td>361</td>
    <td>1</td>
  </tr>
  <tr>
      <td>10</td>
      <td>ENY3779</td>
    <td>99.650 %</td>
    <td>286</td>
    <td>1</td>
  </tr>
</table>


<style>
    #ranking{
        background-color: white;
        width: 50%;
    }
</style>

<h2>2019 airlines frequency</h2>
<!-- <button type="button", onsubmit="runButton()", id="search">Submit!</button> -->

<button type="button" id="2019_chart" >2019 airline frequency</button>
<button type="button" id="2020_chart">2020 airline frequency</button>

<div id="ranking"></div>

<script>

        document.getElementById("2019_chart").onclick = function fun(){
            run2019chart();
        }
        document.getElementById("2020_chart").onclick = function fun(){
            run2020chart();
        }

    
    function run2020chart(){

        d3.select("#svg201920").remove();
        var width = 400,
            height = 400,
            barHeight = height / 2 - 40;

        var formatNumber = d3.format("s");

        var color = d3.scale.ordinal()
            .range(["#1e0946","#ffffb3","#53046f","#e85d22","#80b1d3","#f9ce1c","#980043","#fccde5","#045A8D","#bc80bd"]);

        var svg = d3.select('#ranking').append("svg")
        .attr("id", "svg201920")
            .attr("width", width)
            .attr("height", height)
        .append("g")
            .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

        d3.csv("../data/ranking_2020_count.csv", function(error, data) {
            if (data != undefined) {
                data.sort(function(a,b) { return b.value - a.value; });

        var extent = d3.extent(data, function(d) { return d.value; });
        var barScale = d3.scale.linear()
            .domain([0,3])
            .range([0, barHeight]);

        var keys = data.map(function(d,i) { return d.name; });
        var numBars = keys.length;

        var x = d3.scale.linear()
            .domain([0,3])
            .range([0, -barHeight]);

        var xAxis = d3.svg.axis()
            .scale(x).orient("left")
            .ticks(3)
            .tickFormat(formatNumber);
            
        var circles = svg.selectAll("circle")
                .data(x.ticks(3))
                .enter().append("circle")
                .attr("r", function(d) {return barScale(d);})
                .style("fill", "none")
                .style("stroke", "black")
                .style("stroke-dasharray", "2,2")
                .style("stroke-width",".5px");

        var arc20 = d3.svg.arc()
            .startAngle(function(d,i) { return (i * 2 * Math.PI) / numBars; })
            .endAngle(function(d,i) { return ((i + 1) * 2 * Math.PI) / numBars; })
            .innerRadius(0);
        
        var segments = svg.selectAll("path")
                .data(data)
                .enter().append("path")
                .each(function(d) { d.outerRadius = 0; })
                .style("fill", function (d) { return color(d.name); })
                .attr("d", arc20);

        segments.transition().ease("elastic").duration(1000).delay(function(d,i) {return (25-i)*100;})
                .attrTween("d", function(d,index) {
                    var i = d3.interpolate(d.outerRadius, barScale(+d.value));
                    return function(t) { d.outerRadius = i(t); return arc20(d,index); };
                });

        svg.append("circle")
            .attr("r", barHeight)
            .classed("outer", true)
            .style("fill", "none")
            .style("stroke", "black")
            .style("stroke-width","1.5px");

        var lines = svg.selectAll("line")
            .data(keys)
            .enter().append("line")
            .attr("y2", -barHeight - 20)
            .style("stroke", "black")
            .style("stroke-width",".5px")
            .attr("transform", function(d, i) { return "rotate(" + (i * 360 / numBars) + ")"; });

        svg.append("g")
            .attr("class", "x axis")
            .call(xAxis);

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
                .style("fill", function(d, i) {return "#3e3e3e";})
                .append("textPath")
                .attr("xlink:href", "#label-path")
                .attr("startOffset", function(d, i) {return i * 100 / numBars + 50 / numBars + '%';})
                .text(function(d) {return d.toUpperCase(); });
            }

        });
    }

    function run2019chart(){

        d3.select("#svg201920").remove();
        var width = 400,
            height = 400,
            barHeight = height / 2 - 40;

        var formatNumber = d3.format("s");

        var color = d3.scale.ordinal()
            .range(["#1e0946","#ffffb3","#53046f","#e85d22","#80b1d3","#f9ce1c","#980043","#fccde5","#045A8D","#bc80bd"]);

        var svg = d3.select('#ranking').append("svg")
        .attr("id", "svg201920")
            .attr("width", width)
            .attr("height", height)
        .append("g")
            .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

        d3.csv("../data/ranking_2019_count.csv", function(error, data) {
            if (data != undefined) {
                data.sort(function(a,b) { return b.value - a.value; });

        var extent = d3.extent(data, function(d) { return d.value; });
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
            
        var circles = svg.selectAll("circle")
                .data(x.ticks(4))
                .enter().append("circle")
                .attr("r", function(d) {return barScale(d);})
                .style("fill", "none")
                .style("stroke", "black")
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
            .style("stroke", "black")
            .style("stroke-width","1.5px");

        var lines = svg.selectAll("line")
            .data(keys)
            .enter().append("line")
            .attr("y2", -barHeight - 20)
            .style("stroke", "black")
            .style("stroke-width",".5px")
            .attr("transform", function(d, i) { return "rotate(" + (i * 360 / numBars) + ")"; });

        svg.append("g")
            .attr("class", "x axis")
            .call(xAxis);

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
                .style("fill", function(d, i) {return "#3e3e3e";})
                .append("textPath")
                .attr("xlink:href", "#label-path")
                .attr("startOffset", function(d, i) {return i * 100 / numBars + 50 / numBars + '%';})
                .text(function(d) {return d.toUpperCase(); });
            }       
        });
    }
</script>




<!-- KPI 2 -->

<!-- [combine april, may, june 2020 frequencies]
most active airports during COVID -->

<h2>Most active airports during COVID</h2>

<!-- 4 categories - small, medium, large, heliport -->
<!-- top 3 - count check - DONUTS -->

<!-- Small airports -->
<style>
    .slice_small{
        stroke: black;
        stroke-width: 5px;
    }
</style>

<div id = "donut_small">
    <h3>Small airports</h3>
</div>

<script>
    var w = 670,
    h = 326,
    r = 150,
    color = d3.scale.category20c();

    data = [{"label":"Phoenix Deer Valley Airport", "value":33260}, 
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
    
</script>



<!-- medium airports -->
<style>
    .slice_medium{
        stroke: black;
        stroke-width: 5px;
    }
</style>

<div id = "donut_medium">
    <h3>Medium airports</h3>
</div>

<script>
     var w = 670,
    h = 326,
    r = 150,
    color = d3.scale.category20b();
 
    data = [{"label":"Centennial Airport", "value":21191}, 
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
    
</script>




<!-- large airports -->
<style>
    .slice_large{
        stroke: black;
        stroke-width: 5px;
    }
</style>

<div id = "donut_large">
    <h3>Large airports</h3>
</div>

<script>
     var w = 670,
    h = 326,
    r = 150,
    color = d3.scale.category20c();
 
    data = [{"label":"Chicago O'Hare International Airport", "value":55765}, 
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
    
</script>




<!-- HELIPORT - TOP 3 -->
<style>
    .slice_heliport{
        stroke: black;
        stroke-width: 5px;
    }
</style>

<div id = "donut_heliport">
    <h3>Heliports</h3>
</div>

<script>
     var w = 670,
    h = 326,
    r = 150,
    color = d3.scale.category20c();
 
    data = [{"label":"Tecma Heliport", "value":516}, 
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
    
</script>
</body>
</html>
`;