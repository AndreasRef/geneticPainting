/**
 * Eye Tribe for Processing library
 * EyeTribe2WebSocket example: Sends gaze data to web apps via websockets.
 * August 2015
 * http://jorgecardoso.eu
 **/

import org.jorgecardoso.processing.eyetribe.*;
import com.theeyetribe.client.data.*;

EyeTribe eyeTribe;


ChatServer cs;

void setup() {
  //fullScreen();
  size(200, 200);


  try {
   
    int port = 8887; 
    cs = new ChatServer( port );
    cs.start();
    System.out.println( "ChatServer started on port: " + cs.getPort() );
  } 
  catch ( Exception ex ) {
    println(ex.getMessage());
  }


  eyeTribe = new EyeTribe(this);
}

void draw() {
}


void onGazeUpdate(PVector gaze, PVector leftEye_, PVector rightEye_, GazeData data) {

  if ( gaze != null ) {
    cs.sendToAll("{\"gaze\": {\"x\":" + gaze.x + ", \"y\":" + gaze.y +"}}");
    
  }

}

void trackerStateChanged(String state) {
  println("Tracker state: " + state);
}