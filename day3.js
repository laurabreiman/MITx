function test_clear() {
    var JQcanvas = $('#test:first');
    var DOMcanvas = JQcanvas[0];
    var ctxt = DOMcanvas.getContext('2d');
    
    // x, y, w, h
    ctxt.clearRect(0,0,JQcanvas.width(),JQcanvas.height());
}

function test_line() {
    var JQcanvas = $('#test:first');
    var DOMcanvas = JQcanvas[0];
    var ctxt = DOMcanvas.getContext('2d');
    
    ctxt.beginPath();
    ctxt.moveTo(50,50);
    ctxt.lineTo(150,150);
    ctxt.stroke();
}