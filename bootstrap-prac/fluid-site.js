/**
 * A simple fluid site built with Bootstrap
 */
function setup(div){
  var template = ""
    + "<div class='navbar navbar-inverse navbar-fixed-top'>"
    + "<div class='navbar-inner'>"
    + "<a class='brand' href='#'>Example Page</a>"
    + "<ul class='nav'>"
    + "<li class='active'><a href='#'>Home</a></li>"
    + "<li><a href='#'>About</a></li>"
    + "<li><a href='#'>Contact</a></li>"
    + "</ul>"
    + "</div>"
    + "</div>";
    
    var root = $("<div class='topbar'></div>");
    root.append(template);
}

$(document).ready(function() {
    $('.fluidsite').each(function() {
        setup(this);  
    });