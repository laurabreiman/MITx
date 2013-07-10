var smoothie = (function() {
    
    var items = [{url:"http://web.mit.edu/6.mitx/www/demo/knapsack/clock.png",value:"175",weight:"10",name:"clock"},{url:"http://web.mit.edu/6.mitx/www/demo/knapsack/painting.png",value:"90",weight:"9",name:"painting"},{url:"http://web.mit.edu/6.mitx/www/demo/knapsack/radio.png",value:"20",weight:"4",name:"radio"}, {url:"http://web.mit.edu/6.mitx/www/demo/knapsack/clock.png",value:"50",weight:"2",name:"vase"}, {url:"http://web.mit.edu/6.mitx/www/demo/knapsack/clock.png",value:"10",weight:"1",name:"book"}, {url:"http://web.mit.edu/6.mitx/www/demo/knapsack/clock.png",value:"200",weight:"20",name:"computer"}];
    
    function EventHandler(){
        // map event_string to list of callbacks
        var handlers = {};
        
        function on(event_string, callback){
            var cblist = handlers[event_string];
            
            if(cblist === undefined){
                cblist = [];
                handlers[event_string] = cblist;
            }
            
            cblist.push(callback);
        }
        
        function trigger(event_string, data){
            var cblist = handlers[event_string];
            
            if(cblist !== undefined) {
                for (var i = 0; i < cblist.length; i += 1){
                    cblist[i](data);
                }
            }
        }
        
        return {on: on, trigger: trigger};
    }
    
    //on(event_string,callback)
    //   -- "update", the data - new value of count
    function Model() {
        var event_handlers = EventHandler();
        var count = 0; //current value of counter
        
        function add_one_to_counter(){ //increment counter
            count += 1;
            event_handlers.trigger('update',count);
        }
        function reset(){ //set counter to 0
            count = 0;
            event_handlers.trigger('update',count);
        }
        function get_value(){ //return the current value of the counter
            return count;
        }
        return {add_one_to_counter: add_one_to_counter, reset: reset, get_value: get_value, on: event_handlers.on};
    }
    
    function Controller(model) {
        
        function increment(){
            model.add_one_to_counter();
        }
        
        return {increment: increment};
    }
    
    function View(div,model,controller) {
        var display = $("<div class='view'>The current value of the counter is <span>0</span>.</div>");
        var counter_value = display.find('span');

        div.append(display);
        
        function update(cval){
            counter_value.text(cval);
        }
        
        model.on('update',update);
        
        return {};
    }
    
    
    function setup(div){
//        var model = Model();
//        var controller = Controller(model);
//        var view = View(div, model, controller);
//        var view2 = View(div, model, controller);
//      
        var container = $("<div class='container'></div>");
        var locations = $("<div class='row'>Smoothies</div>");
        var fruits = $("<div class='span6'></div>");
        var smoothie_cup = $("<div class='span6'></div>");
        
        for(var i = 0; i < items.length; i++){
            var item = items[i];
            fruits.append($("<img src="+item.url+"></img>"));
        }
        
        locations.append(fruits);
        locations.append(smoothie_cup);
        container.append(locations);
        div.append(container);
    }
    
    return { setup: setup };
}());

$(document).ready(function() {
    $('.smoothie').each(function() {
        smoothie.setup($(this));
    })
});