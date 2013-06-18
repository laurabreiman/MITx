function setup(div) {
        /*… your code to fill the div with the appropriate HTML components and
         to call graph() with the appropriate arguments in response to a click
         of the Plot button … */
         var JQcanvas = $("<canvas width = '350px' height = '300px'></canvas>");
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
         var xAxisLabels = $("<div></div");

         $(xAxisLabels).append($("<span></span>",{class: "minLabel"}),$("<span></span>",{class: "maxLabel"}))
         $(row1).append(expLabel);
         $(row1).append(expInput);
         $(row2).append(minLabel);
         $(row2).append(minInput);
         $(row2).append(maxLabel);
         $(row2).append(maxInput);
         $(calcBody).append(DOMcanvas,xAxisLabels,row1,row2,plot)
        $(div).append(calcBody);
        
        
        var currentExp = null;
        var treeExp = null;
        var currentMin = null;
        var currentMax = null;
        var xMinValue = null;
        var xMaxValue = null;
        var yMin = null;
        var yMax = null;
        var graphimg = null;
        var yStepSize = null;
    
        $(plot).bind('click',function() {
            currentExp = $('.expression').val().replace(/\xD7/g,'*').replace(/\xF7/g,'/');
            treeExp = calculator.parse(currentExp);
            currentMin = $('.min').val();
            currentMax = $('.max').val();
            xMinValue = calculator.evaluate(treeExp, {x:currentMin});
            xMaxValue = calculator.evaluate(treeExp, {x:currentMax});
            yMin = xMinValue;
            yMax = xMinValue;
    
            graph(DOMcanvas, currentExp, currentMin, currentMax);
            graphimg = DOMcanvas.getContext('2d').getImageData(0,0,DOMcanvas.width,DOMcanvas.height);
        })
        
        JQcanvas.mousemove(function(event){
            var xCoord = event.pageX - JQcanvas.offset().left;
            
            var yCoord = calculator.evaluate(treeExp, {x:xCoord});
            //var yCoord = (event.pageY - JQcanvas.offset().top );
            
            var ctxt = DOMcanvas.getContext('2d');
            
            ctxt.clearRect(0,0,JQcanvas.width,JQcanvas.height);
            ctxt.putImageData(graphimg,0,0);
            ctxt.beginPath();
            ctxt.strokeStyle = 'black';
            xCoord = Math.round(xCoord*100)/100
            yCoord = Math.round(yCoord*100)/100
            var coord = ''+xCoord +', '+ yCoord;
            ctxt.fillText(coord, xCoord, yCoord);
            ctxt.moveTo(xCoord,0);
            ctxt.lineTo(xCoord,325);
            ctxt.stroke()
        });
    }
    
    function plot(fx){
        $('.graphcalc .expression').val(fx);
    }

$(document).ready(function() {
    $('.graphcalc').each(function() {
        setup(this);  
    });
    
    $('#equals').bind('click', function(){
        var expression = $('#expression');
        var input = expression.text().trim();
        
        expression.text(String(calculator.evaluate(calculator.parse(input.replace(/\xD7/g,'*').replace(/\xF7/g,'/')))));
    });
    

    
    $('#calcbody button').bind('click',function() {
        var func = $(this).html();
        switch (func) {
            case "C":
                var expression = $('#expression');
                expression.text("");
                $('.graphcalc input').val("");
                break;
            case "=":
                break;
            case "Var":
                var expression = $('#expression');
                var input = expression.text().trim();
                expression.text(input.concat("x"));
                break;
            case "Plot":
                var fx = $('#expression').text().trim(); 
                $('#expression').text("");
                plot(fx);
                break;
            default:
                var expression = $('#expression');
                var input = expression.text().trim();
                expression.text(input.concat(func));
        }
    });
    
    $(document).on("keypress", function(event){
        console.log(event.keyCode);
        $.each($('#calcbody button'), function(){
            
            if(parseInt($(this).html())+48 == event.keyCode){
                $(this).click();
            }
            if(event.keyCode == 13){
                $('#equals').click();
            }
            if(event.keyCode == 187 && event.shiftKey){
                $('#plus').click();
            }
        });
    });
    
    $('input').keypress(function(event){
        event.stopPropagation();
    });
    
    
});


    function graph(canvas,expression,min,max) {
        //… your code to plot the value of expression as x varies from x1 to x2 …
        try{
            min = parseFloat(min);
            max = parseFloat(max);
            
            if(isNaN(min) || isNaN(max)){
                throw "Range is not a number";
            }
            if(min> max){
                throw "Invalid Range";
            }

            var xVals = [];
            var yVals = [];
            
            var w = canvas.width;
            
            var stepSize = (max-min)/(w)
            
            yMin = xMinValue;
            yMax = xMinValue;
            
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

            yStepSize = (yMax-yMin)/(canvas.height);
            
            
            xVals.push(max);
            yVals.push(xMaxValue);
            
            var yMapped = yVals.map(function(y){
                return (y-yMin)/(yStepSize);
            })
            
            var minLabel = $('.minLabel');
            minLabel.text(String(min));
            var maxLabel = $('.maxLabel');
            maxLabel.text(String(max));
            
            var ctxt = canvas.getContext('2d');
            ctxt.clearRect(0,0,canvas.width,canvas.height);
            ctxt.beginPath();
            ctxt.moveTo(0,(canvas.height-yMapped[0]));
            
            for(var j=1; j<yMapped.length;j++){
                ctxt.lineTo(j,(canvas.height-yMapped[j]));
            }
            ctxt.lineWidth=2;
            ctxt.strokeStyle = "#FF0000";
            ctxt.stroke();
            
        }
        catch(err){
            display_error(canvas, err);
        }
    }
   
   function display_error(canvas, text){
        var ctxt = canvas.getContext('2d');
        
        ctxt.clearRect(0,0,canvas.width,canvas.height);
        ctxt.beginPath();
        ctxt.fillStyle = "red";
        ctxt.font = "20px Verdana";
        ctxt.textAlign = "center";
        ctxt.textBaseline = "middle";
        
        ctxt.fillText(text,150,75);
    }
