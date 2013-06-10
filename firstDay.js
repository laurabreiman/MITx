function calculate(text){
    var pattern = /\d+|\+|\-|\*|\/|\(|\)/g;
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

function setup_calc(div){
    var input = $('<input></input>',{type: "text", size: 50});
    var output = $('<div></div>');
    var button = $('<button>Calculate</button>');
    button.bind("click", function(){
        output.text(String(calculate(input.val())));
    });
    
    $(div).append(input,button,output);
}

function read_operand(tokens){
    try{
        var num = tokens[0];
        tokens.shift();
        if (num == '('){
            var index = tokens.indexOf(')');
            
            if(index <0){
                throw "mismatched delimiters";
            }
            
            else{
                num = evaluate(tokens.slice(0,index));
                tokens = tokens.slice(index,tokens.length);
            }
            return num;
        }
        else{
            num = parseInt(num,10);
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
        var value = read_operand(tokens);
        var operator = 0;
        var temp = 0;
        while(tokens.length > 0){
            operator = tokens[0];
            tokens.shift();
            if(['+','-','*','/'].indexOf(operator) < 0) throw "unrecognized operator";
            if(tokens.length === 0) throw "missing operand";
            temp = read_operand(tokens);
            if(operator === '+'){
                value = value+temp;
            } 
            if(operator === '-'){
                value = value-temp;
            }
            if(operator === '*'){
                value = value*temp;
            }
            if(operator === '/'){
                value = value/temp;
            }
        }
    return value;
}

$(document).ready(function(){
   $('.calculator').each(function(){
      //'this' refers to the <div> with class calculator
      setup_calc(this);
   }); 
});