////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// 	DialogButtons.js
//
//	Sets up a library of Buttons to be easily selected in the editor
//
//	Created By Melli Georgiou
//	© 2012 - 2014 Hell Tap Entertainment LTD
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

#pragma downcast

var theCast : DialogCastGroup[];		// This class is from the DialogCast
static var com : DialogButtons;			// Make this component available

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	AWAKE
//	Make DialogButtons statically available
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Awake(){
	com = this;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	GET DIALOG BUTTONS ANIMATION
//	Returns a Dialog Button animation
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

static function GetAnimation( groupID : int, actorID : int ){
	
	// print("DialogButtons GetAnimation - GroupID: "+ groupID + " ActorID: "+ actorID);
	
	// Make sure the requested animation exists...
	if( 	DialogButtons.com != null && 
			DialogButtons.com.theCast[groupID] != null && 
			DialogButtons.com.theCast[groupID].actors[actorID] != null && 
			DialogButtons.com.theCast[groupID].actors[actorID].animated 
	){
		// Return animation as DialogCastActor
		return DialogButtons.com.theCast[groupID].actors[actorID];
	}
	
	// Otherwise, return null if there was a problem
	return null;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	GET DIALOG CAST ANIMATION (EDITOR)
//	Returns a dialog cast animation for the editor
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

static function EditorGetAnimation( groupID : int, actorID : int ){
	
	// check if we have DialogCast objects in the scene
	var DCs : DialogButtons[] = FindObjectsOfType (DialogButtons);
	
	// If a DialogCast object was found and the first element is valid..
	if( DCs.length > 0 && DCs[0] != null){
	
		// Make sure the requested animation exists...
		if( 	DCs[0].theCast != null &&
				groupID < DCs[0].theCast.length &&
				DCs[0].theCast[groupID] != null && 
				actorID < DCs[0].theCast[groupID].actors.length &&
				DCs[0].theCast[groupID].actors[actorID] != null && 
				DCs[0].theCast[groupID].actors[actorID].animated
		){
			// Return animation as DialogCastActor
			return DCs[0].theCast[groupID].actors[actorID];
		}
	
	}
	
	// Otherwise, return null if there was a problem
	return null;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	GET DIALOG CAST GROUPS
//	Returns the DialogCastGroup[] array so we can build a selection interface in the DialogScreen editor.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

static function GetDialogCastGroups(){

	// check if we have DialogCast objects in the scene
	var DCs : DialogButtons[] = FindObjectsOfType (DialogButtons);
	
	// If a DialogCast object was found and the first element is valid..
	if( DCs.length > 0 && DCs[0] != null){
		
		// Return theCast as a DialogCastGroup[]
		return DCs[0].theCast;
		
	}
	
	// Return null if there was a problem
	return null;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	GET POPUP
//	Returns an GUIContent[] array to be used in a Popup
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

static function GetPopup(){

	// check if we have DialogButtons objects in the scene
	var DCs : DialogButtons[] = FindObjectsOfType (DialogButtons);
	
	// If a DialogButtons object was found and the first element is valid..
	if( DCs.length > 0 && DCs[0] != null){
		
		// Get the first DialogCastGroup[] in the array (most likely, there'll only be one component anyway!)
		var dc : DialogCastGroup[] = DCs[0].theCast;
		
		// Create a new array to hold the GUIContent
		var array : Array = new Array();
		array.Clear();	// make sure the array is clean
		
		// Loop through the Dialog Casts
		for( var dcast : DialogCastGroup in dc){
			
			// Create the main Cast Group Header
			var castGroup : GUIContent = new GUIContent();
			castGroup.image = null;	// Dialog Groups wont have images!
			castGroup.text = dcast.name;
			castGroup.tooltip = "";
			
			// Add Cast Group Header to the array
			//array.Add(castGroup);
			
			// Do a loop to add its images here!
			for( var actor : DialogCastActor in dcast.actors ){
				
				// Make sure this actor has a valid icon before adding it to the array
				if( actor.icon != null ){
					
					// Create Actor entries
					var castActor : GUIContent = new GUIContent();
					castActor.image = actor.icon;
					castActor.text = dcast.name + " - " + actor.name;
					castActor.tooltip = "";
					
					// Add Actor to the array
					array.Add(castActor);
				
				}
			}
		}
		
		// Convert the array into a static list and return it
		var builtinArray : GUIContent[] = array.ToBuiltin(GUIContent);
		return builtinArray;
		
	}
	
	// Return null if there was a problem
	return null;
}

