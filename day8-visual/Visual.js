var data = [4,8,8,15,16,23,42];

var outer_width = 300;
var outer_height = 300;

var margin = { top: 20, right: 20, bottom: 20, left: 20 }

var chart_width = outer_width - margin.left - margin.right;
var chart_height = outer_height -margin.top - margin.bottom;

var x_scale = d3.scale.ordinal().domain(d3.keys(data)).rangeBands([0,chart_width]);
var y_scale = d3.scale.linear().domain([0,d3.max(data)]).range([chart_height,0]);

var chart = d3.select(".chart-container").append("svg").attr("class","chart").attr("height", outer_height).attr("width",outer_width).append("g").attr("transform","translate(" + margin.left + "," + margin.top + ")");

chart.selectAll("line").data(y_scale.ticks(10)).enter().append("line").attr('x1',0).attr('x2',chart_width).attr('y1',y_scale).attr('y2',y_scale);

chart.selectAll(".y-scale-label").data(y_scale.ticks(10)).enter().append("text").attr("class", "y-scale-label").attr("x",0).attr('y',y_scale).attr("text-anchor","end").attr("dy","0.3em").attr("dx",-margin.left/8).text(String);

chart.selectAll('rect').data(data).enter().append('rect').attr("x",function(d,i){return x_scale(i);}).attr("y",y_scale).attr("width",x_scale.rangeBand()).attr("height",function(d){ return chart_height-y_scale(d); });

chart.selectAll(".bar-label").data(data).enter().append("text").attr("class", "bar-label").attr("x",function(d,i){return x_scale(i) + x_scale.rangeBand()/2;}).attr("y", function(d){return y_scale(d)+margin.top/4;}).attr("dy","0.7em").attr("text-anchor", "middle").text(function(d){return d;});
