////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//	HTE EDITOR UI LIBRARY
//	Allows for easier GUI Creation by abstracting some of the GUI fields.
//
//	Created By Melli Georgiou
//	© 2012 - 2015 Hell Tap Entertainment LTD
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//	INCLUDES:
//
//	GUI DESIGN / SPACER
//	Functions for spacing out boxes and layout.
//
//	GUI EDITOR FIELDS
//	LDC-Styled generic Editor fields
//
//	SPECIAL GUI EDITOR FUNCTIONS
//	Helps with special editor fields - Arrays, etc.
//
//	RESIZE ARRAY FUNCTIONS
//	Helps with resizing builtin Arrays of various types.
//
//	EDITOR WINDOWS
//	Helps to set an icon / title to editor windows.
//	
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

#pragma strict

import System.Collections.Generic;
import System.Reflection;

class HTE_EditorUILibrary extends Editor {	

static var addButton : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Shared/addButton.png") as Texture2D; 
static var removeButton : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Shared/removeButton.png") as Texture2D; 

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//	GUI DESIGN / SPACER FUNCTIONS
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// SEPLINE
	// Draws a seperator Line
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	static function SepLine(){
		// Draw Line
		GUILayout.Box("", GUILayout.ExpandWidth(true), GUILayout.Height(1));	

		// Add vertical space at the end of title.
		GUILayout.Label("", GUILayout.MaxHeight(5));
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	BIG Layout Functions
	//	Conveniantly begins and adds big boxes with spacing.
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	static function StartBigLayout(){
		EditorGUILayout.BeginVertical();
			EditorGUILayout.BeginHorizontal();
				GUILayout.Label("", GUILayout.MaxWidth(5)); // Extra space
				EditorGUILayout.BeginVertical();
	}

	static function EndBigLayout(){
				EditorGUILayout.EndVertical();
				GUILayout.Label("", GUILayout.MaxWidth(5)); // Extra space
			EditorGUILayout.EndHorizontal();
		EditorGUILayout.EndVertical();
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	White Box Functions
	//	Conveniantly begins and adds boxes with spacing.
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	static function StartWhiteBox(){
		EditorGUILayout.BeginHorizontal("Box");
			GUILayout.Label("", GUILayout.MaxWidth(5));
			EditorGUILayout.BeginVertical();
				GUILayout.Label("", GUILayout.MaxHeight(5));
	}

	static function EndWhiteBox(){			
				GUILayout.Label("", GUILayout.MaxHeight(5));
			EditorGUILayout.EndVertical();
			GUILayout.Label("", GUILayout.MaxWidth(5));	
		EditorGUILayout.EndHorizontal();

		// Add vertical space at the end of every box.
		GUILayout.Label("", GUILayout.MaxHeight(5));	
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	Start Indent
	//	Adds a horizontal Indent - supports default and custom sized indents
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	static function StartIndent(){
		StartIndent(16);
	}

	static function StartIndent( indent : int ){
		// Start Indent
		GUILayout.BeginHorizontal();
		GUILayout.Label("", GUILayout.MinWidth(indent), GUILayout.MaxWidth(indent) );
		GUILayout.BeginVertical();
	}

	static function EndIndent(){
		GUILayout.EndVertical();
		GUILayout.EndHorizontal();
	}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//	GUI EDITOR FUNCTIONS
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	HTE TEXT FIELD
	//	Conveniantly Creates Text Field Objects
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	static function HTETextField( icon : Texture2D, label : String, defaultString : String ) : String { 
	
		// Name / Title of object
		EditorGUILayout.BeginHorizontal();
			GUILayout.Label(icon, GUILayout.MaxWidth(20), GUILayout.MaxHeight(20) );
			GUILayout.Label(label, GUILayout.MinWidth(160), GUILayout.MaxWidth(160), GUILayout.MaxHeight(20));
			defaultString = EditorGUILayout.TextField ("", defaultString);
		EditorGUILayout.EndHorizontal();

		// Return the new defaultString.
		return defaultString;
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	HTE TEXT FIELD (MULTILINE)
	//	Conveniantly Creates Text Field Objects with multi-lines. Supports with or without a custom value
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	static function HTETextFieldMuliLine( icon : Texture2D, label : String, defaultString : String ) : String { 
		defaultString = HTETextFieldMuliLine( icon, label, defaultString, 60);
		return defaultString;
	}

	static function HTETextFieldMuliLine( icon : Texture2D, label : String, defaultString : String, height : int ) : String { 
	
		// Name / Title of object
		EditorGUILayout.BeginHorizontal();
			GUILayout.Label(icon, GUILayout.MaxWidth(20), GUILayout.MaxHeight(20) );
			GUILayout.Label(label, GUILayout.MinWidth(160), GUILayout.MaxWidth(160), GUILayout.MaxHeight(20));
			defaultString = EditorGUILayout.TextField("", defaultString, GUILayout.MinHeight(height) );
		EditorGUILayout.EndHorizontal();

		// Return the new defaultString.
		return defaultString;
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	HTE INT FIELD
	//	Conveniantly Creates Float Field Objects
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	static function HTEIntField( icon : Texture2D, label : String, defaultVal : int ) : int { 
	
		// Name / Title of object
		EditorGUILayout.BeginHorizontal();
			GUILayout.Label(icon, GUILayout.MaxWidth(20), GUILayout.MaxHeight(20) );
			GUILayout.Label(label, GUILayout.MinWidth(160), GUILayout.MaxWidth(160), GUILayout.MaxHeight(20));
			defaultVal = EditorGUILayout.IntField ("", defaultVal);
		EditorGUILayout.EndHorizontal();

		// Return the new defaultVal.
		return defaultVal;
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	HTE FLOAT FIELD
	//	Conveniantly Creates Float Field Objects
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	static function HTEFloatField( icon : Texture2D, label : String, defaultVal : float ) : float { 
	
		// Name / Title of object
		EditorGUILayout.BeginHorizontal();
			GUILayout.Label(icon, GUILayout.MaxWidth(20), GUILayout.MaxHeight(20) );
			GUILayout.Label(label, GUILayout.MinWidth(160), GUILayout.MaxWidth(160), GUILayout.MaxHeight(20));
			defaultVal = EditorGUILayout.FloatField ("", defaultVal);
		EditorGUILayout.EndHorizontal();

		// Return the new defaultVal.
		return defaultVal;
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	HTE TOGGLE FIELD
	//	Conveniantly Creates Boolean Field Objects
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	static function HTEToggleField( icon : Texture2D, label : String, defaultBool : boolean ) : boolean { 
	
		// Name / Title of object
		EditorGUILayout.BeginHorizontal();
			GUILayout.Label(icon, GUILayout.MaxWidth(20), GUILayout.MaxHeight(20) );
			GUILayout.Label(label, GUILayout.MinWidth(160), GUILayout.MaxWidth(160), GUILayout.MaxHeight(20));
			defaultBool = EditorGUILayout.Toggle ("", defaultBool);
		EditorGUILayout.EndHorizontal();

		// Return the new defaultString.
		return defaultBool;
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	HTE ENUM FIELD
	//	Conveniantly Creates Enum Popup Field Objects
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	static function HTEEnumField( icon : Texture2D, label : String, defaultEnum : System.Enum ) : System.Enum { 
	
		// Name / Title of object
		EditorGUILayout.BeginHorizontal();
			GUILayout.Label(icon, GUILayout.MaxWidth(20), GUILayout.MaxHeight(20) );
			if(label!=""){GUILayout.Label(label, GUILayout.MinWidth(160), GUILayout.MaxWidth(160), GUILayout.MaxHeight(20));}
			defaultEnum = EditorGUILayout.EnumPopup ("", defaultEnum);
		EditorGUILayout.EndHorizontal();

		// Return the new defaultString.
		return defaultEnum;
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	HTE FOLDOUT FIELD
	//	Conveniantly Creates Float Field Objects
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	static function HTEFoldOut( icon : Texture2D, label : String, defaultVal : boolean  ) : boolean { 

		// Horizontal Group
		EditorGUILayout.BeginHorizontal();
			GUILayout.Label(icon, GUILayout.MaxWidth(20), GUILayout.MaxHeight(20) );
			GUILayout.Label("", GUILayout.MinWidth(6), GUILayout.MaxWidth(6), GUILayout.MaxHeight(20) );
			defaultVal = EditorGUILayout.Foldout(defaultVal, " "+label);
		EditorGUILayout.EndHorizontal();

		// Return the new defaultVal.
		return defaultVal;	
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	HTE OBJECT FIELD
	//	Conveniantly Creates Object Fields
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// GameObject
	static function HTEObjectFieldGO( icon : Texture2D, label : String, defaultVal : GameObject, allowSceneObjects : boolean  ) : GameObject { 
	
		// Name / Title of object
		EditorGUILayout.BeginHorizontal();
			GUILayout.Label(icon, GUILayout.MaxWidth(20), GUILayout.MaxHeight(20) );
			GUILayout.Label(label, GUILayout.MinWidth(160), GUILayout.MaxWidth(160), GUILayout.MaxHeight(20));
			defaultVal = EditorGUILayout.ObjectField(defaultVal, GameObject, allowSceneObjects) as GameObject;
		EditorGUILayout.EndHorizontal();

		// Return the new defaultVal.
		return defaultVal;
	}
		
	// Texture2D
	static function HTEObjectField2D( icon : Texture2D, label : String, defaultVal : Texture2D, allowSceneObjects : boolean  ) : Texture2D { 
	
		// Name / Title of object
		EditorGUILayout.BeginHorizontal();
			GUILayout.Label(icon, GUILayout.MaxWidth(20), GUILayout.MaxHeight(20) );
			GUILayout.Label(label, GUILayout.MinWidth(160), GUILayout.MaxWidth(160), GUILayout.MaxHeight(20));
			defaultVal = EditorGUILayout.ObjectField(defaultVal, Texture2D, allowSceneObjects) as Texture2D;
		EditorGUILayout.EndHorizontal();

		// Return the new defaultVal.
		return defaultVal;
	}

	// GUISkin
	static function HTEObjectFieldGUISkin( icon : Texture2D, label : String, defaultVal : GUISkin, allowSceneObjects : boolean  ) : GUISkin { 
	
		// Name / Title of object
		EditorGUILayout.BeginHorizontal();
			GUILayout.Label(icon, GUILayout.MaxWidth(20), GUILayout.MaxHeight(20) );
			GUILayout.Label(label, GUILayout.MinWidth(160), GUILayout.MaxWidth(160), GUILayout.MaxHeight(20));
			defaultVal = EditorGUILayout.ObjectField(defaultVal, GUISkin, allowSceneObjects) as GUISkin;
		EditorGUILayout.EndHorizontal();

		// Return the new defaultVal.
		return defaultVal;
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	HTE ADD / REMOVE BUTTONS
	//	Conveniantly creates an Add and Remove Button pre-formatted with function callbacks
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// forward the function with the default arguments
	static function HTEAddRemoveButtons(	addCallback : Function,  removeCallback : Function ){
		HTEAddRemoveButtons( addCallback, removeCallback, true, true);
	}

	// Main Function
	static function HTEAddRemoveButtons( addCallback : Function, 
										removeCallback : Function, 
										showRemoveButton : boolean, 
										showAddButton : boolean
	){

		// Add Buttons
		EditorGUILayout.BeginHorizontal();
			
			// Space							
			GUILayout.FlexibleSpace();	
								
				// Remove Button						
				if( showRemoveButton && GUILayout.Button(removeButton, GUILayout.MaxWidth(32)) ) {		// Remove Button
					if(removeCallback!=null){ removeCallback(); }
				}
								
				// Add Button							
				if( showAddButton && GUILayout.Button(addButton, GUILayout.MaxWidth(32))) {			// Add Button
					if(addCallback!=null){ addCallback(); }
				}
				
				// Indent							
				GUILayout.Label("", GUILayout.MaxWidth(5));	
									
		EditorGUILayout.EndHorizontal();

		// Add space underneith
		EditorGUILayout.Space();EditorGUILayout.Space(); // End horizontal and space

	}


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//	*SPECIAL GUI EDITOR FUNCTIONS
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	SETUP STRING ARRAY GROUP
	//	Allows us to display a string of arrays.
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// Return Class For Function
	class SetupStringArrayGroupReturn{ 
		var stringArray : String[] = [""]; 
		var openCloseFlag : boolean = false; 
		function SetupStringArrayGroupReturn( stringArrayArg : String[], openCloseFlagArg : boolean ){
			stringArray = stringArrayArg;
			openCloseFlag = openCloseFlagArg;
		}
	}

	// Begininning Part Of Function that displays the String Array Group.
	static function SetupStringArrayGroup( stringArray : String[], openCloseFlag : boolean, icon : Texture2D, label : String ){

		// FIND AND ACTIVATE OBJECTS AT START
		GUILayout.BeginVertical ("box");
		
			// Make sure we can see this ..
			if ( stringArray != null ) {
				
				GUILayout.Label("", GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space
				GUILayout.BeginHorizontal();
					GUILayout.Label( icon, GUILayout.MinHeight(24), GUILayout.MaxHeight(24), GUILayout.MinWidth(24), GUILayout.MaxWidth(24));
					GUILayout.Label("", GUILayout.MinWidth(4), GUILayout.MaxWidth(4), GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space after icon
					
					GUILayout.BeginVertical();
						GUILayout.Label("", GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space
						openCloseFlag = EditorGUILayout.Foldout(openCloseFlag, "  " + label + " ("+ stringArray.length.ToString() +")");
					GUILayout.EndVertical();
				GUILayout.EndVertical();
		
			}
		
			// When we open this object
			if(openCloseFlag) {
				// Show the editor for Strings
				stringArray = PopulateStrings(stringArray, " "+label, icon);
			}

		// End Box	
		GUILayout.EndVertical();

		// Return the StringArray when we're done.
		return new SetupStringArrayGroupReturn(stringArray, openCloseFlag);

	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	POPULATE STRINGS
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	static function PopulateStrings( theTexts : String[], theLabel : String, theIcon : Texture2D ) {
		
		// Make sure we have strings setup first ..
		if ( theTexts != null && theTexts.length > 0 ) {
		
			var theStrings : String[] = theTexts;
			
			// Add Space
			EditorGUILayout.Space();
											
			// Setup Labels
			EditorGUILayout.BeginHorizontal();
												
				GUILayout.Label("", GUILayout.MaxWidth(5));
				GUILayout.Label("", GUILayout.MaxWidth(25));
				GUILayout.Label( theIcon, GUILayout.MinHeight(20), GUILayout.MaxHeight(20), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
				GUILayout.Label(theLabel, "BoldLabel", GUILayout.MinHeight(20) );
				GUILayout.Label("", GUILayout.MaxWidth(5));
												
			EditorGUILayout.EndHorizontal();
										
			// Populate Each Entry
			var theCount : int = 0;
			for ( var theText : String in theStrings ) {
				theCount = theCount + 1;
			
				EditorGUILayout.BeginHorizontal();
					GUILayout.Label("", GUILayout.MaxWidth(5));
					GUILayout.Label(theCount.ToString(), GUILayout.MaxWidth(25));
					theText = EditorGUILayout.TextField( theText );
					GUILayout.Label("", GUILayout.MaxWidth(5));
				EditorGUILayout.EndHorizontal();
			
			}
											
			// Add Space
			EditorGUILayout.Space();
											
			// Add Space
			EditorGUILayout.Space();
			
			// Add Buttons
			EditorGUILayout.BeginHorizontal();
											
				GUILayout.FlexibleSpace();	// Space
												
				if( GUILayout.Button(removeButton, GUILayout.MaxWidth(32)) ) {		// Remove Button
					theStrings = ResizeArray( theStrings, false );
				}
												
				if(GUILayout.Button(addButton, GUILayout.MaxWidth(32))) {			// Add Button
					theStrings = ResizeArray( theStrings, true );
				}
												
				GUILayout.Label("", GUILayout.MaxWidth(5));	// Indent
										
			EditorGUILayout.EndHorizontal();EditorGUILayout.Space();EditorGUILayout.Space(); // End horizontal and space
			
			// Return
			return theStrings;
											
		} else {
			
			// Add Buttons
			EditorGUILayout.BeginHorizontal();
											
				GUILayout.FlexibleSpace();	// Space
												
				if( GUILayout.Button(removeButton, GUILayout.MaxWidth(32)) ) {		// Remove Button
					theTexts = ResizeArray( theTexts, false );
				}
												
				if(GUILayout.Button(addButton, GUILayout.MaxWidth(32))) {			// Add Button
					theTexts = ResizeArray( theTexts, true );
				}
												
				GUILayout.Label("", GUILayout.MaxWidth(5));	// Indent
										
			EditorGUILayout.EndHorizontal();EditorGUILayout.Space();EditorGUILayout.Space(); // End horizontal and space
			
			// Return
			return theTexts;
			
		}
		
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	SETUP GAMEOBJECT ARRAY GROUP
	//	Allows us to display a string of arrays.
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// Return Class For Function
	class SetupGOArrayGroupReturn{ 
		var goArray : GameObject[] = new GameObject[0]; 
		var openCloseFlag : boolean = false; 
		function SetupGOArrayGroupReturn( goArrayArg : GameObject[], openCloseFlagArg : boolean ){
			goArray = goArrayArg;
			openCloseFlag = openCloseFlagArg;
		}
	}

	// Begininning Part Of Function that displays the String Array Group.
	static function SetupGOArrayGroup( goArray : GameObject[], openCloseFlag : boolean, icon : Texture2D, label : String ){

		// FIND AND ACTIVATE OBJECTS AT START
		GUILayout.BeginVertical ("box");

			// Fix dcArray if it is null
			if(goArray==null){
				goArray = new GameObject[0];
			}

			// Make sure we can see this ..
			if ( goArray != null ) {
				
				GUILayout.Label("", GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space
				GUILayout.BeginHorizontal();
					GUILayout.Label( icon, GUILayout.MinHeight(24), GUILayout.MaxHeight(24), GUILayout.MinWidth(24), GUILayout.MaxWidth(24));
					GUILayout.Label("", GUILayout.MinWidth(4), GUILayout.MaxWidth(4), GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space after icon
					
					GUILayout.BeginVertical();
						GUILayout.Label("", GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space
						openCloseFlag = EditorGUILayout.Foldout(openCloseFlag, "  " + label + " ("+ goArray.length.ToString() +")");
					GUILayout.EndVertical();
				GUILayout.EndVertical();
		
			} else {
				GUILayout.Label("goArray is null!"); // debug
			}
		
			// When we open this object
			if(openCloseFlag) {
				// Show the editor for Strings
				goArray = PopulateGameObjects(goArray, " "+label, icon);
			}

		// End Box	
		GUILayout.EndVertical();

		// Return the StringArray when we're done.
		return new SetupGOArrayGroupReturn(goArray, openCloseFlag);

	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	POPULATE GAME OBJECTS
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	static function PopulateGameObjects( theGameObjects : GameObject[], theLabel : String, theIcon : Texture2D ) {
		
		// Make sure we have strings setup first ..
		if ( theGameObjects != null && theGameObjects.length > 0 ) {
										
			// Add Space
			EditorGUILayout.Space();
											
			// Setup Labels
			EditorGUILayout.BeginHorizontal();
												
				GUILayout.Label("", GUILayout.MaxWidth(5));
				GUILayout.Label("", GUILayout.MaxWidth(25));
				GUILayout.Label( theIcon, GUILayout.MinHeight(20), GUILayout.MaxHeight(20), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
				GUILayout.Label(theLabel, "BoldLabel", GUILayout.MinHeight(20) );
				GUILayout.Label("", GUILayout.MaxWidth(5));
												
			EditorGUILayout.EndHorizontal();
										
			// Populate Each Entry
			var theCount : int = 0;
			for ( var theGameObject : GameObject in theGameObjects ) {
				theCount = theCount + 1;
			
				EditorGUILayout.BeginHorizontal();
					GUILayout.Label("", GUILayout.MaxWidth(5));
					GUILayout.Label(theCount.ToString(), GUILayout.MaxWidth(25));
				//	theString = EditorGUILayout.TextField( theString );
					theGameObject = EditorGUILayout.ObjectField(theGameObject, GameObject, true ) as GameObject;
					GUILayout.Label("", GUILayout.MaxWidth(5));
				EditorGUILayout.EndHorizontal();
			
			}
											
			// Add Space
			EditorGUILayout.Space();
											
			// Add Space
			EditorGUILayout.Space();
			
			// Add Buttons
			EditorGUILayout.BeginHorizontal();
											
				GUILayout.FlexibleSpace();	// Space
											
					if( GUILayout.Button(removeButton, GUILayout.MaxWidth(32)) ) {		// Remove Button
						theGameObjects = ResizeArray( theGameObjects, false );
					}
												
					if(GUILayout.Button(addButton, GUILayout.MaxWidth(32))) {			// Add Button
						theGameObjects = ResizeArray( theGameObjects, true );
					}
												
					GUILayout.Label("", GUILayout.MaxWidth(5));	// Indent
										
			EditorGUILayout.EndHorizontal();EditorGUILayout.Space();EditorGUILayout.Space(); // End horizontal and space
			
			// Return the GameObjects			
			return theGameObjects;		
										
		} else {
		
			// Add Buttons
			EditorGUILayout.BeginHorizontal();
											
				GUILayout.FlexibleSpace();	// Space
											
					if( GUILayout.Button(removeButton, GUILayout.MaxWidth(32)) ) {		// Remove Button
						theGameObjects = ResizeArray( theGameObjects, false );
					}
												
					if(GUILayout.Button(addButton, GUILayout.MaxWidth(32))) {			// Add Button
						theGameObjects = ResizeArray( theGameObjects, true );
					}
												
					GUILayout.Label("", GUILayout.MaxWidth(5));	// Indent
										
				EditorGUILayout.EndHorizontal();EditorGUILayout.Space();EditorGUILayout.Space(); // End horizontal and space
			
			// Return the GameObjects			
			return theGameObjects;		
			
		}
		
	}


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//	RESIZE ARRAYS
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	RESIZE ARRAY
	//	Resizes the Array
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	// STRINGS
	static function ResizeArray( theStrings : String[], increase : boolean ) {		// Using String Argument
		
		// If our values are correct
		if ( theStrings != null && increase != null ) {
													
			// Create a dynamic array to store the old static built-in one.
			var newarr = new Array (theStrings);
			
			// Add a slot or delete one depending on increase argument ..
			if ( increase ) {
				newarr.Push( "" );
			} else if ( theStrings.length > 0 ){
				newarr.Pop();
			}
			
			// Convert the array back to a built-in one..
			var newBuiltinArray : String[] = newarr.ToBuiltin(String) as String[];
			
			// Return it.
			return newBuiltinArray;
		}

		// if anything goes wrong ...
		return theStrings;
	}

	// DIALOG CONTROLLERS
	static function ResizeArray( TheDialogControllers : DialogController[], increase : boolean ) {		// Using DialogController Argument
		
		// If our values are correct
		if ( TheDialogControllers != null && increase != null ) {

			// Setup a new built-in array to store the new data.
			var newDC : DialogController[];
			var ready : boolean = false;

			// if we're increasing the count, add 1 more than the size of the old array.
			if(increase){
			 	newDC = new DialogController[ TheDialogControllers.length+1 ];
			 	ready = true;
			 // If we're decreasing the size and there's at least 1 slot to delete...	
			} else if( !increase && TheDialogControllers.length > 0 ){
				newDC = new DialogController[ TheDialogControllers.length-1 ];
				ready = true;
			}

			// If we're ready, lets build the new array
			if( ready ){

				// Loop through the new array and try to grab the info from the old one.
				for( var i : int =0; i<newDC.length; i++) {
					if( i < TheDialogControllers.length && TheDialogControllers[i] != null ){
						newDC[i] = TheDialogControllers[i];
					}
				}

				// Return it.
				//Debug.Log( (newDC)+ " newDC.length: "+newDC.length );
				return newDC;
			}
		}
		
		// If something went wrong, return the original value.
		return TheDialogControllers;
	}

	// GAMEOBJECTS
	static function ResizeArray( TheGameObjects : GameObject[], increase : boolean ) {		// Using GameObject Argument
		
		// If our values are correct
		if ( TheGameObjects != null && increase != null ) {

			// Setup a new built-in array to store the new data.
			var newDC : GameObject[];
			var ready : boolean = false;

			// if we're increasing the count, add 1 more than the size of the old array.
			if(increase){
			 	newDC = new GameObject[ TheGameObjects.length+1 ];
			 	ready = true;
			 // If we're decreasing the size and there's at least 1 slot to delete...	
			} else if( !increase && TheGameObjects.length > 0 ){
				newDC = new GameObject[ TheGameObjects.length-1 ];
				ready = true;
			}

			// If we're ready, lets build the new array
			if( ready ){

				// Loop through the new array and try to grab the info from the old one.
				for( var i : int =0; i<newDC.length; i++) {
					if( i < TheGameObjects.length && TheGameObjects[i] != null ){
						newDC[i] = TheGameObjects[i];
					}
				}

				// Return it.
				//Debug.Log( (newDC)+ " newDC.length: "+newDC.length );
				return newDC;
			}
		}
		
		// If something went wrong, return the original value.
		return TheGameObjects;
	}

// POST BRUTAL FUNCTIONS
#if UNITY_POSTBRUTAL

	// INTERACT LOGIC
	static function ResizeArray( TheLogics : InteractLogic[], increase : boolean ) {		// Using DialogController Argument
		
		// If our values are correct
		if ( TheLogics != null && increase != null ) {

			// Setup a new built-in array to store the new data.
			var newLogics : InteractLogic[];
			var ready : boolean = false;

			// if we're increasing the count, add 1 more than the size of the old array.
			if(increase){
			 	newLogics = new InteractLogic[ TheLogics.length+1 ];
			 	ready = true;

			 // If we're decreasing the size and there's at least 1 slot to delete...	
			} else if( !increase && TheLogics.length > 0 ){
				newLogics = new InteractLogic[ TheLogics.length-1 ];
				ready = true;
			}

			// If we're ready, lets build the new array
			if( ready ){

				// Loop through the new array and try to grab the info from the old one.
				for( var i : int =0; i<newLogics.length; i++) {
					if( i < TheLogics.length && TheLogics[i] != null ){
						newLogics[i] = TheLogics[i];
					}
				}

				// Return it.
				return newLogics;
			}
		}
		
		// If something went wrong, return the original value.
		return TheLogics;
	}

	// OBJECTIVE
	static function ResizeArray( TheObjectives  : OUI_Objective[], increase : boolean ) {		// Using DialogController Argument
		
		// If our values are correct
		if ( TheObjectives != null && increase != null ) {

			// Setup a new built-in array to store the new data.
			var newObjectives : OUI_Objective[];
			var ready : boolean = false;

			// if we're increasing the count, add 1 more than the size of the old array.
			if(increase){
			 	newObjectives = new OUI_Objective[ TheObjectives.length+1 ];
			 	ready = true;

			 // If we're decreasing the size and there's at least 1 slot to delete...	
			} else if( !increase && TheObjectives.length > 0 ){
				newObjectives = new OUI_Objective[ TheObjectives.length-1 ];
				ready = true;
			}

			// If we're ready, lets build the new array
			if( ready ){

				// Loop through the new array and try to grab the info from the old one.
				for( var i : int =0; i<newObjectives.length; i++) {
					if( i < TheObjectives.length && TheObjectives[i] != null ){
						newObjectives[i] = TheObjectives[i];
					}
				}

				// Return it.
				return newObjectives;
			}
		}
		
		// If something went wrong, return the original value.
		return TheObjectives;
	}
#endif

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//	EDITOR WINDOWS
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	SET WINDOW TITLE
	//	Allows us to set the icon and title text on an Editor Window
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	// static dictionary to help with the functions below
	static var _winTitleContentByEditor : Dictionary.<EditorWindow, GUIContent>;

	// Sets the icon of an editor window, without changing the title.
    static function SetWindowTitle(editor : EditorWindow , icon : Texture ){ 
    	SetWindowTitle(editor, icon, null); 
    }

    // Sets the icon and title of an editor window.
    static function SetWindowTitle( editor : EditorWindow, icon : Texture, title : String ){

    	// Setup a placeholder for titleContent
        var titleContent : GUIContent;


        if (_winTitleContentByEditor == null){ _winTitleContentByEditor = new Dictionary.<EditorWindow, GUIContent>(); }
        if (_winTitleContentByEditor.ContainsKey(editor) ){
            titleContent = _winTitleContentByEditor[editor];
            if (titleContent != null) {
                if (titleContent.image != icon) titleContent.image = icon;
                if (title != null && titleContent.text != title) titleContent.text = title;
                return;
            }
            _winTitleContentByEditor.Remove(editor);
        }
        
        titleContent = GetWinTitleContent(editor);

        if (titleContent != null) {
            if (titleContent.image != icon){ titleContent.image = icon; }
            if (title != null && titleContent.text != title){ titleContent.text = title; }
            _winTitleContentByEditor.Add(editor, titleContent);
        }
    }

    // Get the Editor Window's Title Content
    static function GetWinTitleContent(editor : EditorWindow) : GUIContent{

        var bFlags : BindingFlags = BindingFlags.Instance | BindingFlags.NonPublic;
        var p : PropertyInfo  = typeof(EditorWindow).GetProperty("cachedTitleContent", bFlags);
        if (p == null) return null;
        return p.GetValue(editor, null) as GUIContent;
    }


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//	FILEPATH HELPERS
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	CAN BE STREAMED FROM RESOURCES
	//	Checks a filepath to see if it can be streamed from "Resources/", and then returns the fixed file path.
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	static function CanBeStreamedFromResources( path : String, prefix : String ) : String {

		// Setup Variables
		var resourcesFolderFound : boolean = false;		// If we find a reference to the Resources folder, mark this as true!
		prefix = "Resources/"+prefix;					// Setup the audio prefix we're looking for

		// If we've found the substring
		if( path.IndexOf(prefix) != -1 ){				// -1 means it wasn't found!
			var indexToRemove : int = path.LastIndexOf(prefix) + prefix.length;						// Cache the id to remove (and we add the prefix length).
			var newPath : String = path.Substring(indexToRemove, path.length - (indexToRemove+4) ); // we add the 4 to remove the extension ".xxx"
			Debug.Log(newPath);
			return newPath;

		} else {
			Debug.Log("LDC: Cannot stream this AudioClip using the current Audio prefix: "+ prefix);
			EditorUtility.DisplayDialog(
				"Cannot Stream This AudioClip",
				"LDC Cannot stream this from the Resources folder because your AudioClip is not in the correct location. Your current Audio prefix is: \n\n"+ prefix + "\n\n"+"You can modify the prefix in the DialogUI component using Options > Audio Filepath Prefix.\n\nAlternatively you can reference complete AudioClips using the Audio section in the Actions tab, although this isn't as memory efficient as streaming them on demand!",
				"OK"
			);
		}

		// Return a blank string if something went wrong
		return "";
	}



}