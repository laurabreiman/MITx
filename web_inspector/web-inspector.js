/**
 * A simple web inspector.
 *
 * Intended to be a singleton: this only exists once per page, so it
 * attaches itself to the BODY element.
 */
var Inspector = function($) {
  exports = {};

  // The root element of the inspector.
    var root = null;
    var currentSelection = null;
    var mouseIsOn = false;
    var destroySelection = function() {
        $('.selected').removeClass('selected');
    }
    var select = function(node) {
        node.addClass("selected");
        currentSelection = node;
    }
    var deselect = function(node) {
        node.removeClass("selected");
        currentSelection = null;
    }

  var template = ""
    + "<div class='tray'>"
    + "  <textarea class='text-editor'></textarea>"
    + "  <div class='property-editor'>"
    + "    <div class='node-lookup'>"
    + "      <input class='selector' /><input class='nth' />"
    + "      <button class= 'mouse'>Mouse</button>"
    + "      <button class= 'search'>Search</button>"
    + "    </div>"
    + "    <div class='property-list'>"
    + "    </div>" 
    + "  </div>" 
    + "</div>" 
    + "<div class='handle'></div>";

    var toggle = function(){
        if (root.css('top') == '0px'){
            root.animate({"top": "-300px"}, 500);
        }
        else {
            root.animate({"top": "-0px"}, 500);
        }
    };
    
    var searchBySelector = function() {
        var nthBox = root.find(".nth");
        var nthStr = nthBox.val();
        var nth = parseInt(nthStr)
        
        if(isNaN(nth)){
            nth = 0;
        }
        var selectorBox = root.find(".selector");
        var selectorStr = selectorBox.val();
        var selection = $(selectorStr).eq(nth);
        var html = selection.html();
        
        var textEditor = root.find(".text-editor");
        textEditor.empty();
        textEditor.val(html);
        
        var propertyView = root.find(".property-list");
        var output = displayElements(selection);
        propertyView.empty();
        propertyView.append(output);
        
    };
    
    var displayElements = function(selection){
        var textEditor = root.find(".text-editor");   
        var outputTable = $("<table></table>");
        var elements = ["height","width","position","margin","padding","background-color","class"]
        for(var i=0;i<elements.length;i++){
            var newRow = $("<tr></tr>", {class:i});
            var attrCell = $("<td></td>")
            var valueCell = $("<td></td>")
            attrCell.text(elements[i]);
            valueCell.text(selection.css(elements[i]));
            newRow.append(attrCell).append(valueCell);
            outputTable.append(newRow);
        }
        return outputTable;
        
    }
    
    var mouseOn = function() {
        mouseIsOn = true;
        $('#wrapper *').mouseenter( function(event){
            destroySelection();
            select($(this));
            event.stopPropagation();
        })
        $('#wrapper *').click( function(event){
            event.preventDefault();
            
            var textEditor = root.find(".text-editor");
            textEditor.empty();
            textEditor.val($(this).parent().html());
            
            var propertyView = root.find(".property-list");
            var output = displayElements($(this));
            propertyView.html(output);
            
            event.stopPropagation();
            
            $(this).css('border', 'none');
            mouseIsOn = false;
            mouseOff();

        })
        $('#wrapper *').mouseleave( function(){
            deselect($(this));
        })
    }
    
    var mouseOff = function() {
        mouseIsOn = false;
        $('#wrapper *').unbind("mouseenter");
        $('#wrapper *').unbind("click");
        $('#wrapper *').unbind("mouseleave");
    }
  /*
   * Construct the UI
   */
    exports.initialize = function() {
        root = $("<div class='inspector'></div>").appendTo($('body'));
        root.append(template);
        root.find(".handle").on("click", toggle);
        root.find(".node-lookup .search").on("click", searchBySelector);
        root.find(".node-lookup .mouse").on("click", function(){
            if(!mouseIsOn){
                mouseOn();
            }
            else{
                mouseOff();
            }
        })
    };
                                        
        
    exports.toggle = toggle;

    return exports;
};

/*****************************************************************************
 * Boot up the web inspector!
 *
 * This will enable you to COPY AND PASTE this entire file into any web page
 * to inspect it.
 *
 * XXX TODO!
 *  Change the CSS link below to point to the full URL of your CSS file!
 *
 *  You shouldn't need to touch anything else below.
 *
 *****************************************************************************/
(function() {
    var createInspector = function() {
      window.inspector = Inspector(jQuery);
      window.inspector.initialize();
    }

    // Add the CSS file to the HEAD
    var css = document.createElement('link');
    css.setAttribute('rel', 'stylesheet');
    css.setAttribute('type', 'text/css');
    css.setAttribute('href', 'web-inspector.css'); // XXX TODO CHANGEME!!
    document.head.appendChild(css);

    if ('jQuery' in window) {
      createInspector(window.jQuery);
    } else {
      // Add jQuery to the HEAD and then start polling to see when it is there
      var scr = document.createElement('script');
      scr.setAttribute('src','http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');
      document.head.appendChild(scr);
      var t = setInterval(function() {
        if ('jQuery' in window) {
          clearInterval(t); // Stop polling 
          createInspector();
        }
      }, 50);
    }
})();
