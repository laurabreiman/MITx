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
    ctxt.lineTo(150,50);
    ctxt.lineTo(150,150);
    ctxt.lineTo(50,150);
    ctxt.lineTo(50,50);
    ctxt.lineWidth=10;
    ctxt.strokeStyle = "#222223";
    ctxt.lineCap = "round";
    ctxt.lineJoin = "round";
    ctxt.stroke();
    
    ctxt.fillStyle = "#303030";
    ctxt.fill();
}

function test_rect(){
    var JQcanvas = $('#test:first');
    var DOMcanvas = JQcanvas[0];
    var ctxt = DOMcanvas.getContext('2d');
    
    ctxt.beginPath();
    ctxt.fillStyle = "#8AE234";
    ctxt.fillRect(25,25,100,100);
    ctxt.fillStyle = "#3A8DD4";
    ctxt.fillRect(75,75,100,100);
}

function test_smiley() {
    var JQcanvas = $('#test:first');
    var DOMcanvas = JQcanvas[0];
    var ctxt = DOMcanvas.getContext('2d');
    
    var gradient=ctxt.createLinearGradient(0,0,DOMcanvas.width,0);
    gradient.addColorStop("0","yellow");
    gradient.addColorStop("0.5","#FFE100");
    gradient.addColorStop("1.0","#FFA600");
    
    ctxt.beginPath();
    ctxt.arc(100,100,75,0,2*Math.PI);
    ctxt.fillStyle = gradient;
    ctxt.strokeStyle = "black";
    ctxt.lineWidth=7;
    ctxt.fill();
    ctxt.stroke();
    
    ctxt.beginPath();
    ctxt.arc(75,75,10,0,2*Math.PI);
    ctxt.fillStyle = "white";
    ctxt.lineWidth = 2;
    ctxt.stroke();
    ctxt.fill();
    
    ctxt.beginPath();
    ctxt.arc(75,75,5,0,2*Math.PI);
    ctxt.fillStyle = "#3A8DD4";
    ctxt.fill();
    
    ctxt.beginPath();
    ctxt.arc(125,75,10,0,2*Math.PI);
    ctxt.fillStyle = "white";
    ctxt.stroke();
    ctxt.fill();
    
    ctxt.beginPath();
    ctxt.arc(125,75,5,0,2*Math.PI);
    ctxt.fillStyle = "#3A8DD4";
    ctxt.fill();
    
    ctxt.beginPath();
    ctxt.arc(100,100,25,0,-Math.PI);
    ctxt.lineWidth = 6;
    ctxt.strokeStyle = "black";
    ctxt.stroke();
}

function test_text(){
    var JQcanvas = $('#test:first');
    var DOMcanvas = JQcanvas[0];
    var ctxt = DOMcanvas.getContext('2d');
    
    ctxt.beginPath();
    ctxt.fillStyle = "#232325";
    ctxt.font = "20px Verdana";
    ctxt.textAlign = "center";
    ctxt.textBaseline = "middle";
    
    ctxt.fillText("Hello World!",100,100);
}

function test_mouse(){
    var JQcanvas = $('#test:first');
    var DOMcanvas = JQcanvas[0];
    var ctxt = DOMcanvas.getContext('2d');
    
    JQcanvas.on("mousemove",function(event){
        var mx = event.pageX;
        var my = event.pageY;
    })
}