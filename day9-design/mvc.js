var counter = (function() {
    
    // on(event_string,callback) -- register handler for an event
    // trigger(event._string,data) -- call all callbacks for event_string
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
        var model = Model();
        var controller = Controller(model);
        var view = View(div, model, controller);
        var view2 = View(div, model, controller);
        
        var button = $("<button>Increment</button>");
        button.on("click",controller.increment);
        div.append(button);
    }
    
    return { setup: setup };
}());

$(document).ready(function() {
    $('.counter').each(function() {
        counter.setup($(this));
    })
});