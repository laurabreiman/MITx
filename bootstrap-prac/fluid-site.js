/**
 * A simple fluid site built with Bootstrap
 */
function setup(div){
    
    var root = $("<div class='topbar'></div>");
    root.append(template);
    $('.icon').popover('content');
}

$(document).ready(function() {
    $(".icon").popover({trigger: 'hover', title: "It's all yours", content: "Don't things taste better when they're Jüst right?"});
});