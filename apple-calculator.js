function calculate(text){
    var pattern = /\d*\.?\d+|\+|\−|\×|\÷|\(|\)|\w*\(/g;
    var tokens = text.match(pattern);
    try{
        var val = evaluate(tokens);
        if(tokens.length > 0) throw "ill-formed expression";
        return String(val);
    }
    catch(err){
        return err;
    }
}

function read_operand(tokens){
    try{
        var num = tokens.shift();
        if (num == '('){
            num = evaluate(tokens);
            if(tokens.shift() != ')') throw "mismatched";
            return num;
        }
        else if(num == '−'){
            var next = tokens.shift();
            tokens.unshift('(','0','−',next,')');
            num = read_operand(tokens);
            return num;
        }
        else if(num == "sin("){
            num = Math.sin(evaluate(tokens));
            if(tokens.shift() != ')') throw "mismatched";
            return num;
        }
        else if(num == "log("){
            num = Math.log(evaluate(tokens));
            if(tokens.shift() != ')') throw "mismatched";
            return num; 
        }
        else if(num == "sqrt("){
            num = Math.sqrt(evaluate(tokens));
            if(tokens.shift() != ')') throw "mismatched";
            return num; 
        }
        else{
            num = parseFloat(num,10);
            if(isNaN(num)) throw "number expected";
            return num;
        }
    }
    catch(err){
        return err;
    }
}

function evaluate(tokens){
        if(tokens.length === 0) throw "missing operand";
        var value = read_term(tokens);
        var operator = 0;
        var temp = 0;
        while(tokens.length > 0){
            if(tokens[0] == ')') return value;
            operator = tokens.shift();
            if(['+','−','×','÷'].indexOf(operator) < 0) throw "unrecognized operator";
            if(tokens.length === 0) throw "missing operand";
            temp = read_term(tokens);
            if(operator === '+'){
                value = value+temp;
            } 
            if(operator === '−'){
                value = value-temp;
            }
        }
    return value;
}

function read_term(tokens){
    var value = read_operand(tokens);
    var operator = 0;
    var temp = 0;
    while(tokens.length >0){
        if(tokens[0] == ')') return value;
        operator = tokens.shift();
        if(['+','−'].indexOf(operator) > -1){
            tokens.unshift(operator);
            break;
        }
        temp = read_operand(tokens);
        if(operator === '×'){
            value = value*temp;
        }
        if(operator === '÷'){
            value = value/temp;
        }
    }
    return value;
}

$(document).ready(function() {
    $('.tallButton').bind('click', function(){
        var expression = $('#expression');
        var input = expression.text().trim();
        expression.text(String(calculate(input)));
    });
    
    $('button').bind('click',function() {
        var func = $(this).html();
        switch (func) {
            case "C":
                var expression = $('#expression');
                expression.text("");
                break;
            case "=":
                break;
            default:
                var expression = $('#expression');
                var input = expression.text().trim();
                expression.text(input.concat(func));
        }
    });
});