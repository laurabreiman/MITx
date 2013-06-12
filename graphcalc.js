var graphcalc = (function () {
    var exports = {};  // functions,vars accessible from outside
   
    function graph(canvas,expression,min,max) {
        //… your code to plot the value of expression as x varies from x1 to x2 …
        try{
            var treeExp = calculator.parse(expression);
            min = parseFloat(min);
            max = parseFloat(max);
            
            if(isNaN(min) || isNaN(max)){
                throw "Range is not a number";
            }
            if(min> max){
                throw "Invalid Range";
            }

            
            var xMinValue = calculator.evaluate(treeExp, {x:min});
            var xMaxValue = calculator.evaluate(treeExp, {x:max});
            console.log(xMinValue, xMaxValue);
            console.log(canvas.height, canvas.width);
            var xVals = [];
            var yVals = [];
            
            var w = canvas.width;
            
            var stepSize = (max-min)/(w)
            
            var yMin = xMinValue;
            var yMax = xMinValue;
            
            for(var i=min; i<max; i+= stepSize){
                var xVal = i;
                var yVal = calculator.evaluate(treeExp, {x:parseFloat(i)});
                xVals.push(xVal);
                yVals.push(yVal);
                
                if(yVal < yMin){
                    yMin = yVal;
                }
                if(yVal > yMax){
                    yMax = yVal;
                }
            }

            var yStepSize = (yMax-yMin)/(canvas.height)
            
            
            xVals.push(max);
            yVals.push(xMaxValue);
            
            var yMapped = yVals.map(function(y){
                return (y-yMin)/(yStepSize);
            })
            
            var ctxt = canvas.getContext('2d');
            ctxt.beginPath();
            ctxt.moveTo(0,(canvas.height-yMapped[0]));
            console.log(yMapped.length);
            for(var i=1; i<yMapped.length;i++){
                ctxt.lineTo(i,(canvas.height-yMapped[i]));
            }
            ctxt.lineWidth=2;
            ctxt.strokeStyle = "#222223";
            ctxt.stroke();
            
        }
        catch(err){
            display_error(canvas, err);
        }
    }
   
   function display_error(canvas, text){
        var ctxt = canvas.getContext('2d');
        
        ctxt.beginPath();
        ctxt.fillStyle = "red";
        ctxt.font = "20px Verdana";
        ctxt.textAlign = "center";
        ctxt.textBaseline = "middle";
        
        ctxt.fillText(text,150,75);
}
   
    function setup(div) {
        /*… your code to fill the div with the appropriate HTML components and
         to call graph() with the appropriate arguments in response to a click
         of the Plot button … */
         var JQcanvas = $("<canvas></canvas>");
         var DOMcanvas = JQcanvas[0];
         var expInput = $("<input></input>", {class: "expression", type: "text", size: 100});
         var minInput = $("<input></input>", {class: "min", type: "text", size: 100});
         var maxInput = $("<input></input>", {class: "max", type: "text", size: 100});
         var calcBody =  $("<div></div", {class: "body"});
         var row1 = $("<div></div");
         var row2 = $("<div></div");
         var plot = $("<button>Plot</button>");
         var expLabel = $("<span>Expression:</span>", {class: "label"});
         var minLabel = $("<span>Min x:</span>", {class: "label"});
         var maxLabel = $("<span>Max x:</span>", {class: "label"});
         $(row1).append(expLabel);
         $(row1).append(expInput);
         $(row2).append(minLabel);
         $(row2).append(minInput);
         $(row2).append(maxLabel);
         $(row2).append(maxInput);
         $(calcBody).append(DOMcanvas,row1,row2,plot)
        $(div).append(calcBody);
        
        $(plot).bind('click',function() {
            graph(DOMcanvas, $('.expression').val(), $('.min').val(), $('.max').val());
        })
    }
    exports.setup = setup;
   
    return exports;
}());
// setup all the graphcalc divs in the document
$(document).ready(function() {
    $('.graphcalc').each(function() {
        graphcalc.setup(this);  
    });
});