var eyeX;
var eyeY;

ws = new WebSocket("ws://localhost:8887");
        ws.onopen = function() {
            log("[WebSocket#onopen]\n");
        }
		
        ws.onmessage = function(e) {
			//if(e.data.indexOf( "attention_" ) == 0 ) value = e.data.substring(10);
			//valueInt = parseInt(value);
			data = JSON.parse(e.data);
            
			
			if ( data && data.gaze ) {
				var p = document.getElementById("point");
				p.style.left = data.gaze.x+ "px";
				p.style.top = data.gaze.y + "px";

				eyeX = data.gaze.x;
				eyeY = data.gaze.y;
			}
        }
        ws.onclose = function() {

        }


function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {

  ellipse(eyeX,eyeY,10,10);
}