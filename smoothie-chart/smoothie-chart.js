function graph(){
    var data = [[{y:5}], [{y:2}], [{y:10}], [{y:3}]]
    var fruits = ['bananas','blueberries','grapes','guava'];
    var fruitColors = ['yellow', 'lightblue', 'purple', 'red'];
    var fruitYums = [1,2,3,4];
    var maxPrice = 25;
    
    var outer_width = 300;
    var outer_height = 300;
    
    var stack = d3.layout.stack();
    var stacked_data = stack(data);
    
    var margin = { top: 20, right: 20, bottom: 20, left: 20 }
    var chart_width = outer_width - margin.left - margin.right;
    var chart_height = outer_height -margin.top - margin.bottom;
    
    var y_scale = d3.scale.linear().domain([0,maxPrice]).range([chart_height,0]);
    
    var color_scale = function(index){
        return fruitColors[index];
    }
    
    var chart = d3.select(".chart-container").append("svg").attr("class","chart").attr("height", outer_height).attr("width",outer_width).append("g").attr("transform","translate(" + (margin.left+margin.right) + "," + (margin.top + margin.bottom -5)+ ")");
    
    var layer_groups = chart.selectAll(".layer").data(stacked_data).enter().append("g").attr("class", "layer");
    
    var rects = layer_groups.selectAll('rect').data(function(d){return d}).enter().append('rect').attr("x",0).attr("y", function(d){return y_scale(d.y0+d.y)}).attr("width", chart_width).attr("height", function(d){ return y_scale(d.y0) - y_scale(d.y0+d.y); }).style("fill", function(d, i, j) { return color_scale(j);});
    
    var label_groups = chart.selectAll(".label").data(stacked_data).enter().append("g").attr("class", "label");
    
    label_groups.selectAll(".bar-label").data(function(d){return d;}).enter().append("text").attr("class", "bar-label").attr("x",chart_width/2).attr("y", function(d){return y_scale(d.y0+d.y/2);}).attr("text-anchor", "middle").text(function(d,i,j){return fruits[j] + ": $"+d.y+", "+fruitYums[j]+" yums.";});
    
    chart.selectAll(".y-scale-label").data(y_scale.ticks(4)).enter().append("text").attr("class", "y-scale-label").attr("x",0).attr('y',y_scale).attr("text-anchor","end").attr("dy","0.3em").attr("dx",-margin.left/2).text(function(d){return d/maxPrice*100 + "%"});
    
    var snd = new Audio("whistle.ogg"); // buffers automatically when created
    $("div").on("mouseover", function(){
        snd.play();
    });
}

graph();