////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// 	DialogsCastEditor.js
//
//	Editor for DialogCast.js
//
//	Created By Melli Georgiou
//	© 2012 - 2014 Hell Tap Entertainment LTD
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@CustomEditor (DialogCast)
class DialogCastEditor extends Editor {	
	
	// Buttons
	var addButton : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/addButton.png") as Texture2D;
	var removeButton : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/removeButton.png") as Texture2D;
	
	// Labels
	var castLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/groupIcon.png") as Texture2D;
	var nameLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/nameLabel.png") as Texture2D;
	
	
	// EDITOR ANIMATION TIME
	var EditorTime : LDCEditorTimeDC = new LDCEditorTimeDC();
	class LDCEditorTimeDC{
		var timeSinceStartup : float;				// Value to compare real time.
		var deltatime : float;						// Editor version of deltaTime
	}
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	EDITOR UPDATE
	//	We setup the Editor to be a delegate of EditorUpdate so we can create a Time-class. This is used to animate
	//	graphics inside of the editor.
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	#if UNITY_EDITOR
		
		// ================================================
		//	ON ENABLE
		//	Setup delegate
		// ================================================
		
		function OnEnable() {
			
		    // Make sure we've selected a valid object and the Application isn't playing.
		    if( target != null && !EditorApplication.isPlaying ) {
		    	
		    	// Reset Editor time values
				EditorTime.timeSinceStartup = 0;
				EditorTime.deltatime = 0;
				
				// Setup the EditorUpdate function as a delegate of EditorApplication.update.
				//EditorApplication.update += EditorUpdate;
				var cb:EditorApplication.CallbackFunction = EditorUpdate;//function Update
 				EditorApplication.update = System.Delegate.Combine(cb, EditorApplication.update);
		    }
		}
		
		// ================================================
		// 	ON DISABLE
		//	Remove delegate
		// ================================================
		
		function OnDisable() {
	
			// When we've unselected or destroyed this object, stop being a delegate.
		    EditorApplication.update = null;
			
			// Reset Editor Animations
			EditorAnimationReset();
			
		}
		
		// ================================================
		//	EDITOR UPDATE
		//	Calculate deltaTime values for animations
		// ================================================
		
		function EditorUpdate(){
			
			// Make sure we have the correct references
			if( EditorTime!= null && EditorTime.timeSinceStartup < EditorApplication.timeSinceStartup){
				
				// Update delta Time
				EditorTime.deltatime = EditorApplication.timeSinceStartup - EditorTime.timeSinceStartup;
				
				// Update timeSinceStartup on our end.
				EditorTime.timeSinceStartup = EditorApplication.timeSinceStartup;
				
				//Debug.Log( "DialogCastEditor: "+ EditorTime.deltatime );
				EditorAnimationUpdate();
			}
		}
	
		// ================================================
		//	EDITOR ANIMATION UPDATE
		//	Update values for animations
		// ================================================		
	
		function EditorAnimationUpdate(){
			
			// Make sure we've selected a valid object and the Application isn't playing.
		    if( target != null && !EditorApplication.isPlaying ) {
		    	
		    	// Cache the DialogCast and make sure some casts have been setup!
		    	var dc : DialogCast = target as DialogCast;
				if( dc!=null && dc.theCast != null && dc.theCast.length > 0){
					
					// Loop through the cast
					for( var c : DialogCastGroup in dc.theCast ){
						
						// Check the cast
						if( c != null && c.actors != null && c.actors.length > 0 ){
							
							// Loop through each actor in the cast
							for( var actor : DialogCastActor in c.actors ){
								
								// If the actor is valid, has an animated flag and has some frames setup, lets roll!
								if( actor!=null && actor.animated && actor.frames.length > 0){
									
									// ====================
									//	UPDATE ANIMATION
									// ====================
									
									// Add time to the timer
									actor.editorTimer+= EditorTime.deltatime;
									
									// if timer has reached the animation speed, move to the next frame
									if( actor.editorTimer >= actor.animationSpeed ){
										actor.editorCurrentFrame++;
										actor.editorTimer = 0;
									}
									
									// If current frame is larger than the array, loop back to the appropriate frame
									if(actor.editorCurrentFrame > actor.frames.length-1 ){
										actor.editorCurrentFrame = Mathf.Clamp( actor.loopToFrame, 0, actor.frames.length-1 );
									}
									
								}
							}
						}
					}
				}
		    }
		}
		
		// ================================================
		//	EDITOR ANIMATION RESET
		//	Reset values for animations
		// ================================================		
	
		function EditorAnimationReset(){
			
			// Make sure we've selected a valid object and the Application isn't playing.
		    if( target != null && !EditorApplication.isPlaying ) {
		    	
		    	// Cache the DialogCast and make sure some casts have been setup!
		    	var dc : DialogCast = target as DialogCast;
				if( dc!=null && dc.theCast != null && dc.theCast.length > 0){
					
					// Loop through the cast
					for( var c : DialogCastGroup in dc.theCast ){
						
						// Check the cast
						if( c != null && c.actors.length > 0 ){
							
							// Loop through each actor in the cast
							for( var actor : DialogCastActor in c.actors ){
								
								// If the actor is valid, has an animated flag and has some frames setup, lets roll!
								if( actor!=null && actor.animated && actor.frames.length > 0){
									
									// ====================
									//	RESET ANIMATION
									// ====================
									
									actor.editorCurrentFrame = 0;
									actor.editorTimer = 0;
									
								}
							}
						}
					}
				}
		    }
		}
		
	#endif
	
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	DO DIALOG CAST ANIMATION
	//	Returns the correct frame of animation from a DialogCastActor animation - as a Texture2D
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function DoDialogCastAnimation( anim : DialogCastActor, backupTex : Texture2D ){
	
		// Make sure we've sent an DialogCastActor (Animation) and its set to animate
		if( anim!=null && anim.animated && anim.editorCurrentFrame < anim.frames.length && anim.frames[anim.editorCurrentFrame]!=null ){
			
			// Return the correct animation frame
			return(anim.frames[anim.editorCurrentFrame]);
		}
		
		// If something is wrong, return the backup tex
		return backupTex;
	}
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// SEPLINE
	// Draws a seperator Line
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function SepLine(){
		GUILayout.Box("", GUILayout.ExpandWidth(true), GUILayout.Height(1));	
	}
	
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	ON INSPECTOR GUI
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function OnInspectorGUI() {

		// If we have a selected gameObject.
        if( Selection.activeGameObject && target != null && target.GetComponent(DialogCast) ) {
				
			// Vertical Space
			GUILayout.Label("", GUILayout.MaxHeight(5));
			
			// Title	
			EditorGUILayout.BeginHorizontal();
				GUILayout.Label("", GUILayout.MaxWidth(5));
				GUILayout.Label(nameLabel, GUILayout.MaxWidth(32) );
				EditorGUILayout.BeginVertical();
					GUILayout.Label("Dialog Cast", "BoldLabel", GUILayout.MinWidth(190), GUILayout.MaxWidth(190));
					if(!Application.isPlaying){
						GUILayout.Label("LDC Graphics Library which can be used in your dialogs as Portraits and Actor Layers.", GUILayout.MinWidth(600), GUILayout.MaxWidth(600));
					} else {
						GUILayout.Label("The Cast cannot be modified while the application is running!", GUILayout.MinWidth(600), GUILayout.MaxWidth(600));	
					}
				EditorGUILayout.EndVertical();
				GUILayout.FlexibleSpace();
			EditorGUILayout.EndHorizontal();
			
			// Make sure the Application isn't playing
			if( Application.isPlaying){
				
				// Vertical Space
				GUILayout.Label("",  GUILayout.MinHeight(10), GUILayout.MaxHeight(10));
			
			// Make sure the Application isn't playing
			} else if(!Application.isPlaying){
			
				// Vertical Space
				GUILayout.Label("", GUILayout.MaxHeight(5));
				
				// Main Horizontal space
				EditorGUILayout.BeginHorizontal();
				GUILayout.Label("", GUILayout.MaxWidth(5));
				
					// Main UI Box
					//EditorGUILayout.BeginVertical("Box");
					EditorGUILayout.BeginVertical();
					EditorGUILayout.BeginHorizontal();
					GUILayout.Label("", GUILayout.MaxWidth(5)); // Extra space
					EditorGUILayout.BeginVertical();
					
						// Add Space
						EditorGUILayout.Space();
									
						// Loop through each of the Actor groups
						if( target.theCast != null && target.theCast.length > 0 ){
							var groupID : int = 0;	// Keep track of the current Group
							for( var castGroup : DialogCastGroup in target.theCast ){
								if( castGroup != null ){
								
									
									
									// Create a horizontal space for the group, as well as the delete button
									EditorGUILayout.BeginHorizontal();
									
										// Draw the box that represents this group
										EditorGUILayout.BeginVertical("Box");
										
											// Foldout Group
											EditorGUILayout.BeginHorizontal();
												#if !UNITY_3_5
													GUILayout.Label("", GUILayout.MaxWidth(8));	// Indent
												#endif
												castGroup.open = EditorGUILayout.Foldout(castGroup.open, " "+castGroup.name);
											EditorGUILayout.EndHorizontal();

											// Let's see if this Cast Group is open
											if(castGroup.open){
												DrawActorGroup(castGroup);	
											}
										
										// End of Actor Group box Box							
										EditorGUILayout.EndVertical();	
																	
										// REMOVE CAST GROUP							
										GUILayout.Label("", GUILayout.MaxWidth(5));	// Indent
										if( GUILayout.Button(removeButton, GUILayout.MaxWidth(32)) ) {		// Remove Button
										//	Debug.Log("Remove Group: "+groupID);
											DeleteCastGroup(groupID);
										}
										
										// Increment GroupID
										groupID++;
									
									// End of horizontal group space	
									EditorGUILayout.EndHorizontal();
									
									// Add Space
									EditorGUILayout.Space();
								
									//GUILayout.Label("", GUILayout.MaxHeight(5));
									//EditorGUILayout.EndHorizontal();
								}
							}
						}
						
						// Add new Actor Group
						if(!Application.isPlaying){
							EditorGUILayout.BeginHorizontal();
							GUILayout.FlexibleSpace();	// Space
							if(GUILayout.Button(addButton, GUILayout.MaxWidth(32))) {			// Add Button
								AddNewCastGroup();
							}
							EditorGUILayout.EndHorizontal();
						}
						
						// Add Space
						EditorGUILayout.Space();
					
					
					EditorGUILayout.EndVertical();
					GUILayout.Label("", GUILayout.MaxWidth(5)); // extra space
					EditorGUILayout.EndHorizontal();
					EditorGUILayout.EndVertical();
				
				// End Main Space	
				GUILayout.Label("", GUILayout.MaxWidth(5));
				EditorGUILayout.EndHorizontal();
				
				// Vertical Space
				GUILayout.Label("", GUILayout.MaxHeight(5));
			
			}
        }
	}
	
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	DRAW ACTOR GROUP
	//	Used to draw the rest of the group
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function DrawActorGroup( dca : DialogCastGroup ){
		
		// Add Space
		EditorGUILayout.Space();
							
		// Draw name of group
		EditorGUILayout.BeginHorizontal();
			GUILayout.Label("", GUILayout.MaxWidth(5));	// indent
			GUILayout.Label(castLabel, GUILayout.MaxWidth(24),GUILayout.MaxHeight(24));
			GUILayout.Label("Group Name:", GUILayout.MaxWidth(120),GUILayout.MaxHeight(48));
			dca.name = EditorGUILayout.TextField("", dca.name );
			GUILayout.Label("", GUILayout.MaxWidth(5)); // indent
		EditorGUILayout.EndHorizontal();
		
		// Add Actors Label
		EditorGUILayout.BeginHorizontal();
			GUILayout.Label("", GUILayout.MaxWidth(5));	// indent
			GUILayout.Label( "The Actors", "BoldLabel");
			GUILayout.Label("", GUILayout.MaxWidth(5));	// indent
		EditorGUILayout.EndHorizontal();
		
		// Add Space
		EditorGUILayout.Space();
		EditorGUILayout.Space();
		
		// Loop through the images
		if(dca.actors != null && dca.actors.length > 0){
			var actorID : int = 0;	// Keep track of the current Actor
			for( var actor : DialogCastActor in dca.actors ){
				if(actor){ // make sure style is not null
					
					// Seperator Line
					SepLine();
					GUILayout.Label("", GUILayout.MaxHeight(5)); // indent
					
					// Draw name of group
					EditorGUILayout.BeginHorizontal();
						GUILayout.Label("", GUILayout.MaxWidth(5));	// indent
						
						// PORTRAIT ICON
						// Portrait Column
						EditorGUILayout.BeginVertical(GUILayout.MaxWidth(80));
						
							if( actor.animated ){
								
								GUILayout.Label("Animated Icon: ", "BoldLabel", GUILayout.MaxWidth(100));
								GUILayout.Label(DoDialogCastAnimation(actor, actor.icon), GUILayout.MinWidth(80), GUILayout.MinHeight(80) , GUILayout.MaxWidth(80), GUILayout.MaxHeight(80) );
								
							} else {
						
							GUILayout.Label("Portrait Icon: ", "BoldLabel", GUILayout.MaxWidth(100));
							actor.icon = EditorGUILayout.ObjectField(actor.icon, Texture2D, false, GUILayout.MinWidth(80), GUILayout.MinHeight(80) , GUILayout.MaxWidth(80), GUILayout.MaxHeight(80));
							
							}
						EditorGUILayout.EndVertical();
						
						// Space Column
						EditorGUILayout.BeginVertical(GUILayout.MinWidth(16));
						GUILayout.Label("", GUILayout.MaxHeight(16)); // indent
						EditorGUILayout.EndVertical();
						

						
						// NAME AND INFO
						// Labels / Buttons Column
						EditorGUILayout.BeginVertical(GUILayout.MaxWidth(120));
							
							// Actor Name
							GUILayout.Label("Actor Name: ", "BoldLabel", GUILayout.MaxWidth(100));
							actor.name = EditorGUILayout.TextField("", actor.name, GUILayout.MaxWidth(100) );
							GUILayout.Label("", GUILayout.MaxHeight(5)); // indent
							
							// Is Animated?
							EditorGUILayout.BeginHorizontal();
								GUILayout.Label("Use Animation: ", "BoldLabel", GUILayout.MaxWidth(100) );
								actor.animated = EditorGUILayout.Toggle("", actor.animated, GUILayout.MaxWidth(32) );
							EditorGUILayout.EndHorizontal();
							GUILayout.Label("", GUILayout.MaxHeight(5)); // indent
							
							// Animation Settings
							if( actor.animated ){
							
								// Loop To Frame:
								EditorGUILayout.BeginHorizontal();
									GUILayout.Label("Loop To Frame: ", GUILayout.MaxWidth(100));
									actor.loopToFrame = EditorGUILayout.IntField("", actor.loopToFrame, GUILayout.MaxWidth(32) );
								if(actor.frames != null && actor.frames.length > 0){	
									actor.loopToFrame = Mathf.Clamp(actor.loopToFrame, 0, actor.frames.length-1);
								}
								EditorGUILayout.EndHorizontal();
								
								GUILayout.Label("", GUILayout.MaxHeight(5)); // indent
								
								// Animation Speed
								//EditorGUILayout.BeginHorizontal();
									GUILayout.Label( "Speed: ", GUILayout.MaxWidth(100));
									actor.animationSpeed = EditorGUILayout.Slider(actor.animationSpeed, 0.01, 2 );
								//EditorGUILayout.EndHorizontal();
								
							}
							
						EditorGUILayout.EndVertical();
						
						// Space Column
						EditorGUILayout.BeginVertical(GUILayout.MaxWidth(16));
						GUILayout.Label("", GUILayout.MaxHeight(16)); // indent
						EditorGUILayout.EndVertical();
						
						// ANIMATION
						// Animation Column
						DoAnimationColumn(actor);//DialogCastActor
						
						// Space Column
						EditorGUILayout.BeginVertical(GUILayout.Width(16));
						GUILayout.Label("", GUILayout.MaxHeight(16)); // indent
						EditorGUILayout.EndVertical();
						
						// REMOVE BUTTON
						// Button Column
						EditorGUILayout.BeginHorizontal();
							
							GUILayout.Label("", GUILayout.MaxWidth(5)); // indent
							
							// Remove Actor Button
							GUILayout.FlexibleSpace();
							if( GUILayout.Button(removeButton, GUILayout.MaxWidth(32)) ) {		
							//	Debug.Log("Remove Actor: "+actorID);
								DeleteActorFromCast(dca, actorID);
							}
						
							GUILayout.Label("", GUILayout.MaxWidth(5)); // indent
						EditorGUILayout.EndHorizontal();
						
					// increment Actor ID
					actorID++;
						
					EditorGUILayout.EndHorizontal();
					
					// Add Space
					EditorGUILayout.Space();
					
					
				}
			}
		}
		
		SepLine();
		
		// Draw Add button
		EditorGUILayout.BeginHorizontal();
			GUILayout.Label("", GUILayout.MaxWidth(5));	// indent
			GUILayout.FlexibleSpace();
			
			// Add New Actor Button
			if( GUILayout.Button(addButton, GUILayout.MaxWidth(32)) ) {		
			//	Debug.Log("Add Actor!");
				AddNewActorToCast(dca);
			}
			
			GUILayout.Label("", GUILayout.MaxWidth(5)); // indent
			
		EditorGUILayout.EndHorizontal();
		
		// Add Space
		EditorGUILayout.Space();
		
		// Save Changes
        if( Selection.activeGameObject && target != null ) {
			if (GUI.changed) {
				EditorUtility.SetDirty(target);
			}
        }
		
	}
	
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	DO ANIMATION COLUMN
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function DoAnimationColumn(actor : DialogCastActor){
		
		// If we have set actor to be animated, show the frames!
		if( actor.animated ){
			EditorGUILayout.BeginVertical(GUILayout.Width(240));
		
				// Title
				GUILayout.Label(" Animation Frames: ", "BoldLabel", GUILayout.MaxWidth(120));
				//GUILayout.Label("", GUILayout.MaxWidth(5)); // indent
				
				// Setup / fix frames array
				if( actor.frames == null || actor.frames.length == 0 ){
					actor.frames = new Texture2D[1];
					actor.frames[0] = actor.icon;
				}
				
				// Syncronize the portrait with the first frame of the animation (if it exists)
				if( actor.animated && actor.frames.length>0 && actor.frames[0]!=null ){
					actor.icon = actor.frames[0];
				}
				
				// Horizontal
				EditorGUILayout.BeginHorizontal();
					
					// Add indent
					GUILayout.Label("", GUILayout.MaxWidth(5));
					GUILayout.FlexibleSpace();
				
					// Loop through the frames
					if(actor.frames.length > 0 ){
						var ActorCount : int = 0;
						for( var frame : Texture2D in actor.frames){
							
							// Fix Rows on every 8th actor, create a new row!
							if( ActorCount != 0 && ActorCount%5 == 0 ){
								
									// Add indent
								//	GUILayout.FlexibleSpace();
									GUILayout.Label("", GUILayout.MaxWidth(5));
								
								// End the current row
								EditorGUILayout.EndHorizontal();
								
								// Add Vertical Space
								GUILayout.Label("", GUILayout.MaxWidth(5));
								
								// Begin a new row
								EditorGUILayout.BeginHorizontal();
								
									// Add indent
									GUILayout.Label("", GUILayout.MaxWidth(5));
									GUILayout.FlexibleSpace();
									
							// Add flexible space
							} else if (ActorCount != 0) {
							//	GUILayout.FlexibleSpace();
							}
							
							// Create the button!
							EditorGUILayout.BeginVertical();				
								frame = EditorGUILayout.ObjectField(frame, Texture2D, false, GUILayout.MinWidth(40), GUILayout.MinHeight(40) , GUILayout.MaxWidth(40), GUILayout.MaxHeight(40));
							
								// Draw Actor label
								var centeredStyle = GUI.skin.GetStyle("Label");
								centeredStyle.alignment = TextAnchor.UpperCenter;
								GUILayout.Label((ActorCount).ToString(), centeredStyle, GUILayout.MinWidth(40), GUILayout.MaxWidth(40)  );
								centeredStyle.alignment = TextAnchor.UpperLeft;
								
							EditorGUILayout.EndVertical();
							
							// increment count
							ActorCount++;
						
						}
					}
					
					// Add indent
					GUILayout.FlexibleSpace();
					GUILayout.Label("", GUILayout.MaxWidth(5));
				
				// Do buttons at the end (-)(+)
				EditorGUILayout.EndHorizontal();
				
				
				// ADD BUTTONS
				// Begin a new row
				GUILayout.Label("", GUILayout.MaxWidth(5));
				SepLine();
				EditorGUILayout.BeginHorizontal();
					GUILayout.Label(" Add / Remove Frames: ");
					GUILayout.FlexibleSpace();
					
					if( actor.frames.length > 1 ){
						if( GUILayout.Button(removeButton, GUILayout.MaxWidth(32)) ) {
							actor.frames = ResizeTexArray(actor.frames, false);
						}
					}
					if( GUILayout.Button(addButton, GUILayout.MaxWidth(32)) ) {
						actor.frames = ResizeTexArray(actor.frames, true);
					}
				EditorGUILayout.EndHorizontal();
				
			EditorGUILayout.EndVertical();

		
		// Otherwise add space so the delete button on the right is in the correct place!
		} else {
			
			EditorGUILayout.BeginVertical(GUILayout.Width(200));
				GUILayout.Label("", GUILayout.MaxWidth(5)); // indent
			EditorGUILayout.EndVertical();
		}
	}
	
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	RESIZE TEXTURE2D ARRAY
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function ResizeTexArray( tex : Texture2D[], add : boolean ){
		
		// Make sure Tex isn't null
		if( tex != null ){			
			
			// Setup New Tex Array
			var newTex : Texture2D[];
			if(add){ 
				newTex = new Texture2D[ (tex.length)+1 ]; 
			} else { 
				newTex = new Texture2D[ (tex.length)-1 ];
			}
			
			// Copy textures from the old one into the new one
			for(var i = 0; i < newTex.length; i++){
				
				// Make sure that this texture exists and is within range of the new texture
				if( i < tex.length ){
					newTex[i] = tex[i];
				}
			}
			
			// If we're adding a new element, copy the previous texture over.
			if(add){
				newTex[newTex.length-1] = tex[tex.length-1];
			}
			
			// Return newTex
			return newTex;
			
		}
		
		// If theres a problem return the original tex
		return tex;
	}
	
	
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	ADD NEW CAST GROUP
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function AddNewCastGroup(){
		
		// Create a new array from the built-in Cast
		var newarr = new Array (target.theCast);
		
		// Create a new Cast Group
		var newCastGroup : DialogCastGroup = new DialogCastGroup();
		newCastGroup.name = "New Cast Group";
		
		// Create a new Actor Group and add it to the Cast Group!
		// First, we create an empty JS array
		var dcgArray : Array = new Array();
		dcgArray.Clear();
		
		// Then, we convert the empty JS array into an empty DialogCastActor array (this prevents the editor bug)!
		var blankDCG : DialogCastActor[] = dcgArray.ToBuiltin(DialogCastActor);	
		
		// We add this blank DialogCastActor[] variable into our newCastGroup to act as an empty Actors variable
		newCastGroup.actors = blankDCG;
		 
		// Add the new Cast Group into the JS array
		newarr.Add(newCastGroup);
		
		// Convert it all to the main array
		target.theCast = newarr.ToBuiltin(DialogCastGroup);
				
	}
	
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	DELETE CAST GROUP
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function DeleteCastGroup( id : int ){
		
		// Create a new array from the built-in Cast
		var newarr = new Array (target.theCast);
		
		// Make sure the needed array element exists
		if( newarr[id] != null ){
			
			// Delete that element ( Cast Group )
			newarr.RemoveAt(id);
			
			// Convert it all to the main array
			target.theCast = newarr.ToBuiltin(DialogCastGroup);
		
		} else {
			Debug.Log("ERROR: Could not delete Cast Group because the array element was not found.");	
		}
	}
	
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	ADD NEW ACTOR TO CAST
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function AddNewActorToCast( dcg : DialogCastGroup ){
		
			// If this Cast doesn't have any elements setup, create a blank one to replace it with first
			if(dcg.actors == null){
				
				// Create empty Javascript Array
				var dcgArray : Array = new Array();
				dcgArray.Clear();
				
				// Convert it into an empty DialogCastActor array and apply it to this Cast
				var blankCast : DialogCastActor[] = dcgArray.ToBuiltin(DialogCastActor);	
				dcg.actors = blankCast;
			}
			
			// Create a new array from this current built-in Cast Group
			var newarr = new Array (dcg.actors);
			
			// Create a new DialogCastActor and add it to the array
			var newDCG : DialogCastActor = new DialogCastActor();
			newarr.Add(newDCG);
			
			// Apply it back to the original array
			dcg.actors = newarr.ToBuiltin(DialogCastActor);
			
		
	}
	
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	DELETE ACTOR FROM CAST
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function DeleteActorFromCast( dcg : DialogCastGroup, id : int ){
	
		// Make sure all references are valid
		if( dcg != null && dcg.actors != null && dcg.actors[id] != null ){
			
			// Create a new array from the built-in Cast
			var newarr = new Array (dcg.actors);
			
			// Delete that element ( Cast Group )
			newarr.RemoveAt(id);
			
			// Convert it all to the main array
			dcg.actors = newarr.ToBuiltin(DialogCastActor);
			
		} else {
			Debug.Log("ERROR: Could not delete Actor from Cast because an array element was not found.");	
		}

	}
	
}