var quiz = (function () {
    
    var exports = {};
    
    var useParse = 1; //don't use Parse: 0, use Parse: 1
    
    var questions = [{"questionText": "What is Laura's favorite vegetable?", "options": ["Carrot", "Kale", "Broccoli", "Brussel Sprouts"], "solutionIndex": 2}, {"questionText": "What is Laura's favorite Pokemon?", "options": ["Beedrill", "Abra", "Pikachu", "Porygon"], "solutionIndex": 1}];
    //structure with... questionText, solutions, options
    //[ {'text of question','solution','options'] ... ]
    
    var currentQIndex, score;
    var QuizState = Parse.Object.extend("QuizState");
    var quizState;
    

    
    var finalcheck = function(){
        var answer = $('input[name="choice'+currentQIndex+'"]:checked')[0].value;
        
        $('input[name="choice'+currentQIndex+'"]').attr('disabled',true);
        
        checkAnswer(answer);
    }
    
    function process(answer){
        var message = $("<div></div>", {class: "message"});
        
        if(answer){
            incrementScore();
            message.addClass("correct");
            message.append("Correct! Score: "+score);
            incrementQ();
        }
        else{
            message.append("Incorrect :( Score: "+score);
            message.addClass("incorrect");
            incrementQ();
        }
        
        var next = $("<button class = 'next'>Next</button>");
        $('.quiz').append(message, next);
        $('.check').remove();
        next.on('click', function(){
            $(".quiz").html('');
            displayQuestion();
        });
    }
    
    function parseRetrieve(){
        var query = new Parse.Query(QuizState);
        query.get(localStorage.id, {
          success: function(quizData) {
              currentQIndex = quizData.get('currentQIndex');
              score = quizData.get('score');
              console.log(score, currentQIndex);
              quizState = quizData;
              displayQuestion();
          },
          error: function(object, error) {
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and description.
          }
        });
    }
    
    function checkAnswer(ans){
        var req = $.ajax({
            url: "http://localhost:8080/", data: {"answer": ans, "index": currentQIndex}
        });
        req.done(function(msg){
            console.log(msg);
            process(stringToBoolean(msg));
        });
    }
    
    function stringToBoolean(string){
	   switch(string.toLowerCase()){
		case "true": return true;
		case "false": return false;
		default: return Boolean(string);
	   }
    }
    
    function displayQuestion(){
        if(currentQIndex >= questions.length){
            var end = $("<div class = 'end'>The end! Your score: "+score+"</div>");
            var tryAgain = $("<button class = 'retry'>Try Again?</button>")
            end.append(tryAgain);
            $('.quiz').append(end);
            $('.retry').on('click', function(){
                localStorage.clear();
                var refresh = "Refresh and you're all set!";
                $('.retry').remove();
                $('.end').text(refresh);
            });
        }
        else{
            currentQ = questions[currentQIndex];
            
            var question = $("<div class='question'></div>");
            var text = $("<div class='questionText'></div>").append((currentQIndex+1),". ", currentQ.questionText);
            question.append(text);

            var options = $("<div class= 'options'></div>");
            for(var i = 0; i<currentQ.options.length; i++){
                var option = $("<div></div>", {class: 'option'});
                var radio = $("<input>",{ type: "radio", name: "choice" + currentQIndex, value: currentQ.options[i]});
                option.append(radio, " ", currentQ.options[i]);
                options.append(option);
            }
            var check = $("<button class = 'check'>Check</button>");
            check.on("click", finalcheck);

            $(".quiz").append(question,options,check);   
        }
    }
    
    
    function incrementScore(){
        score ++;
        localStorage.score = score;
        quizState.set('score', score);
        quizState.save();
        localStorage.id = quizState.id;
    }
    
    function incrementQ(){
        currentQIndex ++;
        localStorage.currentQIndex = currentQIndex;
        quizState.set("currentQIndex", currentQIndex);
        quizState.save();
        localStorage.id = quizState.id;
    }
        
    function setup(){
        Parse.initialize("ewBsjqEgnPVNDPffGFF2IuAwMGWWW7okmP0meBYs", "dA3xMZsTLz8UzSgZXUWJdNDtg0k5IlF1tUjPMglw");
        

        if(useParse == 0){
            if(!isNaN(localStorage.score)){
                score = parseInt(localStorage.score);
            }
            else{
                score = 0;
            }
            if(!isNaN(localStorage.currentQIndex)){
                currentQIndex = parseInt(localStorage.currentQIndex); //index of the current question
            }
            else{
                currentQIndex = 0; 
            }
            displayQuestion();
        }
        else if(localStorage.id != undefined){
            parseRetrieve();
        
        }
        else{
                score = 0;
                currentQIndex = 0; 
                
                quizState = new QuizState();
    
                quizState.set("score", score);
                quizState.set("currentQIndex", currentQIndex);
                quizState.save();
                localStorage.id = quizState.id;
                displayQuestion();
        }
        }
                         
    exports.setup = setup;
    return exports;                 
})();
                     
$(document).ready(function() {
    quiz.setup();   
    });
                     
                     