///////////////////////////////////////////////////////////////////////////////////////////////
//
//	DialogController.js
//
//	Controls a flow of dialogs for the DialogUI system
//
//	Created By Melli Georgiou
//	© 2012 - 2015 Hell Tap Entertainment LTD
//
///////////////////////////////////////////////////////////////////////////////////////////////

#pragma downcast

var startAfterXSeconds : float = 1;
var status : DCSTATUS = DCSTATUS.ENDED;
	enum DCSTATUS{START,SHOWING,NEXT,TAKINGOVER,ENDED};
var startID : int = 1;
var currentID : int = 0;
var currentScreen : DialogScreen = null;
var autoPlay : boolean = false;
var nextID : int;								// This is the DialogID to load next ( along with status being set to NEXT )
var googleSpreadsheetFilename : String = "";	// If this was created with a Google Spreadsheet, we save the filename for future reference.


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	START
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Start () {
	
	// This allows this function to be used at Start()
	yield;
	
	// Make sure we are tagged as a DialogController
	gameObject.tag = "DialogController";
	
	// Make sure our status is "Ended" at start
	status = DCSTATUS.ENDED;

	// Play this dialog automatically ( good for plot / story dialogs )
	if ( autoPlay ){
		// Set the Dialog Controller Ready To Start in X secs
		Invoke("Play", startAfterXSeconds);
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	PLAY
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Play(){
	
	// Set Ready To Start flag
	status = DCSTATUS.START;
	
	// Stop other dialogs
	StopOtherDialogs();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	FIND DIALOG
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Had to be done this way to avoid a problem with the yield routine!
function FindDialog( theID : int ) {
		
	//print("Finding Dialog ..( ID: " + theID.ToString() + " )");
	currentID = 0;
	currentScreen = null;
	
	// Find the correct Component
	var theComponents = gameObject.GetComponents (DialogScreen);
	
	// Setup the loop
	for (var theComponent : DialogScreen in theComponents ) {
    
    	// if the ID is the start ID
    	if ( theComponent.dialogID == theID ) {
    		
    		//print ("Found ID!");
    		currentScreen = theComponent;
    		currentScreen.isActive = true;
    		currentID = theID;
    		currentScreen.Setup();
    	}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	STOP OTHER DIALOGS
//	This function finds all dialog controller and tells them, and their children screens to stop.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function StopOtherDialogs() {

	// Only allow one Dialog Controller to run at a time.
	var searchForDialogs : GameObject[] = GameObject.FindGameObjectsWithTag("DialogController");

	// Loop through the Dialog Controllers
	for ( var theDCObject : GameObject in searchForDialogs ) {
	
		// Make sure its not an empty reference - safety step!
		if ( theDCObject != null ) {
			
			// Make sure the object is not THIS one and it has a dialog controller attached!
			if ( theDCObject != gameObject && theDCObject.GetComponent(DialogController) != null ) {
				
				// Get the DialogController			
				var theDC : DialogController = theDCObject.GetComponent(DialogController);
				
				// Send message.
				//print( gameObject.name + ": telling another DialogController to stop -> object to stop is called "+ theDC.gameObject.name );
				
				// Tell it to end - as long as it's safe!
				if ( theDC != null && theDC != this && theDC.status != DCSTATUS.ENDED ) {
					
					// Tell the other Dialog Controller to stop
					theDC.status = DCSTATUS.ENDED;
					theDC.currentScreen = null;
					theDC.currentID = 0;
					
					// Loop through the screens and make sure they have also stopped.
					var theComponents = theDC.gameObject.GetComponents (DialogScreen);
					for (var ds : DialogScreen in theComponents ) {
				    	if ( ds != null ) {
				    		ds.isActive = false;
				    	}
					}
					
					// Now we need to update the Dialog UI to reset the screen
					if(DialogUI!=null && DialogUI.dui!=null ){
						DialogUI.dui.StopScreenNow();
						status = DCSTATUS.START;
					}
					
					// If the dialog controller is an auto-play dialog, we should automatically destroy it.
					// We'll keep it if it's not as it may be used as a complex triggerable dialog system.
					if( theDC.autoPlay ){
						Debug.Log( "Destroying DialogController of name: "+ theDC.gameObject);
						Destroy(theDC.gameObject);	
					}
				} 
			}
		}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	FIXED UPDATE
//	Fixed Update runs less than update so this is an optimization!
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function FixedUpdate () {

	// Is this DialogController being injected? (This happens if the user selects to switch into a different thread in a navigation screen)
	if( !DialogUI.ended && DialogUI.status == DUISTATUS.WAITFORSCREEN && DialogUI.changeThreadDC == this ){

		// Make sure the old DialogController was cleaned up properly ...
		Debug.Log("Stopping Current DialogController and cleaning up ...");
		if( DialogUI.screen != null && DialogUI.screen.gameObject.GetComponent(DialogController) != null &&
			DialogUI.screen.gameObject.GetComponent(DialogController) != this
		){
			// Cache the old DC and end it.
			var oldDC : DialogController = DialogUI.screen.gameObject.GetComponent(DialogController);
			if(oldDC!=null){
				oldDC.status = DCSTATUS.ENDED;
				oldDC.currentScreen = null;
				oldDC.currentID = 0;
				Debug.Log("Old DialogController Cleaned Up Successfully.");
			}
		}
					
		// Setup this dialog
		Debug.Log("Injecting New Thread Into DialogUI ...");
		status = DCSTATUS.SHOWING;

		// Play the StartID or the override ID if it was setup
		if( DialogUI.changeThreadOverrideID <= 0){
			FindDialog( startID );
		} else {
			FindDialog( DialogUI.changeThreadOverrideID );
		}

		// Remove the overrides from DialogUI
		DialogUI.changeThreadDC = null;
		DialogUI.changeThreadOverrideID = 0;

	}

	// Let's get started!
	else if( DialogUI.ended && status == DCSTATUS.START && currentScreen == null && !DialogUI.dui.forceClose){
		status = DCSTATUS.SHOWING;
		FindDialog( startID );
	}
	
	// Make sure the DialogUI.status is ready for the next screen .. 
	else if ( status == DCSTATUS.NEXT && (DialogUI.status == DUISTATUS.ENDED || DialogUI.status == DUISTATUS.WAITFORSCREEN && !DialogUI.dui.forceClose) ) { 
		status = DCSTATUS.SHOWING;
		FindDialog( nextID );	
	}
	
}


