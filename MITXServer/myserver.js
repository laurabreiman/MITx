var questions = [{"questionText": "What is Laura's favorite vegetable?", "options": ["Carrot", "Kale", "Broccoli", "Brussel Sprouts"], "solutionIndex": 2}, {"questionText": "What is Laura's favorite Pokemon?", "options": ["Beedrill", "Abra", "Pikachu", "Porygon"], "solutionIndex": 1}, {"questionText": "Who is Laura's favorite person?", "options": ["Danielle 'dsmo' Penny", "Albert Einstein", "Gandhi", "Louis Tomlinson", "God"], "solutionIndex": 0}];
var sys = require("sys"),  
my_http = require("http"); 
my_url = require('url');
my_http.createServer(function(request,response){  
    sys.puts("LOl my name is dsmo"); 
    var data = my_url.parse(request.url, true).query;
    var currentQIn = parseInt(data.index);
    var result = (questions[currentQIn].options[questions[currentQIn].solutionIndex] == data.answer);
    response.writeHeader(200, {"Content-Type": "text/plain", 'Access-Control-Allow-Origin': '*'});  
    response.write(""+result);  
    response.end();  
}).listen(8080);  
sys.puts("Server Running on 8080");  