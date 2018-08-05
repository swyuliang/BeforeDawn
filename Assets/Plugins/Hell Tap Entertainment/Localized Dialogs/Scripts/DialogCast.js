////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// 	DialogCast.js
//
//	Sets up a cast of portraits / icons to be easily selected in the editor
//
//	Created By Melli Georgiou
//	© 2012 - 2014 Hell Tap Entertainment LTD
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

#pragma downcast

var theCast : DialogCastGroup[];				// The Library
static var com : DialogCast;					// Make this component available

class DialogCastGroup{
	var name : String = "New Group";			// Name of Cast / Group
	@System.NonSerialized
	var open : boolean = false;					// Is this Cast group open in the editor	
	var actors : DialogCastActor[];				// Actors of this cast
}

class DialogCastActor{
	
	// Name and Base Icon
	var name : String = "None";					// Name of this Actor
	var icon : Texture2D = null;				// The actual Texture2D to represent this icon / actor
	
	// Animation Stuff
	var animated : boolean = false;				// Is this Actor animated?
	var frames : Texture2D[] = [];				// Frames of animation.
	var loopToFrame : int = 0;					// Which frame of animation to loop back to.
	var animationSpeed : float = 0.2;			// How fast to flip to the next frame.
	
	// Real time animation values
	var timer : float = 0;						// count up to the animation speed before adding a frame
	var currentFrame : int = 0;					// Current frame.
	
	// Editor Animations
	var editorTimer : float = 0;				// Editor version - count up to the animation speed before adding a frame
	var editorCurrentFrame : int = 0;			// Editor version - Current frame.

	// Dialog Buttons
	// ... We'll add more metadata here later!
	
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	AWAKE
//	Make DialogCast statically available
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Awake(){
	com = this;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	GET DIALOG CAST ANIMATION
//	Returns a dialog cast animation
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

static function GetAnimation( groupID : int, actorID : int ){
	
	// print("DialogCast GetAnimation - GroupID: "+ groupID + " ActorID: "+ actorID);
	
	// Make sure the requested animation exists...
	if( 	DialogCast.com != null && 
			DialogCast.com.theCast != null &&
			DialogCast.com.theCast.length > groupID &&
			DialogCast.com.theCast[groupID] != null && 
			DialogCast.com.theCast[groupID].actors != null &&
			DialogCast.com.theCast[groupID].actors[actorID] != null && 
			DialogCast.com.theCast[groupID].actors[actorID].animated 
	){
		// Return animation as DialogCastActor
		return DialogCast.com.theCast[groupID].actors[actorID];
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
	var DCs : DialogCast[] = FindObjectsOfType (DialogCast);
	
	// If a DialogCast object was found and the first element is valid..
	if( DCs != null && DCs.length > 0 && DCs[0] != null){
	
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
	var DCs : DialogCast[] = FindObjectsOfType (DialogCast);
	
	// If a DialogCast object was found and the first element is valid..
	if( DCs.length > 0 && DCs[0] != null){
		
		// Return theCast as a DialogCastGroup[]
		return DCs[0].theCast;
		
	}
	
	// Return null if there was a problem
	return null;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	GET DIALOG CAST MEMBER BY NAME
//	Returns the Vector2 location code of an actor of the cast
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

static function GetDialogCastIDByName( nameToFind : String ) : Vector2 {

	// check if we have DialogCast objects in the scene
	var DCs : DialogCast[] = FindObjectsOfType (DialogCast);
	
	// If a DialogCast object was found and the first element is valid..
	if( nameToFind != "" && DCs.length > 0 && DCs[0] != null && DCs[0].theCast!=null ){
		
		// Setup X part of Vector2
		var x : int = 0;
		for(var dcg : DialogCastGroup in DCs[0].theCast ){

			// Setup Y part of Vector2
			var y : int = 0;
			if(dcg.actors.length > 0){
				for( var a : DialogCastActor in dcg.actors ){
					
					// If this actor's name matches, return it
					if(a.name == nameToFind ){
						return Vector2(x, y);
					}

					// Increment Y
					y++;
				}
			}
			// increment X
			x++;
		}
	}
	
	// Return null if there was a problem
	return Vector2(-1,-1);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	GET POPUP
//	Returns an GUIContent[] array to be used in a Popup
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

static function GetPopup(){

	// check if we have DialogCast objects in the scene
	var DCs : DialogCast[] = FindObjectsOfType (DialogCast);
	
	// If a DialogCast object was found and the first element is valid..
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

