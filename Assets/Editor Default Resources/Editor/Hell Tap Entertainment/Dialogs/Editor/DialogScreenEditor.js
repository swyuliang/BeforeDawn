////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// 	DialogsScreenEditor.js
//
//	Editor for DialogScreen.js
//
//	Created By Melli Georgiou
//	© 2012 - 2015 Hell Tap Entertainment LTD
//
//	IMPORTANT:
//	This DialogScreenEditor file must be located at: "Assets/Editor/Hell Tap Entertainment/Dialogs/DialogScreenEditor.js" 
//	or there will be issues! Also, icon resources should be in "Editor Default Resources/Hell Tap Entertainment/Dialogs/"!
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import HTE_MiniJSON;
import System.Collections.Generic;

#if UNITY_POSTBRUTAL
	import VoiceRoomAudio;
#endif


@script ExecuteInEditMode()

@CustomEditor (DialogScreen)
class DialogScreenEditor extends Editor {	
	
	// THE 4 MAIN TABS
	static var selStrings : String[] = ["Dialog", "Navigation", "Actions", "Localization"];
	
	// Images
	static var dialogsImage : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/DialogsIcon.png") as Texture2D;
	static var navigationImage : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/NavigationIcon.png") as Texture2D;
	static var actionsImage : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/ActionsIcon.png") as Texture2D;
	static var localizationImage : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/LocalizeIcon.png") as Texture2D;
	static var selImages : Texture[] = [ dialogsImage, navigationImage, actionsImage, localizationImage ];
	
	// Buttons
	static var addButton : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/addButton.png") as Texture2D;
	static var removeButton : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/removeButton.png") as Texture2D;
	
	// Labels
	static var nameLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/nameLabel.png") as Texture2D;
	static var speechLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/speechLabel.png") as Texture2D;
	static var fileLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/fileLabel.png") as Texture2D;
	static var audioLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/audioLabel.png") as Texture2D;
	static var checkLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/checkLabel.png") as Texture2D;
	static var cameraLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/cameraLabel.png") as Texture2D;
	static var nextLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/nextLabel.png") as Texture2D;
	static var timeLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/timeLabel.png") as Texture2D;
	static var skipLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/skipLabel.png") as Texture2D;
	static var stopLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/stopLabel.png") as Texture2D;
	static var deleteLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/deleteLabel.png") as Texture2D;
	static var memoryLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/memoryLabel.png") as Texture2D;
	static var findLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/findLabel.png") as Texture2D;
	static var originLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/originLabel.png") as Texture2D;
	static var origin3dLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/origin3dLabel.png") as Texture2D;
	static var fadeInLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/fadeInLabel.png") as Texture2D;
	static var fadeOutLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/fadeOutLabel.png") as Texture2D;
	static var hideLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/hideLabel.png") as Texture2D;
	static var buttonLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/buttonLabel.png") as Texture2D;
	static var castLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/castLabel.png") as Texture2D;
	static var actorLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/actorLabel.png") as Texture2D;
	static var gearLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/gearLabel.png") as Texture2D;
	static var layersLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/layersLabel.png") as Texture2D;
	static var resizeLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/resizeLabel.png") as Texture2D;
	static var positionLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/positionLabel.png") as Texture2D;
	static var loopLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/loopLabel.png") as Texture2D;
	static var pitchLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/pitchLabel.png") as Texture2D;
	static var xLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/xLabel.png") as Texture2D;
	static var yLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/yLabel.png") as Texture2D;
	static var redBoxTex : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/redBox.png") as Texture2D;
	static var playLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/playLabel.png") as Texture2D;
	static var keyLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/keyLabel.png") as Texture2D;
	static var cubeLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/cubeLabel.png") as Texture2D;
	static var saveLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/saveLabel.png") as Texture2D;
	static var loadLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/loadLabel.png") as Texture2D;
	static var dropLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/dropLabel.png") as Texture2D;
	static var offLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/offLabel.png") as Texture2D;
	static var onLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/onLabel.png") as Texture2D;
	static var colorLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/colorLabel.png") as Texture2D;
	static var yandexLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/yandexLabel.png") as Texture2D;
	static var localizeLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/localizeLabel.png") as Texture2D;
	static var localizeButton : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/localizeButton.png") as Texture2D;
	static var unityLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/unityLabel.png") as Texture2D;
	static var buttonIconLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/buttonIconLabel.png") as Texture2D;
	static var scenesLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/scenesLabel.png") as Texture2D;

	// Logic Labels
	static var ifLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/if.png") as Texture2D;
	static var elseifLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/elseif.png") as Texture2D;
	static var elseLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/else.png") as Texture2D;
	static var andLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/and.png") as Texture2D;
	
	// Flags
	static var ukFlag : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/ukFlag.png") as Texture2D;
	static var chinaFlag : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/chinaFlag.png") as Texture2D;
	static var koreaFlag : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/koreaFlag.png") as Texture2D;
	static var japanFlag : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/japanFlag.png") as Texture2D;
	static var germanyFlag : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/germanyFlag.png") as Texture2D;
	static var franceFlag : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/franceFlag.png") as Texture2D;
	static var spainFlag : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/spainFlag.png") as Texture2D;
	static var italyFlag : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/italyFlag.png") as Texture2D;
	static var portugalFlag : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/portugalFlag.png") as Texture2D;
	static var russiaFlag : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/russiaFlag.png") as Texture2D;
	
	// DialogStyle Icons
	static var dataEntryIcon : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/DataEntryIcon.png") as Texture2D;
	static var passwordIcon : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/PasswordIcon.png") as Texture2D;
	static var logicIcon : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/LogicIcon.png") as Texture2D;
	static var titleIcon : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/TitleIcon.png") as Texture2D;
	static var voiceRoomIcon : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/VoiceRoomIcon.png") as Texture2D;
	static var popupImageIcon : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/PopupImageIcon.png") as Texture2D;
	static var iconGridIcon : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/IconGridIcon.png") as Texture2D;

	// Warning
	static var warningIcon : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/WarningIcon.png") as Texture2D;
	
	// Third Party Icons
	static var uSequencerIcon : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/uSequencer.png") as Texture2D;
	static var postBrutalIcon : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/PostBrutal.png") as Texture2D;


	// CHOOSE LOCALIZATION.
	static var selectLocalization : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/Localization.png") as Texture2D;
	static var selLanguageStrings : String[] = ["Spanish", "Italian", "German","French","Portuguese","Russian", "Chinese", "Korean","Japanese"];
	static var selLanguageImages : Texture[] = [ spainFlag, italyFlag, germanyFlag, franceFlag, portugalFlag, russiaFlag, chinaFlag, koreaFlag, japanFlag ];
	
	// THE ACTION TABS
	static var actionStrings : String[] = ["GameObject Actions", "Background Layer Actions", "Actor Layer Actions", "Audio Actions", "Token Actions", "UI Actions", "3rd Party Actions"];
	var actionStringsCount : String[] = ["(0)", "(0)", "(0)", "(0)", "(0)", "(0)", "(0)"];
	static var actionImages : Texture[] = [ cubeLabel, cameraLabel, actorLabel, audioLabel, keyLabel, localizeLabel, nextLabel ];
	
	// THIRD PARTY TABS
	#if !UNITY_POSTBRUTAL
		static var thirdPartyTools : String[] = ["uSequencer"];
		static var thirdPartyIcons : Texture2D[] = [uSequencerIcon];
	#endif
	#if UNITY_POSTBRUTAL
		static var thirdPartyTools : String[] = ["Post Brutal", "uSequencer"];
		static var thirdPartyIcons : Texture2D[] = [postBrutalIcon, uSequencerIcon];
	#endif


	// AUDIO CHANNEL
	static var audioTabStrings : String[] = ["Music","SFX 1", "SFX 2", "SFX 3"];
	
	// tab variables ( for actions tabs )
	var gameObjectActionsTab : int = 0;
	
	var openCreateObjectsAtStart : boolean = false;
	var openCreateObjectsAtEnd : boolean = false;
	
	var openSendMessageAtStart : boolean = false;
	var openSendMessageAtEnd : boolean = false;
	
	var openActivateObjectsAtStart : boolean = false;
	var openActivateTheseObjectsAtEnd : boolean = false;
	var openActivateObjectsAtStart2 : boolean = false;
	var openActivateTheseObjectsAtEnd2 : boolean = false;
	
	var openDeactivateObjectsAtStart : boolean = false;
	var openDeactivateTheseObjectsAtEnd : boolean = false;
	var openDeactivateObjectsAtStart2 : boolean = false;
	var openDeactivateTheseObjectsAtEnd2 : boolean = false;
	
	var openDestroyTheseObjectsAtEnd : boolean = false;
	var openDestroyTheseObjectsAtStart : boolean = false;
	var openFindAndDestroyTheseObjectsAtEnd : boolean = false;
	var openFindAndDestroyTheseObjectsAtStart : boolean = false;
		
	// BROWSE MODE
	var browseMode : boolean = false;	
	var browseOutput : BrowseOutput;
	enum BrowseOutput{Portrait,Actor1,Actor2,Actor3,Actor4,Actor5,Actor6,Actor7,Actor8,Actor9,Actor10,Scene1,Scene2,Scene3,Scene4,Scene5,Scene6,Scene7,Scene8,Scene9,Scene10,IconGrid,None};
	var browseButtonOutput : int = -100;	// -100 = None, -3 = PopupImageBG, -2 = CustomButton2, -1 = CustomButton1, 0 = MultipleButton0, 1 = MultipleButton1, etc.
	var DCs : DialogCast[];
	var DSs : DialogScenes[];
	var DBs : DialogButtons[];
	var DUIs : DialogUI[];
	
	// EDITOR ANIMATION TIME
	var EditorTime : LDCEditorTime = new LDCEditorTime();
	class LDCEditorTime{
		var timeSinceStartup : float;				// Value to compare real time.
		var deltatime : float;						// Editor version of deltaTime
		var browseActors : boolean = true;			// If this is true, we need to update the Actor group of the library.
		var actorLibraryUnavailable  : boolean = false;	// If this is true, we cannot use browse.
		var sceneLibraryUnavailable  : boolean = false;	// If this is true, we cannot use browse.
		
		// Check if the DialogCast and DialogScenes exist in the scene!
		var oldDCs : DialogCast[] = new DialogCast[0];
		var oldDSs : DialogScenes[] = new DialogScenes[0];
		var oldDBs : DialogButtons[] = new DialogButtons[0];
		var DCs : DialogCast[] = new DialogCast[0];
		var DSs : DialogScenes[] = new DialogScenes[0];
		var DBs : DialogButtons[] = new DialogButtons[0];
		var DUIs : DialogUI[] = new DialogUI[0];
		var doBugFix : boolean = false;
	}
	
	// HELPER VALUES
	var cahedID : int = 0;		// The cached DialogID (we use this primarily for error messages during translations)
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	EDITOR UPDATE
	//	We setup the Editor to be a delegate of EditorUpdate so we can create a Time-class. This is used to animate
	//	graphics inside of the editor.
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	#if UNITY_EDITOR
	
		// ==================================================================
		//	EDITOR UPDATE
		//	Calculate deltaTime values for animations, as well as downloads
		// ==================================================================
		
		function EditorUpdate(){
			
			// Debug.Log(target.dialogID);
			// Check if the DialogCast and DialogScenes exist in the scene!
			
			// Make sure we have the correct references
			if( EditorTime!= null && EditorTime.timeSinceStartup < EditorApplication.timeSinceStartup){
				
				// =================
				// ANIMATION UPDATE
				// =================
				
				// Update delta Time
				EditorTime.deltatime = EditorApplication.timeSinceStartup - EditorTime.timeSinceStartup;
				
				// Update timeSinceStartup on our end.
				EditorTime.timeSinceStartup = EditorApplication.timeSinceStartup;
			
				// If we find anything needing a repaint, update the flag
				var repaintNeeded : boolean = false;
				
				// Debug DeltaTime
				// Debug.Log(EditorTime.deltatime);
				
				// ==========================
				//	TRANSLATIONS
				// ==========================
				
				// Handle Translations
				if(currentlyTranslating && www!=null){
			        if (www.isDone){
			        	currentlyTranslating = false;
			        	//Debug.Log("Localization Data has arrived!");
						
						// Check for errors
						if (!String.IsNullOrEmpty(www.error)){
							Debug.Log(www.error);
							Debug.LogWarning("LDC: (Dialog ID "+cahedID+") There was an error communicating with the translation server. Aborting Translation.");
							
							// Revert Flags.
							currentlyTranslating = false;
							massTranslate = false;
							massTranslateStepComplete = false;
							massTranslateStep = 0;
							
							// Unload Unused Assets.
							www = null;
							EditorUtility.UnloadUnusedAssetsIgnoreManagedReferences();
							
						} else {
							AutoTranslate(translationThreadTextToTranslate, translationThreadCode);
						}
			        }
				}
				
				// Handle TimeOut
				if( (currentlyTranslating || massTranslate) ){
					if( translationTimeOut > 0 ){
						translationTimeOut -= EditorTime.deltatime;
					} else {
						
						// Show Error
						if(massTranslate){
							
							// Mass Translate Error.
							Debug.LogWarning("LDC: (Dialog ID "+cahedID+") - Batch Translation Timed Out At Step "+massTranslateStep+". Some translations will be missing. REASON: Server may be busy, or your network may be lagging.");	
							
							// Unload Unused Assets.
							www = null;
							EditorUtility.UnloadUnusedAssetsIgnoreManagedReferences();
							
						// Show standard Time out.	
						} else {
							Debug.LogWarning("LDC: (Dialog ID "+cahedID+") Translation Aborted. Process Timed Out. REASON: Server may be busy, or your network may be lagging.");
						}
						
						// Revert Flags.
						currentlyTranslating = false;
						massTranslate = false;
						massTranslateStepComplete = false;
						massTranslateStep = 0;
						
						// Unload Unused Assets.
						www = null;
						EditorUtility.UnloadUnusedAssetsIgnoreManagedReferences();
						
					}
				}
				
				// Firstly, Cache the selected DialogScreen …
				if( target!= null ){
					var theObject : DialogScreen = target as DialogScreen;
					if(theObject!=null){
						
						// ==========================
						//	HELPER VALUES
						// ==========================
						
						// Cache the DialogID
						cahedID = theObject.dialogID;	// We use this in Warning Messages where theObject isn't available.
						
						// If we were in the middle of a translation, show a warning to the user.
						if( massTranslate || currentlyTranslating ){
							theObject.isTranslating = true;	
						} else {
							theObject.isTranslating = false;	
						}
						
						// ==========================
						//	MASS TRANSLATIONS
						// ==========================
						
						// Run Localize All (Mass Translation) - Called From DialogController
						if( theObject.runLocalizeAll ){
							theObject.runLocalizeAll = false;
							massTranslate = true;						// Sets the Flag
							massTranslateStep = 1;						// 1 represents Spanish
							AutoTranslateStart( theObject, "en-es" );	// Start the localization routine normally.	
						}
						
						// If we're in the middle of a massTranslation, 
						if( massTranslate && massTranslateStepComplete){
							
							// Report progress
							// Debug.Log("LDC: Mass translate Step "+massTranslateStep.ToString()+"( "+translationThreadCode+") Complete");
							
							// Handle the next step.
							massTranslateStepComplete = false;
							massTranslateStep++;
							
							// NOTE: Step 1 is started from before, the next step is 2.
							// Step 2 -> Spanished Finished. Start Italian.
							if( massTranslateStep == 2){
								AutoTranslateStart( theObject, "en-it" );
							}
							
							// Step 3 -> Italian Finished. Start German.
							else if( massTranslateStep == 3){
								AutoTranslateStart( theObject, "en-de" );
							}
							
							// Step 4 -> German Finished. Start French.
							else if( massTranslateStep == 4){
								AutoTranslateStart( theObject, "en-fr" );
							}
							
							// Step 5 -> French Finished. Start Portuguese.
							else if( massTranslateStep == 5){
								AutoTranslateStart( theObject, "en-pt" );
							}
							
							// Step 6 -> Portuguese Finished. Start Russian.
							else if( massTranslateStep == 6){
								AutoTranslateStart( theObject, "en-rus" );
							}

							// Step 7 -> Russian Finished. Start Chinese.
							else if( massTranslateStep == 7){
								AutoTranslateStart( theObject, "en-zh" );
							}

							// Step 8 -> Chinese Finished. Start Korean.
							else if( massTranslateStep == 8){
								AutoTranslateStart( theObject, "en-ko" );
							}

							// Step 9 -> Korean Finished. Start Japanese.
							else if( massTranslateStep == 9){
								AutoTranslateStart( theObject, "en-ja" );
							}

							// Finished
							else if( massTranslateStep == 10){
							
								// Debug.Log("Mass Translate Complete.");
								massTranslate = false;
								massTranslateStepComplete = false;
								massTranslateStep = 0;
							}
							
							// This updates the translation label
							Repaint();
						}
						
						// ==================================	
						//	BROWSE LIBRARY ANIMATIONS
						//	Browsing the library ...
						// ==================================
						
						if ( browseMode ) {
							
							// Cache the Dialog Groups
							var dcGroups : DialogCastGroup[];
							
							// Cache Button Groups ..
							if( browseButtonOutput != -3){
								if( DialogButtons != null && DialogButtons.GetDialogCastGroups() != null ){
									dcGroups = DialogButtons.GetDialogCastGroups();
								}
							}

							// Cache Actor Cast ..
							else if( EditorTime.browseActors ){
								
								if( DialogCast != null && DialogCast.GetDialogCastGroups() != null ){
									dcGroups = DialogCast.GetDialogCastGroups();
								}
							}

							// Cache Scene Groups ..
							else {
								
								if( DialogScenes != null && DialogScenes.GetDialogCastGroups() != null ){
									dcGroups = DialogScenes.GetDialogCastGroups();
								}
							}

							
							
							// Loop through the Cast Groups
							var dcGroupID : int = -1;
							if( dcGroups!=null && dcGroups.length > 0 ){
								for( var dcGroup : DialogCastGroup in dcGroups ){
									if(dcGroup!=null && dcGroup.actors && dcGroup.actors.length > 0){ // Make sure this Group is valid
										
										// Increment dcGroupID
										dcGroupID++;
										
										// Loop through the Actors
										var ActorCount : int = -1;
										for( var actor : DialogCastActor in dcGroup.actors ){
											
											// Add to the count
											ActorCount++;
											
											// If this is an animated actor, do the stuff!
											if(actor!=null && actor.animated ){
												
												DoDialogCastAnimationUpdate(actor);
												repaintNeeded = true;
												
											}
										}
									}
								}
							}
						
						// ==================================	
						//	STANDARD ANIMATIONS
						//	Portrait, backgrounds, Actors.
						// ==================================	
						
						} else {
							
							// Update portrait animation frames
							if( theObject.screen.animatedPortrait != Vector2(-1,-1) && 
								theObject.screen.editorPortraitAnimation!=null
							){
								DoDialogCastAnimationUpdate(theObject.screen.editorPortraitAnimation);
								repaintNeeded = true;
							}
							
							// Loop through the Background Layers
							for( var sceneLayer : DialogUIBackgroundLayers in theObject.actions.sceneLayers ){
								if(sceneLayer!=null){
									
									// Cache the background animations
									if( sceneLayer.animationID != Vector2(-1,-1) && 
										sceneLayer.anim!=null
									){
										DoDialogCastAnimationUpdate(sceneLayer.anim);
										repaintNeeded = true;
									}
								}
							}
							
							// Loop through the Background Layers
							for( var actorLayer : DialogUIActorLayers in theObject.actions.actorLayers ){
								if(actorLayer!=null){
									
									// Cache the background animations
									if( actorLayer.animationID != Vector2(-1,-1) && 
										actorLayer.anim!=null
									){
										DoDialogCastAnimationUpdate(actorLayer.anim);
										repaintNeeded = true;
									}
								}
							}

							// Update Custom Icon 1
							if( theObject.screen.animatedButtonIcon1 != Vector2(-1,-1) && 
								theObject.screen.editorAnimatedButtonIcon1!=null
							){
								DoDialogCastAnimationUpdate(theObject.screen.editorAnimatedButtonIcon1);
								repaintNeeded = true;
							}

							// Update Custom Icon 2
							if( theObject.screen.animatedButtonIcon2 != Vector2(-1,-1) && 
								theObject.screen.editorAnimatedButtonIcon2!=null
							){
								DoDialogCastAnimationUpdate(theObject.screen.editorAnimatedButtonIcon2);
								repaintNeeded = true;
							}

							// Update Popup Image Background
							if( theObject.screen.popupImageAnim != Vector2(-1,-1) && 
								theObject.screen.editorPopupImageAnim!=null
							){
								DoDialogCastAnimationUpdate(theObject.screen.editorPopupImageAnim);
								repaintNeeded = true;
							}

							// Loop through the Custom Multiple Icon Layers
							var mbCount : int = 0;
							if( theObject.screen.editorAnimatedMultipleButtonsIcon.length > 0 ){
								for( var buttonLayer : DialogCastActor in theObject.screen.editorAnimatedMultipleButtonsIcon ){
									if(buttonLayer!=null){
										
										// Cache the background animations
										if( 
											theObject.screen.animatedMultipleButtonsIcon != null &&
											theObject.screen.animatedMultipleButtonsIcon.length > mbCount &&
											theObject.screen.animatedMultipleButtonsIcon[mbCount] != Vector2(-1,-1)
										){
											DoDialogCastAnimationUpdate( buttonLayer );
											repaintNeeded = true;
										}
									}

									// Increment
									mbCount++;
								}
							}

							// Loop through the Custom Icon Grid Layers
							if( theObject.screen.IG_buttons.length > 0 ){
								for( var igb : IconGridButtons in theObject.screen.IG_buttons ){
									if(igb!=null){
										
										// Cache the background animations
										if( igb.animatedButtonIcon != Vector2(-1,-1) && 
											igb.editorButtonAnim!=null
										){
											DoDialogCastAnimationUpdate(igb.editorButtonAnim);
											repaintNeeded = true;
										}
									}
								}
							}

						}
						
						// Repaint UI
						if( repaintNeeded ){
							repaintNeeded = false;
							Repaint();
						}
					}
				}
			} 
		}
		
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//	DO DIALOG CAST ANIMATION UPDATE
		//	Handles the timing functions via Update - doesnt return any textures
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		function DoDialogCastAnimationUpdate (anim : DialogCastActor ){
			
			// Make sure we've sent an DialogCastActor (Animation) and its set to animate
			if( anim!=null && anim.animated ){
					
				// Add time to the timer
				anim.editorTimer+= EditorTime.deltatime;
				
				// if timer has reached the animation speed, move to the next frame
				if( anim.editorTimer >= anim.animationSpeed ){
					anim.editorCurrentFrame++;
					anim.editorTimer = 0;
				}
				
				// If current frame is larger than the array, loop back to the appropriate frame
				if(anim.editorCurrentFrame > anim.frames.length-1 ){
					anim.editorCurrentFrame = Mathf.Clamp( anim.loopToFrame, 0, anim.frames.length-1 );
				}
			}
		}
		
		// ================================================
		//	ON ENABLE
		//	Setup delegate and cache temporary animations
		// ================================================
		
		function OnEnable() {

			// Is this the last dialog screen?
			if(target!=null){
				var theDialogScreens : Component[] = target.gameObject.GetComponents(DialogScreen);
				if(theDialogScreens.length > 0 ){
					var DSi : int = 0;
					for( var ds : DialogScreen in theDialogScreens ){
						if(ds!=null){

							// Set if this is the last dialog screen
							if(DSi < theDialogScreens.length-1){
								ds.isLastDialogScreen = false;
							} else {
								ds.isLastDialogScreen = true;
							}

							// Set how many dialog screens there are
							ds.totalDialogScreens = theDialogScreens.length;
						}
						DSi++;
					}
				}
			}

			// Setup Process
			translationKey = ProcessLocal(originalKey);
			
			// Update Dialog Library and keep track of changes (for bugfix)
			EditorTime.oldDCs = EditorTime.DCs;
			EditorTime.oldDSs = EditorTime.DSs;
			EditorTime.oldDBs = EditorTime.DBs;
			EditorTime.DCs = FindObjectsOfType (DialogCast);
			EditorTime.DSs = FindObjectsOfType (DialogScenes);
			EditorTime.DBs = FindObjectsOfType (DialogButtons);
			EditorTime.DUIs = FindObjectsOfType (DialogUI);

			// Copy the Libraries into the local variables too:
			DCs = EditorTime.DCs;
			DSs = EditorTime.DSs;
			DBs = EditorTime.DBs;
			DUIs = EditorTime.DUIs;

			// BUGFIX
			// If we add a new Dialog Library Unity goes crazy and causes weird errors. If we find that the DialogLibrary has changed
			// We should set the doBugFix flag so that we can re=import the Editor on the next OnInspector frame. This actually works! =)
			if( EditorTime.oldDCs != EditorTime.DCs || 
				EditorTime.DSs != EditorTime.DSs ){
				EditorTime.doBugFix = true;
			}
			
		//	Debug.Log("DCs: " + EditorTime.DCs.length + "    DSs: "+EditorTime.DSs.length);
			
		    // Make sure we've selected a valid object and the Application isn't playing.
		    if( target != null && !EditorApplication.isPlaying ) {
		    	
		    	// Reset Editor time values
				EditorTime.timeSinceStartup = 0;
				EditorTime.deltatime = 0;
				
				// Setup the EditorUpdate function as a delegate of EditorApplication.update.
				//EditorApplication.update += EditorUpdate;
				var cb:EditorApplication.CallbackFunction = EditorUpdate;//function Update
 				EditorApplication.update = System.Delegate.Combine(cb, EditorApplication.update);
				
				// Update Temporary Animations
				UpdateLDCAnimations(false);
		    }
		}
		
		// ================================================
		// 	ON DISABLE
		//	Remove delegate and clear temporary animations
		// ================================================
		
		function OnDisable() {
	
			// When we've unselected or destroyed this object, stop being a delegate.
		    EditorApplication.update = null;
		    
		    // Make sure we've selected a valid object and the Application isn't playing.
		    if( Selection.activeGameObject && target != null && !EditorApplication.isPlaying ) {
		   		
		   		// Clear Temporary Animations
				UpdateLDCAnimations(true);
		    }
		    
		    // If we were in the middle of a translation, show a warning to the user.
			if( massTranslate || currentlyTranslating ){
				Debug.LogWarning("LDC: (Dialog ID "+cahedID+") - You closed the LDC inspector before the translation was completed.\nSome translations will be missing.");	
			}
		}
	
	#endif
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// UPDATE LDC ANIMATIONS
	// Updates references to all animations
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function UpdateLDCAnimations( clear : boolean ){
		
		// Firstly, Cache the selected DialogScreen …
		if( target!= null ){
			var theObject : DialogScreen = target as DialogScreen;
			if(theObject!=null){
				
				// Cache the portrait animation
				if( clear == false &&
					theObject.screen.animatedPortrait != Vector2(-1,-1) &&
					CreateCopyOfDCAnimation( 0, theObject.screen.animatedPortrait ) != null
				){
					theObject.screen.editorPortraitAnimation = CreateCopyOfDCAnimation( 0, theObject.screen.animatedPortrait );
				} else {
					theObject.screen.editorPortraitAnimation = new DialogCastActor();
				}
				
				// Loop through the Background Layers
				for( var sceneLayer : DialogUIBackgroundLayers in theObject.actions.sceneLayers ){
					if(sceneLayer!=null){
						
						// Cache the background animations
						if( clear == false &&
							sceneLayer.animationID != Vector2(-1,-1) &&
							CreateCopyOfDCAnimation( 1, sceneLayer.animationID ) != null
						){
							sceneLayer.anim = CreateCopyOfDCAnimation( 1, sceneLayer.animationID );
						} else {
							sceneLayer.anim = new DialogCastActor();	
						}
					}
				}
				
				// Loop through the Actor Layers
				for( var actorLayer : DialogUIActorLayers in theObject.actions.actorLayers ){
					if(actorLayer!=null){
						
						// Cache the Actor animations
						if( clear == false &&
							actorLayer.animationID != Vector2(-1,-1) &&
							CreateCopyOfDCAnimation( 0, actorLayer.animationID ) != null
						){
							actorLayer.anim = CreateCopyOfDCAnimation( 0, actorLayer.animationID );
							
						} else {
							actorLayer.anim = new DialogCastActor();	
						}
					}
				}


				// Do custom button 1
				if( clear == false &&
					theObject.screen.animatedButtonIcon1 != Vector2(-1,-1) && 
					CreateCopyOfDCAnimation( 2, theObject.screen.animatedButtonIcon1 ) != null 
				){
					theObject.screen.editorAnimatedButtonIcon1 = CreateCopyOfDCAnimation( 2, theObject.screen.animatedButtonIcon1 );
				} else {
					theObject.screen.editorAnimatedButtonIcon1 = new DialogCastActor();
				}

				// Do custom button 2
				if( clear == false &&
					theObject.screen.animatedButtonIcon2 != Vector2(-1,-1) && 
					CreateCopyOfDCAnimation( 2, theObject.screen.animatedButtonIcon2 ) != null 
				){
					theObject.screen.editorAnimatedButtonIcon2 = CreateCopyOfDCAnimation( 2, theObject.screen.animatedButtonIcon2 );
				} else {
					theObject.screen.editorAnimatedButtonIcon2 = new DialogCastActor();
				}

				// Do Popup Image Background
				if( clear == false &&
					theObject.screen.popupImageAnim != Vector2(-1,-1) && 
					CreateCopyOfDCAnimation( 1, theObject.screen.popupImageAnim ) != null 
				){
					theObject.screen.editorPopupImageAnim = CreateCopyOfDCAnimation( 1, theObject.screen.popupImageAnim );
				} else {
					theObject.screen.editorPopupImageAnim = new DialogCastActor();
				}


 				// Loop through the Multiple Custom Icon Layers
				var mbCount : int = 0;
				if( theObject.screen.editorAnimatedMultipleButtonsIcon.length > 0 ){
					for( var buttonLayer : DialogCastActor in theObject.screen.editorAnimatedMultipleButtonsIcon ){
						if(buttonLayer!=null){
							
							// Cache the background animations
							if( clear == false &&
								theObject.screen.animatedMultipleButtonsIcon != null &&
								theObject.screen.animatedMultipleButtonsIcon.length > mbCount &&
								theObject.screen.animatedMultipleButtonsIcon[mbCount] != Vector2(-1,-1) &&
								CreateCopyOfDCAnimation( 2, theObject.screen.animatedMultipleButtonsIcon[mbCount] ) != null
							){
								theObject.screen.editorAnimatedMultipleButtonsIcon[mbCount] = CreateCopyOfDCAnimation( 2, theObject.screen.animatedMultipleButtonsIcon[mbCount] );
							} else {
								theObject.screen.editorAnimatedMultipleButtonsIcon[mbCount] = new DialogCastActor();
							}
						}

						// Increment
						mbCount++;
					}
				}

				// Loop through the Custom Icon Grid Layers
				if( theObject.screen.IG_buttons.length > 0 ){
					for( var igb : IconGridButtons in theObject.screen.IG_buttons ){
						if(igb!=null){
							
							// Cache the background animations
							if( clear == false &&
								igb.animatedButtonIcon != Vector2(-1,-1) && 
								CreateCopyOfDCAnimation( 2, igb.animatedButtonIcon ) != null 
							){
								igb.editorButtonAnim = CreateCopyOfDCAnimation( 2, igb.animatedButtonIcon );
							} else {
								igb.editorButtonAnim = new DialogCastActor();
							}
						}
					}
				}



			}
		}
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	ACTION TAB COUNTERS
	//	Function that keeps track of how many actions we've setup in each section.
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	var ActionTabCountGameObjects : int = 0;
	var ActionTabCountBGLayers : int = 0;
	var ActionTabCountActorLayers : int = 0;
	var ActionTabCountAudio : int = 0;
	var ActionTabCountTokens : int = 0;
	var ActionTabCountLocalization : int = 0;
	var ActionTabCountThirdParty : int = 0;

	function ActionTabCounters(){
		
		// Make sure we can see the DialogScreen and do the count!
		var theObject : DialogScreen = target as DialogScreen;
		if(theObject!=null){

			// Count up all the actions for GameObject Actions.
			if( theObject.actions!= null ){
				ActionTabCountGameObjects = 
					theObject.actions.createObjectsAtStart.length +		
					theObject.actions.sendMessageAtStart.length +
					theObject.actions.activateTheseObjectsAtStart.length +
					theObject.actions.activateTheseObjectsAtStartDirectly.length +
					theObject.actions.deactivateTheseObjectsAtStart.length +
					theObject.actions.deactivateTheseObjectsAtStartDirectly.length +
					theObject.actions.destroyTheseObjectsAtStart.length +
					theObject.actions.findAndDestroyTheseObjectsAtStart.length +
					theObject.actions.createObjectsAtEnd.length +		
					theObject.actions.sendMessageAtEnd.length +
					theObject.actions.activateTheseObjectsAtEnd.length +
					theObject.actions.activateTheseObjectsAtEndByName.length +
					theObject.actions.deactivateTheseObjectsAtEnd.length +
					theObject.actions.deactivateTheseObjectsAtEndByName.length +
					theObject.actions.destroyTheseObjectsAtEnd.length + 
					theObject.actions.findAndDestroyTheseObjectsAtEnd.length;

				// Count up the Background Layer Actions
				ActionTabCountBGLayers = theObject.actions.fadeAllSceneLayers == true ? 1 : 0;
				if(theObject.actions.fadeAllSceneLayers == false){
					for(var sceneLayer : DialogUIBackgroundLayers in theObject.actions.sceneLayers){
						if(sceneLayer!=null && sceneLayer.setLayer == true){ 
							ActionTabCountBGLayers++;
						}
					}
				}

				// Count up the Actor Layer Actions
				ActionTabCountActorLayers = theObject.actions.fadeAllActorLayers == true ? 1 : 0;
				if(theObject.actions.fadeAllActorLayers == false){
					for(var actorLayer : DialogUIActorLayers in theObject.actions.actorLayers){
						if(actorLayer!=null && actorLayer.setLayer == true){ 
							ActionTabCountActorLayers++;
						}
					}
				}

				// Count Up the Audio Actions
				ActionTabCountAudio = theObject.actions.music.action != DSAudioAction.None ? 1 : 0;
				if(theObject.actions.sfx1.action != DSAudioAction.None ){ ActionTabCountAudio++; }
				if(theObject.actions.sfx2.action != DSAudioAction.None ){ ActionTabCountAudio++; }
				if(theObject.actions.sfx3.action != DSAudioAction.None ){ ActionTabCountAudio++; }


				// Count up the token actions
				ActionTabCountTokens = theObject.actions.tokenFileManagement != DSTokenFileManagementActions.None ? 1 : 0;
				ActionTabCountTokens +=	theObject.actions.tokens.length;
				ActionTabCountTokens +=	theObject.actions.playerPrefs.length;

				// Count up the localization actions				
				if( theObject.actions.setNewLanguage != DS_SetNewLanguage.No ){
					if( theObject.actions.updateGUISkins == true ){
						ActionTabCountLocalization = 2;
					} else {
						ActionTabCountLocalization = 1;
					}
				} else {
					ActionTabCountLocalization = 0;
				}

				// Count up the third party actions - uSequencer
				ActionTabCountThirdParty = 0;
				if(theObject.actions.uSequencer.go != null){  ActionTabCountThirdParty++; }
				if(theObject.actions.uSequencer.findGo != ""){  ActionTabCountThirdParty++; }
				if(theObject.actions.uSequencer.setup == true){  ActionTabCountThirdParty++; }
				if(theObject.actions.uSequencer.startAction != DSuSequencerActionType.None){  ActionTabCountThirdParty++; }
				if(theObject.actions.uSequencer.endAction != DSuSequencerActionType.None){  ActionTabCountThirdParty++; }

				// Add Post Brutal Options.
				#if UNITY_POSTBRUTAL
				
					if(theObject.actions.postBrutal.cameraStyle != FMVMODE.IGNORE){  ActionTabCountThirdParty++; }
					if(theObject.actions.postBrutal.cameraStyleTarget != null){  ActionTabCountThirdParty++; }
					if(theObject.actions.postBrutal.cameraStyleFindTarget != ""){  ActionTabCountThirdParty++; }
					if(theObject.actions.postBrutal.stopFmvCameraAtEnd == true){  ActionTabCountThirdParty++; }
					if(theObject.actions.postBrutal.findTalkLookAt != ""){  ActionTabCountThirdParty++; }
					if(theObject.actions.postBrutal.talkLookAt != null){  ActionTabCountThirdParty++; }
					// We purposely ignore the stopAllMovementAI as that's on by default.
					
				#endif


			}





			// Update the tab string
			// static var actionStrings : String[] = ["GameObject Actions", "Background Layer Actions", "Actor Layer Actions", "Audio Actions", "Token Actions", "3rd Party Actions"];

			actionStringsCount = [	ActionTabCountGameObjects == 0 ? "" : "  /  "+ActionTabCountGameObjects.ToString()+"", 
									ActionTabCountBGLayers == 0 ? "" : "  /  "+ActionTabCountBGLayers.ToString()+"", 
									ActionTabCountActorLayers == 0 ? "" : "  /  "+ActionTabCountActorLayers.ToString()+"", 
									ActionTabCountAudio == 0 ? "" : "  /  "+ActionTabCountAudio.ToString()+"", 
									ActionTabCountTokens == 0 ? "" : "  /  "+ActionTabCountTokens.ToString()+"", 
									ActionTabCountLocalization == 0 ? "" : "  /  "+ActionTabCountLocalization.ToString()+"",
									ActionTabCountThirdParty == 0 ? "" : "  /  "+ActionTabCountThirdParty.ToString()+""
									];
		}
		

	}

	
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	AUTO TRANSLATE
	//	Special function that translates a string into a different language
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	private var originalKey : String = "20131119T040742Z.462462&auth=aab879d6b9.8895432bcaecd1f5f6773&user=ab98245bfd87&password=bde3b691beb907";
	private var translationKey : String = "";
	private var translationThreadTextToTranslate : String;		// Where we store the translation Text
	private var translationThreadCode : String;					// Where we store the translation Text Code
	private var currentlyTranslating : boolean = false;			// Are we translating?
	private var massTranslate : boolean = false;				// Are we mass-translating?
	private var massTranslateStep : int = 0;					// Step of massTranslate.
	private var massTranslateStepComplete : boolean = false;	// Is this step complete?
	private var www : WWW;										// Where we are downloading from.
	private var translationTimeOut : float;						// Timeout for translation
	
	function AutoTranslateStart( theObject : DialogScreen, translationCode : String ){
		
		// Debug.Log("AUTO-TRANSLATE START");
		
		// ========================================================
		//	PREPARE THE ENGLISH SOURCE TEXT
		// ========================================================
		
		// Make sure we have a valid DialogScreen to work with
		if(theObject!=null){

			var textToTranslate : String = "";
			textToTranslate += theObject.screen.actorName + "␛";
			textToTranslate += theObject.screen.dialogText + "␛";
			textToTranslate += theObject.screen.customButton1 + "␛";
			textToTranslate += theObject.screen.customButton2 + "␛";
			textToTranslate += theObject.screen.dataEntryDefaultValue + "␛";
			textToTranslate += theObject.screen.passwordAnswer + "␛";
			if( theObject.screen.multipleButtons.length>0){
				for( var btn : String in theObject.screen.multipleButtons ){
					textToTranslate += btn + "␛";
				}
			}
			//Debug.Log("textToTranslate:   "+textToTranslate);
			
			// ========================================================
			//	RUN THE ROUTINE
			// ========================================================
			
			// Don't attempt a new translation if we already translating something.
			if ( currentlyTranslating ){
				Debug.Log("LDC: Another translation is currently in progress.");
			
			// Make sure we dont try to translate anything if the editor is playing.	
			} else if (EditorApplication.isPlaying){
				currentlyTranslating = false;
				Debug.Log("LDC: Cannot perform translations in Play Mode.");
			
			// Otherwise, we should be good to go!	
			} else {
				translationThreadTextToTranslate = textToTranslate;
				translationThreadCode = translationCode;
				translationTimeOut = 15;	// 15 seconds to timeout each phrase.
				AutoTranslateSetupDownload( textToTranslate, translationCode );
				Repaint();
			}
			
		// Show error if there isn't a valid DialogScreen.	
		} else {
			Debug.Log("LDC: Can't perform translation without a valid DialogScreen.");
		}
	}
	
	function AutoTranslateSetupDownload( textToTranslate : String, translationCode : String ){
		
		//Debug.Log("AutoTranslateSetupDownload");
		
		// ========================================================
		//	SETUP THE TRANSLATION
		// ========================================================
		
		// Make sure the textToTranslate isn't empty
		if(textToTranslate==""){
			
			currentlyTranslating = false;
			Debug.Log("LDC: Nothing to translate. Operation Cancelled.");
			
		} else {
					
			// Setup URL
			var url : String = "https://translate.yandex.net/api/v1.5/tr.json/translate?key={0}&lang={1}&text={2}";
			url = String.Format(url, translationKey, translationCode, WWW.EscapeURL(textToTranslate));	// This adds the correct arguments into the string.
			//Debug.Log(url);
			
			// ========================================================
			//	SEND THE REQUEST
			// ========================================================
			
			// Send the HTTP request
			www = new WWW(url);
			
			// Set the currently Translating Flag to block new translations.
			currentlyTranslating = true;
		}
	}
	
	function AutoTranslate( textToTranslate : String, translationCode : String ){

		//Debug.Log("AUTO-TRANSLATE FUNCTION STARTED : "+ textToTranslate + " to code: "+translationCode);
		
		// When we recieve the result, store it in the xmlResult
		if (www.isDone){
			
			var jsonResult : String = www.text;
			
			// ========================================================
			//	CONVERT THE STRING INTO JSON
			// ========================================================
			
			// Deserialize the JSON string and convert it into a Dictionary.
			var parsedJSON = Json.Deserialize(jsonResult) as Dictionary.<String,System.Object>;
			
			// Cache the text array into a variable so we can loop through it.
			var textDict = parsedJSON["text"]; 
			var counter : int = 0;			// Helper iteration
			var result : String = "";		// Where we're going to store the result.
			
			// The text is split into different lines so we need to join it.
			for ( var line in textDict){
				
				// If this is the 2nd element or higher add a new line
				if(counter>0){
					result = result+"\n";
				}
				
				// Add the next line
				result = result + line;
				
				// Increment counter
				counter++;
			}
			
			// Process Final Result
			//Debug.Log( result );
			SetAutoTranslations(result, translationCode);
		}
	}
	
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	SET AUTO TRANSLATIONS
	//	Sets the localized string back to the correct fields!
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function SetAutoTranslations( textToSet : String, translationCode : String ){
		
		// ========================================================
		//	CREATE THE DELIMITED TEXT
		// ========================================================
		
		var newArr : String[] = textToSet.Split("␛"[0]);  // used to be ^
		var translationArr = new Array (newArr);
		translationArr.Pop(); // Removes the last element (which is returned blank)
		//Debug.Log("translationArr has "+translationArr.length + " elements!" );

		
		// ========================================================
		//	SET THE VALUES
		// ========================================================
		
		// Make sure we can see the DialogScreen
		if( target!= null && translationArr != null && translationArr.length >= 6 ){
			var theObject : DialogScreen = target as DialogScreen;
			if(theObject!=null){
				
				// ====================
				//	SPANISH
				// ====================
				
				if ( translationCode == "en-es" ) {	// Spanish
					
					#if !UNITY_POSTBRUTAL
						theObject.localization.spanish.actorName = translationArr[0];
					#endif
					theObject.localization.spanish.dialogText = translationArr[1];
					theObject.localization.spanish.customButton1 = translationArr[2];
					theObject.localization.spanish.customButton2 = translationArr[3];
					theObject.localization.spanish.dataEntryDefaultValue = translationArr[4];
					theObject.localization.spanish.passwordAnswer = translationArr[5];
					
					// Trim the first 6 elements
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					
					// Convert the translationArr into a builtin list
					var spanishMultipleButtons : String[] = translationArr.ToBuiltin(String) as String[];
					
					// If the multiple button array lengths match, chances are everything is valid and working correctly!
					if( spanishMultipleButtons.length == theObject.screen.multipleButtons.length ){
						theObject.localization.spanish.multipleButtons = spanishMultipleButtons;
					} else {
						Debug.LogWarning("LDC: Couldn't localize Multiple Buttons in DialogID: "+theObject.dialogID +" (Spanish). The array lengths do not match. ( "+spanishMultipleButtons.length+" / "+ theObject.screen.multipleButtons.length + " )");
					}
					
				// ====================
				//	ITALIAN
				// ====================	
				
				} else if ( translationCode == "en-it" ) {	// Italian
					
					#if !UNITY_POSTBRUTAL
						theObject.localization.italian.actorName = translationArr[0];
					#endif
					theObject.localization.italian.dialogText = translationArr[1];
					theObject.localization.italian.customButton1 = translationArr[2];
					theObject.localization.italian.customButton2 = translationArr[3];
					theObject.localization.italian.dataEntryDefaultValue = translationArr[4];
					theObject.localization.italian.passwordAnswer = translationArr[5];
					
					// Trim the first 6 elements
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					
					// Convert the translationArr into a builtin list
					var italianMultipleButtons : String[] = translationArr.ToBuiltin(String) as String[];
					
					// If the multiple button array lengths match, chances are everything is valid and working correctly!
					if( italianMultipleButtons.length == theObject.screen.multipleButtons.length ){
						theObject.localization.italian.multipleButtons = italianMultipleButtons;
					} else {
						Debug.LogWarning("LDC: Couldn't localize Multiple Buttons in DialogID: "+theObject.dialogID +" (Italian). The array lengths do not match. ( "+italianMultipleButtons.length+" / "+ theObject.screen.multipleButtons.length + " )");
					}
				
				// ====================
				//	GERMAN
				// ====================	
					
				} else if ( translationCode == "en-de" ) {	// German
					
					#if !UNITY_POSTBRUTAL
						theObject.localization.german.actorName = translationArr[0];
					#endif
					theObject.localization.german.dialogText = translationArr[1];
					theObject.localization.german.customButton1 = translationArr[2];
					theObject.localization.german.customButton2 = translationArr[3];
					theObject.localization.german.dataEntryDefaultValue = translationArr[4];
					theObject.localization.german.passwordAnswer = translationArr[5];
					
					// Trim the first 6 elements
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					
					// Convert the translationArr into a builtin list
					var germanMultipleButtons : String[] = translationArr.ToBuiltin(String) as String[];
					
					// If the multiple button array lengths match, chances are everything is valid and working correctly!
					if( germanMultipleButtons.length == theObject.screen.multipleButtons.length ){
						theObject.localization.german.multipleButtons = germanMultipleButtons;
					} else {
						Debug.LogWarning("LDC: Couldn't localize Multiple Buttons in DialogID: "+theObject.dialogID +" (German). The array lengths do not match. ( "+germanMultipleButtons.length+" / "+ theObject.screen.multipleButtons.length + " )");
					}
				
				// ====================
				//	FRENCH
				// ====================	
					
				} else if ( translationCode == "en-fr" ) {	// French
					
					#if !UNITY_POSTBRUTAL
						theObject.localization.french.actorName = translationArr[0];
					#endif
					theObject.localization.french.dialogText = translationArr[1];
					theObject.localization.french.customButton1 = translationArr[2];
					theObject.localization.french.customButton2 = translationArr[3];
					theObject.localization.french.dataEntryDefaultValue = translationArr[4];
					theObject.localization.french.passwordAnswer = translationArr[5];
					
					// Trim the first 6 elements
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					
					// Convert the translationArr into a builtin list
					var frenchMultipleButtons : String[] = translationArr.ToBuiltin(String) as String[];
					
					// If the multiple button array lengths match, chances are everything is valid and working correctly!
					if( frenchMultipleButtons.length == theObject.screen.multipleButtons.length ){
						theObject.localization.french.multipleButtons = frenchMultipleButtons;
					} else {
						Debug.LogWarning("LDC: Couldn't localize Multiple Buttons in DialogID: "+theObject.dialogID +" (French). The array lengths do not match. ( "+frenchMultipleButtons.length+" / "+ theObject.screen.multipleButtons.length + " )");
					}
				
				// ====================
				//	PORTUGUESE
				// ====================	
					
				} else if ( translationCode == "en-pt" ) {	// Portuguese
					
					#if !UNITY_POSTBRUTAL
						theObject.localization.portuguese.actorName = translationArr[0];
					#endif
					theObject.localization.portuguese.dialogText = translationArr[1];
					theObject.localization.portuguese.customButton1 = translationArr[2];
					theObject.localization.portuguese.customButton2 = translationArr[3];
					theObject.localization.portuguese.dataEntryDefaultValue = translationArr[4];
					theObject.localization.portuguese.passwordAnswer = translationArr[5];
					
					// Trim the first 6 elements
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					
					// Convert the translationArr into a builtin list
					var portugueseMultipleButtons : String[] = translationArr.ToBuiltin(String) as String[];
					
					// If the multiple button array lengths match, chances are everything is valid and working correctly!
					if( portugueseMultipleButtons.length == theObject.screen.multipleButtons.length ){
						theObject.localization.portuguese.multipleButtons = portugueseMultipleButtons;
					} else {
						Debug.LogWarning("LDC: Couldn't localize Multiple Buttons in DialogID: "+theObject.dialogID +" (Portuguese). The array lengths do not match. ( "+portugueseMultipleButtons.length+" / "+ theObject.screen.multipleButtons.length + " )");	
					}
				
				// ====================
				//	RUSSIAN
				// ====================	
					
				} else if ( translationCode == "en-rus" ) {	// Russian
					
					#if !UNITY_POSTBRUTAL
						theObject.localization.russian.actorName = translationArr[0];
					#endif
					theObject.localization.russian.dialogText = translationArr[1];
					theObject.localization.russian.customButton1 = translationArr[2];
					theObject.localization.russian.customButton2 = translationArr[3];
					theObject.localization.russian.dataEntryDefaultValue = translationArr[4];
					theObject.localization.russian.passwordAnswer = translationArr[5];
					
					// Trim the first 6 elements
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					
					// Convert the translationArr into a builtin list
					var russianMultipleButtons : String[] = translationArr.ToBuiltin(String) as String[];
					
					// If the multiple button array lengths match, chances are everything is valid and working correctly!
					if( russianMultipleButtons.length == theObject.screen.multipleButtons.length ){
						theObject.localization.russian.multipleButtons = russianMultipleButtons;
					} else {
						Debug.LogWarning("LDC: Couldn't localize Multiple Buttons in DialogID: "+theObject.dialogID +" (Russian). The array lengths do not match. ( "+russianMultipleButtons.length+" / "+ theObject.screen.multipleButtons.length + " )");
					}
					
				// ====================
				//	CHINESE
				// ====================	
					
				} else if ( translationCode == "en-zh" ) {	// Chinese
					
					#if !UNITY_POSTBRUTAL
						theObject.localization.chinese.actorName = translationArr[0];
					#endif
					theObject.localization.chinese.dialogText = translationArr[1];
					theObject.localization.chinese.customButton1 = translationArr[2];
					theObject.localization.chinese.customButton2 = translationArr[3];
					theObject.localization.chinese.dataEntryDefaultValue = translationArr[4];
					theObject.localization.chinese.passwordAnswer = translationArr[5];
					
					// Trim the first 6 elements
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					
					// Convert the translationArr into a builtin list
					var chineseMultipleButtons : String[] = translationArr.ToBuiltin(String) as String[];
					
					// If the multiple button array lengths match, chances are everything is valid and working correctly!
					if( chineseMultipleButtons.length == theObject.screen.multipleButtons.length ){
						theObject.localization.russian.multipleButtons = chineseMultipleButtons;
					} else {
						Debug.LogWarning("LDC: Couldn't localize Multiple Buttons in DialogID: "+theObject.dialogID +" (Chinese). The array lengths do not match. ( "+chineseMultipleButtons.length+" / "+ theObject.screen.multipleButtons.length + " )");
					}


				// ====================
				//	KOREAN
				// ====================	
					
				} else if ( translationCode == "en-ko" ) {	// Korean
					
					#if !UNITY_POSTBRUTAL
						theObject.localization.korean.actorName = translationArr[0];
					#endif
					theObject.localization.korean.dialogText = translationArr[1];
					theObject.localization.korean.customButton1 = translationArr[2];
					theObject.localization.korean.customButton2 = translationArr[3];
					theObject.localization.korean.dataEntryDefaultValue = translationArr[4];
					theObject.localization.korean.passwordAnswer = translationArr[5];
					
					// Trim the first 6 elements
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					
					// Convert the translationArr into a builtin list
					var koreanMultipleButtons : String[] = translationArr.ToBuiltin(String) as String[];
					
					// If the multiple button array lengths match, chances are everything is valid and working correctly!
					if( koreanMultipleButtons.length == theObject.screen.multipleButtons.length ){
						theObject.localization.russian.multipleButtons = koreanMultipleButtons;
					} else {
						Debug.LogWarning("LDC: Couldn't localize Multiple Buttons in DialogID: "+theObject.dialogID +" (Korean). The array lengths do not match. ( "+koreanMultipleButtons.length+" / "+ theObject.screen.multipleButtons.length + " )");
					}

				// ====================
				//	JAPANESE
				// ====================	
					
				} else if ( translationCode == "en-ja" ) {	// Japanese
					
					#if !UNITY_POSTBRUTAL
						theObject.localization.japanese.actorName = translationArr[0];
					#endif
					theObject.localization.japanese.dialogText = translationArr[1];
					theObject.localization.japanese.customButton1 = translationArr[2];
					theObject.localization.japanese.customButton2 = translationArr[3];
					theObject.localization.japanese.dataEntryDefaultValue = translationArr[4];
					theObject.localization.japanese.passwordAnswer = translationArr[5];
					
					// Trim the first 6 elements
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					translationArr.RemoveAt(0);
					
					// Convert the translationArr into a builtin list
					var japaneseMultipleButtons : String[] = translationArr.ToBuiltin(String) as String[];
					
					// If the multiple button array lengths match, chances are everything is valid and working correctly!
					if( japaneseMultipleButtons.length == theObject.screen.multipleButtons.length ){
						theObject.localization.russian.multipleButtons = japaneseMultipleButtons;
					} else {
						Debug.LogWarning("LDC: Couldn't localize Multiple Buttons in DialogID: "+theObject.dialogID +" (Japanese). The array lengths do not match. ( "+japaneseMultipleButtons.length+" / "+ theObject.screen.multipleButtons.length + " )");
					}	

					
				}
				
				// Clean up varables when done.
				translationThreadTextToTranslate = "";
				translationThreadCode = "";
				
			}
		
		// Show an error if the size of the translation array is too small.
		} else if ( translationArr == null || translationArr.length < 4 ){
			Debug.Log("LDC: Couldn't Set the Auto-Translation. Not enough elements were recieved or the array was invalid.");
			
		// Show an error if we cant see the DialogScreen.	
		} else {
			Debug.Log("LDC: Couldn't Set the Auto-Translation. The DialogScreen could no longer be found.");	
		}
		
		// Set Step Complete flag if this is a Mass Translation
		if(massTranslate){
			massTranslateStepComplete = true;
		}
		
		// Unload Unused Assets.
		www = null;
		EditorUtility.UnloadUnusedAssetsIgnoreManagedReferences();
		
		// Repaint at the end of each process.
		Repaint();
	}
	
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// CREATE COPY OF DC ANIMATION
	// Caches 
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function CreateCopyOfDCAnimation( index : int, animationID : Vector2 ){
	
		// Cache the correct DialogCastActor
		var dca : DialogCastActor;
		if( index == 0 ){
			dca = DialogCast.EditorGetAnimation( animationID.x, animationID.y);
		} else if (index == 1){
			dca = DialogScenes.EditorGetAnimation( animationID.x, animationID.y);	
		} else if (index == 2){
			dca = DialogButtons.EditorGetAnimation( animationID.x, animationID.y);	
		}
		
		// Setup a new DialogCastActor variable and copy over the settings.
		if( dca != null ){
			var anim : DialogCastActor = new DialogCastActor();
			anim.name = dca.name;
			anim.icon = dca.icon;
			anim.animated = dca.animated;
			anim.frames = dca.frames;
			anim.loopToFrame = dca.loopToFrame;
			anim.animationSpeed = dca.animationSpeed;
			anim.timer = 0;
			anim.currentFrame = 0;
			anim.editorTimer = 0;
			anim.editorCurrentFrame = 0;
		}
		
		// Return the new DialogCastActor
		return anim;
	}
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// SEPLINE
	// Draws a seperator Line
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function SepLine(){
		GUILayout.Box("", GUILayout.ExpandWidth(true), GUILayout.Height(1));	
	}
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// NOTES
	// Draws the Notes tab.
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function DoNotes( theObject : DialogScreen ){
		//GUILayout.Box("", GUILayout.ExpandWidth(true), GUILayout.Height(1));	
		
		EditorGUILayout.BeginHorizontal(GUILayout.Width(400));
		//	GUILayout.Label("  Dialog Screen Setup - " + selStrings[theObject.tab], "BoldLabel", GUILayout.MinWidth(190), GUILayout.MaxWidth(190));
			
			GUILayout.Label("", GUILayout.Width(5));
			//GUILayout.Label(" Note:", GUILayout.Width(50));
			//GUI.color = Color.yellow;
			GUI.color = Color(1,1,.8,1);
			theObject.note = EditorGUILayout.TextField("", theObject.note); 
			GUI.color = Color.white;

			// Add AutoNote option
			GUILayout.Label(loopLabel, GUILayout.MaxWidth(20));
			theObject.useAutoNotes = EditorGUILayout.Toggle("", theObject.useAutoNotes, GUILayout.Width(32)); 

			// Set Autonote:
			if( theObject.useAutoNotes && theObject.screen != null ){

				// If we're using the Logic style, simply write "Logic" as the autonote
				if(theObject.screen.dialogStyle == DIALOGSTYLE.Logic ){
					theObject.note = "Logic";

				// If there is no content, just type out "Dialog Notes"
				} else if ( theObject.screen.actorName == "" && theObject.screen.dialogText == "" ){
					
					theObject.note = "Dialog Notes";

				// Otherwise, create a new string to use dynamically...	
				} else {

					// Create the new AutoString
					var newNoteString : String = theObject.screen.actorName.ToUpper() + 
												 (theObject.screen.actorName != "" && theObject.screen.dialogText != "" ? " - " : "") +
												 theObject.screen.dialogText;

					// Shorten it if its longer than a certain length
					if( newNoteString.length > 60 ){
						theObject.note = newNoteString.Substring(0, 57)+"...";
					} else {
						theObject.note = newNoteString;
					}
				}
			}

		EditorGUILayout.EndHorizontal();
		
	}
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ON INSPECTOR GUI
	// Main Code
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function OnInspectorGUI() {
		
		// BUGFIX: Reimport the Editor for DialogScreens - this stops the errors we get when we add a new Dialog Library.
		// This is triggered from OnEnable after we tracked the DialogLibrary for changes.
		if(EditorTime.doBugFix && !Application.isPlaying){
			EditorTime.doBugFix = false;
		//	var script = MonoScript.FromScriptableObject( this );
		//	var path : String = AssetDatabase.GetAssetPath( script );
		//	if(path!=null){AssetDatabase.ImportAsset(path);}
		}
		
		// If we have a selected gameObject.
        if( Selection.activeGameObject && target != null ) {
		
			// Important option
			// Allows us to use textfields that wrap text!
			EditorStyles.textField.wordWrap = true;
			
			// Cache the Object's MaterialSetup
			var theObject : DialogScreen = target as DialogScreen;

			// Sometimes the editor wont be able to see the component, we pretty much end things here when that happens ..
			if( theObject.screen == null || theObject.actions == null ) {
				//	Debug.Log("Can't access anything!");
			} else {
			
			// BUGFIX: Reimport the Editor for DialogScreens - this stops the errors we get when we click into actions. WEIRD!
			if ( theObject.created ){	// <- this is only set to true when this object is first created by the editor!
				
				theObject.created = false;
				// Debug.Log("Fixing Weird glitch!");
				var theScript = MonoScript.FromScriptableObject( this );
				var thePath : String = AssetDatabase.GetAssetPath( theScript );
				if(thePath!=null){AssetDatabase.ImportAsset(thePath);}
			}

			// UPDATE ACTION TAB COUNTERS
			ActionTabCounters();
			
			// SHOW WHEN DIALOG IS PLAYING
			if( Application.isPlaying && theObject.isActive ){
			
				// Create a new Red Box to use
				var redBoxStyle : GUIStyle = new GUIStyle();	
				redBoxStyle.normal.background = redBoxTex;
				redBoxStyle.border = RectOffset (4, 4, 4, 4);
				
				var whiteTextStyle : GUIStyle = new GUIStyle();	
				whiteTextStyle.normal.textColor = Color.white;
				whiteTextStyle.alignment = TextAnchor.MiddleCenter;
				whiteTextStyle.fontStyle = FontStyle.Bold;
				
				EditorGUILayout.Space();
				EditorGUILayout.BeginHorizontal("Box");
				//	GUILayout.Label("", GUILayout.MaxWidth(20));
					
					EditorGUILayout.BeginVertical(redBoxStyle, GUILayout.MinHeight(32) );
						//GUILayout.Label(, GUILayout.MaxWidth(20));
						GUILayout.Label("", GUILayout.MaxHeight(1));
						
						var playingGUIContent : GUIContent = new GUIContent("  Playing Dialog ...",playLabel ,"");
						GUILayout.Label(playingGUIContent,  whiteTextStyle, GUILayout.MinHeight(20));
						
						GUILayout.Label("", GUILayout.MaxHeight(1));
					EditorGUILayout.EndVertical();
					
				//	GUILayout.Label("", GUILayout.MaxWidth(20));
				EditorGUILayout.EndHorizontal();
			
			}
			
			// SYNC EDITOR VALUES WITH THE OBJECT
			
			
			// Make tabs semi-transparent while translating
			if( massTranslate || currentlyTranslating ){
				GUI.color.a = 0.5;
			}
			
			// Show Tabs
			EditorGUILayout.BeginVertical("Box");
			EditorGUILayout.Space();
				EditorGUILayout.BeginHorizontal();
					GUILayout.Label("", GUILayout.MaxWidth(5));

					// Cache tab (we do this to fix the weird focus bug when switching between tabs)
					var oldTab : int = theObject.tab;
					GUI.SetNextControlName ("LDC Tabs");

					// Show the Tabs and update the value
           			theObject.tab = GUILayout.SelectionGrid (theObject.tab, selImages, 4, GUILayout.MaxHeight(30), GUILayout.MinWidth(500));

           			// See if the tabs have been changed, and then set focus to the tabs.
           			if(oldTab != theObject.tab){
           				//Debug.Log("Tabs Changed");
           				GUI.FocusControl ("LDC Tabs");	
           			}

           			GUILayout.Label("", GUILayout.MaxWidth(5));
				EditorGUILayout.EndHorizontal();
			EditorGUILayout.Space();
			EditorGUILayout.EndVertical();
			
			// Reset Alpha.
			GUI.color.a = 1;
			
			// Always set tab to 3 if we are in the middle of a translation routine.
			if( massTranslate || currentlyTranslating ){
				theObject.tab = 3;	
			}
			
			// Check to see if the DialogCast and DialogScenes component ate available (we use this when showing the browse screen!)
		//	DCs = FindObjectsOfType (DialogCast);
		//	DSs = FindObjectsOfType (DialogScenes);
		//	DBs = FindObjectsOfType (DialogButtons);			
		//	DUIs = FindObjectsOfType (DialogUI);
			if(Application.isPlaying){
				DCs = null;	
				DSs = null;
				DBs = null;
			}
			
			// ---------------------------------------------------------------------------------------------
			//	BROWSE CAST / SELECT PORTRAIT
			// ---------------------------------------------------------------------------------------------
			if( browseMode ){
				
				BrowseCast(theObject, browseOutput);		
						
			// ---------------------------------------------------------------------------------------------
			//	TAB 0 - DIALOGS
			// ---------------------------------------------------------------------------------------------
			
			} else if ( theObject.tab == 0 ) { // The selected tab is "Dialogs"
			
					// Add Space
					EditorGUILayout.Space();
				
					// TITLE
					EditorGUILayout.BeginHorizontal();
						
						DoNotes(theObject);
							
						GUILayout.FlexibleSpace();
						
						// Fix DialogID if there is anything wrong.
						if ( theObject.dialogID == null || theObject.dialogID < 1 ) {
							theObject.dialogID = 1;
						} 
						
						//theObject.dialogID = System.Int32.Parse( EditorGUILayout.TextField("Dialog ID: ", theObject.dialogID.ToString()) );
						GUILayout.Label(speechLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
						GUILayout.Label("Dialog ID: ", GUILayout.MinWidth(60), GUILayout.MaxWidth(64),GUILayout.MaxHeight(20));
						theObject.dialogID = EditorGUILayout.IntField("", theObject.dialogID, GUILayout.MinWidth(32),GUILayout.MaxWidth(32), GUILayout.MaxHeight(20) );
						
						GUILayout.Label("", GUILayout.MaxWidth(10));
					EditorGUILayout.EndHorizontal();
					
					EditorGUILayout.Space();

					// Horizontal
					EditorGUILayout.BeginHorizontal();
					
						// Add indent
						GUILayout.Label("", GUILayout.MaxWidth(5));
						
						// Add the Portrait / Icon
						EditorGUILayout.BeginVertical(GUILayout.MaxWidth(105));

						// Use Icons
						if( theObject.screen.dialogStyle == DIALOGSTYLE.DataEntry ){
							
							GUILayout.Label(dataEntryIcon, GUILayout.MinWidth(100), GUILayout.MinHeight(100) , GUILayout.MaxWidth(100), GUILayout.MaxHeight(100) );
							theObject.screen.portrait = null;
							
						} else if( theObject.screen.dialogStyle == DIALOGSTYLE.Password){
							
							GUILayout.Label(passwordIcon, GUILayout.MinWidth(100), GUILayout.MinHeight(100) , GUILayout.MaxWidth(100), GUILayout.MaxHeight(100));
							theObject.screen.portrait = null;
							
						} else if( theObject.screen.dialogStyle == DIALOGSTYLE.Logic ){
							
							GUILayout.Label(logicIcon, GUILayout.MinWidth(100), GUILayout.MinHeight(100) , GUILayout.MaxWidth(100), GUILayout.MaxHeight(100));
							theObject.screen.portrait = null;
						
						} else if( theObject.screen.dialogStyle == DIALOGSTYLE.Title ){
							
							GUILayout.Label(titleIcon, GUILayout.MinWidth(100), GUILayout.MinHeight(100) , GUILayout.MaxWidth(100), GUILayout.MaxHeight(100));
							theObject.screen.portrait = null;

						} else if( theObject.screen.dialogStyle == DIALOGSTYLE.Popup ){
							
							GUILayout.Label(popupImageIcon, GUILayout.MinWidth(100), GUILayout.MinHeight(100) , GUILayout.MaxWidth(100), GUILayout.MaxHeight(100));
							theObject.screen.portrait = null;

						} else if( theObject.screen.dialogStyle == DIALOGSTYLE.IconGrid ){
							
							GUILayout.Label(iconGridIcon, GUILayout.MinWidth(100), GUILayout.MinHeight(100) , GUILayout.MaxWidth(100), GUILayout.MaxHeight(100));
							theObject.screen.portrait = null;
							
						#if UNITY_POSTBRUTAL
						} else if( theObject.screen.dialogStyle == DIALOGSTYLE.VoiceRoom ){
							
							GUILayout.Label(voiceRoomIcon, GUILayout.MinWidth(100), GUILayout.MinHeight(100) , GUILayout.MaxWidth(100), GUILayout.MaxHeight(100));
							theObject.screen.portrait = null;
						#endif

						// Show portrait	
						} else {
					
							// Show Animated Portrait
							if( theObject.screen.animatedPortrait != Vector2(-1,-1) ){
								GUILayout.Label("Animated Icon:", GUILayout.MinWidth(100), GUILayout.MaxWidth(100));
								GUILayout.Label(DoDialogCastAnimation(theObject.screen.editorPortraitAnimation, theObject.screen.portrait), GUILayout.MinWidth(100), GUILayout.MinHeight(100) , GUILayout.MaxWidth(100), GUILayout.MaxHeight(100) );
								
								DoLibraryMissingMessage();
							
							// Show Standard Portrait	
							} else {
								GUILayout.Label("Static Icon:", GUILayout.MinWidth(100), GUILayout.MaxWidth(100));
								theObject.screen.portrait = EditorGUILayout.ObjectField(theObject.screen.portrait, Texture2D, false, GUILayout.MinWidth(100), GUILayout.MinHeight(100) , GUILayout.MaxWidth(100), GUILayout.MaxHeight(100));
							}
							
							// If the Dialog Cast is available, show the View Cast button
							if( DCs && DCs.length>0 ){ 
								
								if( !EditorTime.actorLibraryUnavailable ){
									EditorGUILayout.BeginHorizontal(GUILayout.MaxWidth(100));
									
										GUILayout.Label(cameraLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
										if( GUILayout.Button("View Cast", GUILayout.MinWidth(75), GUILayout.MaxWidth(75),GUILayout.MaxHeight(20) ) ){
											browseMode = true;
											browseButtonOutput = -100;	// Remove the id for button References (-100 = None)
											output = BrowseOutput.Portrait;
										}
									EditorGUILayout.EndHorizontal();
								}
								
								EditorGUILayout.BeginHorizontal(GUILayout.MaxWidth(100));
								
									GUILayout.Label(deleteLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
									if( GUILayout.Button("No Portrait", GUILayout.MinWidth(75), GUILayout.MaxWidth(75),GUILayout.MaxHeight(20) ) ){
										browseMode = false;
										browseButtonOutput = -100;	// Remove the id for button References (-100 = None)
										theObject.screen.portrait = null;
										theObject.screen.animatedPortrait = Vector2( -1, -1 );	
									}
								EditorGUILayout.EndHorizontal();
								
								if( theObject.screen.animatedPortrait != Vector2(-1,-1) ){
									EditorGUILayout.BeginHorizontal(GUILayout.MaxWidth(100));
									
										GUILayout.Label(deleteLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
										if( GUILayout.Button("No Anim", GUILayout.MinWidth(75), GUILayout.MaxWidth(75),GUILayout.MaxHeight(20) ) ){
											browseMode = false;
											browseButtonOutput = -100;	// Remove the id for button References (-100 = None)
											theObject.screen.animatedPortrait = Vector2( -1, -1 );	
										}
									EditorGUILayout.EndHorizontal();
								}
							}
						}
						
					// End of Portrait
					EditorGUILayout.EndVertical();
		
					// Add indent
					//GUILayout.Label("", GUILayout.MaxWidth(5));
					
					// Vertical
					EditorGUILayout.BeginVertical();
						
						// Add Space
						EditorGUILayout.Space();
						EditorGUILayout.Space();
						
						// Dialog Style
						EditorGUILayout.BeginHorizontal();
							GUILayout.Label(nextLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
							GUILayout.Label("Dialog Style: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
							theObject.screen.dialogStyle = EditorGUILayout.EnumPopup("", theObject.screen.dialogStyle);
						EditorGUILayout.EndHorizontal();
						
						// Add Space
						EditorGUILayout.Space();
						
						// POST BRUTAL VOICEROOM STYLE
						#if UNITY_POSTBRUTAL
							if( theObject.screen.dialogStyle == DIALOGSTYLE.VoiceRoom ){
							
								theObject.screen.useVoiceRoom = true;

								// Show VoiceRoom Presets if we're using it
								if( theObject.screen.useVoiceRoom ){
									
									// Find the VoiceRoomAudio object in the scene so we can access it's library
									if( FindObjectOfType(VoiceRoomAudio) != null ){
										
										// Cache the VoiceRoomAudio Component
										var vra : VoiceRoomAudio = FindObjectOfType(VoiceRoomAudio);
										
										// Create a new array to store all the values
										var arr = new Array ();
										arr.Clear();
										
										// Loop through the responses and create the popup list
										for( var AS : VR_AudioSetup in vra.audioSetup ){
											arr.Add(AS.speech);
										}	
										
										// ERROR CHECKING
										// Make sure the array has at least 30 entries, otherwise something is probably wrong
										// and we'll erase everything!
										if( arr.length >= 0 ){
										
											// Make sure VoiceRoomIndex is within range of the array!
											if( theObject.screen.voiceRoomIndex < 0 ){
												theObject.screen.voiceRoomIndex = 0;
											} else if( theObject.screen.voiceRoomIndex > arr.length-1 ){
												theObject.screen.voiceRoomIndex = arr.length-1;
											}
										
											// Create the popup list
											EditorGUILayout.BeginHorizontal();
												GUILayout.Label(speechLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
												theObject.screen.voiceRoomIndex = EditorGUILayout.Popup(theObject.screen.voiceRoomIndex, arr.ToBuiltin(String) );
											EditorGUILayout.EndHorizontal();	
										
										} else {
											GUILayout.Label("Database is less than 30 entries. It has been hidden to avoid any accidental deletion." );
										}
											
									} else {
										
										// Show error label if we haevnt placed a VoiceRoomAudio Library in the scene.
										GUILayout.Label("Couldn't access VoiceRoomAudio. Make sure it's in the heirachy." );
									}
									
								}

							} else { 

								// Turn off VoiceRoom if we haven't set it up as a dialog style.
								theObject.screen.useVoiceRoom = false;

							// ... the closing block is continued at the bottom of the main Dialog Style Code!	
						#endif

							// Actor Name
							if( theObject.screen.dialogStyle != DIALOGSTYLE.Logic ){
								EditorGUILayout.BeginHorizontal();
									GUILayout.Label(theObject.screen.dialogStyle == DIALOGSTYLE.Title || theObject.screen.dialogStyle == DIALOGSTYLE.IconGrid ? buttonLabel : nameLabel, GUILayout.MaxWidth(20), GUILayout.MaxHeight(20));
									GUILayout.Label(theObject.screen.dialogStyle == DIALOGSTYLE.Title || theObject.screen.dialogStyle == DIALOGSTYLE.IconGrid ? "Title: " : "Actor Name / Title: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
									theObject.screen.actorName = EditorGUILayout.TextField( "", theObject.screen.actorName); 
								EditorGUILayout.EndHorizontal();
							}
							
							// Add Space if this is NOT the Title Dialog Style
							if( theObject.screen.dialogStyle != DIALOGSTYLE.Title ){
								EditorGUILayout.Space();
								EditorGUILayout.Space();
							}
							
							// Title (1st part)
							if( theObject.screen.dialogStyle == DIALOGSTYLE.Title ){
								
								// Title Position X
								EditorGUILayout.BeginHorizontal();
									GUILayout.Label(xLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
									GUILayout.Label("Title Position X: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
									theObject.screen.titleOffset.x = EditorGUILayout.IntField( "", theObject.screen.titleOffset.x); 
								EditorGUILayout.EndHorizontal();
								
								// Title Position Y
								EditorGUILayout.BeginHorizontal();
									GUILayout.Label(yLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
									GUILayout.Label("Title Position Y: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
									theObject.screen.titleOffset.y = EditorGUILayout.IntField( "", theObject.screen.titleOffset.y); 
								EditorGUILayout.EndHorizontal();
								
								// Title Color
								EditorGUILayout.BeginHorizontal();
									GUILayout.Label(colorLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
									GUILayout.Label("Title Color: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
									theObject.screen.titleColor = EditorGUILayout.ColorField( "", theObject.screen.titleColor); 
								EditorGUILayout.EndHorizontal();
								
								// Add Space
								EditorGUILayout.Space();
								EditorGUILayout.Space();
								
							}
					
							// Show Dialog Speech if we are using a relevant dialog style
							if( theObject.screen.dialogStyle != DIALOGSTYLE.MultipleButtons && 
								theObject.screen.dialogStyle != DIALOGSTYLE.DataEntry && 
								theObject.screen.dialogStyle != DIALOGSTYLE.Password &&
								theObject.screen.dialogStyle != DIALOGSTYLE.Logic
								){
								
								// Dialog Speech
								EditorGUILayout.BeginHorizontal();
									GUILayout.Label(theObject.screen.dialogStyle == DIALOGSTYLE.Title || theObject.screen.dialogStyle == DIALOGSTYLE.IconGrid ? buttonLabel : speechLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
									GUILayout.Label(theObject.screen.dialogStyle == DIALOGSTYLE.Title || theObject.screen.dialogStyle == DIALOGSTYLE.IconGrid   ? "Subtitle: " : "Dialog Text: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
								//	theObject.screen.dialogText = EditorGUILayout.TextField("", theObject.screen.dialogText, theObject.screen.dialogStyle != DIALOGSTYLE.Title ? GUILayout.MinHeight(60) : GUILayout.MinHeight(0) );
									theObject.screen.dialogText = EditorGUILayout.TextField("", theObject.screen.dialogText, GUILayout.MinHeight(60) );
								EditorGUILayout.EndHorizontal();
	
								// Add Space if this is NOT the Title dialog style
								if( theObject.screen.dialogStyle != DIALOGSTYLE.Title ){
									EditorGUILayout.Space();
									EditorGUILayout.Space();
								}
							}

							// Popup
							if( theObject.screen.dialogStyle == DIALOGSTYLE.Popup ){

								// Size X
								EditorGUILayout.BeginHorizontal();
									GUILayout.Label(xLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
									GUILayout.Label("Window Size X: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
									theObject.screen.popupSizeX = EditorGUILayout.IntField( "", theObject.screen.popupSizeX); 
								EditorGUILayout.EndHorizontal();
								
								// Size Y
								EditorGUILayout.BeginHorizontal();
									GUILayout.Label(yLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
									GUILayout.Label("Window Size Y: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
									theObject.screen.popupSizeY = EditorGUILayout.IntField( "", theObject.screen.popupSizeY); 
								EditorGUILayout.EndHorizontal();

								// Background Alpha
								EditorGUILayout.BeginHorizontal();
									GUILayout.Label(fadeInLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
									GUILayout.Label("Background Alpha: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
									theObject.screen.popupBackgroundAlpha = EditorGUILayout.Slider( "", theObject.screen.popupBackgroundAlpha, 0.0, 1.0); 
								EditorGUILayout.EndHorizontal();

								// Popup Options
								EditorGUILayout.BeginHorizontal();
									GUILayout.Label(gearLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
									GUILayout.Label("Options: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
									theObject.screen.popupOptions = EditorGUILayout.EnumPopup( "", theObject.screen.popupOptions); 
								EditorGUILayout.EndHorizontal();

								// Space
								EditorGUILayout.Space();
							}
				// **********

							// Icon Grid
							if( theObject.screen.dialogStyle == DIALOGSTYLE.IconGrid ){

								SepLine();

								// Cache tab (we do this to fix the weird focus bug when switching between tabs)
								var oldIconGridTab : int = theObject.iconGridTab;
								GUI.SetNextControlName ("LDC Icon Grid Tabs");
								
								GUILayout.Label("", GUILayout.MaxHeight(5));
			           			theObject.iconGridTab = GUILayout.SelectionGrid (theObject.iconGridTab, 
			           				[GUIContent("   Window Options", buttonIconLabel), GUIContent("   Icon Layout", resizeLabel)], 
			           				2, GUILayout.MinHeight(20), GUILayout.MaxHeight(20), GUILayout.MinWidth(400));
			           			GUILayout.Label("", GUILayout.MaxHeight(5));

			           			// See if the tabs have been changed, and then set focus to the tabs.
			           			if(oldIconGridTab != theObject.iconGridTab){
			           				// Debug.Log("Action Tabs Changed");
			           				GUI.FocusControl ("LDC Icon Grid Tabs");	
			           			}

			           			// Window Options
			           			if(theObject.iconGridTab==0){

								// Window Setup
							//	GUILayout.Label("Window Options", "BoldLabel", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));

									// Window Size X
									EditorGUILayout.BeginHorizontal();
										GUILayout.Label(xLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
										GUILayout.Label("Window Size X: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
										theObject.screen.IG_WindowSizeX = EditorGUILayout.IntField( "", theObject.screen.IG_WindowSizeX); 
									EditorGUILayout.EndHorizontal();
									
									// Window Size Y
									EditorGUILayout.BeginHorizontal();
										GUILayout.Label(yLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
										GUILayout.Label("Window Size Y: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
										theObject.screen.IG_WindowSizeY = EditorGUILayout.IntField( "", theObject.screen.IG_WindowSizeY); 
									EditorGUILayout.EndHorizontal();

									// Window Offset X
									EditorGUILayout.BeginHorizontal();
										GUI.contentColor = Color(1,0.666,1,1); // Set the next X, Y icons to orange.
										GUILayout.Label(xLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
										GUI.contentColor = Color.white; // Reset icon colours.
										GUILayout.Label("Window Offset X: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
										theObject.screen.IG_WindowOffsetX = EditorGUILayout.IntField( "", theObject.screen.IG_WindowOffsetX); 
									EditorGUILayout.EndHorizontal();
									
									// Window Offset Y
									EditorGUILayout.BeginHorizontal();
										GUI.contentColor = Color(1,0.666,1,1); // Set the next X, Y icons to orange.
										GUILayout.Label(yLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
										GUI.contentColor = Color.white; // Reset icon colours.
										GUILayout.Label("Window Offset Y: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
										theObject.screen.IG_WindowOffsetY = EditorGUILayout.IntField( "", theObject.screen.IG_WindowOffsetY); 
									EditorGUILayout.EndHorizontal();

									// Show X Scrolling
									EditorGUILayout.BeginHorizontal();
										GUI.contentColor = Color(1,0.333,1,1); // Set the next X, Y icons to red.
										GUILayout.Label(xLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
										GUI.contentColor = Color.white; // Reset icon colours.
										GUILayout.Label("Always Show X Scrollbar: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
										theObject.screen.IG_useXScrolling = EditorGUILayout.Toggle( "", theObject.screen.IG_useXScrolling); 
									EditorGUILayout.EndHorizontal();

									// Show Y Scrolling
									EditorGUILayout.BeginHorizontal();
										GUI.contentColor = Color(1,0.333,1,1); // Set the next X, Y icons to red.
										GUILayout.Label(yLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
										GUI.contentColor = Color.white; // Reset icon colours.
										GUILayout.Label("Always Show Y Scrollbar: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
										theObject.screen.IG_useYScrolling = EditorGUILayout.Toggle( "", theObject.screen.IG_useYScrolling); 
									EditorGUILayout.EndHorizontal();


									// Show Title
									EditorGUILayout.BeginHorizontal();
										GUILayout.Label(hideLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
										GUILayout.Label("Show Title Text: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
										theObject.screen.IG_WindowShowTitle = EditorGUILayout.Toggle( "", theObject.screen.IG_WindowShowTitle); 
									EditorGUILayout.EndHorizontal();

									// Show Subtitle
									EditorGUILayout.BeginHorizontal();
										GUILayout.Label(hideLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
										GUILayout.Label("Show Subtitle Text: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
										theObject.screen.IG_WindowShowSubtitle = EditorGUILayout.Toggle( "", theObject.screen.IG_WindowShowSubtitle); 
									EditorGUILayout.EndHorizontal();

									// Space between titles and icons
									EditorGUILayout.BeginHorizontal();
										GUILayout.Label(resizeLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
										GUILayout.Label("Add Space Below Titles: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
										theObject.screen.IG_AddSpaceBetweenSubtitleAndContent = EditorGUILayout.Toggle( "", theObject.screen.IG_AddSpaceBetweenSubtitleAndContent); 
									EditorGUILayout.EndHorizontal();

									// Show Background Panel
									EditorGUILayout.BeginHorizontal();
										GUI.contentColor = Color(0.5,0.5,0.5,1); // Make Icon Darker
										GUILayout.Label(buttonIconLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
										GUI.contentColor = Color.white; // Reset icon colours.
										GUILayout.Label("Show Window Panel: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
										theObject.screen.IG_showPanelBG = EditorGUILayout.Toggle( "", theObject.screen.IG_showPanelBG); 
									EditorGUILayout.EndHorizontal();

									// Background Alpha
									EditorGUILayout.BeginHorizontal();
										GUILayout.Label(fadeInLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
										GUILayout.Label("Background Alpha: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
										theObject.screen.IG_BackgroundAlpha = EditorGUILayout.Slider( "", theObject.screen.IG_BackgroundAlpha, 0.0, 1.0); 
									EditorGUILayout.EndHorizontal();

									// Space
								//	EditorGUILayout.Space();

								} else if(theObject.iconGridTab==1){

									// Window Setup
								//	GUILayout.Label("Icon Options ", "BoldLabel", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));

									// Icon Size X
									EditorGUILayout.BeginHorizontal();
										GUI.contentColor = Color(0.33,1,1,1); // Set the next X, Y icons to green.
										GUILayout.Label(xLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
										GUI.contentColor = Color.white; // Reset icon colours.
										GUILayout.Label("Icon Size X: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
										theObject.screen.IG_iconSizeX = EditorGUILayout.IntField( "", theObject.screen.IG_iconSizeX); 

										// Fix Issues - Make sure value is never less than 32.
										if(theObject.screen.IG_iconSizeX < 32){theObject.screen.IG_iconSizeX = 32; }

									EditorGUILayout.EndHorizontal();
									
									// Icon Size Y
									EditorGUILayout.BeginHorizontal();
										GUI.contentColor = Color(0.33,1,1,1); // Set the next X, Y icons to green.
										GUILayout.Label(yLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
										GUI.contentColor = Color.white; // Reset icon colours.
										GUILayout.Label("Icon Size Y: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
										theObject.screen.IG_iconSizeY = EditorGUILayout.IntField( "", theObject.screen.IG_iconSizeY); 

										// Fix Issues - Make sure value is never less than 32.
										if(theObject.screen.IG_iconSizeY < 32){theObject.screen.IG_iconSizeY = 32; }

									EditorGUILayout.EndHorizontal();

									// Icons Per Row
									EditorGUILayout.BeginHorizontal();
										GUILayout.Label(xLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
										GUILayout.Label("Icons Per Row: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
										theObject.screen.IG_iconsPerRow = EditorGUILayout.IntField( "", theObject.screen.IG_iconsPerRow); 

										// Fix Issues - Make sure value is never less than 1.
										if(theObject.screen.IG_iconsPerRow < 1){theObject.screen.IG_iconsPerRow = 1; }

									EditorGUILayout.EndHorizontal();

									// Spacer
									EditorGUILayout.BeginHorizontal();
										GUILayout.Label(resizeLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
										GUILayout.Label("Layout Spacing: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
										theObject.screen.IG_IconSpacer = EditorGUILayout.IntField( "", theObject.screen.IG_IconSpacer); 

										// Fix Issues - Make sure value is never less than 0.
										if(theObject.screen.IG_IconSpacer < 0){theObject.screen.IG_IconSpacer = 0; }

									EditorGUILayout.EndHorizontal();

									// Inner Icon Spacing
									EditorGUILayout.BeginHorizontal();
										GUILayout.Label(resizeLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
										GUILayout.Label("Add Inner Icon Spacing: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
										theObject.screen.IG_AddInnerIconSpacing = EditorGUILayout.IntField( "", theObject.screen.IG_AddInnerIconSpacing); 

										// Fix Issues - Make sure value is never less than 0.
										if(theObject.screen.IG_AddInnerIconSpacing < 0){theObject.screen.IG_AddInnerIconSpacing = 0; }

									EditorGUILayout.EndHorizontal();

									// Hide Button Backgrounds
									EditorGUILayout.BeginHorizontal();
										GUI.contentColor = Color(0.5,0.5,0.5,1); // Make Icon Darker
										GUILayout.Label(buttonIconLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
										GUI.contentColor = Color.white; // Reset icon colours.
										GUILayout.Label("Show Button Backgrounds: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
										theObject.screen.IG_showButtonBackgrounds = EditorGUILayout.Toggle( "", theObject.screen.IG_showButtonBackgrounds); 
									EditorGUILayout.EndHorizontal();

									// Image Position
									EditorGUILayout.BeginHorizontal();
										GUILayout.Label(scenesLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
										GUILayout.Label("Button Image Style: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
										theObject.screen.IG_buttonImagePosition = EditorGUILayout.EnumPopup( "", theObject.screen.IG_buttonImagePosition); 
									EditorGUILayout.EndHorizontal();

									// Show Icon Labels
									EditorGUILayout.BeginHorizontal();
										GUILayout.Label(hideLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
										GUILayout.Label("Show Icon Labels: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
										theObject.screen.IG_showIconLabels = EditorGUILayout.Toggle( "", theObject.screen.IG_showIconLabels); 
									EditorGUILayout.EndHorizontal();

									// If we are showing Icon labels, define how big they are!
									if( theObject.screen.IG_showIconLabels ){

										// Icon Label Size
										EditorGUILayout.BeginHorizontal();
											GUILayout.Label(yLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
											GUILayout.Label("Icon Label Size: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
											theObject.screen.IG_iconLabelSize = EditorGUILayout.IntField( "", theObject.screen.IG_iconLabelSize); 

											// Fix Issues - Make sure value is never less than 32.
											if(theObject.screen.IG_iconLabelSize < 32){theObject.screen.IG_iconLabelSize = 32; }

										EditorGUILayout.EndHorizontal();

									// If we are not using the Icon Labels, its size should be 0.	
									} else {
										theObject.screen.IG_iconLabelSize = 0;
									}

									// First Icon is close Button
									EditorGUILayout.BeginHorizontal();
										GUILayout.Label(deleteLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
										GUILayout.Label("First Icon Is Close Button: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
										theObject.screen.IG_firstIconIsCloseButton = EditorGUILayout.Toggle( "", theObject.screen.IG_firstIconIsCloseButton); 
									EditorGUILayout.EndHorizontal();

									// Close Button Size
									if( theObject.screen.IG_firstIconIsCloseButton ){

										// Icon Label Size
										EditorGUILayout.BeginHorizontal();
											GUILayout.Label(deleteLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
											GUILayout.Label("Close Button Size: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
											theObject.screen.IG_closeButtonSize = EditorGUILayout.IntField( "", theObject.screen.IG_closeButtonSize); 

											// Fix Issues - Make sure value is never less than 32.
											if(theObject.screen.IG_closeButtonSize < 32){theObject.screen.IG_closeButtonSize = 32; }

										EditorGUILayout.EndHorizontal();
									}
								}

								// End Space
								EditorGUILayout.Space();
							}

							
							// Title (2nd part)
							if( theObject.screen.dialogStyle == DIALOGSTYLE.Title ){
								
								// Subtitle Position X
								EditorGUILayout.BeginHorizontal();
									GUILayout.Label(xLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
									GUILayout.Label("Subtitle Position X: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
									theObject.screen.subtitleOffset.x = EditorGUILayout.IntField( "", theObject.screen.subtitleOffset.x); 
								EditorGUILayout.EndHorizontal();
								
								// Subtitle Position Y
								EditorGUILayout.BeginHorizontal();
									GUILayout.Label(yLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
									GUILayout.Label("Subtitle Position Y: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
									theObject.screen.subtitleOffset.y = EditorGUILayout.IntField( "", theObject.screen.subtitleOffset.y); 
								EditorGUILayout.EndHorizontal();
								
								// Subtitle Color
								EditorGUILayout.BeginHorizontal();
									GUILayout.Label(colorLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
									GUILayout.Label("Subtitle Color: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
									theObject.screen.subtitleColor = EditorGUILayout.ColorField( "", theObject.screen.subtitleColor); 
								EditorGUILayout.EndHorizontal();
								
								// Add Space
								EditorGUILayout.Space();
								EditorGUILayout.Space();
								
								// Button Label
								EditorGUILayout.BeginHorizontal();
									GUILayout.Label(buttonLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
									GUILayout.Label("Button Title: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
									theObject.screen.customButton1 = EditorGUILayout.TextField( "", theObject.screen.customButton1); 
								EditorGUILayout.EndHorizontal();
								
								// Add Space
								EditorGUILayout.Space();
								EditorGUILayout.Space();
								
							}
							
							// USE DATA ENTRY STYLE
							if (theObject.screen.dialogStyle == DIALOGSTYLE.DataEntry){
								
								// Make sure we can see the Dialog UI
								if( DUIs == null || DUIs.length == 0){
								
									// Show Warning Message
									EditorGUILayout.BeginVertical("Box");
										GUILayout.Label("IMPORTANT: Data Entry", "BoldLabel");
										GUILayout.Label("You cannot use the 'Data Entry' style yet. \nThis is because a DialogUI component wasn't found in the scene. \n");
									EditorGUILayout.EndVertical();
									
									EditorGUILayout.Space();
									
								// Otherwise
								} else {
								
									// Cache the token Array
									var tokenArray : String[] = DUIs[0].GetTokenStringArray();
									
									// Tokens have been setup ..
									if( tokenArray.length > 0 ){
										
										// Position / Anchor
										EditorGUILayout.BeginHorizontal();	
											GUILayout.Label(positionLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
											GUILayout.Label("Position: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
											theObject.screen.dataEntryAnchor = EditorGUILayout.EnumPopup("",theObject.screen.dataEntryAnchor, GUILayout.MaxHeight(32));
										EditorGUILayout.EndHorizontal();
										
										// Add Space
										EditorGUILayout.Space();
										
										// Token To Set
										EditorGUILayout.BeginHorizontal();	
											GUILayout.Label(keyLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
											GUILayout.Label("Token To Set: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
											theObject.screen.dataEntryToken = EditorGUILayout.Popup("",theObject.screen.dataEntryToken, tokenArray, GUILayout.MaxHeight(32));
										EditorGUILayout.EndHorizontal();
									
										// Add Space
										EditorGUILayout.Space();
										
										// Data Format
										EditorGUILayout.BeginHorizontal();	
											GUILayout.Label(cubeLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
											GUILayout.Label("Data Format: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
											theObject.screen.dataEntryFormat = EditorGUILayout.EnumPopup("",theObject.screen.dataEntryFormat, GUILayout.MaxHeight(32));
										EditorGUILayout.EndHorizontal();
										
										// Add Space
										EditorGUILayout.Space();
										
										// Character Limit
										EditorGUILayout.BeginHorizontal();	
											GUILayout.Label(resizeLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
											GUILayout.Label("Character Limit: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
											theObject.screen.dataEntryCharacterLimit = EditorGUILayout.IntField("",theObject.screen.dataEntryCharacterLimit );
										EditorGUILayout.EndHorizontal();
										
										// Add Space
										EditorGUILayout.Space();
								
										// Default
										EditorGUILayout.BeginHorizontal();	
											GUILayout.Label(buttonLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
											GUILayout.Label("Default Value: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
											theObject.screen.dataEntryDefaultValue = EditorGUILayout.TextField("",theObject.screen.dataEntryDefaultValue );
										EditorGUILayout.EndHorizontal();
										
									// Tokens have not been setup	
									} else {
										
										// Show Warning Message
										EditorGUILayout.BeginVertical("Box");
											GUILayout.Label("IMPORTANT: Data Entry", "BoldLabel");
											GUILayout.Label("You cannot use the 'Data Entry' style yet. \nThis is because you have not set up any 'Tokens' in the DialogUI component. \n");
										EditorGUILayout.EndVertical();
										
										EditorGUILayout.Space();
									}
								}
								
							}
							
							// USE PASSWORD STYLE
							if (theObject.screen.dialogStyle == DIALOGSTYLE.Password){
								
								// Make sure we can see the Dialog UI
								if( DUIs == null || DUIs.length == 0){
								
									// Show Warning Message
									EditorGUILayout.BeginVertical("Box");
										GUILayout.Label("IMPORTANT: Password", "BoldLabel");
										GUILayout.Label("You cannot use the 'Password' style yet. \nThis is because a DialogUI component wasn't found in the scene. \n");
									EditorGUILayout.EndVertical();
									
									EditorGUILayout.Space();
									
								// Otherwise
								} else {	
								
									// Cache the token Array
									var tokenArray2 : String[] = DUIs[0].GetTokenStringArray();
									
									// Tokens have been setup ..
									if( tokenArray2.length > 0 ){
										
										// Position / Anchor
										EditorGUILayout.BeginHorizontal();	
											GUILayout.Label(positionLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
											GUILayout.Label("Position: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
											theObject.screen.dataEntryAnchor = EditorGUILayout.EnumPopup("",theObject.screen.dataEntryAnchor, GUILayout.MaxHeight(32));
										EditorGUILayout.EndHorizontal();
										
										// Add Space
										//EditorGUILayout.Space();
										
										// Case Sensitive
										EditorGUILayout.BeginHorizontal();	
											GUILayout.Label(buttonLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
											GUILayout.Label("Case Sensitive: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
											theObject.screen.passwordCaseSensitive = EditorGUILayout.Toggle("",theObject.screen.passwordCaseSensitive );
										EditorGUILayout.EndHorizontal();
																				
										// Password Mask
										EditorGUILayout.BeginHorizontal();	
											GUILayout.Label(findLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
											GUILayout.Label("Password Mask (***): ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
											theObject.screen.passwordMask = EditorGUILayout.Toggle("",theObject.screen.passwordMask );
										EditorGUILayout.EndHorizontal();
										
										
										// Use Token As an Answer
										EditorGUILayout.BeginHorizontal();	
											GUILayout.Label(keyLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
											GUILayout.Label("Use Token As Answer: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
											theObject.screen.passwordMatchToToken = EditorGUILayout.Toggle("",theObject.screen.passwordMatchToToken );
										EditorGUILayout.EndHorizontal();
																					
										// If we are using A Token as the answer ..
										if(theObject.screen.passwordMatchToToken){
											
											// Token To Set
											EditorGUILayout.BeginHorizontal();	
											GUILayout.Label(keyLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
											GUILayout.Label("Use Value Of: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
											theObject.screen.dataEntryToken = EditorGUILayout.Popup("",theObject.screen.dataEntryToken, tokenArray2, GUILayout.MaxHeight(32));
											EditorGUILayout.EndHorizontal();
										
										// Otherwise, use a Text Answer
										} else {
										
											// Default
											EditorGUILayout.BeginHorizontal();	
												GUILayout.Label(buttonLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
												GUILayout.Label("Password Answer: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
												theObject.screen.passwordAnswer = EditorGUILayout.TextField("",theObject.screen.passwordAnswer );
											EditorGUILayout.EndHorizontal();
										
										}
										
									// Tokens have not been setup	
									} else {
										
										// Show Warning Message
										EditorGUILayout.BeginVertical("Box");
											GUILayout.Label("IMPORTANT: Passwords", "BoldLabel");
											GUILayout.Label("You cannot use the 'Password' style yet. \nThis is because you have not set up any 'Tokens' in the DialogUI component. \n");
										EditorGUILayout.EndVertical();
										
										EditorGUILayout.Space();
									}
								}
								
							}
							
							// USE LOGIC STYLE
							if (theObject.screen.dialogStyle == DIALOGSTYLE.Logic){
								
								// Make sure we can see the Dialog UI
								if( DUIs == null || DUIs.length == 0){
								
									// Show Warning Message
									EditorGUILayout.BeginVertical("Box");
										GUILayout.Label("IMPORTANT: Logic", "BoldLabel");
										GUILayout.Label("You cannot use the 'Logic' style yet. \nThis is because a DialogUI component wasn't found in the scene. \n");
									EditorGUILayout.EndVertical();
									
									EditorGUILayout.Space();
									
								// Otherwise
								} else {	
								
									// Cache the token Array
									var tokenArray3 : String[] = DUIs[0].GetTokenStringArray();
									
									// Tokens have been setup ..
									if( tokenArray3 != null /*tokenArray3.length > 0*/ ){
										
										// Logic info
										EditorGUILayout.BeginHorizontal();
											GUILayout.FlexibleSpace();
											EditorGUILayout.BeginVertical( GUILayout.MinHeight(16), GUILayout.MaxHeight(16), GUILayout.MinWidth(560), GUILayout.MaxWidth(560) );
												GUILayout.Label( "Logic Events ", "BoldLabel");
												GUILayout.Label( "Logic events can test Tokens or PlayerPrefs and use the result to move to a different screen. \nUse the [+] button to add more logic Events, and the [-] button to remove the last one." );
											EditorGUILayout.EndVertical();
											GUILayout.FlexibleSpace();
										EditorGUILayout.EndHorizontal();
										
										// Make sure we have some logic screens so we can loop them in and create the logic UI
										if( theObject.screen.logicStatements != null && theObject.screen.logicStatements.length > 0){
											
											// Helper variables
											var logicCounter : int = 0;
											
											// Loop through the statements
											for( var statement : LogicStatements in theObject.screen.logicStatements ){
												if(statement!=null){ // Make sure this statement is valid
													
													// ==============================
													// FIRST STATEMENT UI
													// ==============================
													
													// Statement
													EditorGUILayout.BeginHorizontal();
													GUILayout.FlexibleSpace();
													EditorGUILayout.BeginHorizontal("Box");
													
														// Formatting
														EditorGUILayout.BeginVertical();
														GUILayout.Label("", GUILayout.MinWidth(5), GUILayout.MaxWidth(5), GUILayout.MinHeight(10), GUILayout.MaxHeight(10));
														EditorGUILayout.BeginHorizontal();
														
														// Space
														GUILayout.Label("", GUILayout.MinWidth(5), GUILayout.MaxWidth(5), GUILayout.MinHeight(5), GUILayout.MaxHeight(5));
													
														// IF / ELSE IF label
														if( logicCounter == 0){
															GUILayout.Label(ifLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(50), GUILayout.MaxWidth(50));
														} else {
															GUILayout.Label(elseifLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(50), GUILayout.MaxWidth(50));
														}

														// SHOW CONTROLS FOR TOKENS
														if( statement.logicType == DS_LOGIC_TYPE.Token){

															// Select Logic Style
															GUILayout.Label(logicIcon, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
															statement.logicType = EditorGUILayout.EnumPopup(statement.logicType, GUILayout.MinHeight(20), GUILayout.MinWidth(90), GUILayout.MaxWidth(90));

															// If we have tokens in DialogUI, allow the user to make changes.
															if( tokenArray3.length > 0 ){

																// Token To Set
																GUILayout.Label(keyLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
																statement.token = EditorGUILayout.Popup(statement.token, tokenArray3, GUILayout.MaxHeight(32), GUILayout.MinWidth(90), GUILayout.MaxWidth(90));
																
																// Operator
																GUILayout.Label(gearLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
																statement.operator = EditorGUILayout.EnumPopup("", statement.operator, GUILayout.MaxHeight(32), GUILayout.MinWidth(90), GUILayout.MaxWidth(90));

																// Comparison
																GUILayout.Label(buttonLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
																statement.compare = EditorGUILayout.TextField(statement.compare, GUILayout.MinHeight(20), GUILayout.MinWidth(95), GUILayout.MaxWidth(90));

															// Otherwise, show message.	
															} else {

																// Message
																GUILayout.Label("  You have not set up any Tokens in DialogUI.", GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(350), GUILayout.MaxWidth(350));

															}

														// CONTROLS FOR PLAYER PREFS	
														} else {

															// Select Logic Style
															GUILayout.Label(logicIcon, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
															statement.logicType = EditorGUILayout.EnumPopup(statement.logicType, GUILayout.MinHeight(20), GUILayout.MinWidth(90), GUILayout.MaxWidth(90));

															// PlayerPref Key To Set
															GUILayout.Label(keyLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
															EditorStyles.textField.wordWrap = false;
															statement.ppKey = EditorGUILayout.TextField(statement.ppKey, GUILayout.MaxHeight(20), GUILayout.MinWidth(90), GUILayout.MaxWidth(90) );
															if(statement.ppKey==""){statement.ppKey="ENTER_KEY";}
															EditorStyles.textField.wordWrap = true;
															
															// Operator
															GUILayout.Label(gearLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
															statement.ppOperator = EditorGUILayout.EnumPopup("", statement.ppOperator, GUILayout.MaxHeight(32), GUILayout.MinWidth(90), GUILayout.MaxWidth(90));

															// Comparison
															if( statement.ppOperator != DS_PLAYERPREF_LOGIC_OPERATOR.Exists && 
																statement.ppOperator != DS_PLAYERPREF_LOGIC_OPERATOR.DoesNotExist ){

																GUILayout.Label(buttonLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
																statement.compare = EditorGUILayout.TextField(statement.compare, GUILayout.MinHeight(20), GUILayout.MinWidth(95), GUILayout.MaxWidth(90));

															// Otherwise add space
															} else{
																GUILayout.Label("", GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(95+20), GUILayout.MaxWidth(95+20));
															}
														}

														// Space
														GUILayout.Label("", GUILayout.MinWidth(5), GUILayout.MaxWidth(5), GUILayout.MinHeight(5), GUILayout.MaxHeight(5));

														// End formatting
														EditorGUILayout.EndHorizontal();

														// ==============================
														// EXTRA CONDITIONS UI
														// ==============================

														if( statement.extraConditions != null && statement.extraConditions.length > 0 ){

															// Loop through the statements
															for( var statement2 : LogicStatementsExtra in statement.extraConditions ){
																if(statement2!=null){ // Make sure this new statement is valid

																	// Start formatting
																	EditorGUILayout.BeginHorizontal();

																	// Space
																	GUILayout.Label("", GUILayout.MinWidth(5), GUILayout.MaxWidth(5), GUILayout.MinHeight(5), GUILayout.MaxHeight(5));

																	// AND label (change this!)
																	GUILayout.Label(andLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(50), GUILayout.MaxWidth(50));

																	// SHOW CONTROLS FOR TOKENS
																	if( statement2.logicType == DS_LOGIC_TYPE.Token){

																		// Select Logic Style
																		GUILayout.Label(logicIcon, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
																		statement2.logicType = EditorGUILayout.EnumPopup(statement2.logicType, GUILayout.MinHeight(20), GUILayout.MinWidth(90), GUILayout.MaxWidth(90));

																		// If we have tokens in DialogUI, allow the user to make changes.
																		if( tokenArray3.length > 0 ){

																			// Token To Set
																			GUILayout.Label(keyLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
																			statement2.token = EditorGUILayout.Popup(statement2.token, tokenArray3, GUILayout.MaxHeight(32), GUILayout.MinWidth(90), GUILayout.MaxWidth(90));
																			
																			// Operator
																			GUILayout.Label(gearLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
																			statement2.operator = EditorGUILayout.EnumPopup("", statement2.operator, GUILayout.MaxHeight(32), GUILayout.MinWidth(90), GUILayout.MaxWidth(90));

																			// Comparison
																			GUILayout.Label(buttonLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
																			statement2.compare = EditorGUILayout.TextField(statement2.compare, GUILayout.MinHeight(20), GUILayout.MinWidth(95), GUILayout.MaxWidth(90));

																		// Otherwise, show message.	
																		} else {

																			// Message
																			GUILayout.Label("  You have not set up any Tokens in DialogUI.", GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(350), GUILayout.MaxWidth(350));

																		}

																	// CONTROLS FOR PLAYER PREFS	
																	} else {

																		// Select Logic Style
																		GUILayout.Label(logicIcon, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
																		statement2.logicType = EditorGUILayout.EnumPopup(statement2.logicType, GUILayout.MinHeight(20), GUILayout.MinWidth(90), GUILayout.MaxWidth(90));

																		// PlayerPref Key To Set
																		GUILayout.Label(keyLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
																		EditorStyles.textField.wordWrap = false;
																		statement2.ppKey = EditorGUILayout.TextField(statement2.ppKey, GUILayout.MaxHeight(20), GUILayout.MinWidth(90), GUILayout.MaxWidth(90) );
																		if(statement2.ppKey==""){statement2.ppKey="ENTER_KEY";}
																		EditorStyles.textField.wordWrap = true;
																		
																		// Operator
																		GUILayout.Label(gearLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
																		statement2.ppOperator = EditorGUILayout.EnumPopup("", statement2.ppOperator, GUILayout.MaxHeight(32), GUILayout.MinWidth(90), GUILayout.MaxWidth(90));

																		// Comparison
																		if( statement2.ppOperator != DS_PLAYERPREF_LOGIC_OPERATOR.Exists && 
																			statement2.ppOperator != DS_PLAYERPREF_LOGIC_OPERATOR.DoesNotExist ){

																			GUILayout.Label(buttonLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
																			statement2.compare = EditorGUILayout.TextField(statement2.compare, GUILayout.MinHeight(20), GUILayout.MinWidth(95), GUILayout.MaxWidth(90));

																		// Otherwise add space
																		} else{
																			GUILayout.Label("", GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(95+20), GUILayout.MaxWidth(95+20));
																		}
																	}

																	// End formatting
																	EditorGUILayout.EndHorizontal();

																}
															}
														}

														// ==============================
														// ADD / DELETE EXTRA CONDITIONS
														// ==============================

														// Add / Delete Condition Buttons
														EditorGUILayout.BeginHorizontal();
														//	GUILayout.FlexibleSpace();
															GUILayout.Label("", GUILayout.MaxWidth(428),GUILayout.MaxHeight(4));

															// If we have extra conditions setup, allow us to delete one.
															if( statement.extraConditions != null && statement.extraConditions.length > 0 ){

																// Remove last extra condition Button
																if( GUILayout.Button(removeButton, GUILayout.MaxWidth(48)) ){
																	statement.extraConditions = ResizeLogicArray(statement.extraConditions, false); // deduct
																}

															// Otherwise, show empty space where the button should be.
															} else {
																GUILayout.Label("", GUILayout.MaxWidth(48));
															}

															// Add New Condition
															if( GUILayout.Button(addButton, GUILayout.MaxWidth(48)) ){
																statement.extraConditions = ResizeLogicArray(statement.extraConditions, true); // add
															}

															// Spacer
															GUILayout.Label("", GUILayout.MaxWidth(4),GUILayout.MaxHeight(4));
														EditorGUILayout.EndHorizontal();

														// Bottom Space
														GUILayout.Label("", GUILayout.MaxWidth(8),GUILayout.MaxHeight(8));

														// End White box
														EditorGUILayout.EndVertical();

														
													EditorGUILayout.EndHorizontal();
													GUILayout.FlexibleSpace();
													EditorGUILayout.EndHorizontal();

													// Spacer
													GUILayout.Label("", GUILayout.MaxWidth(4),GUILayout.MaxHeight(4));
													
													// Navigation
													EditorGUILayout.BeginHorizontal();
													
														// Space
														GUILayout.FlexibleSpace();
														GUILayout.Label("", GUILayout.MinWidth(340), GUILayout.MaxWidth(340), GUILayout.MinHeight(5), GUILayout.MaxHeight(5));
														GUILayout.Label("", GUILayout.MinWidth(5), GUILayout.MaxWidth(5), GUILayout.MinHeight(5), GUILayout.MaxHeight(5));
														
														EditorGUILayout.BeginVertical();
														
															// Go To Screen
															if( !statement.endDialogAfterThis ){
																EditorGUILayout.BeginHorizontal();
																GUILayout.Label( nextLabel, GUILayout.MinHeight(20), GUILayout.MaxHeight(20), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
	
																GUILayout.Label( "Go To Screen: ", "BoldLabel", GUILayout.MinHeight(20), GUILayout.MaxHeight(20), GUILayout.MinWidth(100), GUILayout.MaxWidth(100));
																statement.goToScreen = EditorGUILayout.IntField(statement.goToScreen, GUILayout.MinHeight(20), GUILayout.MinWidth(60), GUILayout.MaxWidth(60));
																EditorGUILayout.EndHorizontal();
															}
															
															// End Dialog After This
															EditorGUILayout.BeginHorizontal();
															GUILayout.Label( stopLabel, GUILayout.MinHeight(20), GUILayout.MaxHeight(20), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
															GUILayout.Label( "Last Dialog: ", "BoldLabel", GUILayout.MinHeight(20), GUILayout.MaxHeight(20), GUILayout.MinWidth(100), GUILayout.MaxWidth(100));
															statement.endDialogAfterThis = EditorGUILayout.Toggle(statement.endDialogAfterThis, GUILayout.MinHeight(20), GUILayout.MinWidth(60), GUILayout.MaxWidth(60));
															EditorGUILayout.EndHorizontal();
															
															// Destroy At End
															if( statement.endDialogAfterThis ){
																EditorGUILayout.BeginHorizontal();
																GUILayout.Label( deleteLabel, GUILayout.MinHeight(20), GUILayout.MaxHeight(20), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
																GUILayout.Label( "Destroy At End: ", "BoldLabel", GUILayout.MinHeight(20), GUILayout.MaxHeight(20), GUILayout.MinWidth(100), GUILayout.MaxWidth(100));
																statement.destroyAtEnd = EditorGUILayout.Toggle(statement.destroyAtEnd, GUILayout.MinHeight(20), GUILayout.MinWidth(60), GUILayout.MaxWidth(60));
																EditorGUILayout.EndHorizontal();
																
															} else {
																statement.destroyAtEnd = false;	
															}
															
															// Spacer
															EditorGUILayout.BeginHorizontal();
															GUILayout.Label( "", GUILayout.MinHeight(10), GUILayout.MaxHeight(10), GUILayout.MinWidth(10), GUILayout.MaxWidth(10));
															EditorGUILayout.EndHorizontal();
															
														EditorGUILayout.EndVertical();
														
														GUILayout.FlexibleSpace();
													EditorGUILayout.EndHorizontal();
													
													EditorGUILayout.BeginHorizontal();
													
													EditorGUILayout.EndHorizontal();
													// Add to the logicCounter
													logicCounter++;
												}
											}
										}
										
										// =========================
										// ADD / REMOVE BUTTONS
										// =========================
										
										EditorGUILayout.BeginHorizontal();
										
											GUILayout.FlexibleSpace();
											EditorGUILayout.BeginHorizontal( GUILayout.MinHeight(16), GUILayout.MaxHeight(16), GUILayout.MinWidth(543), GUILayout.MaxWidth(543) );
											
												GUILayout.FlexibleSpace();
												
												// Show Remove Button if we have more than 1 option
												if( theObject.screen.logicStatements != null && theObject.screen.logicStatements.length > 0 ){
													
													if( GUILayout.Button(removeButton, GUILayout.MaxWidth(48)) ){
														DeleteLogicStatement( theObject );
													}
												}
											
												// Show add Button (we can use unlimited comparisons)
												if( theObject.screen.logicStatements != null ){
													if( GUILayout.Button(addButton, GUILayout.MaxWidth(48)) ){
														AddNewLogicStatement( theObject );
													}
												}
												
											EditorGUILayout.EndHorizontal();
											GUILayout.FlexibleSpace();
											
										EditorGUILayout.EndHorizontal();
										
										// ==============
										// ELSE UI
										// ==============
										
										// Default Screen info
										EditorGUILayout.BeginHorizontal();
											GUILayout.FlexibleSpace();
											EditorGUILayout.BeginVertical( GUILayout.MinHeight(16), GUILayout.MaxHeight(16), GUILayout.MinWidth(560), GUILayout.MaxWidth(560) );
												GUILayout.Label( "Default Screen ", "BoldLabel");
												GUILayout.Label( "If the above logic fails, this screen will be used." );
											EditorGUILayout.EndVertical();
											GUILayout.FlexibleSpace();
										EditorGUILayout.EndHorizontal();
										
										// Statement
										EditorGUILayout.BeginHorizontal();
										GUILayout.FlexibleSpace();
										EditorGUILayout.BeginHorizontal("Box", GUILayout.MinHeight(16), GUILayout.MaxHeight(16), GUILayout.MinWidth(548), GUILayout.MaxWidth(548));
										
											// Formatting
											EditorGUILayout.BeginVertical();
											GUILayout.Label("", GUILayout.MinWidth(5), GUILayout.MaxWidth(5), GUILayout.MinHeight(10), GUILayout.MaxHeight(10));
											EditorGUILayout.BeginHorizontal();
											
											// Space
											GUILayout.Label("", GUILayout.MinWidth(5), GUILayout.MaxWidth(5), GUILayout.MinHeight(5), GUILayout.MaxHeight(5));
										
											// ELSE label
											GUILayout.Label(elseLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(50), GUILayout.MaxWidth(50));
										
											// Flexible space
											GUILayout.FlexibleSpace();
											
											
											EditorGUILayout.BeginVertical();
												
												// Go To Screen
												if(!theObject.navigation.endDialogAfterThis){
													EditorGUILayout.BeginHorizontal();
													GUILayout.Label( nextLabel, GUILayout.MinHeight(20), GUILayout.MaxHeight(20), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
	
													GUILayout.Label( "Go To Screen: ", "BoldLabel", GUILayout.MinHeight(20), GUILayout.MaxHeight(20), GUILayout.MinWidth(100), GUILayout.MaxWidth(100));
													theObject.navigation.logicDefaultNavigation = EditorGUILayout.IntField(theObject.navigation.logicDefaultNavigation, GUILayout.MinHeight(20), GUILayout.MinWidth(60), GUILayout.MaxWidth(60));
													EditorGUILayout.EndHorizontal();
												}
														
												// End Dialog After This
												EditorGUILayout.BeginHorizontal();
												GUILayout.Label( stopLabel, GUILayout.MinHeight(20), GUILayout.MaxHeight(20), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
												GUILayout.Label( "Last Dialog: ", "BoldLabel", GUILayout.MinHeight(20), GUILayout.MaxHeight(20), GUILayout.MinWidth(100), GUILayout.MaxWidth(100));
												theObject.navigation.endDialogAfterThis = EditorGUILayout.Toggle(theObject.navigation.endDialogAfterThis, GUILayout.MinHeight(20), GUILayout.MinWidth(60), GUILayout.MaxWidth(60));
												EditorGUILayout.EndHorizontal();
												
												// Destroy At End
												if( theObject.navigation.endDialogAfterThis ){
													EditorGUILayout.BeginHorizontal();
													GUILayout.Label( deleteLabel, GUILayout.MinHeight(20), GUILayout.MaxHeight(20), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
													GUILayout.Label( "Destroy At End: ", "BoldLabel", GUILayout.MinHeight(20), GUILayout.MaxHeight(20), GUILayout.MinWidth(100), GUILayout.MaxWidth(100));
													theObject.navigation.destroyAtEnd = EditorGUILayout.Toggle(theObject.navigation.destroyAtEnd, GUILayout.MinHeight(20), GUILayout.MinWidth(60), GUILayout.MaxWidth(60));
													EditorGUILayout.EndHorizontal();
												} else {
													theObject.navigation.destroyAtEnd = false;	
												}
												
												// Spacer
												EditorGUILayout.BeginHorizontal();
												GUILayout.Label( "", GUILayout.MinHeight(10), GUILayout.MaxHeight(10), GUILayout.MinWidth(10), GUILayout.MaxWidth(10));
												EditorGUILayout.EndHorizontal();
												
											EditorGUILayout.EndVertical();
											
											// Space
											GUILayout.Label("", GUILayout.MinWidth(5), GUILayout.MaxWidth(5), GUILayout.MinHeight(5), GUILayout.MaxHeight(5));
											
											// End formatting
											EditorGUILayout.EndHorizontal();
											EditorGUILayout.EndVertical();
											
										EditorGUILayout.EndHorizontal();
										GUILayout.FlexibleSpace();
										EditorGUILayout.EndHorizontal();
										
									}	
										
										
									// Tokens have not been setup	
								//	} else {
										
										// Show Warning Message
								//		EditorGUILayout.BeginVertical("Box");
								//			GUILayout.Label("IMPORTANT: Logic", "BoldLabel");
								//			GUILayout.Label("You cannot use the 'Logic' style yet. \nThis is because you have not set up any 'Tokens' in the DialogUI component. \n");
								//		EditorGUILayout.EndVertical();
										
								//		EditorGUILayout.Space();
								//	}
								}
								
								// =========================
								// CHECK FOR INFINATE LOOPS
								// =========================
								
								// Check to see if any of the navigation paths reference the same screen (infinate loop)
								var referencingSameID : boolean = false;
								if(  theObject.screen.logicStatements != null && theObject.screen.logicStatements.length > 0 ){
									for( var theEvent : LogicStatements in theObject.screen.logicStatements ){
										if( theEvent != null && !theEvent.endDialogAfterThis && theEvent.goToScreen == theObject.dialogID ){
											referencingSameID = true;
										}
									}
								}
								
								// Check to see if the default navigation paths reference the same screen (infinate loop)
								if( theObject.navigation.logicDefaultNavigation == theObject.dialogID || referencingSameID ){

									// Warning info
									EditorGUILayout.Space();
									EditorGUILayout.BeginHorizontal();
										GUILayout.FlexibleSpace();
										EditorGUILayout.BeginHorizontal(  GUILayout.MinHeight(16), GUILayout.MaxHeight(16), GUILayout.MinWidth(530), GUILayout.MaxWidth(530) );
											
											//GUILayout.Label("", GUILayout.MinWidth(0), GUILayout.MaxWidth(0), GUILayout.MinHeight(5), GUILayout.MaxHeight(5)); // weird spacing fix.
											EditorGUILayout.BeginHorizontal();
											GUILayout.Label(warningIcon, GUILayout.MinWidth(64), GUILayout.MaxWidth(64), GUILayout.MinHeight(64), GUILayout.MaxHeight(64));
											EditorGUILayout.BeginVertical();
											
												GUILayout.Label("WARNING: Infinate Loop Detected",  "boldLabel");
												GUILayout.Label("One or more of your \"Go To Screens\" has the same ID as this Dialog Screen. \nUnless this is fixed, this will create an infinate loop. \n");
											EditorGUILayout.EndVertical();
											EditorGUILayout.EndHorizontal();
										EditorGUILayout.EndHorizontal();
										GUILayout.FlexibleSpace();
									EditorGUILayout.EndHorizontal();	
								}
								
								
							}
							
							// Show Custom Button 1
							if( theObject.screen.dialogStyle == DIALOGSTYLE.OneButton || 
								theObject.screen.dialogStyle == DIALOGSTYLE.TwoButtons ||
								theObject.screen.dialogStyle == DIALOGSTYLE.DataEntry ||
								theObject.screen.dialogStyle == DIALOGSTYLE.Password  ||
								theObject.screen.dialogStyle == DIALOGSTYLE.Popup
							){
							
								// Dialog Speech
								EditorGUILayout.BeginHorizontal();
									GUILayout.Label(buttonLabel, GUILayout.MaxWidth(20),GUILayout.MinHeight(20),GUILayout.MaxHeight(20));
									if(	theObject.screen.dialogStyle == DIALOGSTYLE.OneButton || 
										theObject.screen.dialogStyle == DIALOGSTYLE.Popup && theObject.screen.popupOptions == POPUP_OPTIONS.OneButton
									){
										GUILayout.Label("Custom Button Label: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
										theObject.screen.customButton1 = EditorGUILayout.TextField("", theObject.screen.customButton1 );
									} else if (theObject.screen.dialogStyle == DIALOGSTYLE.TwoButtons || 
										theObject.screen.dialogStyle == DIALOGSTYLE.Popup && theObject.screen.popupOptions == POPUP_OPTIONS.TwoButtons){
										GUILayout.Label("Custom Right Button: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
										theObject.screen.customButton1 = EditorGUILayout.TextField("", theObject.screen.customButton1 );
									} else if (theObject.screen.dialogStyle == DIALOGSTYLE.DataEntry){
										GUILayout.Label("Custom Button Label: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
										theObject.screen.customButton1 = EditorGUILayout.TextField("", theObject.screen.customButton1 );
									} else if (theObject.screen.dialogStyle == DIALOGSTYLE.Password){
										GUILayout.Label("Custom Button Label: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
										theObject.screen.customButton1 = EditorGUILayout.TextField("", theObject.screen.customButton1 );
									}
								EditorGUILayout.EndHorizontal();
	
								// Add Space
								EditorGUILayout.Space();
								EditorGUILayout.Space();
							
							}
							
							// Show Custom Button 2
							if( theObject.screen.dialogStyle == DIALOGSTYLE.TwoButtons || theObject.screen.dialogStyle == DIALOGSTYLE.Popup &&
			theObject.screen.popupOptions == POPUP_OPTIONS.TwoButtons ){
							
								// Dialog Speech
								EditorGUILayout.BeginHorizontal();
									GUILayout.Label(buttonLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
									GUILayout.Label("Custom Left Button: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
									theObject.screen.customButton2 = EditorGUILayout.TextField("", theObject.screen.customButton2 );
								EditorGUILayout.EndHorizontal();
	
								// Add Space
								EditorGUILayout.Space();
							
							}
							
							// USE MULTIPLE BUTTON DIALOG STYLE
							if (theObject.screen.dialogStyle == DIALOGSTYLE.MultipleButtons){
							
								// Did we apply any fixes on this loop?
								var multipleChoiceFixesApplied : boolean = false;
								
								// MULTIPLE CHOICE UPGRADE / FIX ROUTINE
								// This routine is helpful for users upgrading from an older version of LDC, or
								// if they accidently mess up some of the values in the inspector "debug" mode.
								if(	theObject.screen.multipleButtons != null && theObject.screen.multipleButtons.length > 0 ){
								
									// Navigation length isn't correct
									if( theObject.navigation.multipleButtons.length != theObject.screen.multipleButtons.length ){
										Debug.Log("LDC: Fixing Multiple Button \"Navigation\" Array in GameObject \""+ theObject.name + "\"" );
										theObject.navigation.multipleButtons = new int[theObject.screen.multipleButtons.length];
										multipleChoiceFixesApplied = true;
									}
									
									// Requires Logic length isn't correct
									if( theObject.screen.multipleRequiresLogic.length != theObject.screen.multipleButtons.length ){
										Debug.Log("LDC: Fixing Multiple Button \"Requires Logic\" Array in GameObject \""+ theObject.name + "\"" );
										theObject.screen.multipleRequiresLogic = new boolean[theObject.screen.multipleButtons.length];
										multipleChoiceFixesApplied = true;
									}
									
									// Logic Events length isn't correct
									if( theObject.screen.multipleLogic.length != theObject.screen.multipleButtons.length ){
										Debug.Log("LDC: Fixing Multiple Button \"Logic Statements\" Array in GameObject \""+ theObject.name + "\"" );
										theObject.screen.multipleLogic = new LogicStatements[theObject.screen.multipleButtons.length];
										multipleChoiceFixesApplied = true;
									}

									// Custom Icons Length isn't correct
									if( theObject.screen.multipleButtonsIcon.length != theObject.screen.multipleButtons.length ){
										Debug.Log("LDC: Fixing Multiple Button \"Custom Button Icons\" Array in GameObject \""+ theObject.name + "\"" );
										theObject.screen.multipleButtonsIcon = new Texture2D[theObject.screen.multipleButtons.length];
										multipleChoiceFixesApplied = true;
									}

									// Custom Icons Length isn't correct
									if( theObject.screen.editorAnimatedMultipleButtonsIcon.length != theObject.screen.multipleButtons.length ){
										Debug.Log("LDC: Fixing Multiple Button \"Custom Editor Button Icons\" Array in GameObject \""+ theObject.name + "\"" );
										theObject.screen.editorAnimatedMultipleButtonsIcon = new DialogCastActor[theObject.screen.multipleButtons.length];
										multipleChoiceFixesApplied = true;
									}

									// Custom Icons Length isn't correct
									if( theObject.screen.animatedMultipleButtonsIcon.length != theObject.screen.multipleButtons.length ){
										Debug.Log("LDC: Fixing Multiple Button \"Custom Animated Button Icons\" Array in GameObject \""+ theObject.name + "\"" );
										theObject.screen.animatedMultipleButtonsIcon = new Vector2[theObject.screen.multipleButtons.length];

										// Set All Animated Icons to -1,-1
										if(theObject.screen.animatedMultipleButtonsIcon.length > 0){
											for(var fixV2 : Vector2 in theObject.screen.animatedMultipleButtonsIcon){
												if(fixV2!=null){fixV2 = Vector2(-1,-1);}
											}
										}
										multipleChoiceFixesApplied = true;
									}
									
							
								}
								
								// Start the buttons with a seperator line
								SepLine();
								EditorGUILayout.Space();
								
								
								// Make sure these options are valid
								if( !multipleChoiceFixesApplied &&
									theObject.navigation.multipleButtons !=null && theObject.navigation.multipleButtons.length == theObject.screen.multipleButtons.length &&
									theObject.screen.multipleRequiresLogic !=null && theObject.screen.multipleRequiresLogic.length == theObject.screen.multipleButtons.length &&
									theObject.navigation.multipleButtons !=null && theObject.navigation.multipleButtons.length == theObject.screen.multipleButtons.length &&
									theObject.screen.multipleButtonsIcon !=null && theObject.screen.multipleButtonsIcon.length == theObject.screen.multipleButtons.length &&
									theObject.screen.editorAnimatedMultipleButtonsIcon !=null && theObject.screen.editorAnimatedMultipleButtonsIcon.length == theObject.screen.multipleButtons.length
								){
									var multipleOptionCount : int = 0;
									for( var buttonOption : String in theObject.screen.multipleButtons ){
										if(buttonOption!=null){
											
											// Option Name
											EditorGUILayout.BeginHorizontal();
												GUILayout.Label(buttonLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
												GUILayout.Label("Button "+(multipleOptionCount+1).ToString()+": ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
												buttonOption = EditorGUILayout.TextField("", buttonOption); 
											EditorGUILayout.EndHorizontal();

											
											// Requires Logic
											if(theObject.screen.multipleRequiresLogic != null && theObject.screen.multipleRequiresLogic.length > multipleOptionCount){
												EditorGUILayout.BeginHorizontal();
													GUILayout.Label(logicIcon, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
													GUILayout.Label("Requires Conditions: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
													theObject.screen.multipleRequiresLogic[multipleOptionCount] = EditorGUILayout.Toggle("", theObject.screen.multipleRequiresLogic[multipleOptionCount], GUILayout.MinWidth(32),GUILayout.MaxWidth(32) ); 
													
													
													// Space
													//GUILayout.Label("", GUILayout.MaxWidth(8) );
													
													// Do Logic
													if( 	theObject.screen.multipleRequiresLogic[multipleOptionCount] == true &&
														theObject.screen.multipleLogic != null &&
														theObject.screen.multipleLogic.length > multipleOptionCount
													){
														
														// Begin Vertical Group
														EditorGUILayout.BeginVertical();
														
															// Make sure we can see the Dialog UI
															if( DUIs == null || DUIs.length == 0){
															
																// Show Warning Message
																EditorGUILayout.BeginVertical("Box");
																	GUILayout.Label("IMPORTANT: You cannot use Logic Conditions yet.", "BoldLabel");
																	GUILayout.Label("A DialogUI component wasn't found in the scene. \n");
																EditorGUILayout.EndVertical();
																
																EditorGUILayout.Space();
																
															// Otherwise
															} else {
															
																// Cache the token Array
																var tokenArray4 : String[] = DUIs[0].GetTokenStringArray();
																
																// Tokens have been setup ..
																//if( tokenArray4.length > 0 ){
																	
																	
																// ==============
																// STATEMENT UI
																// ==============
																
																var statement3 : LogicStatements = theObject.screen.multipleLogic[multipleOptionCount];
																
																// Statement
															//	EditorGUILayout.BeginHorizontal();
															//	GUILayout.FlexibleSpace();
																EditorGUILayout.BeginHorizontal("Box");
																	
																// Formatting
																EditorGUILayout.BeginVertical();
																GUILayout.Label("", GUILayout.MinWidth(5), GUILayout.MaxWidth(5), GUILayout.MinHeight(10), GUILayout.MaxHeight(10));
																EditorGUILayout.BeginHorizontal();
																GUILayout.FlexibleSpace();
																
																// Space
																GUILayout.Label("", GUILayout.MinWidth(5), GUILayout.MaxWidth(5), GUILayout.MinHeight(5), GUILayout.MaxHeight(5));


																// SHOW CONTROLS FOR TOKENS
																if( statement3.logicType == DS_LOGIC_TYPE.Token){

																	// Select Logic Style
																	GUILayout.Label(logicIcon, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
																	statement3.logicType = EditorGUILayout.EnumPopup(statement3.logicType, GUILayout.MinHeight(20), GUILayout.MinWidth(64), GUILayout.MaxWidth(128));

																	// If we have tokens in DialogUI, allow the user to make changes.
																	if( tokenArray4.length > 0 ){

																		// Token To Set
																		GUILayout.Label(keyLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
																		statement3.token = EditorGUILayout.Popup(statement3.token, tokenArray4, GUILayout.MaxHeight(32), GUILayout.MinWidth(60), GUILayout.MaxWidth(128));
																		
																		// Operator
																		GUILayout.Label(gearLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
																		statement3.operator = EditorGUILayout.EnumPopup("", statement3.operator, GUILayout.MaxHeight(32), GUILayout.MinWidth(50), GUILayout.MaxWidth(128));

																		// Comparison
																		GUILayout.Label(buttonLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
																		EditorStyles.textField.wordWrap = false;
																		statement3.compare = EditorGUILayout.TextField(statement3.compare, GUILayout.MinHeight(20), GUILayout.MinWidth(40), GUILayout.MaxWidth(128));
																		EditorStyles.textField.wordWrap = true;

																	// Otherwise, show message.	
																	} else {

																		// Space
																		//GUILayout.Label("", GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));

																		// Message
																		GUILayout.Label("  You have not set up any Tokens in DialogUI.", GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(250), GUILayout.MaxWidth(250));

																	}

																// CONTROLS FOR PLAYER PREFS	
																} else {

																	// Select Logic Style
																	GUILayout.Label(logicIcon, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
																	statement3.logicType = EditorGUILayout.EnumPopup(statement3.logicType, GUILayout.MinHeight(20), GUILayout.MinWidth(64), GUILayout.MaxWidth(128));

																	// PlayerPref Key To Set
																	GUILayout.Label(keyLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
																	EditorStyles.textField.wordWrap = false;
																	statement3.ppKey = EditorGUILayout.TextField(statement3.ppKey, GUILayout.MaxHeight(20), GUILayout.MinWidth(60), GUILayout.MaxWidth(128) );
																	if(statement3.ppKey==""){statement3.ppKey="ENTER_KEY";}
																	EditorStyles.textField.wordWrap = true;
																	
																	// Operator
																	GUILayout.Label(gearLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
																	statement3.ppOperator = EditorGUILayout.EnumPopup("", statement3.ppOperator, GUILayout.MaxHeight(32), GUILayout.MinWidth(50), GUILayout.MaxWidth(128));

																	// Comparison
																	if( statement3.ppOperator != DS_PLAYERPREF_LOGIC_OPERATOR.Exists && 
																		statement3.ppOperator != DS_PLAYERPREF_LOGIC_OPERATOR.DoesNotExist ){

																		GUILayout.Label(buttonLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
																		EditorStyles.textField.wordWrap = false;
																		statement3.compare = EditorGUILayout.TextField(statement3.compare, GUILayout.MinHeight(20), GUILayout.MinWidth(40), GUILayout.MaxWidth(128));
																		EditorStyles.textField.wordWrap = true;

																	// Otherwise add space
																	} else{
																		GUILayout.Label("", GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(58+20), GUILayout.MaxWidth(128+20));
																	}
																}

																// Space
																GUILayout.Label("", GUILayout.MinWidth(5), GUILayout.MaxWidth(5), GUILayout.MinHeight(5), GUILayout.MaxHeight(5));

																// End formatting
																GUILayout.FlexibleSpace();
																EditorGUILayout.EndHorizontal();

																// ==============================
																// EXTRA CONDITIONS UI
																// ==============================

																if( statement3.extraConditions != null && statement3.extraConditions.length > 0 ){

																	// Loop through the statements
																	for( var statement4 : LogicStatementsExtra in statement3.extraConditions ){
																		if(statement4!=null){ // Make sure this new statement is valid

																			// Start formatting
																			EditorGUILayout.BeginHorizontal();

																			// Space
																			GUILayout.FlexibleSpace();
																			GUILayout.Label("", GUILayout.MinWidth(5), GUILayout.MaxWidth(5), GUILayout.MinHeight(5), GUILayout.MaxHeight(5));

																			// AND label
																		//	GUILayout.Label(andLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(50), GUILayout.MaxWidth(50));

																			// SHOW CONTROLS FOR TOKENS
																			if( statement4.logicType == DS_LOGIC_TYPE.Token){

																				// Select Logic Style
																				GUILayout.Label(logicIcon, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
																				statement4.logicType = EditorGUILayout.EnumPopup(statement4.logicType, GUILayout.MinHeight(20), GUILayout.MinWidth(64), GUILayout.MaxWidth(128));

																				// If we have tokens in DialogUI, allow the user to make changes.
																				if( tokenArray4.length > 0 ){

																					// Token To Set
																					GUILayout.Label(keyLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
																					statement4.token = EditorGUILayout.Popup(statement4.token, tokenArray4, GUILayout.MaxHeight(32), GUILayout.MinWidth(60), GUILayout.MaxWidth(128));
																					
																					// Operator
																					GUILayout.Label(gearLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
																					statement4.operator = EditorGUILayout.EnumPopup("", statement4.operator, GUILayout.MaxHeight(32), GUILayout.MinWidth(50), GUILayout.MaxWidth(128));

																					// Comparison
																					GUILayout.Label(buttonLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
																					statement4.compare = EditorGUILayout.TextField(statement4.compare, GUILayout.MinHeight(20), GUILayout.MinWidth(40), GUILayout.MaxWidth(128));

																				// Otherwise, show message.	
																				} else {

																					// Message
																					GUILayout.Label("  You have not set up any Tokens in DialogUI.", GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(250), GUILayout.MaxWidth(250));

																				}

																			// CONTROLS FOR PLAYER PREFS	
																			} else {

																				// Select Logic Style
																				GUILayout.Label(logicIcon, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
																				statement4.logicType = EditorGUILayout.EnumPopup(statement4.logicType, GUILayout.MinHeight(20), GUILayout.MinWidth(64), GUILayout.MaxWidth(128));

																				// PlayerPref Key To Set
																				GUILayout.Label(keyLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
																				EditorStyles.textField.wordWrap = false;
																				statement4.ppKey = EditorGUILayout.TextField(statement4.ppKey, GUILayout.MaxHeight(20), GUILayout.MinWidth(60), GUILayout.MaxWidth(128) );
																				if(statement4.ppKey==""){statement4.ppKey="ENTER_KEY";}
																				EditorStyles.textField.wordWrap = true;
																				
																				// Operator
																				GUILayout.Label(gearLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
																				statement4.ppOperator = EditorGUILayout.EnumPopup("", statement4.ppOperator, GUILayout.MaxHeight(32), GUILayout.MinWidth(50), GUILayout.MaxWidth(128));

																				// Comparison
																				if( statement4.ppOperator != DS_PLAYERPREF_LOGIC_OPERATOR.Exists && 
																					statement4.ppOperator != DS_PLAYERPREF_LOGIC_OPERATOR.DoesNotExist ){

																					GUILayout.Label(buttonLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
																					statement4.compare = EditorGUILayout.TextField(statement4.compare, GUILayout.MinHeight(20), GUILayout.MinWidth(40), GUILayout.MaxWidth(128));

																				// Otherwise add space
																				} else{
																					GUILayout.Label("", GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(58+20), GUILayout.MaxWidth(128+20));
																				}
																			}

																			// Space
																			GUILayout.FlexibleSpace();
																			GUILayout.Label("", GUILayout.MinWidth(5), GUILayout.MaxWidth(5), GUILayout.MinHeight(5), GUILayout.MaxHeight(5));

																			// End formatting
																			EditorGUILayout.EndHorizontal();

																		}
																	}
																}

																// ==============================
																// ADD / DELETE EXTRA CONDITIONS
																// ==============================

																// Add / Delete Condition Buttons
																EditorGUILayout.BeginHorizontal();
																//	GUILayout.FlexibleSpace();
																	GUILayout.Label("", GUILayout.MaxWidth(460),GUILayout.MaxHeight(4));

																	// If we have extra conditions setup, allow us to delete one.
																	if( statement3.extraConditions != null && statement3.extraConditions.length > 0 ){

																		// Remove last extra condition Button
																		if( GUILayout.Button(removeButton, GUILayout.MaxWidth(32)) ){
																			statement3.extraConditions = ResizeLogicArray(statement3.extraConditions, false); // deduct
																		}

																	// Otherwise, show empty space where the button should be.
																	} else {
																		GUILayout.Label("", GUILayout.MaxWidth(32));
																	}

																	// Add New Condition
																	if( GUILayout.Button(addButton, GUILayout.MaxWidth(32)) ){
																		statement3.extraConditions = ResizeLogicArray(statement3.extraConditions, true); // add
																	}

																	// Spacer
																	GUILayout.Label("", GUILayout.MaxWidth(4),GUILayout.MaxHeight(4));
																EditorGUILayout.EndHorizontal();

																// Bottom Space
																GUILayout.Label("", GUILayout.MaxWidth(4),GUILayout.MaxHeight(4));

																// END WHITE BOX
																EditorGUILayout.EndVertical();
																EditorGUILayout.EndHorizontal();
																
															}
														
														// End Vertical Group
														EditorGUILayout.EndVertical();
														
														
													
													// End of Do Conditional Logic.	
													} else {
														
														// Let people know this button will always be visible
														GUILayout.FlexibleSpace();
														GUI.color.a = 0.5;
														GUILayout.Label("This button will always be visible. \n");
														GUI.color.a = 1;
													}
													
													//GUILayout.Label("", GUILayout.MaxWidth(8),GUILayout.MaxHeight(8));
													
												EditorGUILayout.EndHorizontal();

												// Option Custom Button Icon
												EditorGUILayout.Space();
												DoMultipleButtonsCustomIcon(theObject, multipleOptionCount);
												
												// Add space and a seperator line
												EditorGUILayout.Space();
												SepLine();
											}


											
											// Add Space
											EditorGUILayout.Space();
											EditorGUILayout.Space();
											
											// increment count
											multipleOptionCount++;
											
										}
									}
								
								// RECREATE THE CUSTOM ARRAY IF IT IS NULL OR EMPTY
								// If there are no multiple options setup in the array, create a new one!	
								} else if( theObject.screen.multipleButtons == null || 
										 theObject.screen.multipleButtons != null && theObject.screen.multipleButtons.length == 0 ){
									
									theObject.screen.multipleButtons = ["Option 1"];
									theObject.navigation.multipleButtons = [0];
									theObject.screen.multipleRequiresLogic = [false];
									theObject.screen.multipleLogic = new LogicStatements[1];
									theObject.screen.multipleButtonsIcon = new Texture2D[1];
									theObject.screen.editorAnimatedMultipleButtonsIcon = new DialogCastActor[1];
									
									// Reset Languages
									theObject.localization.chinese.multipleButtons = ["Option 1"];
									theObject.localization.korean.multipleButtons = ["Option 1"];
									theObject.localization.japanese.multipleButtons = ["Option 1"];
									theObject.localization.spanish.multipleButtons = ["Option 1"];
									theObject.localization.italian.multipleButtons = ["Option 1"];
									theObject.localization.german.multipleButtons = ["Option 1"];
									theObject.localization.french.multipleButtons = ["Option 1"];
									theObject.localization.portuguese.multipleButtons = ["Option 1"];
									theObject.localization.russian.multipleButtons = ["Option 1"];
								}
								
								EditorGUILayout.BeginHorizontal();
									GUILayout.FlexibleSpace();
										
									// Show Remove Button if we have more than 1 option
									if( theObject.screen.multipleButtons != null && theObject.screen.multipleButtons.length > 1 ){
										
										if( GUILayout.Button(removeButton, GUILayout.MaxWidth(48)) ){
											DeleteMultipleChoiceOption( theObject );
										}
									}
								
									// Show add Button if we have more less than 8 options
									if( theObject.screen.multipleButtons != null && theObject.screen.multipleButtons.length < 8 ){
										if( GUILayout.Button(addButton, GUILayout.MaxWidth(48)) ){
											AddNewMultipleChoiceOption( theObject );
										}
									}
										
								EditorGUILayout.EndHorizontal();
									
								// Add indent
								GUILayout.Label("", GUILayout.MaxWidth(5));
								
								
							}

							// Do Custom Icon Options
							DoEditorButtonFields( theObject );
							
							// Show Audio options if we are NOT using the Logic screen
							if( theObject.screen.dialogStyle != DIALOGSTYLE.Logic ){
						
							//	GUILayout.Label("Audio Streaming: ", "boldLabel", GUILayout.MaxHeight(20));
								EditorGUILayout.Space();

								// Drop AudioCLip to create Filepath ...
								if( DUIs != null && DUIs.length > 0 && DUIs[0] != null ){ // Make sure we can see the DialogUI
									EditorGUILayout.BeginHorizontal();
										GUILayout.Label(dropLabel, GUILayout.MaxWidth(20),GUILayout.MinHeight(20),GUILayout.MaxHeight(20));
										GUILayout.Label("Drop AudioClip To Stream: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));

										// Create a template Audioclip to catch any AudioClips...
										var clipToStream : AudioClip = null;
										clipToStream = EditorGUILayout.ObjectField("", clipToStream, AudioClip, false); 

										// If the user dropped in an audioclip, let's proces it and convert it to a streamable filepath!
										if(clipToStream!=null ){
											var newStreamPath : String = CanBeStreamedFromResources( AssetDatabase.GetAssetPath(clipToStream), DUIs[0].options.audioFilepathPrefix );
											if(newStreamPath!=""){	// If the newStreamPath didn't come back as blank, it means it worked!
												theObject.screen.soundToLoad = newStreamPath;
											}

										}
									EditorGUILayout.EndHorizontal();
								}

								// Audio FilePath
								EditorGUILayout.BeginHorizontal();
									GUILayout.Label(fileLabel, GUILayout.MaxWidth(20),GUILayout.MinHeight(20),GUILayout.MaxHeight(20));
									GUILayout.Label("Audio Filepath: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
									theObject.screen.soundToLoad = EditorGUILayout.TextField("", theObject.screen.soundToLoad); 
								EditorGUILayout.EndHorizontal();
						
								// Audio Pitch
								EditorGUILayout.BeginHorizontal();
									GUILayout.Label(audioLabel, GUILayout.MaxWidth(20),GUILayout.MinHeight(20),GUILayout.MaxHeight(20));
									GUILayout.Label("Audio Pitch: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
									theObject.screen.soundPitch = EditorGUILayout.FloatField("", theObject.screen.soundPitch, GUILayout.MinWidth(200) ); 
								EditorGUILayout.EndHorizontal();
								
							}
					
						#if UNITY_POSTBRUTAL
							}	// End of IF PB.
						#endif
							
						// Vertical
						EditorGUILayout.EndVertical();
						
						// Add indent
						GUILayout.Label("", GUILayout.MaxWidth(5));
						
					// Horizontal
					EditorGUILayout.EndHorizontal();
					
					// Add Space
					EditorGUILayout.Space();
					
					// Add Space
					EditorGUILayout.Space();
			
				// End Box
				//GUILayout.EndHorizontal();
			
			}
		
		
			// ---------------------------------------------------------------------------------------------
			//	TAB 1 - NAVIGATION
			// ---------------------------------------------------------------------------------------------
			
			else if ( theObject.tab == 1 ) { // The selected tab is "Navigation"
			
				// Box
				//GUILayout.BeginVertical ("box", GUILayout.MaxWidth(3000) );
			
					// Add Space
					EditorGUILayout.Space();
				
					// TITLE
					EditorGUILayout.BeginHorizontal();
						
						DoNotes(theObject);
							
						GUILayout.FlexibleSpace();
						
						// Fix DialogID if there is anything wrong.
						if ( theObject.dialogID == null || theObject.dialogID < 1 ) {
							theObject.dialogID = 1;
						} 
						
						//theObject.dialogID = System.Int32.Parse( EditorGUILayout.TextField("Dialog ID: ", theObject.dialogID.ToString()) );
						GUILayout.Label(speechLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
						GUILayout.Label("Dialog ID: ", GUILayout.MinWidth(60), GUILayout.MaxWidth(64),GUILayout.MaxHeight(20));
						theObject.dialogID = EditorGUILayout.IntField("", theObject.dialogID, GUILayout.MinWidth(32),GUILayout.MaxWidth(32), GUILayout.MaxHeight(20) );
						
						GUILayout.Label("", GUILayout.MaxWidth(10));
					EditorGUILayout.EndHorizontal();
					EditorGUILayout.Space();
				
					// Horizontal
					EditorGUILayout.BeginHorizontal();
					
						// Add indent
						GUILayout.Label("", GUILayout.MaxWidth(5));
						
						// Add the Portrait / Icon
						EditorGUILayout.BeginVertical(GUILayout.MaxWidth(105));
						
							// Use Icons
							if( theObject.screen.dialogStyle == DIALOGSTYLE.DataEntry ){
								
								GUILayout.Label(dataEntryIcon, GUILayout.MinWidth(100), GUILayout.MinHeight(100) , GUILayout.MaxWidth(100), GUILayout.MaxHeight(100) );
								theObject.screen.portrait = null;
								
							} else if( theObject.screen.dialogStyle == DIALOGSTYLE.Password){
								
								GUILayout.Label(passwordIcon, GUILayout.MinWidth(100), GUILayout.MinHeight(100) , GUILayout.MaxWidth(100), GUILayout.MaxHeight(100));
								theObject.screen.portrait = null;
								
							} else if( theObject.screen.dialogStyle == DIALOGSTYLE.Logic ){
								
								GUILayout.Label(logicIcon, GUILayout.MinWidth(100), GUILayout.MinHeight(100) , GUILayout.MaxWidth(100), GUILayout.MaxHeight(100));
								theObject.screen.portrait = null;
							
							} else if( theObject.screen.dialogStyle == DIALOGSTYLE.Title ){
								
								GUILayout.Label(titleIcon, GUILayout.MinWidth(100), GUILayout.MinHeight(100) , GUILayout.MaxWidth(100), GUILayout.MaxHeight(100));
								theObject.screen.portrait = null;
							
							} else if( theObject.screen.dialogStyle == DIALOGSTYLE.Popup ){
							
								GUILayout.Label(popupImageIcon, GUILayout.MinWidth(100), GUILayout.MinHeight(100) , GUILayout.MaxWidth(100), GUILayout.MaxHeight(100));
								theObject.screen.portrait = null;

							} else if( theObject.screen.dialogStyle == DIALOGSTYLE.IconGrid ){
							
								GUILayout.Label(iconGridIcon, GUILayout.MinWidth(100), GUILayout.MinHeight(100) , GUILayout.MaxWidth(100), GUILayout.MaxHeight(100));
								theObject.screen.portrait = null;

							#if UNITY_POSTBRUTAL
							} else if( theObject.screen.dialogStyle == DIALOGSTYLE.VoiceRoom ){
								
								GUILayout.Label(voiceRoomIcon, GUILayout.MinWidth(100), GUILayout.MinHeight(100) , GUILayout.MaxWidth(100), GUILayout.MaxHeight(100));
								theObject.screen.portrait = null;
							#endif

							// Show portrait	
							} else {
						
								// Show Animated Portrait
								if( !EditorTime.actorLibraryUnavailable && theObject.screen.animatedPortrait != Vector2(-1,-1) ){
									GUILayout.Label("Animated Icon:", GUILayout.MinWidth(100), GUILayout.MaxWidth(100));
									GUILayout.Label(DoDialogCastAnimation(theObject.screen.editorPortraitAnimation, theObject.screen.portrait), GUILayout.MinWidth(100), GUILayout.MinHeight(100) , GUILayout.MaxWidth(100), GUILayout.MaxHeight(100) );
									
									DoLibraryMissingMessage();
									
								// Show Standard Portrait	
								} else {
									GUILayout.Label("Static Icon:", GUILayout.MinWidth(100), GUILayout.MaxWidth(100));
									theObject.screen.portrait = EditorGUILayout.ObjectField(theObject.screen.portrait, Texture2D, false, GUILayout.MinWidth(100), GUILayout.MinHeight(100) , GUILayout.MaxWidth(100), GUILayout.MaxHeight(100));
								}
								
								// If the Dialog Cast is available, show the View Cast button
								if( DCs && DCs.length>0 ){ 
									EditorGUILayout.BeginHorizontal(GUILayout.MaxWidth(100));
									
										GUILayout.Label(cameraLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
										if( GUILayout.Button("View Cast", GUILayout.MinWidth(75), GUILayout.MaxWidth(75),GUILayout.MaxHeight(20) ) ){
											browseMode = true;
											browseButtonOutput = -100;	// Remove the id for button References (-100 = None)
											output = BrowseOutput.Portrait;
										}
									EditorGUILayout.EndHorizontal();
									
									EditorGUILayout.BeginHorizontal(GUILayout.MaxWidth(100));
									
										GUILayout.Label(deleteLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
										if( GUILayout.Button("No Portrait", GUILayout.MinWidth(75), GUILayout.MaxWidth(75),GUILayout.MaxHeight(20) ) ){
											browseMode = false;
											browseButtonOutput = -100;	// Remove the id for button References (-100 = None)
											theObject.screen.portrait = null;
											theObject.screen.animatedPortrait = Vector2( -1, -1 );	
										}
									EditorGUILayout.EndHorizontal();
									
									if( theObject.screen.animatedPortrait != Vector2(-1,-1) ){
										EditorGUILayout.BeginHorizontal(GUILayout.MaxWidth(100));
										
											GUILayout.Label(deleteLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
											if( GUILayout.Button("No Anim", GUILayout.MinWidth(75), GUILayout.MaxWidth(75),GUILayout.MaxHeight(20) ) ){
												browseMode = false;
												browseButtonOutput = -100;	// Remove the id for button References (-100 = None)
												theObject.screen.animatedPortrait = Vector2( -1, -1 );	
											}
										EditorGUILayout.EndHorizontal();
									}
								}
							}
							
						// End of Portrait
						EditorGUILayout.EndVertical();
			
						// Add indent
						//GUILayout.Label("", GUILayout.MaxWidth(5));
						
						// Vertical
						EditorGUILayout.BeginVertical();
							
							// Add Space
							EditorGUILayout.Space();
							EditorGUILayout.Space();
							
							// USE STANDARD NEXT BUTTON DIALOG STYLE
							if (theObject.screen.dialogStyle == DIALOGSTYLE.NextButton || 
								theObject.screen.dialogStyle == DIALOGSTYLE.Title 
								#if UNITY_POSTBRUTAL
									|| theObject.screen.dialogStyle == DIALOGSTYLE.VoiceRoom
								#endif
							){
								
								// Options Label
								GUILayout.Label( "Next Button (Auto-Localized)", "BoldLabel", GUILayout.MaxWidth(320));

								// Add Space
								EditorGUILayout.Space();
															
								// screen To Load Next
								EditorGUILayout.BeginHorizontal();
									GUILayout.Label(nextLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
									theObject.navigation.screenToLoadOnNext = EditorGUILayout.IntField("Next Screen: ", theObject.navigation.screenToLoadOnNext );
								EditorGUILayout.EndHorizontal();
	
								// Add Space
								EditorGUILayout.Space();
								
								// Seconds To Display - Display normally in commercial mode
								#if !UNITY_POSTBRUTAL
									EditorGUILayout.BeginHorizontal();
										GUILayout.Label(timeLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
										theObject.navigation.secondsToDisplay = EditorGUILayout.IntField("Seconds To Show: ", theObject.navigation.secondsToDisplay ); 
									EditorGUILayout.EndHorizontal();
								#endif

								// If we're in Post Brutal, make sure we're not using VoiceRoom (as this is set automatically)
								#if UNITY_POSTBRUTAL
									if( theObject.screen.dialogStyle != DIALOGSTYLE.VoiceRoom ){
										EditorGUILayout.BeginHorizontal();
											GUILayout.Label(timeLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
											theObject.navigation.secondsToDisplay = EditorGUILayout.IntField("Seconds To Show: ", theObject.navigation.secondsToDisplay ); 
										EditorGUILayout.EndHorizontal();
									}
								#endif					
								
								
							// USE YES OR NO OPTIONS
							} else if (theObject.screen.dialogStyle == DIALOGSTYLE.YesOrNo){
								
								// Options Label
								GUILayout.Label( "Yes / No Buttons (Auto-Localized)", "BoldLabel", GUILayout.MaxWidth(320));
								
								// Add Space
								EditorGUILayout.Space();
								
								// screen To Load On Yes
								EditorGUILayout.BeginHorizontal();
									GUILayout.Label(nextLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
									theObject.navigation.screenToLoadOnYes = EditorGUILayout.IntField("Yes Screen: ", theObject.navigation.screenToLoadOnYes );
								EditorGUILayout.EndHorizontal();
								
								// Add Space
								EditorGUILayout.Space();
								
								// screen To Load On No
								EditorGUILayout.BeginHorizontal();
									GUILayout.Label(nextLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
									theObject.navigation.screenToLoadOnNo = EditorGUILayout.IntField("No Screen: ", theObject.navigation.screenToLoadOnNo );
								EditorGUILayout.EndHorizontal();
							
							
							// USE CUSTOM SINGLE BUTTON DIALOG STYLE
							} else if ( theObject.screen.dialogStyle == DIALOGSTYLE.OneButton || 
										theObject.screen.dialogStyle == DIALOGSTYLE.DataEntry || 
										theObject.screen.dialogStyle == DIALOGSTYLE.Popup && theObject.screen.popupOptions == POPUP_OPTIONS.OneButton
							){
								
								// Options Label
								if ( theObject.screen.dialogStyle == DIALOGSTYLE.OneButton ){
									GUILayout.Label( "One Button Dialog", "BoldLabel", GUILayout.MaxWidth(320));
								} else if( theObject.screen.dialogStyle == DIALOGSTYLE.DataEntry ){
									GUILayout.Label( "Data Entry Dialog", "BoldLabel", GUILayout.MaxWidth(320));
								} else if( theObject.screen.dialogStyle == DIALOGSTYLE.Popup ){
									GUILayout.Label( "Popup Dialog", "BoldLabel", GUILayout.MaxWidth(320));
								}
								
								// Add Space
								EditorGUILayout.Space();
															
								// screen To Load Next
								EditorGUILayout.BeginHorizontal();
									GUILayout.Label(nextLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
									theObject.navigation.screenToLoadOnNext = EditorGUILayout.IntField(theObject.screen.customButton1+" Screen: ", theObject.navigation.screenToLoadOnNext );
								EditorGUILayout.EndHorizontal();
								
								// Show extra options on the One Button Mode
								if ( theObject.screen.dialogStyle == DIALOGSTYLE.OneButton ){
									
									// Add Space
									EditorGUILayout.Space();
									
									// Seconds To Display
									EditorGUILayout.BeginHorizontal();
										GUILayout.Label(timeLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
										theObject.navigation.secondsToDisplay = EditorGUILayout.IntField("Seconds To Show: ", theObject.navigation.secondsToDisplay ); 
									EditorGUILayout.EndHorizontal();
									
								}
							
							// USE CUSTOM TWO BUTTON DIALOG STYLE
							} else if (theObject.screen.dialogStyle == DIALOGSTYLE.TwoButtons || 
										theObject.screen.dialogStyle == DIALOGSTYLE.Popup && theObject.screen.popupOptions == POPUP_OPTIONS.TwoButtons ){
								
								// Options Label
								if ( theObject.screen.dialogStyle == DIALOGSTYLE.OneButton ){
									GUILayout.Label( "Two Button Dialog", "BoldLabel", GUILayout.MaxWidth(320));
								} else if ( theObject.screen.dialogStyle == DIALOGSTYLE.Popup ){
									GUILayout.Label( "Popup Dialog", "BoldLabel", GUILayout.MaxWidth(320));
								}
								
								// Add Space
								EditorGUILayout.Space();
								
								// screen To Load On Yes
								EditorGUILayout.BeginHorizontal();
									GUILayout.Label(nextLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
									theObject.navigation.screenToLoadOnYes = EditorGUILayout.IntField(theObject.screen.customButton1+" Screen: ", theObject.navigation.screenToLoadOnYes );
								EditorGUILayout.EndHorizontal();
								
								// Add Space
								EditorGUILayout.Space();
								
								// screen To Load On No
								EditorGUILayout.BeginHorizontal();
									GUILayout.Label(nextLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
									theObject.navigation.screenToLoadOnNo = EditorGUILayout.IntField(theObject.screen.customButton2+" Screen: ", theObject.navigation.screenToLoadOnNo );
								EditorGUILayout.EndHorizontal();
								
							}

							// USE MULTIPLE BUTTON DIALOG STYLE
							else if (theObject.screen.dialogStyle == DIALOGSTYLE.MultipleButtons){
							
								// Options Label
								GUILayout.Label( "Multiple Button Dialog", "BoldLabel", GUILayout.MaxWidth(320));
								
								// Add Space
								EditorGUILayout.Space();
								
								// If the size of the navigation multiple Buttons array doesn't match the main one ..
								if( theObject.navigation.multipleButtons != null &&
									theObject.navigation.multipleButtons.length != theObject.screen.multipleButtons.length
								){
									// Create a new one that matches!
									theObject.navigation.multipleButtons = new int[theObject.screen.multipleButtons.length];
								}
								
								// Make sure these options are valid
								if(theObject.screen.multipleButtons != null && theObject.navigation.multipleButtons != null && theObject.navigation.multipleButtons.length > 0 ){
									var multipleOptionCountNav : int = 0;
									for( var navOption : int in theObject.navigation.multipleButtons ){
										if(navOption != null){
											
											// Option Name
											EditorGUILayout.BeginHorizontal();
												GUILayout.Label(nextLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
												
												// Shorten the label to make it look better in the editor
												if( theObject.screen.multipleButtons[multipleOptionCountNav].length > 20 ){
													navOption = EditorGUILayout.IntField(theObject.screen.multipleButtons[multipleOptionCountNav].Substring(0,20)+".. ", navOption); 
												} else {
												
													navOption = EditorGUILayout.IntField(theObject.screen.multipleButtons[multipleOptionCountNav]+" ", navOption); 
												
												}
												
											EditorGUILayout.EndHorizontal();
											
											// Add Space
											EditorGUILayout.Space();
											EditorGUILayout.Space();
											
											// increment count
											multipleOptionCountNav++;
											
										}
									}
								} 
							}
								
							// USE PASSWORD OPTIONS
							else if (theObject.screen.dialogStyle == DIALOGSTYLE.Password){
								
								// Options Label
								GUILayout.Label( "Password Results", "BoldLabel", GUILayout.MaxWidth(320));
								
								// Add Space
								EditorGUILayout.Space();
								
								// screen To Load On Yes
								EditorGUILayout.BeginHorizontal();
									GUILayout.Label(nextLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
									theObject.navigation.screenToLoadOnYes = EditorGUILayout.IntField("Correct Screen: ", theObject.navigation.screenToLoadOnYes );
								EditorGUILayout.EndHorizontal();
								
								// Add Space
								EditorGUILayout.Space();
								
								// screen To Load On No
								EditorGUILayout.BeginHorizontal();
									GUILayout.Label(nextLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
									theObject.navigation.screenToLoadOnNo = EditorGUILayout.IntField("Incorrect Screen: ", theObject.navigation.screenToLoadOnNo );
								EditorGUILayout.EndHorizontal();
							
							}

							// USE ICON GRID OPTIONS
							else if (theObject.screen.dialogStyle == DIALOGSTYLE.IconGrid){
								
								// Options Label
								GUILayout.Label( "Icon Grid", "BoldLabel", GUILayout.MaxWidth(320));
								
								// Loop through the Icon Grid Buttons
								if( theObject.screen.IG_buttons != null && theObject.screen.IG_buttons.length > 0){
									for(var IG_NavBtn : IconGridButtons in theObject.screen.IG_buttons ){

										// Add Space
										EditorGUILayout.Space();
										
										// screen To Load On Yes
										EditorGUILayout.BeginHorizontal();
											GUILayout.Label(nextLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
											IG_NavBtn.nextID = EditorGUILayout.IntField(IG_NavBtn.title+": ", IG_NavBtn.nextID );
										EditorGUILayout.EndHorizontal();

									}
								}
							}
							
							// Show the info message if we are using the Logic Mode
							if( theObject.screen.dialogStyle == DIALOGSTYLE.Logic ){
							
								// Warning info
								EditorGUILayout.Space();
								EditorGUILayout.BeginHorizontal();
									GUILayout.FlexibleSpace();
									EditorGUILayout.BeginHorizontal(  GUILayout.MinHeight(16), GUILayout.MaxHeight(16), GUILayout.MinWidth(530), GUILayout.MaxWidth(530) );
										
										//GUILayout.Label("", GUILayout.MinWidth(0), GUILayout.MaxWidth(0), GUILayout.MinHeight(5), GUILayout.MaxHeight(5)); // weird spacing fix.
										EditorGUILayout.BeginHorizontal();
										GUILayout.Label(warningIcon, GUILayout.MinWidth(64), GUILayout.MaxWidth(64), GUILayout.MinHeight(64), GUILayout.MaxHeight(64));
										EditorGUILayout.BeginVertical();
										
											GUILayout.Label("Logic Mode",  "boldLabel");
											GUILayout.Label("The Navigation tab is not used while using the \"Logic\" Dialog Style.");
										EditorGUILayout.EndVertical();
										EditorGUILayout.EndHorizontal();
									EditorGUILayout.EndHorizontal();
									GUILayout.FlexibleSpace();
								EditorGUILayout.EndHorizontal();
							
							// Show the extra options if we are not using the Logic style
							} else {
								
								// Add Space
								EditorGUILayout.Space();
								EditorGUILayout.Space();
								SepLine();
								EditorGUILayout.Space();
							
								// Options Label
								GUILayout.Label("Options", "BoldLabel", GUILayout.MaxWidth(220));
							
								// LIMIT THIS
								if ( theObject.screen.dialogStyle == DIALOGSTYLE.NextButton ){
									
									// Add Space
									EditorGUILayout.Space();
								
									// Hide Next Button
									EditorGUILayout.BeginHorizontal();
										GUILayout.Label(hideLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
										theObject.navigation.hideNextButton = EditorGUILayout.Toggle("Hide Next UI Button: ", theObject.navigation.hideNextButton );
									EditorGUILayout.EndHorizontal();
									
								}
								
								if ( theObject.screen.dialogStyle == DIALOGSTYLE.OneButton || theObject.screen.dialogStyle == DIALOGSTYLE.Title ){
									
									// Add Space
									EditorGUILayout.Space();
										
									// Hide Next Button
									EditorGUILayout.BeginHorizontal();
										GUILayout.Label(hideLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
										theObject.navigation.hideNextButton = EditorGUILayout.Toggle("Hide Custom UI Button: ", theObject.navigation.hideNextButton );
									EditorGUILayout.EndHorizontal();
								}
								
								// Add Space
								EditorGUILayout.Space();
								
								// Hide UI Background
								EditorGUILayout.BeginHorizontal();
									GUILayout.Label(hideLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
									theObject.navigation.hideDialogBackground = EditorGUILayout.Toggle( "Hide UI Background: ", theObject.navigation.hideDialogBackground); 
								EditorGUILayout.EndHorizontal();
								
								// Add Space
								EditorGUILayout.Space();
								
								// No Portrait Fade In
								EditorGUILayout.BeginHorizontal();
									GUILayout.Label(fadeInLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
									theObject.navigation.noPortraitFadeIn = EditorGUILayout.Toggle("No Portrait Fade In: ", theObject.navigation.noPortraitFadeIn );
								EditorGUILayout.EndHorizontal();
								
								// Add Space
								EditorGUILayout.Space();
								
								// No Portrait Fade Out
								EditorGUILayout.BeginHorizontal();
									GUILayout.Label(fadeOutLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
									theObject.navigation.noPortraitFadeOut = EditorGUILayout.Toggle("No Portrait Fade Out: ", theObject.navigation.noPortraitFadeOut );
								EditorGUILayout.EndHorizontal();
								
								
								// Add Space
								EditorGUILayout.Space();
								
								// Is This The Last Dialog
								EditorGUILayout.BeginHorizontal();
									GUILayout.Label(stopLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
									theObject.navigation.endDialogAfterThis = EditorGUILayout.Toggle("Last Dialog: ", theObject.navigation.endDialogAfterThis );
								EditorGUILayout.EndHorizontal();
								
								// Allow us to destroy this Dialog object if this is the last dialog screen
								if( theObject.navigation.endDialogAfterThis ){
									
									// Add Space
									EditorGUILayout.Space();
									
									// Destroy GameObject At End
									EditorGUILayout.BeginHorizontal();
										GUILayout.Label(deleteLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
										theObject.navigation.destroyAtEnd  = EditorGUILayout.Toggle("Destroy At End: ", theObject.navigation.destroyAtEnd );
									EditorGUILayout.EndHorizontal();

									// Add Space
									EditorGUILayout.Space();
									SepLine();
									EditorGUILayout.Space();

									// =================================
									//	LOAD NEW SCENE
									// =================================

									// Options Label
									GUILayout.Label("Load Unity Scene", "BoldLabel", GUILayout.MaxWidth(220));
									EditorGUILayout.Space();
									GUILayout.Label("After this dialog cleanly fades out, you can either restart the current scene\nor load a completely new one by name.", GUILayout.MaxWidth(500));

									// Add Space
									EditorGUILayout.Space();

									// Restart Level At End
									EditorGUILayout.BeginHorizontal();
										GUILayout.Label(unityLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
										theObject.navigation.restartLevelAtEnd  = EditorGUILayout.Toggle("Restart Level At End: ", theObject.navigation.restartLevelAtEnd );
									EditorGUILayout.EndHorizontal();

									// Load Level At End
									EditorGUILayout.BeginHorizontal();
										GUILayout.Label(unityLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
										theObject.navigation.loadLevelAtEnd  = EditorGUILayout.TextField("Load Level At End: ", theObject.navigation.loadLevelAtEnd );
									EditorGUILayout.EndHorizontal();

									
									// Add Space
									EditorGUILayout.Space();

									// If we are not restarting the level or loading a new one, show the LDC link dialogs
									if( !theObject.navigation.restartLevelAtEnd && theObject.navigation.loadLevelAtEnd == ""){

										// Seperator Line
										SepLine();
										EditorGUILayout.Space();

										// =================================
										//	PLAY ANOTHER LDC DIALOG
										// =================================

										// Options Label
										GUILayout.Label("Play Another LDC Dialog", "BoldLabel", GUILayout.MaxWidth(220));
										EditorGUILayout.Space();
										//GUILayout.Label("After this dialog ends you can instantiate an Auto-Play Dialog from a prefab.\nAlternatively, you can find and play an existing dialog in the scene by name.", GUILayout.MaxWidth(500));
										GUILayout.Label("After this screen ends you can immediately load a Dialog from a prefab.\nAlternatively, you can find and play an existing dialog in the scene by name.\nIt is also possible to select the exact screen to load within the new dialog.", GUILayout.MaxWidth(500));

										// Add Space
										EditorGUILayout.Space();
										EditorGUILayout.Space();

										// Instantiate AutoPlay Dialog
										EditorGUILayout.BeginHorizontal();
											GUILayout.Label(cubeLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
											theObject.navigation.instantiateDialogPrefabAtEnd  = EditorGUILayout.ObjectField("Create Dialog From Prefab: ", theObject.navigation.instantiateDialogPrefabAtEnd, GameObject, false );
										EditorGUILayout.EndHorizontal();

										// Find And Play Dialog
										EditorGUILayout.BeginHorizontal();
											GUILayout.Label(playLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
											theObject.navigation.findAndPlayOtherDialogAtEnd  = EditorGUILayout.TextField("Find And Play This Dialog: ", theObject.navigation.findAndPlayOtherDialogAtEnd );
										EditorGUILayout.EndHorizontal();
									
										// Use A Different Start ID?
										EditorGUILayout.BeginHorizontal();
											GUILayout.Label(speechLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
											theObject.navigation.useDifferentStartID = EditorGUILayout.Toggle("Use A Different Start ID? ", theObject.navigation.useDifferentStartID );
											// Always set the override to 0 if we haven't selected to use an override.
											if(theObject.navigation.useDifferentStartID == false ){ theObject.navigation.newStartID = 0; }
										EditorGUILayout.EndHorizontal();

										// Override Start ID To What?
										if(theObject.navigation.useDifferentStartID == true ){
											EditorGUILayout.BeginHorizontal();
												GUILayout.Label(xLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
												theObject.navigation.newStartID  = EditorGUILayout.IntField("New Start ID: ", theObject.navigation.newStartID );
												if(theObject.navigation.newStartID < 1 ){ theObject.navigation.newStartID = 1; } // Make sure its at least 1
											EditorGUILayout.EndHorizontal();
										}

										// Add Space
										EditorGUILayout.Space();

									// If we are restarting / loading a level, make sure we remove all ldc dialog links	
									} else {

										// Seperator Line
										SepLine();
										EditorGUILayout.Space();

										// Options Label
										GUI.color.a = 0.5;
										GUILayout.Label("Play Another LDC Dialog", "BoldLabel", GUILayout.MaxWidth(220));
										EditorGUILayout.Space();
										GUILayout.Label("You cannot play another LDC dialog if you are loading a Unity scene.", GUILayout.MaxWidth(500));
										GUI.color.a = 1;

										// Add Space
										EditorGUILayout.Space();

										// Clean up values
										theObject.navigation.instantiateDialogPrefabAtEnd = null;
										theObject.navigation.findAndPlayOtherDialogAtEnd = "";
									}

								// Otherwise always set it to false to keep this clean	
								} else {
									theObject.navigation.destroyAtEnd = false;
									theObject.navigation.restartLevelAtEnd = false;
									theObject.navigation.loadLevelAtEnd = "";
									theObject.navigation.instantiateDialogPrefabAtEnd = null;
									theObject.navigation.findAndPlayOtherDialogAtEnd = "";
								}

								// ======================
								// NAVIGATION CALLBACK
								// ======================

								// Add Space
								EditorGUILayout.Space();
								EditorGUILayout.Space();
								SepLine();
								EditorGUILayout.Space();
							
								// Options Label
								GUILayout.Label("Callback", "BoldLabel", GUILayout.MaxWidth(220));
								EditorGUILayout.Space();
								GUILayout.Label("Get info about what button the user presses using SendMessage. Finds a", GUILayout.MaxWidth(450));
								GUILayout.Label("GameObject and sends String[ ldcName, dialogId, buttonId, buttonName, Arg ].", GUILayout.MaxWidth(450));
								EditorGUILayout.Space();
								EditorGUILayout.Space();

								// GameObject To Find
								EditorGUILayout.BeginHorizontal();
									GUILayout.Label(findLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
									theObject.navigation.navigationCallbackGOName = EditorGUILayout.TextField("GameObject To Find: ", theObject.navigation.navigationCallbackGOName );
								EditorGUILayout.EndHorizontal();

								// Function Name
								EditorGUILayout.BeginHorizontal();
									GUILayout.Label(gearLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
									theObject.navigation.navigationCallbackFunctionName = EditorGUILayout.TextField("Function Name: ", theObject.navigation.navigationCallbackFunctionName );
								EditorGUILayout.EndHorizontal();

								// String Argument
								EditorGUILayout.BeginHorizontal();
									GUILayout.Label(buttonLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
									theObject.navigation.navigationCallbackArg = EditorGUILayout.TextField("String Argument: ", theObject.navigation.navigationCallbackArg );
								EditorGUILayout.EndHorizontal();

								EditorGUILayout.Space();
							
							}
													
						// Vertical
						EditorGUILayout.EndVertical();
					
						// Add indent
						GUILayout.Label("", GUILayout.MaxWidth(5));
						
					// Horizontal
					EditorGUILayout.EndHorizontal();
					
					// Add Space
					EditorGUILayout.Space();
			
				// End Box
				//GUILayout.EndHorizontal();
			
			}
			
			// ---------------------------------------------------------------------------------------------
			//	TAB 2 - ACTION
			// ---------------------------------------------------------------------------------------------
			
			else if ( theObject.tab == 2 ) { // The selected tab is "Actions"
			
				// Box
				//GUILayout.BeginVertical ("box", GUILayout.MaxWidth(3000) );
			
					// Add Space
					EditorGUILayout.Space();
				
				
					// TITLE
					EditorGUILayout.BeginHorizontal();
						
						DoNotes(theObject);
							
						GUILayout.FlexibleSpace();
						
						// Fix DialogID if there is anything wrong.
						if ( theObject.dialogID == null || theObject.dialogID < 1 ) {
							theObject.dialogID = 1;
						} 
						
						//theObject.dialogID = System.Int32.Parse( EditorGUILayout.TextField("Dialog ID: ", theObject.dialogID.ToString()) );
						GUILayout.Label(speechLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
						GUILayout.Label("Dialog ID: ", GUILayout.MinWidth(60), GUILayout.MaxWidth(64),GUILayout.MaxHeight(20));
						theObject.dialogID = EditorGUILayout.IntField("", theObject.dialogID, GUILayout.MinWidth(32),GUILayout.MaxWidth(32), GUILayout.MaxHeight(20) );
						
						GUILayout.Label("", GUILayout.MaxWidth(10));
					EditorGUILayout.EndHorizontal();
					EditorGUILayout.Space();
				
					// Horizontal
					EditorGUILayout.BeginHorizontal();
					
						// Add indent
						GUILayout.Label("", GUILayout.MaxWidth(5));
						
						// Add the Portrait / Icon
						EditorGUILayout.BeginVertical(GUILayout.MaxWidth(105));
						
							// Use Icons
							if( theObject.screen.dialogStyle == DIALOGSTYLE.DataEntry ){
								
								GUILayout.Label(dataEntryIcon, GUILayout.MinWidth(100), GUILayout.MinHeight(100) , GUILayout.MaxWidth(100), GUILayout.MaxHeight(100) );
								theObject.screen.portrait = null;
								
							} else if( theObject.screen.dialogStyle == DIALOGSTYLE.Password){
								
								GUILayout.Label(passwordIcon, GUILayout.MinWidth(100), GUILayout.MinHeight(100) , GUILayout.MaxWidth(100), GUILayout.MaxHeight(100));
								theObject.screen.portrait = null;
								
							} else if( theObject.screen.dialogStyle == DIALOGSTYLE.Logic ){
								
								GUILayout.Label(logicIcon, GUILayout.MinWidth(100), GUILayout.MinHeight(100) , GUILayout.MaxWidth(100), GUILayout.MaxHeight(100));
								theObject.screen.portrait = null;
							
							} else if( theObject.screen.dialogStyle == DIALOGSTYLE.Title ){
								
								GUILayout.Label(titleIcon, GUILayout.MinWidth(100), GUILayout.MinHeight(100) , GUILayout.MaxWidth(100), GUILayout.MaxHeight(100));
								theObject.screen.portrait = null;
							
							} else if( theObject.screen.dialogStyle == DIALOGSTYLE.Popup ){
							
								GUILayout.Label(popupImageIcon, GUILayout.MinWidth(100), GUILayout.MinHeight(100) , GUILayout.MaxWidth(100), GUILayout.MaxHeight(100));
								theObject.screen.portrait = null;

							} else if( theObject.screen.dialogStyle == DIALOGSTYLE.IconGrid ){
							
								GUILayout.Label(iconGridIcon, GUILayout.MinWidth(100), GUILayout.MinHeight(100) , GUILayout.MaxWidth(100), GUILayout.MaxHeight(100));
								theObject.screen.portrait = null;	
							
							#if UNITY_POSTBRUTAL
							} else if( theObject.screen.dialogStyle == DIALOGSTYLE.VoiceRoom ){
								
								GUILayout.Label(voiceRoomIcon, GUILayout.MinWidth(100), GUILayout.MinHeight(100) , GUILayout.MaxWidth(100), GUILayout.MaxHeight(100));
								theObject.screen.portrait = null;
							#endif

							// Show portrait	
							} else {
						
								// Show Animated Portrait
								if( !EditorTime.actorLibraryUnavailable && theObject.screen.animatedPortrait != Vector2(-1,-1) ){
									GUILayout.Label("Animated Icon:", GUILayout.MinWidth(100), GUILayout.MaxWidth(100));
									GUILayout.Label(DoDialogCastAnimation(theObject.screen.editorPortraitAnimation, theObject.screen.portrait), GUILayout.MinWidth(100), GUILayout.MinHeight(100) , GUILayout.MaxWidth(100), GUILayout.MaxHeight(100) );
									
									DoLibraryMissingMessage();
									
								// Show Standard Portrait	
								} else {
									GUILayout.Label("Static Icon:", GUILayout.MinWidth(100), GUILayout.MaxWidth(100));
									theObject.screen.portrait = EditorGUILayout.ObjectField(theObject.screen.portrait, Texture2D, false, GUILayout.MinWidth(100), GUILayout.MinHeight(100) , GUILayout.MaxWidth(100), GUILayout.MaxHeight(100));
								}
								
								// If the Dialog Cast is available, show the View Cast button
								if( DCs && DCs.length>0 ){ 
									EditorGUILayout.BeginHorizontal(GUILayout.MaxWidth(100));
									
										GUILayout.Label(cameraLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
										if( GUILayout.Button("View Cast", GUILayout.MinWidth(75), GUILayout.MaxWidth(75),GUILayout.MaxHeight(20) ) ){
											browseMode = true;
											browseButtonOutput = -100;	// Remove the id for button References (-100 = None)
											output = BrowseOutput.Portrait;
										}
									EditorGUILayout.EndHorizontal();
									
									EditorGUILayout.BeginHorizontal(GUILayout.MaxWidth(100));
									
										GUILayout.Label(deleteLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
										if( GUILayout.Button("No Portrait", GUILayout.MinWidth(75), GUILayout.MaxWidth(75),GUILayout.MaxHeight(20) ) ){
											browseMode = false;
											browseButtonOutput = -100;	// Remove the id for button References (-100 = None)
											theObject.screen.portrait = null;
											theObject.screen.animatedPortrait = Vector2( -1, -1 );	
										}
									EditorGUILayout.EndHorizontal();
									
									if( theObject.screen.animatedPortrait != Vector2(-1,-1) ){
										EditorGUILayout.BeginHorizontal(GUILayout.MaxWidth(100));
										
											GUILayout.Label(deleteLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
											if( GUILayout.Button("No Anim", GUILayout.MinWidth(75), GUILayout.MaxWidth(75),GUILayout.MaxHeight(20) ) ){
												browseMode = false;
												browseButtonOutput = -100;	// Remove the id for button References (-100 = None)
												theObject.screen.animatedPortrait = Vector2( -1, -1 );	
											}
										EditorGUILayout.EndHorizontal();
									}
								}
							}
							
						// End of Portrait
						EditorGUILayout.EndVertical();
			
						// Vertical
						EditorGUILayout.BeginVertical();
							
							// Add some extra space so it alligns with the portrait
							EditorGUILayout.Space();
							EditorGUILayout.Space();
							
							// Show the info message if we are using the Logic Mode
							if( theObject.screen.dialogStyle == DIALOGSTYLE.Logic ){
							
								// Warning info
								EditorGUILayout.Space();
								EditorGUILayout.BeginHorizontal();
									GUILayout.FlexibleSpace();
									EditorGUILayout.BeginHorizontal(  GUILayout.MinHeight(16), GUILayout.MaxHeight(16), GUILayout.MinWidth(530), GUILayout.MaxWidth(530) );
										
										//GUILayout.Label("", GUILayout.MinWidth(0), GUILayout.MaxWidth(0), GUILayout.MinHeight(5), GUILayout.MaxHeight(5)); // weird spacing fix.
										EditorGUILayout.BeginHorizontal();
										GUILayout.Label(warningIcon, GUILayout.MinWidth(64), GUILayout.MaxWidth(64), GUILayout.MinHeight(64), GUILayout.MaxHeight(64));
										EditorGUILayout.BeginVertical();
										
											GUILayout.Label("Logic Mode",  "boldLabel");
											GUILayout.Label("The Actions tab is not used while using the 'Logic' Dialog Style.");
										EditorGUILayout.EndVertical();
										EditorGUILayout.EndHorizontal();
									EditorGUILayout.EndHorizontal();
									GUILayout.FlexibleSpace();
								EditorGUILayout.EndHorizontal();
							
							// Show the extra options if we are not using the Logic style
							} else {
							
								// Show Tabs
								EditorGUILayout.BeginVertical("Box");
								EditorGUILayout.Space();
									EditorGUILayout.BeginHorizontal();
										
										GUILayout.Label("", GUILayout.MaxWidth(5));
										
										// Create a GUI Content Array to use with the Action Tabs
										var actionGC : GUIContent[] = new GUIContent[7];
										for( var gci : int; gci<actionGC.length; gci++ ){
											actionGC[gci] = new GUIContent();
											if(actionStringsCount[gci]!=null){	actionGC[gci].text = actionStringsCount[gci]; }
											if(actionStrings[gci]!=null){	actionGC[gci].tooltip = actionStrings[gci]; }
											if(actionImages[gci]!=null){	actionGC[gci].image = actionImages[gci]; }	
										}

										// Cache tab (we do this to fix the weird focus bug when switching between tabs)
										var oldActionTab : int = theObject.actionTab;
										GUI.SetNextControlName ("LDC Action Tabs");
										
					           			theObject.actionTab = GUILayout.SelectionGrid (theObject.actionTab, actionGC, 7, GUILayout.MinHeight(20), GUILayout.MaxHeight(20), GUILayout.MinWidth(400));
					           			GUILayout.Label("", GUILayout.MaxWidth(5));

					           			// See if the tabs have been changed, and then set focus to the tabs.
					           			if(oldActionTab != theObject.actionTab){
					           				// Debug.Log("Action Tabs Changed");
					           				GUI.FocusControl ("LDC Action Tabs");	
					           			}
									
									EditorGUILayout.EndHorizontal();
									
									EditorGUILayout.Space();
									
								EditorGUILayout.EndVertical();
	
								// Add Space
								//EditorGUILayout.Space();
								EditorGUILayout.Space();
								
								// ---------------------------------------------------------------------------------------------
								
								// DO THE ADVANCED TAB
								// GameObjects
								if(theObject.actionTab == 0){
									DoGameObjectActionsTab(theObject);
									
								
								// Background
								} else if(theObject.actionTab == 1){	
									DoSceneActionsTab(theObject);
									
								
								// Actors
								} else if(theObject.actionTab == 2){	
									DoSceneActorsTab(theObject);
									
										
								// Audio	
								} else if(theObject.actionTab == 3){
									DoSceneAudioTab(theObject);
									
									
								// Tokens
								} else if(theObject.actionTab == 4){
									DoTokensTab(theObject);
								
								// Localization / UI Action
								} else if(theObject.actionTab == 5){
									DoLocalizationUITab(theObject);

								// 3RD PARTY TOOLS
								} else if(theObject.actionTab == 6){
									//DoTokensTab(theObject);
									
									//EditorGUILayout.Space();
									GUILayout.Label("3rd Party Tools", "BoldLabel");
									GUILayout.Label("Select a supported 3rd party tool to view it's actions.");
									EditorGUILayout.Space();
									
									// Create third party GUI Content Array
									var thirdPartyGC : GUIContent[] = new GUIContent[thirdPartyTools.length];
										for( var tpgci : int; tpgci<thirdPartyGC.length; tpgci++ ){
											thirdPartyGC[tpgci] = new GUIContent();
											if(thirdPartyTools[tpgci]!=null){	thirdPartyGC[tpgci].text = "   "+thirdPartyTools[tpgci]; }
											if(thirdPartyTools[tpgci]!=null){	thirdPartyGC[tpgci].tooltip = thirdPartyTools[tpgci]; }
											if(thirdPartyIcons[tpgci]!=null){	thirdPartyGC[tpgci].image = thirdPartyIcons[tpgci]; }	
										}

									// Cache tab (we do this to fix the weird focus bug when switching between tabs)
									var old3rdPartyTab : int = theObject.thirdPartyActionTab;
									GUI.SetNextControlName ("LDC 3rd Party Tabs");	
									
									// Create selection box for third party tools
									theObject.thirdPartyActionTab = GUILayout.SelectionGrid (theObject.thirdPartyActionTab, thirdPartyGC, 4, GUILayout.MinHeight(20), GUILayout.MaxHeight(20), GUILayout.MinWidth(400));

									// See if the tabs have been changed, and then set focus to the tabs.
					       			if(old3rdPartyTab != theObject.thirdPartyActionTab){
					       				// Debug.Log("3rd Party Tab Changed");
					       				GUI.FocusControl ("LDC 3rd Party Tabs");	
					       			}
									
									// Do uSequencer
									var thirdPartyOffset : int = 0;
									#if UNITY_POSTBRUTAL
										thirdPartyOffset = 1;
										if( theObject.thirdPartyActionTab == 0){
											DoPBTab(theObject);
										}

									#endif

									if( theObject.thirdPartyActionTab == 0+thirdPartyOffset){
										DoUSequencerTab(theObject);
									}
									
								}
							
							}
				
					// ---------------------------------------------------------------------------------------------

					// Vertical
					EditorGUILayout.EndVertical();
					
				// Add indent
				GUILayout.Label("", GUILayout.MaxWidth(5));
				
				// Horizontal
				EditorGUILayout.EndHorizontal();
				
				// Add Space
				EditorGUILayout.Space();	
				
				
				// End Box
				//GUILayout.EndHorizontal();
				
				
			} 
			
			
			// ---------------------------------------------------------------------------------------------
			//	TAB 3 - LOCALIZATION
			// ---------------------------------------------------------------------------------------------
			
			else if ( theObject.tab == 3 ) { // The selected tab is "Localization"
			
				// Box
				//GUILayout.BeginVertical ("box", GUILayout.MaxWidth(3000) );
			
					// Add Space
					EditorGUILayout.Space();
				
					// TITLE
					EditorGUILayout.BeginHorizontal();
						
						DoNotes(theObject);
							
						GUILayout.FlexibleSpace();
						
						// Fix DialogID if there is anything wrong.
						if ( theObject.dialogID == null || theObject.dialogID < 1 ) {
							theObject.dialogID = 1;
						} 
						
						//theObject.dialogID = System.Int32.Parse( EditorGUILayout.TextField("Dialog ID: ", theObject.dialogID.ToString()) );
						GUILayout.Label(speechLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
						GUILayout.Label("Dialog ID: ", GUILayout.MinWidth(60), GUILayout.MaxWidth(64),GUILayout.MaxHeight(20));
						theObject.dialogID = EditorGUILayout.IntField("", theObject.dialogID, GUILayout.MinWidth(32),GUILayout.MaxWidth(32), GUILayout.MaxHeight(20) );
						
						GUILayout.Label("", GUILayout.MaxWidth(10));
					EditorGUILayout.EndHorizontal();
					EditorGUILayout.Space();
					
					
					//selectLocalization
					
					// SELECT LANGUAGE
					// Horizontal
					EditorGUILayout.BeginHorizontal();
						GUILayout.Label("", GUILayout.MaxWidth(5));	
							
							EditorGUILayout.BeginHorizontal("box");
						
							EditorGUILayout.BeginHorizontal();
								GUILayout.Label("", GUILayout.MaxWidth(5));
								
								GUILayout.Label(selectLocalization, GUILayout.MaxWidth(64));
								
								// Cache the old language selection
								var languageChanged : int = theObject.selLanguage;
								
								EditorGUILayout.BeginVertical();
									GUILayout.Label(" Select Language", "BoldLabel" );
									
									// Cache tab (we do this to fix the weird focus bug when switching between tabs)
									var oldLanguageTabs : int = theObject.selLanguage;
									GUI.SetNextControlName ("LDC Language Tabs");

									// Show the Language tabs
									theObject.selLanguage = GUILayout.SelectionGrid (theObject.selLanguage, selLanguageStrings, 5);

									// See if the tabs have been changed, and then set focus to the tabs.
				           			if(oldLanguageTabs != theObject.selLanguage){
				           				// Debug.Log("Language Tabs Changed");
				           				GUI.FocusControl ("LDC Language Tabs");	
				           			}

								//	GUILayout.Label("", GUILayout.MaxWidth(5));	
								EditorGUILayout.EndVertical();
								
								// If we've made a new language selection, Apply this language to ALL dialogScreens on this gameObject.
								if( languageChanged != theObject.selLanguage ){
									var dScreens : Component[] = theObject.gameObject.GetComponents(DialogScreen);
									for( var dScreen : DialogScreen in dScreens){
										if(dScreen!=null){
											dScreen.selLanguage = theObject.selLanguage;
										}
									}
								}
								
								GUILayout.Label("", GUILayout.MaxWidth(5));				
							EditorGUILayout.EndHorizontal();
						EditorGUILayout.EndHorizontal();
						GUILayout.Label("", GUILayout.MaxWidth(5));	
					EditorGUILayout.EndHorizontal();
					
					// MASS TRANSLATION PROGRESS BAR.
					/*
					// Do Progress Bar
					if( massTranslate ){
						
						// Space
						EditorGUILayout.Space();
						
						// Label
						GUILayout.Label("HERE","boldLabel");
						GUILayout.Label("Localizing ...");
						
						// Space
						EditorGUILayout.Space();
						EditorGUILayout.BeginHorizontal();
							GUILayout.Label("", GUILayout.MaxWidth(5));
							EditorGUILayout.BeginVertical("Box");
						
								
							
							EditorGUILayout.EndVertical();
							GUILayout.Label("", GUILayout.MaxWidth(5));
						EditorGUILayout.EndHorizontal();
						
						// Space
						EditorGUILayout.Space();
						
					// Do Standard Translation UI
					} else {
					*/	
						// Setup the Translation reference
						var theTranslation : DS_Language;
						
						// REFERENCE THE CORRECT LANGUAGE
						if ( theObject.selLanguage == 6 ) {	// Chinese
							theTranslation = theObject.localization.chinese;
						} else if ( theObject.selLanguage == 7 ) {	// Korean
							theTranslation = theObject.localization.korean;
						} else if ( theObject.selLanguage == 8 ) {	// Japanese
							theTranslation = theObject.localization.japanese;
						} else if ( theObject.selLanguage == 0 ) {	// Spanish
							theTranslation = theObject.localization.spanish;
						} else if ( theObject.selLanguage == 1 ) {	// Italian
							theTranslation = theObject.localization.italian;	
						} else if ( theObject.selLanguage == 2 ) {	// German
							theTranslation = theObject.localization.german;
						} else if ( theObject.selLanguage == 3 ) {	// French
							theTranslation = theObject.localization.french;
						} else if ( theObject.selLanguage == 4 ) {	// Portuguese
							theTranslation = theObject.localization.portuguese;
						} else if ( theObject.selLanguage == 5 ) {	// Russian
							theTranslation = theObject.localization.russian;
						}
						
						
						// Make sure we've selected a language
						if ( theTranslation != null ) {
						
							// SPLIT UP THE VIEW
							EditorGUILayout.BeginHorizontal();
								GUILayout.Label("", GUILayout.MaxWidth(5));	
								EditorGUILayout.BeginVertical();
							
									// Space
									GUILayout.Label("", GUILayout.MaxHeight(5));
								
									// Title,
									EditorGUILayout.BeginHorizontal();
									
										GUILayout.Label("", GUILayout.MaxWidth(5));		// Space
										GUILayout.Label(ukFlag, GUILayout.MaxWidth(20));
										GUILayout.Label("English", "BoldLabel", GUILayout.MaxWidth(200));
										
										// REFERENCE THE CORRECT LANGUAGE
										if ( theObject.selLanguage == 6 ) {	// Chinese
											GUILayout.Label(chinaFlag, GUILayout.MaxWidth(20));
										} else if ( theObject.selLanguage == 7 ) {	// Korean
											GUILayout.Label(koreaFlag, GUILayout.MaxWidth(20));
										} else if ( theObject.selLanguage == 8 ) {	// Japanese
											GUILayout.Label(japanFlag, GUILayout.MaxWidth(20));
										} else if ( theObject.selLanguage == 0 ) {	// Spanish
											GUILayout.Label(spainFlag, GUILayout.MaxWidth(20));
										} else if ( theObject.selLanguage == 1 ) {	// Italian
											GUILayout.Label(italyFlag, GUILayout.MaxWidth(20));	
										} else if ( theObject.selLanguage == 2 ) {	// German
											GUILayout.Label(germanyFlag, GUILayout.MaxWidth(20));
										} else if ( theObject.selLanguage == 3 ) {	// French
											GUILayout.Label(franceFlag, GUILayout.MaxWidth(20));
										} else if ( theObject.selLanguage == 4 ) {	// Portuguese
											GUILayout.Label(portugalFlag, GUILayout.MaxWidth(20));
										} else if ( theObject.selLanguage == 5 ) {	// Russian
											GUILayout.Label(russiaFlag, GUILayout.MaxWidth(20));
										}
										
										
										GUILayout.Label("Translation ("+selLanguageStrings[theObject.selLanguage]+")", "BoldLabel"); 
										GUILayout.Label("", GUILayout.MaxWidth(5));		// Space
									
									EditorGUILayout.EndHorizontal();
									
									// Add Space
									EditorGUILayout.Space();
								
									// IF we are using Logic ..
									if( theObject.screen.dialogStyle == DIALOGSTYLE.Logic){
										
										// Make sure that the logic statements are valid and they match up - then create the loop
										if( theObject.screen.logicStatements != null && 
											theObject.screen.logicStatements.length > 0 &&
											theTranslation.logicStatementCompare != null && 
											theTranslation.logicStatementCompare.length == theObject.screen.logicStatements.length
										){
											var localizedEventLooper : int = 0; // Helper
											for(var localizedEvent : LogicStatements in theObject.screen.logicStatements ){
												if(localizedEvent!=null){
												
													// Localized field
													EditorGUILayout.BeginHorizontal();
												
														GUILayout.Label("", GUILayout.MaxWidth(5));		// Space
														GUILayout.Label(keyLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));	// Label
														EditorGUILayout.TextArea(theObject.screen.logicStatements[localizedEventLooper].compare, GUILayout.MaxWidth(200));	// Label
														if( theTranslation.logicStatementCompare[localizedEventLooper] != null ){
															theTranslation.logicStatementCompare[localizedEventLooper] = EditorGUILayout.TextField(theTranslation.logicStatementCompare[localizedEventLooper]);
														}
												
													EditorGUILayout.EndHorizontal();
													
													// Increment looper
													localizedEventLooper++;
												}
											}
										} else {
										
											// DEAL WITH SYNCING PROBLEMS
											// The translation doesn't have the same array length as the main screen version. We need to recreate it.
											if( theObject.screen.logicStatements != null && 
												theObject.screen.logicStatements.length > 0 &&
												theTranslation.logicStatementCompare != null && 
												theTranslation.logicStatementCompare.length != theObject.screen.logicStatements.length 
											){
												
												// Setup a new Array that is the correct size
												var newStatements : String[] = new String[theObject.screen.logicStatements.length];
											
												// Loop through the localized Array, and copy any info that was already inside of it!
												var i : int = 0;
												for( var stringItem : String in theTranslation.logicStatementCompare ){
													
													// If the translation has an entry for this index, create new
													//newStatements[i] = "";
													stringItem = "";
													
													// Increment the counter
													i++;
												}
											
												// Replace the Translation array with these newly built one!
												theTranslation.logicStatementCompare = newStatements;
											
												Debug.Log("DIALOG SCREEN EDITOR: Fixed Array Sync problem in current localization! [Logic]");
											}
										}
									
									// If we're not using the Logic Mode, we can show the Actor name	
									} else {
								
										// Actor Name
										EditorGUILayout.BeginHorizontal();
										
											GUILayout.Label("", GUILayout.MaxWidth(5));		// Space
											GUILayout.Label(theObject.screen.dialogStyle == DIALOGSTYLE.Title ? buttonLabel : nameLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));	// Label
											EditorGUILayout.TextArea(theObject.screen.actorName, GUILayout.MaxWidth(200));	// Label
											theTranslation.actorName = EditorGUILayout.TextField(theTranslation.actorName);
										
										EditorGUILayout.EndHorizontal();
									
									}
						
									// Show Dialog Text if we're not working with Multiple Buttons or Data Entry
									if (theObject.screen.dialogStyle != DIALOGSTYLE.MultipleButtons && 
										theObject.screen.dialogStyle != DIALOGSTYLE.DataEntry &&
										theObject.screen.dialogStyle != DIALOGSTYLE.Password &&
										theObject.screen.dialogStyle != DIALOGSTYLE.Logic
									){
										
										// Dialog Text
										EditorGUILayout.BeginHorizontal();
										
										
											GUILayout.Label("", GUILayout.MaxWidth(5));		// Space
											GUILayout.Label(theObject.screen.dialogStyle == DIALOGSTYLE.Title ? buttonLabel : speechLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(60));	// Label
											EditorGUILayout.TextArea(theObject.screen.dialogText, GUILayout.MaxWidth(200), GUILayout.MinHeight(60));	// Label
											theTranslation.dialogText = EditorGUILayout.TextField("", theTranslation.dialogText, GUILayout.MinHeight(60) );
											
										
										EditorGUILayout.EndHorizontal();
										
										// Add Space
										EditorGUILayout.Space();
									
									// USE MULTIPLE BUTTON DIALOG STYLE
									} else if (theObject.screen.dialogStyle == DIALOGSTYLE.MultipleButtons){
										
										// Add Space
										EditorGUILayout.Space();
										
										// Make sure these options are valid
										if(theObject.screen.multipleButtons != null && theTranslation.multipleButtons != null && theTranslation.multipleButtons.length == theObject.screen.multipleButtons.length ){
											var multipleLangCount : int = 0;
											for( var langOption : String in theTranslation.multipleButtons ){
												if(langOption != null){
													
													// Option Name
													EditorGUILayout.BeginHorizontal();
														
														GUILayout.Label("", GUILayout.MaxWidth(5));		// Space
														GUILayout.Label(buttonLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));	// Label
														EditorGUILayout.TextArea(theObject.screen.multipleButtons[multipleLangCount], GUILayout.MaxWidth(200) );
														langOption = EditorGUILayout.TextField(langOption);
														
													EditorGUILayout.EndHorizontal();
	
													
													// increment count
													multipleLangCount++;
													
												}
											}
											
											// Add a space
											EditorGUILayout.Space();
											
										// DEAL WITH SYNC PROBLEMS:
										} else {
											
											// PROBLEM: The localized string array length doesn't match the dialog screen array!
											if( theObject.screen.multipleButtons != null && theTranslation.multipleButtons != null && 
												theTranslation.multipleButtons.length != theObject.screen.multipleButtons.length ){
											
												// Setup a new Array that is the correct size
												var newMB : String[] = new String[theObject.screen.multipleButtons.length];
											
												// Loop through the localized Array, and copy any info that was already inside of it!
												var i2 : int = 0;
												for( var stringItem2 : String in theTranslation.multipleButtons ){
													
													// If the translation has an entry for this index, copy into the new array
													if( theTranslation.multipleButtons[i2] != null ){
														newMB[i2] = theTranslation.multipleButtons[i2];
													}
													
													// Increment the counter
													i2++;
												}
											
												// Replace the Translation array with these newly built one!
												theTranslation.multipleButtons = newMB;
											
												Debug.Log("DIALOG SCREEN EDITOR: Fixed Array Sync problem in current localization! [Multiple Screens]");
											
											}
										}
									}
									
									// Add the Default Value in Data Entry for Localization
									if( theObject.screen.dialogStyle == DIALOGSTYLE.DataEntry ){
										
										// Dialog Text
										EditorGUILayout.BeginHorizontal();
										
											GUILayout.Label("", GUILayout.MaxWidth(5));		// Space
											GUILayout.Label(buttonLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));	// Label
											EditorGUILayout.TextArea(theObject.screen.dataEntryDefaultValue, GUILayout.MaxWidth(200));	// Label
											theTranslation.dataEntryDefaultValue = EditorGUILayout.TextField(theTranslation.dataEntryDefaultValue);
												
										EditorGUILayout.EndHorizontal();
									}
									
									// Add the Password Answer in "Password" mode for Localization (if we're not using tokens)
									else if( theObject.screen.dialogStyle == DIALOGSTYLE.Password && !theObject.screen.passwordMatchToToken ){
										
										// Dialog Text
										EditorGUILayout.BeginHorizontal();
										
											GUILayout.Label("", GUILayout.MaxWidth(5));		// Space
											GUILayout.Label(buttonLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));	// Label
											EditorGUILayout.TextArea(theObject.screen.passwordAnswer, GUILayout.MaxWidth(200));	// Label
											theTranslation.passwordAnswer = EditorGUILayout.TextField(theTranslation.passwordAnswer);
												
										EditorGUILayout.EndHorizontal();
									}
									
									// Custom Button Right
									if ( theObject.screen.dialogStyle == DIALOGSTYLE.OneButton || 
										theObject.screen.dialogStyle == DIALOGSTYLE.TwoButtons || 
										theObject.screen.dialogStyle == DIALOGSTYLE.DataEntry ||
										theObject.screen.dialogStyle == DIALOGSTYLE.Popup ){
										
										// Dialog Text
										EditorGUILayout.BeginHorizontal();
										
											GUILayout.Label("", GUILayout.MaxWidth(5));		// Space
											GUILayout.Label(buttonLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));	// Label
											EditorGUILayout.TextArea(theObject.screen.customButton1, GUILayout.MaxWidth(200));	// Label
											theTranslation.customButton1 = EditorGUILayout.TextField(theTranslation.customButton1);
										
										EditorGUILayout.EndHorizontal();
									}
									
									// Custom Button Left
									if ( theObject.screen.dialogStyle == DIALOGSTYLE.TwoButtons ||
										theObject.screen.dialogStyle == DIALOGSTYLE.Popup && theObject.screen.popupOptions == POPUP_OPTIONS.TwoButtons
									){
										
										// Dialog Text
										EditorGUILayout.BeginHorizontal();
										
											GUILayout.Label("", GUILayout.MaxWidth(5));		// Space
											GUILayout.Label(buttonLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));	// Label
											EditorGUILayout.TextArea(theObject.screen.customButton2, GUILayout.MaxWidth(200));	// Label
											theTranslation.customButton2 = EditorGUILayout.TextField(theTranslation.customButton2);
												
										EditorGUILayout.EndHorizontal();
									}
									
									
									// SHOW TOKENS
									if( theObject.actions.tokens != null && theObject.actions.tokens.length > 0){
									
										// Only add this extra space if we're not using Next or YesOrNo buttons
										if( theObject.screen.dialogStyle != DIALOGSTYLE.NextButton && theObject.screen.dialogStyle != DIALOGSTYLE.YesOrNo ){
											
											// Add Space
											EditorGUILayout.Space();
										}	
												
										// Loop through the tokens and find the ones that are localized!
										for( var theToken : DSTokenActions in theObject.actions.tokens ){
											if( theToken != null && theToken.localize ){
												
												// New Row
												EditorGUILayout.BeginHorizontal();
												
													GUILayout.Label("", GUILayout.MaxWidth(5));		// Space
													GUILayout.Label(keyLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));	// Label
													EditorGUILayout.TextArea(theToken.argument, GUILayout.MaxWidth(200));	// Label
												
													// Setup the Translation reference
													var theArgument : String;
							
													// REFERENCE THE CORRECT TOKEN LOCALIZATION
													if ( theObject.selLanguage == 6 ) {	// Chinese
														theToken.localizedArgument.chinese = EditorGUILayout.TextField(theToken.localizedArgument.chinese);
													} else if ( theObject.selLanguage == 7 ) {	// Korean
														theToken.localizedArgument.korean = EditorGUILayout.TextField(theToken.localizedArgument.korean);
													} else if ( theObject.selLanguage == 8 ) {	// Japanese
														theToken.localizedArgument.japanese = EditorGUILayout.TextField(theToken.localizedArgument.japanese);
													} else if ( theObject.selLanguage == 0 ) {	// Spanish
														theToken.localizedArgument.spanish = EditorGUILayout.TextField(theToken.localizedArgument.spanish);
													} else if ( theObject.selLanguage == 1 ) {	// Italian
														theToken.localizedArgument.italian = EditorGUILayout.TextField(theToken.localizedArgument.italian);	
													} else if ( theObject.selLanguage == 2 ) {	// German
														theToken.localizedArgument.german = EditorGUILayout.TextField(theToken.localizedArgument.german);
													} else if ( theObject.selLanguage == 3 ) {	// French
														theToken.localizedArgument.french = EditorGUILayout.TextField(theToken.localizedArgument.french);
													} else if ( theObject.selLanguage == 4 ) {	// Portuguese
														theToken.localizedArgument.portuguese = EditorGUILayout.TextField(theToken.localizedArgument.portuguese);
													} else if ( theObject.selLanguage == 5 ) {	// Russian
														theToken.localizedArgument.russian = EditorGUILayout.TextField(theToken.localizedArgument.russian);
													}
												
												// End of row
												EditorGUILayout.EndHorizontal();
											
											}
										}
										
									}
									
									
									// Change Audio (if we're not using logic mode)
									if( theObject.screen.dialogStyle != DIALOGSTYLE.Logic ){
										
										EditorGUILayout.BeginHorizontal();
										
											GUILayout.Label("", GUILayout.MaxWidth(5));		// Space
											GUILayout.Label(audioLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));	// Label
											GUILayout.Label("Override Audio", GUILayout.MaxWidth(200));	// Label
											theTranslation.changeAudio = EditorGUILayout.Toggle(theTranslation.changeAudio); 
										
										EditorGUILayout.EndHorizontal();
		
										// Show the Audio Options if we have enabled it.
										if ( theTranslation.changeAudio ){ 
											
											// Sound To Load
											EditorGUILayout.BeginHorizontal();
										
										
												GUILayout.Label("", GUILayout.MaxWidth(5));		// Space
												GUILayout.Label(fileLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));	// Label
												GUILayout.Label("New Audio Filepath:", GUILayout.MaxWidth(200));	// Label
												theTranslation.soundToLoad = EditorGUILayout.TextField(theTranslation.soundToLoad); 
										
											EditorGUILayout.EndHorizontal();
											
											// Audio Pitch
											EditorGUILayout.BeginHorizontal();
										
										
												GUILayout.Label("", GUILayout.MaxWidth(5));		// Space
												GUILayout.Label(audioLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));	// Label
												GUILayout.Label("Pitch: ( Original = " +theObject.screen.soundPitch.ToString()+" )", GUILayout.MaxWidth(200));	// Label
												theTranslation.soundPitch = EditorGUILayout.FloatField(theTranslation.soundPitch); 
										
											EditorGUILayout.EndHorizontal();
											
											
										}
										
									// If we are using the Logic mode, default changing audio to false	
									} else {
										theTranslation.changeAudio = false;
									}
							
									// Add Space
									EditorGUILayout.Space();
									
									// =========================
									//	 AUTO TRANSLATIONS
									// =========================
											
									// Only create the localized buttons if the Application is NOT playing
									if(!Application.isPlaying){
											
										// Add Seperator Line
										SepLine();
									
										// Add Space
										EditorGUILayout.Space();
									
										// Create the Auto-Localized Buttons
										EditorGUILayout.BeginHorizontal();
										
											// =========================
											//	YANDEX DISCLAIMER
											// =========================
											
											EditorGUILayout.BeginVertical();
											
											
											// Show Clickable Button
											if( GUILayout.Button(yandexLabel, "label", GUILayout.MaxWidth(70) )){
												Application.OpenURL ("http://translate.yandex.com");
											}
											
											GUI.color.a = 0.5;
											var yandexStyle : GUIStyle = new GUIStyle("Label");
											yandexStyle.fontStyle = FontStyle.Italic;
											yandexStyle.alignment = TextAnchor.UpperRight;
											
											// Show Clickable Button
											if( massTranslate && massTranslateStep == 1){
												GUILayout.Label(" Step (1/9) Translating To Spanish...", yandexStyle);
											
											} else if( massTranslate && massTranslateStep == 2){
												GUILayout.Label(" Step (2/9) Translating To Italian...", yandexStyle);	
											
											} else if( massTranslate && massTranslateStep == 3){
												GUILayout.Label(" Step (3/9) Translating To German...", yandexStyle);	
											
											} else if( massTranslate && massTranslateStep == 4){
												GUILayout.Label(" Step (4/9) Translating To French...", yandexStyle);	
											
											} else if( massTranslate && massTranslateStep == 5){
												GUILayout.Label(" Step (5/9) Translating To Portuguese...", yandexStyle);	
											
											} else if( massTranslate && massTranslateStep == 6){
												GUILayout.Label(" Step (6/9) Translating To Russian...", yandexStyle);	
											
											} else if( massTranslate && massTranslateStep == 7){
												GUILayout.Label(" Step (8/9) Translating To Chinese...", yandexStyle);	

											} else if( massTranslate && massTranslateStep == 8){
												GUILayout.Label(" Step (9/9) Translating To Korean...", yandexStyle);	
												
											} else if( massTranslate && massTranslateStep == 9){
												GUILayout.Label(" Step (9/9) Translating To Japanese...", yandexStyle);	
															
											} else if( currentlyTranslating ){
												GUILayout.Label(" Translating...", yandexStyle);	
												
											} else if (theObject.selLanguage > 5){
												GUILayout.Label(" Translations for this language are not supported.", yandexStyle);
													
											} else {
												GUILayout.Label(" Translated by the Yandex.Translate service", yandexStyle);
											}
											GUI.color.a = 1;
											
											// Fade out the button if we are already translating something
											if(currentlyTranslating || currentlyTranslating ){
												GUI.color.a = 0.5;	
											}
											EditorGUILayout.EndVertical();
											
											GUILayout.FlexibleSpace();
											if( /*theObject.selLanguage <= 5 &&*/ // Excludes Chinese, Korean and Japanese
												GUILayout.Button( GUIContent ("  Translate To " + selLanguageStrings[theObject.selLanguage] + "   ", localizeButton), GUILayout.MinWidth(185), GUILayout.MaxHeight(32) ) && !massTranslate && !currentlyTranslating ){
											
												if ( theObject.selLanguage == 6 ) {	// Chinese
													AutoTranslateStart( theObject, "en-zh");
												} else if ( theObject.selLanguage == 7 ) {	// Korean
													AutoTranslateStart( theObject, "en-ko" );
												} else if ( theObject.selLanguage == 8 ) {	// Japanese
													AutoTranslateStart( theObject, "en-ja" );
												} else if ( theObject.selLanguage == 0 ) {	// Spanish
													AutoTranslateStart( theObject, "en-es" );
												} else if ( theObject.selLanguage == 1 ) {	// Italian
													AutoTranslateStart( theObject, "en-it" );	
												} else if ( theObject.selLanguage == 2 ) {	// German
													AutoTranslateStart( theObject, "en-de" );
												} else if ( theObject.selLanguage == 3 ) {	// French
													AutoTranslateStart( theObject, "en-fr" );
												} else if ( theObject.selLanguage == 4 ) {	// Portuguese
													AutoTranslateStart( theObject, "en-pt" );
												} else if ( theObject.selLanguage == 5 ) {	// Russian
													AutoTranslateStart( theObject, "en-rus" );
												}
												
											}
											
											// Mass Translate
											if( GUILayout.Button( GUIContent ("  Translate All  ", localizeLabel), GUILayout.MinWidth(185), GUILayout.MaxHeight(32) ) 
												&& !massTranslate && !currentlyTranslating ){
													
												// Ask the user to confirm a mass localization	
												if( EditorUtility.DisplayDialog("Translate To All Languages",
																				"This will overwrite all existing localizations in this Dialog Screen with new translations. This cannot be undone. Are you sure?", 
																				"Localize All", "Cancel")
												){
													
													// Start Mass Translate routine
													//Debug.Log("LDC NOTE: Chinese, Korean and Japanese are currently not supported in Auto-Translation.");
													massTranslate = true;						// Sets the Flag
													massTranslateStep = 1;						// 1 represents Spanish
													AutoTranslateStart( theObject, "en-es" );	// Start the localization routine normally.
												}
											}
											
											// Restore GUI alpha.
											GUI.color.a = 1;
										
										
									EditorGUILayout.EndHorizontal();
									
								
									// Close the group
									EditorGUILayout.EndVertical();
									
								} // End Of Application.isPlaying
								
								GUILayout.Label("", GUILayout.MaxWidth(5));	
							EditorGUILayout.EndHorizontal();
							
						}
					// ---->
					
					// Add Space
					EditorGUILayout.Space();

				}	// <-- End of check object		
			}
			
        } else {
        
        	 // Show default inspector property editor
       		DrawDefaultInspector ();
        	
        }
        
        // Save Changes
        if( Selection.activeGameObject && target != null ) {
			if (GUI.changed) {
				EditorUtility.SetDirty(target);
			}
        }
        
        // ADD NEW DIALOG SCREEN
        // If this is the last dialog screen, it creates a handy shortcut button to add a new dialog screen!
        if(!Application.isPlaying && theObject.isLastDialogScreen){

        	// Space
        	EditorGUILayout.Space();
        	EditorGUILayout.Space();
        	
        	// Warning Message
        	if( !Application.isPlaying && theObject.isLastDialogScreen && theObject.totalDialogScreens > 25 ){
        		EditorGUILayout.BeginHorizontal();

        			GUILayout.FlexibleSpace();

        				// Set a cool yellow color for the info backgrounds
						GUI.backgroundColor = Color(1,1,0.6,0.8);

						// Do Message
						EditorGUILayout.HelpBox(
								"\nYou are currently using "+theObject.totalDialogScreens+" Dialog Screens. To keep your dialogs lightweight and better organised you should consider connecting to a new dialog thread to continue this sequence. This is easy to do in the Navigate Tab. Click on the 'Last Dialog' checkbox and look under the 'Play Another LDC Dialog' section!\n",
								MessageType.Info);


						// Reset background color when done
						GUI.backgroundColor = Color(1,1,1,1);

        			GUILayout.FlexibleSpace();

        		EditorGUILayout.EndHorizontal();
        		EditorGUILayout.Space();
        		EditorGUILayout.Space();
        	}

        	// Button Row
        	EditorGUILayout.BeginHorizontal();
        	
        		// Space
        		GUILayout.FlexibleSpace();
        		GUILayout.Space(2); // Helps to line up with the Unity Add Component Button.
        		
	        	// Add New Dialog
	        	if( GUILayout.Button(	new GUIContent("   Add New Dialog Screen", addButton, "Click To Add Another DialogScreen Component!"), 
	        							GUILayout.MinWidth(230), GUILayout.MaxWidth(230), GUILayout.MinHeight(22), GUILayout.MaxHeight(22) ) ){
	        		AddNewDialogScreen(theObject);
	        	}
	        	
	        	// Space
        		GUILayout.FlexibleSpace();
        	
        	EditorGUILayout.EndHorizontal();
        	
        	// Space
        	EditorGUILayout.Space();
        	EditorGUILayout.Space();
        }
	
	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	DO EDITOR BUTTON FIELDS
	//	Allows us to create an Editor field for icons, etc.
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//NOTE: ID -3 = None, -2 = CustomButton2, -1 = CustomButton1, 0 = MultipleButton0, 1 = MultipleButton1, etc. 
	function DoEditorButtonFields( theObject : DialogScreen ){ 

		// Helper Variables
		var customButtonIconsWereShown : boolean = false;

		// ============================================================
		//	CUSTOM BUTTON 1
		// ============================================================

		// Show the CustomButton 1
		if( theObject.screen.dialogStyle == DIALOGSTYLE.OneButton ||
			theObject.screen.dialogStyle == DIALOGSTYLE.TwoButtons ||
			theObject.screen.dialogStyle == DIALOGSTYLE.DataEntry ||
			theObject.screen.dialogStyle == DIALOGSTYLE.Password ||
			theObject.screen.dialogStyle == DIALOGSTYLE.Title ||
			theObject.screen.dialogStyle == DIALOGSTYLE.Popup
		){

			// Set helper flag
			customButtonIconsWereShown = true;

			// Add Seperator
			GUILayout.Space(5);
			SepLine();

			EditorGUILayout.Space();

			// Begin Horizontal
			GUILayout.BeginHorizontal();

				// Show Icon
				GUILayout.Label(buttonIconLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));

				// Show Animated Portrait
				if( theObject.screen.animatedButtonIcon1 != Vector2(-1,-1) ){
					if( theObject.screen.dialogStyle == DIALOGSTYLE.TwoButtons || theObject.screen.dialogStyle == DIALOGSTYLE.Popup &&
			theObject.screen.popupOptions == POPUP_OPTIONS.TwoButtons){
						GUILayout.Label("Animated Button Icon Right:", GUILayout.MinWidth(160), GUILayout.MaxWidth(160));
					} else {
						GUILayout.Label("Animated Button Icon:", GUILayout.MinWidth(160), GUILayout.MaxWidth(160));
					}
					GUILayout.Label(DoDialogCastAnimation(theObject.screen.editorAnimatedButtonIcon1, theObject.screen.buttonIcon1), GUILayout.MinWidth(64), GUILayout.MinHeight(64) , GUILayout.MaxWidth(64), GUILayout.MaxHeight(64) );
					
					DoLibraryMissingMessage();
				
				// Show Standard Portrait	
				} else {
					if( theObject.screen.dialogStyle == DIALOGSTYLE.TwoButtons || theObject.screen.dialogStyle == DIALOGSTYLE.Popup &&
			theObject.screen.popupOptions == POPUP_OPTIONS.TwoButtons){
						GUILayout.Label("Static Button Icon Right:", GUILayout.MinWidth(160), GUILayout.MaxWidth(160));
					} else {
						GUILayout.Label("Static Button Icon:", GUILayout.MinWidth(160), GUILayout.MaxWidth(160));
					}
					
					theObject.screen.buttonIcon1 = EditorGUILayout.ObjectField(theObject.screen.buttonIcon1, Texture2D, false, GUILayout.MinWidth(64), GUILayout.MinHeight(64) , GUILayout.MaxWidth(64), GUILayout.MaxHeight(64));
				}

				// Add Space
				GUILayout.Space(10);

				// If the Dialog Button is available, show the View Cast button
				if( DBs && DBs.length>0 ){ 
					
					// Begin Vertical
					GUILayout.BeginVertical();

						// VIEW CAST
						if( !EditorTime.actorLibraryUnavailable ){
							EditorGUILayout.BeginHorizontal(GUILayout.MaxWidth(100));
							
								GUILayout.Label(cameraLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
								if( GUILayout.Button("View Cast", GUILayout.MinWidth(75), GUILayout.MaxWidth(75),GUILayout.MaxHeight(20) ) ){
									browseMode = true;
									output = BrowseOutput.None;
									browseButtonOutput = -1;	// Custom Button 1

								}
							EditorGUILayout.EndHorizontal();
						}
						
						// NO ICON
						EditorGUILayout.BeginHorizontal(GUILayout.MaxWidth(100));
						
							GUILayout.Label(deleteLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
							if( GUILayout.Button("No Icon", GUILayout.MinWidth(75), GUILayout.MaxWidth(75),GUILayout.MaxHeight(20) ) ){
								browseMode = false;
								theObject.screen.buttonIcon1 = null;
								theObject.screen.animatedButtonIcon1 = Vector2( -1, -1 );	
							}
						EditorGUILayout.EndHorizontal();
						
						// NO ANIM
						if( theObject.screen.animatedButtonIcon1 != Vector2(-1,-1) ){
							EditorGUILayout.BeginHorizontal(GUILayout.MaxWidth(100));
							
								GUILayout.Label(deleteLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
								if( GUILayout.Button("No Anim", GUILayout.MinWidth(75), GUILayout.MaxWidth(75),GUILayout.MaxHeight(20) ) ){
									browseMode = false;
									theObject.screen.animatedButtonIcon1 = Vector2( -1, -1 );	
								}
							EditorGUILayout.EndHorizontal();
						}
	

					// End Vertical
					GUILayout.EndVertical();
				}


			// End Horizontal
			GUILayout.EndHorizontal();

		}

		// ============================================================
		//	CUSTOM BUTTON 2
		// ============================================================

		// Show the CustomButton 2
		if( theObject.screen.dialogStyle == DIALOGSTYLE.TwoButtons || theObject.screen.dialogStyle == DIALOGSTYLE.Popup &&
			theObject.screen.popupOptions == POPUP_OPTIONS.TwoButtons ){

			// Set helper flag
			customButtonIconsWereShown = true;

			// Add Seperator
			GUILayout.Space(5);
			SepLine();

			// Begin Horizontal
			GUILayout.BeginHorizontal();

				// Show Icon
				GUILayout.Label(buttonIconLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));

				// Show Animated Portrait
				if( theObject.screen.animatedButtonIcon2 != Vector2(-1,-1) ){
					if( theObject.screen.dialogStyle == DIALOGSTYLE.TwoButtons || theObject.screen.dialogStyle == DIALOGSTYLE.Popup &&
			theObject.screen.popupOptions == POPUP_OPTIONS.TwoButtons){
						GUILayout.Label("Animated Button Icon Left:", GUILayout.MinWidth(160), GUILayout.MaxWidth(160));
					} else {
						GUILayout.Label("Animated Button Icon:", GUILayout.MinWidth(160), GUILayout.MaxWidth(160));
					}
					GUILayout.Label(DoDialogCastAnimation(theObject.screen.editorAnimatedButtonIcon2, theObject.screen.buttonIcon2), GUILayout.MinWidth(64), GUILayout.MinHeight(64) , GUILayout.MaxWidth(64), GUILayout.MaxHeight(64) );
					
					DoLibraryMissingMessage();
				
				// Show Standard Portrait	
				} else {
					if( theObject.screen.dialogStyle == DIALOGSTYLE.TwoButtons || theObject.screen.dialogStyle == DIALOGSTYLE.Popup &&
			theObject.screen.popupOptions == POPUP_OPTIONS.TwoButtons){
						GUILayout.Label("Static Button Icon Left:", GUILayout.MinWidth(160), GUILayout.MaxWidth(160));
					} else {
						GUILayout.Label("Static Button Icon:", GUILayout.MinWidth(160), GUILayout.MaxWidth(160));
					}
					
					theObject.screen.buttonIcon2 = EditorGUILayout.ObjectField(theObject.screen.buttonIcon2, Texture2D, false, GUILayout.MinWidth(64), GUILayout.MinHeight(64) , GUILayout.MaxWidth(64), GUILayout.MaxHeight(64));
				}

				// Add Space
				GUILayout.Space(10);

				// If the Dialog Button is available, show the View Cast button
				if( DBs && DBs.length>0 ){ 
					
					// Begin Vertical
					GUILayout.BeginVertical();

						// VIEW CAST
						if( !EditorTime.actorLibraryUnavailable ){
							EditorGUILayout.BeginHorizontal(GUILayout.MaxWidth(100));
							
								GUILayout.Label(cameraLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
								if( GUILayout.Button("View Cast", GUILayout.MinWidth(75), GUILayout.MaxWidth(75),GUILayout.MaxHeight(20) ) ){
									browseMode = true;
									output = BrowseOutput.None;
									browseButtonOutput = -2;	// Custom Button 2

								}
							EditorGUILayout.EndHorizontal();
						}
						
						// NO ICON
						EditorGUILayout.BeginHorizontal(GUILayout.MaxWidth(100));
						
							GUILayout.Label(deleteLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
							if( GUILayout.Button("No Icon", GUILayout.MinWidth(75), GUILayout.MaxWidth(75),GUILayout.MaxHeight(20) ) ){
								browseMode = false;
								theObject.screen.buttonIcon2 = null;
								theObject.screen.animatedButtonIcon2 = Vector2( -1, -1 );	
							}
						EditorGUILayout.EndHorizontal();
						
						// NO ANIM
						if( theObject.screen.animatedButtonIcon2 != Vector2(-1,-1) ){
							EditorGUILayout.BeginHorizontal(GUILayout.MaxWidth(100));
							
								GUILayout.Label(deleteLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
								if( GUILayout.Button("No Anim", GUILayout.MinWidth(75), GUILayout.MaxWidth(75),GUILayout.MaxHeight(20) ) ){
									browseMode = false;
									theObject.screen.animatedButtonIcon2 = Vector2( -1, -1 );	
								}
							EditorGUILayout.EndHorizontal();
						}
	

					// End Vertical
					GUILayout.EndVertical();
				}


			// End Horizontal
			GUILayout.EndHorizontal();

		}

		// ============================================================
		//	POPUP IMAGE
		// ============================================================

		// Setup the Popup Background Image
		if( theObject.screen.dialogStyle == DIALOGSTYLE.Popup ||
			theObject.screen.dialogStyle == DIALOGSTYLE.IconGrid 
		){

			// Set helper flag
			customButtonIconsWereShown = true;

			// Add Seperator
			GUILayout.Space(5);
			SepLine();
			GUILayout.Space(5);

			// Begin Horizontal
			GUILayout.BeginHorizontal();

				// Show Icon
				GUILayout.Label(buttonIconLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));

				// Show Animated Portrait
				if( theObject.screen.popupImageAnim != Vector2(-1,-1) ){
					GUILayout.Label("Animated Background:", GUILayout.MinWidth(160), GUILayout.MaxWidth(160));
					GUILayout.Label(DoDialogCastAnimation(theObject.screen.editorPopupImageAnim, theObject.screen.popupImage), GUILayout.MinWidth(64), GUILayout.MinHeight(64) , GUILayout.MaxWidth(64), GUILayout.MaxHeight(64) );
					
					DoLibraryMissingMessage();
				
				// Show Standard Portrait	
				} else {

					GUILayout.Label("Static Background:", GUILayout.MinWidth(160), GUILayout.MaxWidth(160));
					theObject.screen.popupImage = EditorGUILayout.ObjectField(theObject.screen.popupImage, Texture2D, false, GUILayout.MinWidth(64), GUILayout.MinHeight(64) , GUILayout.MaxWidth(64), GUILayout.MaxHeight(64));
				}

				// Add Space
				GUILayout.Space(10);

				// If the Dialog Button is available, show the View Cast button
				if( DSs && DSs.length>0 ){ 
					
					// Begin Vertical
					GUILayout.BeginVertical();

						// VIEW CAST
						if( !EditorTime.actorLibraryUnavailable ){
							EditorGUILayout.BeginHorizontal(GUILayout.MaxWidth(100));
							
								GUILayout.Label(cameraLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
								if( GUILayout.Button("View Cast", GUILayout.MinWidth(75), GUILayout.MaxWidth(75),GUILayout.MaxHeight(20) ) ){
									browseMode = true;
									output = BrowseOutput.None;
									browseButtonOutput = -3;	// PopupImage
								}
							EditorGUILayout.EndHorizontal();
						}
						
						// NO ICON
						EditorGUILayout.BeginHorizontal(GUILayout.MaxWidth(100));
						
							GUILayout.Label(deleteLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
							if( GUILayout.Button("No Icon", GUILayout.MinWidth(75), GUILayout.MaxWidth(75),GUILayout.MaxHeight(20) ) ){
								browseMode = false;
								theObject.screen.popupImage = null;
								theObject.screen.popupImageAnim = Vector2( -1, -1 );	
							}
						EditorGUILayout.EndHorizontal();
						
						// NO ANIM
						if( theObject.screen.popupImageAnim != Vector2(-1,-1) ){
							EditorGUILayout.BeginHorizontal(GUILayout.MaxWidth(100));
							
								GUILayout.Label(deleteLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
								if( GUILayout.Button("No Anim", GUILayout.MinWidth(75), GUILayout.MaxWidth(75),GUILayout.MaxHeight(20) ) ){
									browseMode = false;
									theObject.screen.popupImageAnim = Vector2( -1, -1 );	
								}
							EditorGUILayout.EndHorizontal();
						}
	

					// End Vertical
					GUILayout.EndVertical();
				}


			// End Horizontal
			GUILayout.EndHorizontal();

			// If this is an Icon Grid, do the main buttons immediately after the Background ...
			if( theObject.screen.dialogStyle == DIALOGSTYLE.IconGrid ){
				DoIconGridButtons( theObject );
				EditorGUILayout.Space();
				GUILayout.Space(5);
			}

		}

		// Show seperator at end if we displayed custom Icons
		if( customButtonIconsWereShown && theObject.screen.dialogStyle != DIALOGSTYLE.IconGrid){
			GUILayout.Space(5);
			SepLine();
			GUILayout.Space(5);
		}

	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	DO ICON GRID BUTTONS
	//	Allows us to show the buttons / logic, etc of the Icon Grid Style
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	function DoIconGridButtons( theObject : DialogScreen ){

		// Add A Seperation Line
		EditorGUILayout.Space();
		SepLine();

		// Loop through the Icon Grid Buttons
		var multipleOptionCount : int = 0;
		for( var buttonOption : IconGridButtons in theObject.screen.IG_buttons ){
			if(buttonOption!=null){

				// Add Space
				EditorGUILayout.Space();
				
				// Button Name
				EditorGUILayout.BeginHorizontal();
					GUILayout.Label(buttonLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
					GUILayout.Label("Button "+(multipleOptionCount+1).ToString()+": ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
					buttonOption.title = EditorGUILayout.TextField("", buttonOption.title); 
				EditorGUILayout.EndHorizontal();

				// Button Label
				EditorGUILayout.BeginHorizontal();
					GUILayout.Label(buttonLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
					GUILayout.Label("Label:", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
					buttonOption.label = EditorGUILayout.TextField("", buttonOption.label); 
				EditorGUILayout.EndHorizontal();

				
				// Requires Logic
				//if( buttonOption.requiresLogic != null ){ // This isnt really needed!
				EditorGUILayout.BeginHorizontal();
					GUILayout.Label(logicIcon, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
					GUILayout.Label("Requires Conditions: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
					buttonOption.requiresLogic = EditorGUILayout.Toggle("", buttonOption.requiresLogic, GUILayout.MinWidth(32),GUILayout.MaxWidth(32) ); 
					
					
					// Space
					//GUILayout.Label("", GUILayout.MaxWidth(8) );
					
					// Do Logic
					if( buttonOption.requiresLogic == true ){
						
						// Begin Vertical Group
						EditorGUILayout.BeginVertical();
						
							// Make sure we can see the Dialog UI
							if( DUIs == null || DUIs.length == 0){
							
								// Show Warning Message
								EditorGUILayout.BeginVertical("Box");
									GUILayout.Label("IMPORTANT: You cannot use Logic Conditions yet.", "BoldLabel");
									GUILayout.Label("A DialogUI component wasn't found in the scene. \n");
								EditorGUILayout.EndVertical();
								
								EditorGUILayout.Space();
								
							// Otherwise
							} else {
							
								// Cache the token Array
								var tokenArray5 : String[] = DUIs[0].GetTokenStringArray();
									
								// ==============
								// STATEMENT UI
								// ==============
								
								var statement5 : LogicStatements = buttonOption.logicStatements;
								
								// Statement
								EditorGUILayout.BeginHorizontal("Box");
									
								// Formatting
								EditorGUILayout.BeginVertical();
								GUILayout.Label("", GUILayout.MinWidth(5), GUILayout.MaxWidth(5), GUILayout.MinHeight(10), GUILayout.MaxHeight(10));
								EditorGUILayout.BeginHorizontal();
								GUILayout.FlexibleSpace();
								
								// Space
								GUILayout.Label("", GUILayout.MinWidth(5), GUILayout.MaxWidth(5), GUILayout.MinHeight(5), GUILayout.MaxHeight(5));


								// SHOW CONTROLS FOR TOKENS
								if( statement5.logicType == DS_LOGIC_TYPE.Token){

									// Select Logic Style
									GUILayout.Label(logicIcon, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
									statement5.logicType = EditorGUILayout.EnumPopup(statement5.logicType, GUILayout.MinHeight(20), GUILayout.MinWidth(64), GUILayout.MaxWidth(128));

									// If we have tokens in DialogUI, allow the user to make changes.
									if( tokenArray5.length > 0 ){

										// Token To Set
										GUILayout.Label(keyLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
										statement5.token = EditorGUILayout.Popup(statement5.token, tokenArray5, GUILayout.MaxHeight(32), GUILayout.MinWidth(60), GUILayout.MaxWidth(128));
										
										// Operator
										GUILayout.Label(gearLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
										statement5.operator = EditorGUILayout.EnumPopup("", statement5.operator, GUILayout.MaxHeight(32), GUILayout.MinWidth(50), GUILayout.MaxWidth(128));

										// Comparison
										GUILayout.Label(buttonLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
										EditorStyles.textField.wordWrap = false;
										statement5.compare = EditorGUILayout.TextField(statement5.compare, GUILayout.MinHeight(20), GUILayout.MinWidth(40), GUILayout.MaxWidth(128));
										EditorStyles.textField.wordWrap = true;

									// Otherwise, show message.	
									} else {

										// Space
										//GUILayout.Label("", GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));

										// Message
										GUILayout.Label("  You have not set up any Tokens in DialogUI.", GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(250), GUILayout.MaxWidth(250));

									}

								// CONTROLS FOR PLAYER PREFS	
								} else {

									// Select Logic Style
									GUILayout.Label(logicIcon, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
									statement5.logicType = EditorGUILayout.EnumPopup(statement5.logicType, GUILayout.MinHeight(20), GUILayout.MinWidth(64), GUILayout.MaxWidth(128));

									// PlayerPref Key To Set
									GUILayout.Label(keyLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
									EditorStyles.textField.wordWrap = false;
									statement5.ppKey = EditorGUILayout.TextField(statement5.ppKey, GUILayout.MaxHeight(20), GUILayout.MinWidth(60), GUILayout.MaxWidth(128) );
									if(statement5.ppKey==""){statement5.ppKey="ENTER_KEY";}
									EditorStyles.textField.wordWrap = true;
									
									// Operator
									GUILayout.Label(gearLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
									statement5.ppOperator = EditorGUILayout.EnumPopup("", statement5.ppOperator, GUILayout.MaxHeight(32), GUILayout.MinWidth(50), GUILayout.MaxWidth(128));

									// Comparison
									if( statement5.ppOperator != DS_PLAYERPREF_LOGIC_OPERATOR.Exists && 
										statement5.ppOperator != DS_PLAYERPREF_LOGIC_OPERATOR.DoesNotExist ){

										GUILayout.Label(buttonLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
										EditorStyles.textField.wordWrap = false;
										statement5.compare = EditorGUILayout.TextField(statement5.compare, GUILayout.MinHeight(20), GUILayout.MinWidth(40), GUILayout.MaxWidth(128));
										EditorStyles.textField.wordWrap = true;

									// Otherwise add space
									} else{
										GUILayout.Label("", GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(58+20), GUILayout.MaxWidth(128+20));
									}
								}

								// Space
								GUILayout.Label("", GUILayout.MinWidth(5), GUILayout.MaxWidth(5), GUILayout.MinHeight(5), GUILayout.MaxHeight(5));

								// End formatting
								GUILayout.FlexibleSpace();
								EditorGUILayout.EndHorizontal();

								// ==============================
								// EXTRA CONDITIONS UI
								// ==============================

								if( statement5.extraConditions != null && statement5.extraConditions.length > 0 ){

									// Loop through the statements
									for( var statement6 : LogicStatementsExtra in statement5.extraConditions ){
										if(statement6!=null){ // Make sure this new statement is valid

											// Start formatting
											EditorGUILayout.BeginHorizontal();

											// Space
											GUILayout.FlexibleSpace();
											GUILayout.Label("", GUILayout.MinWidth(5), GUILayout.MaxWidth(5), GUILayout.MinHeight(5), GUILayout.MaxHeight(5));

											// AND label
										//	GUILayout.Label(andLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(50), GUILayout.MaxWidth(50));

											// SHOW CONTROLS FOR TOKENS
											if( statement6.logicType == DS_LOGIC_TYPE.Token){

												// Select Logic Style
												GUILayout.Label(logicIcon, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
												statement6.logicType = EditorGUILayout.EnumPopup(statement6.logicType, GUILayout.MinHeight(20), GUILayout.MinWidth(64), GUILayout.MaxWidth(128));

												// If we have tokens in DialogUI, allow the user to make changes.
												if( tokenArray5.length > 0 ){

													// Token To Set
													GUILayout.Label(keyLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
													statement6.token = EditorGUILayout.Popup(statement6.token, tokenArray5, GUILayout.MaxHeight(32), GUILayout.MinWidth(60), GUILayout.MaxWidth(128));
													
													// Operator
													GUILayout.Label(gearLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
													statement6.operator = EditorGUILayout.EnumPopup("", statement6.operator, GUILayout.MaxHeight(32), GUILayout.MinWidth(50), GUILayout.MaxWidth(128));

													// Comparison
													GUILayout.Label(buttonLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
													statement6.compare = EditorGUILayout.TextField(statement6.compare, GUILayout.MinHeight(20), GUILayout.MinWidth(40), GUILayout.MaxWidth(128));

												// Otherwise, show message.	
												} else {

													// Message
													GUILayout.Label("  You have not set up any Tokens in DialogUI.", GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(250), GUILayout.MaxWidth(250));

												}

											// CONTROLS FOR PLAYER PREFS	
											} else {

												// Select Logic Style
												GUILayout.Label(logicIcon, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
												statement6.logicType = EditorGUILayout.EnumPopup(statement6.logicType, GUILayout.MinHeight(20), GUILayout.MinWidth(64), GUILayout.MaxWidth(128));

												// PlayerPref Key To Set
												GUILayout.Label(keyLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
												EditorStyles.textField.wordWrap = false;
												statement6.ppKey = EditorGUILayout.TextField(statement6.ppKey, GUILayout.MaxHeight(20), GUILayout.MinWidth(60), GUILayout.MaxWidth(128) );
												if(statement6.ppKey==""){statement6.ppKey="ENTER_KEY";}
												EditorStyles.textField.wordWrap = true;
												
												// Operator
												GUILayout.Label(gearLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
												statement6.ppOperator = EditorGUILayout.EnumPopup("", statement6.ppOperator, GUILayout.MaxHeight(32), GUILayout.MinWidth(50), GUILayout.MaxWidth(128));

												// Comparison
												if( statement6.ppOperator != DS_PLAYERPREF_LOGIC_OPERATOR.Exists && 
													statement6.ppOperator != DS_PLAYERPREF_LOGIC_OPERATOR.DoesNotExist ){

													GUILayout.Label(buttonLabel, GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
													statement6.compare = EditorGUILayout.TextField(statement6.compare, GUILayout.MinHeight(20), GUILayout.MinWidth(40), GUILayout.MaxWidth(128));

												// Otherwise add space
												} else{
													GUILayout.Label("", GUILayout.MinHeight(32), GUILayout.MaxHeight(32), GUILayout.MinWidth(58+20), GUILayout.MaxWidth(128+20));
												}
											}

											// Space
											GUILayout.FlexibleSpace();
											GUILayout.Label("", GUILayout.MinWidth(5), GUILayout.MaxWidth(5), GUILayout.MinHeight(5), GUILayout.MaxHeight(5));

											// End formatting
											EditorGUILayout.EndHorizontal();

										}
									}
								}

								// ==============================
								// ADD / DELETE EXTRA CONDITIONS
								// ==============================

								// Add / Delete Condition Buttons
								EditorGUILayout.BeginHorizontal();
								//	GUILayout.FlexibleSpace();
									GUILayout.Label("", GUILayout.MaxWidth(460),GUILayout.MaxHeight(4));

									// If we have extra conditions setup, allow us to delete one.
									if( statement5.extraConditions != null && statement5.extraConditions.length > 0 ){

										// Remove last extra condition Button
										if( GUILayout.Button(removeButton, GUILayout.MaxWidth(32)) ){
											statement5.extraConditions = ResizeLogicArray(statement5.extraConditions, false); // deduct
										}

									// Otherwise, show empty space where the button should be.
									} else {
										GUILayout.Label("", GUILayout.MaxWidth(32));
									}

									// Add New Condition
									if( GUILayout.Button(addButton, GUILayout.MaxWidth(32)) ){
										statement5.extraConditions = ResizeLogicArray(statement5.extraConditions, true); // add
									}

									// Spacer
									GUILayout.Label("", GUILayout.MaxWidth(4),GUILayout.MaxHeight(4));
								EditorGUILayout.EndHorizontal();

								// Bottom Space
								GUILayout.Label("", GUILayout.MaxWidth(4),GUILayout.MaxHeight(4));

								// IF LOGIC FAILS
								SepLine();
								if( buttonOption.requiresLogic == true ){
									EditorGUILayout.BeginHorizontal();
										GUILayout.Label(deleteLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
										GUILayout.Label("If Conditions Fail: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
										buttonOption.ifLogicFails = EditorGUILayout.EnumPopup("", buttonOption.ifLogicFails); 
									EditorGUILayout.EndHorizontal();

									// If we've chosen to disable the button, allow us to change the label
									if( buttonOption.ifLogicFails == LDC_IFLOGICFAILS.DisableButton){
										EditorGUILayout.BeginHorizontal();
											GUILayout.Label(buttonLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
											GUILayout.Label("Replace Label: ", GUILayout.MinWidth(160), GUILayout.MaxWidth(160),GUILayout.MaxHeight(20));
											buttonOption.failedLabel = EditorGUILayout.TextField("", buttonOption.failedLabel); 
										EditorGUILayout.EndHorizontal();
									}
								}

								// END WHITE BOX
								EditorGUILayout.EndVertical();
								EditorGUILayout.EndHorizontal();
								
							}
						
						// End Vertical Group
						EditorGUILayout.EndVertical();
						
						
					
					// End of Do Conditional Logic.	
					} else {
						
						// Let people know this button will always be visible
						GUILayout.FlexibleSpace();
						GUI.color.a = 0.5;
						GUILayout.Label("This button will always be visible. \n");
						GUI.color.a = 1;
					}
					
					//GUILayout.Label("", GUILayout.MaxWidth(8),GUILayout.MaxHeight(8));
					
				EditorGUILayout.EndHorizontal();


				

				// Option Custom Button Icon
				EditorGUILayout.Space();
				DoIconGridButtonsCustomIcon(theObject, multipleOptionCount);
				
				// Add space and a seperator line
				EditorGUILayout.Space();
				SepLine();

				// Add Space
				EditorGUILayout.Space();
				EditorGUILayout.Space();
				
				// increment count
				multipleOptionCount++;
				
			}
		}

		// Add / Remove Buttons
		EditorGUILayout.BeginHorizontal();
			GUILayout.FlexibleSpace();
				
			// Show Remove Button if we have more than 1 option
			if( theObject.screen.IG_buttons != null && theObject.screen.IG_buttons.length > 1 ){
				
				if( GUILayout.Button(removeButton, GUILayout.MaxWidth(48)) ){
					theObject.screen.IG_buttons = DeleteAnotherSlotIconGridButtons( theObject.screen.IG_buttons );
				}
			}
		
			// Show add Button if we have more less than 8 options
			if( theObject.screen.IG_buttons != null ){
				if( GUILayout.Button(addButton, GUILayout.MaxWidth(48)) ){
					theObject.screen.IG_buttons = AddAnotherSlotIconGridButtons( theObject.screen.IG_buttons );
				}
			}
				
		EditorGUILayout.EndHorizontal();



	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	DO MULTIPLE BUTTONS CUSTOM ICON
	//	Allows us to create an Editor field for icons, etc.
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	function DoMultipleButtonsCustomIcon(theObject : DialogScreen, i : int){

		//var button : String in theObject.screen.multipleButtons ){
		if( theObject.screen.animatedMultipleButtonsIcon != null && 
			theObject.screen.animatedMultipleButtonsIcon.length > i
		){

			// Begin Horizontal
			GUILayout.BeginHorizontal();

				// Show Icon
				GUILayout.Label(buttonIconLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));

				// Show Animated Portrait
				if( theObject.screen.animatedMultipleButtonsIcon[i] != Vector2(-1,-1) ){
					GUILayout.Label("Animated Button Icon:", GUILayout.MinWidth(160), GUILayout.MaxWidth(160));
					GUILayout.FlexibleSpace();
					GUILayout.Label(DoDialogCastAnimation(theObject.screen.editorAnimatedMultipleButtonsIcon[i], theObject.screen.multipleButtonsIcon[i]), GUILayout.MinWidth(64), GUILayout.MinHeight(64) , GUILayout.MaxWidth(64), GUILayout.MaxHeight(64) );
					
					DoLibraryMissingMessage();
				
				// Show Standard Portrait	
				} else {
					
					GUILayout.Label("Static Button Icon:", GUILayout.MinWidth(160), GUILayout.MaxWidth(160));
					GUILayout.FlexibleSpace();
					theObject.screen.multipleButtonsIcon[i] = EditorGUILayout.ObjectField(theObject.screen.multipleButtonsIcon[i], Texture2D, false, GUILayout.MinWidth(64), GUILayout.MinHeight(64) , GUILayout.MaxWidth(64), GUILayout.MaxHeight(64));
				}

				// Add Space
				GUILayout.Space(10);


				// If the Dialog Button is available, show the View Cast button
				if( DBs && DBs.length>0 ){ 
					
					// Begin Vertical
					GUILayout.BeginVertical();

						// VIEW CAST
						if( !EditorTime.actorLibraryUnavailable ){
							EditorGUILayout.BeginHorizontal(GUILayout.MaxWidth(100));
							
								GUILayout.Label(cameraLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
								if( GUILayout.Button("View Cast", GUILayout.MinWidth(75), GUILayout.MaxWidth(75),GUILayout.MaxHeight(20) ) ){
									browseMode = true;
									output = BrowseOutput.None;
									browseButtonOutput = i;	// Custom Button index

								}
							EditorGUILayout.EndHorizontal();
						}
						
						// NO ICON
						EditorGUILayout.BeginHorizontal(GUILayout.MaxWidth(100));
						
							GUILayout.Label(deleteLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
							if( GUILayout.Button("No Icon", GUILayout.MinWidth(75), GUILayout.MaxWidth(75),GUILayout.MaxHeight(20) ) ){
								browseMode = false;
								theObject.screen.multipleButtonsIcon[i] = null;
								theObject.screen.animatedMultipleButtonsIcon[i] = Vector2( -1, -1 );	
							}
						EditorGUILayout.EndHorizontal();
						
						// NO ANIM
						if( theObject.screen.animatedMultipleButtonsIcon[i] != Vector2(-1,-1) ){
							EditorGUILayout.BeginHorizontal(GUILayout.MaxWidth(100));
							
								GUILayout.Label(deleteLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
								if( GUILayout.Button("No Anim", GUILayout.MinWidth(75), GUILayout.MaxWidth(75),GUILayout.MaxHeight(20) ) ){
									browseMode = false;
									theObject.screen.animatedMultipleButtonsIcon[i] = Vector2( -1, -1 );	
								}
							EditorGUILayout.EndHorizontal();
						}
	

					// End Vertical
					GUILayout.EndVertical();
				}


			// End Horizontal
			GUILayout.EndHorizontal();
		}
	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	DO ICON GRID CUSTOM ICON
	//	Allows us to create an Editor field for icons, etc.
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	function DoIconGridButtonsCustomIcon(theObject : DialogScreen, i : int){

		//var button : String in theObject.screen.multipleButtons ){
		if( theObject.screen.IG_buttons != null && 
			theObject.screen.IG_buttons.length > i
		){

			// Begin Horizontal
			GUILayout.BeginHorizontal();

				// Show Icon
				GUILayout.Label(buttonIconLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));

				// Show Animated Portrait
				if( theObject.screen.IG_buttons[i].animatedButtonIcon != Vector2(-1,-1) ){
					GUILayout.Label("Animated Button Icon:", GUILayout.MinWidth(160), GUILayout.MaxWidth(160));
					GUILayout.FlexibleSpace();
					GUILayout.Label(DoDialogCastAnimation(theObject.screen.IG_buttons[i].editorButtonAnim, theObject.screen.IG_buttons[i].buttonIcon), GUILayout.MinWidth(64), GUILayout.MinHeight(64) , GUILayout.MaxWidth(64), GUILayout.MaxHeight(64) );
					
					DoLibraryMissingMessage();
				
				// Show Standard Portrait	
				} else {
					
					GUILayout.Label("Static Button Icon:", GUILayout.MinWidth(160), GUILayout.MaxWidth(160));
					GUILayout.FlexibleSpace();
					theObject.screen.IG_buttons[i].buttonIcon = EditorGUILayout.ObjectField(theObject.screen.IG_buttons[i].buttonIcon, Texture2D, false, GUILayout.MinWidth(64), GUILayout.MinHeight(64) , GUILayout.MaxWidth(64), GUILayout.MaxHeight(64));
				}

				// Add Space
				GUILayout.Space(10);


				// If the Dialog Button is available, show the View Cast button
				if( DBs && DBs.length>0 ){ 
					
					// Begin Vertical
					GUILayout.BeginVertical();

						// VIEW CAST
						if( !EditorTime.actorLibraryUnavailable ){
							EditorGUILayout.BeginHorizontal(GUILayout.MaxWidth(100));
							
								GUILayout.Label(cameraLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
								if( GUILayout.Button("View Cast", GUILayout.MinWidth(75), GUILayout.MaxWidth(75),GUILayout.MaxHeight(20) ) ){
									browseMode = true;
									browseOutput = BrowseOutput.IconGrid;
									browseButtonOutput = i;	// Custom Button index
								//	Debug.Log("Viewing Casat - output IconGrid and browseButtonOutput = "+ i);

								}
							EditorGUILayout.EndHorizontal();
						}
						
						// NO ICON
						EditorGUILayout.BeginHorizontal(GUILayout.MaxWidth(100));
						
							GUILayout.Label(deleteLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
							if( GUILayout.Button("No Icon", GUILayout.MinWidth(75), GUILayout.MaxWidth(75),GUILayout.MaxHeight(20) ) ){
								browseMode = false;
								theObject.screen.IG_buttons[i].buttonIcon = null;
								theObject.screen.IG_buttons[i].animatedButtonIcon = Vector2( -1, -1 );	
							}
						EditorGUILayout.EndHorizontal();
						
						// NO ANIM
						if( theObject.screen.IG_buttons[i].animatedButtonIcon != Vector2(-1,-1) ){
							EditorGUILayout.BeginHorizontal(GUILayout.MaxWidth(100));
							
								GUILayout.Label(deleteLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
								if( GUILayout.Button("No Anim", GUILayout.MinWidth(75), GUILayout.MaxWidth(75),GUILayout.MaxHeight(20) ) ){
									browseMode = false;
									theObject.screen.IG_buttons[i].animatedButtonIcon = Vector2( -1, -1 );	
								}
							EditorGUILayout.EndHorizontal();
						}
	

					// End Vertical
					GUILayout.EndVertical();
				}


			// End Horizontal
			GUILayout.EndHorizontal();
		}
	}
											

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	BROWSE CAST
	//	Allows us to select an image to use from the Cast
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function BrowseCast( theObject : DialogScreen, output : BrowseOutput  ){
	
		//browseButtonOutput <- 

		// Make sure we have access to the DialogCast component
		if( DialogCast != null ){
				
			// Add Space
			EditorGUILayout.Space();
		
			// Title
			EditorGUILayout.BeginHorizontal();
					
				// Add Indent
				GUILayout.Label("", GUILayout.MaxWidth(5));
						
				// Label
				if( browseButtonOutput != -100 || output == BrowseOutput.IconGrid){		// -100 means we are not using the Button selections
					GUILayout.Label("Select an image from the Library:", "BoldLabel", GUILayout.MinWidth(350), GUILayout.MaxWidth(350));

				} else if( output == BrowseOutput.Portrait ||
					output == BrowseOutput.Actor1 ||
					output == BrowseOutput.Actor2 ||
					output == BrowseOutput.Actor3 ||
					output == BrowseOutput.Actor4 ||
					output == BrowseOutput.Actor5 ||
					output == BrowseOutput.Actor6 ||
					output == BrowseOutput.Actor7 ||
					output == BrowseOutput.Actor8 ||
					output == BrowseOutput.Actor9 ||
					output == BrowseOutput.Actor10
				 ){
					GUILayout.Label("Select An Actor from the Dialog Cast:", "BoldLabel", GUILayout.MinWidth(350), GUILayout.MaxWidth(350));
				 } else {
				 	GUILayout.Label("Select A Background from the Scenes Library:", "BoldLabel", GUILayout.MinWidth(350), GUILayout.MaxWidth(350));
				 }
				 
				// Add indent
				GUILayout.FlexibleSpace();
								
				if( GUILayout.Button("Cancel") ){
					browseMode = false;
					browseButtonOutput = -100;	// Remove the id for button References (-100 = None)
				}
			
				// Fix DialogID if there is anything wrong.
				if ( theObject.dialogID == null || theObject.dialogID < 1 ) {
					theObject.dialogID = 1;
				}
				
				// Add Indent
				GUILayout.Label("", GUILayout.MaxWidth(5));
				
			EditorGUILayout.EndHorizontal();
			
			// Add Space
			EditorGUILayout.Space();
			
			// Track if we've found any Actors
			var foundActors : boolean = false;
			
			// Cache the Dialog Groups
			var dcGroups : DialogCastGroup[];
			
			// Cache Buttons Cast ..
			if( output == BrowseOutput.IconGrid ||
				browseButtonOutput >= -2 ){			// -100 means we are not using the Button selections, -2 and above are custom buttons

				if( DialogButtons != null && DialogButtons.GetDialogCastGroups() != null ){
					dcGroups = DialogButtons.GetDialogCastGroups();
					EditorTime.browseActors = true;
				}

			// Cache Scenes Cast ..
			} else if( browseButtonOutput == -3){	// -100 means we are not using the Button selections, -2 and above are custom buttons

				if( DialogScenes != null && DialogScenes.GetDialogCastGroups() != null ){
					dcGroups = DialogScenes.GetDialogCastGroups();
					EditorTime.browseActors = false;
				}
					
			// Cache Actor Cast ..		
			} else if( output == BrowseOutput.Portrait ||
					output == BrowseOutput.Actor1 ||
					output == BrowseOutput.Actor2 ||
					output == BrowseOutput.Actor3 ||
					output == BrowseOutput.Actor4 ||
					output == BrowseOutput.Actor5 ||
					output == BrowseOutput.Actor6 ||
					output == BrowseOutput.Actor7 ||
					output == BrowseOutput.Actor8 ||
					output == BrowseOutput.Actor9 ||
					output == BrowseOutput.Actor10
				){
					if( DialogCast != null && DialogCast.GetDialogCastGroups() != null ){
						dcGroups = DialogCast.GetDialogCastGroups();
						EditorTime.browseActors = true;
					}
			
			// Cache Scene Cast ..
			} else {
				
				if( DialogScenes != null && DialogScenes.GetDialogCastGroups() != null ){
					dcGroups = DialogScenes.GetDialogCastGroups();
					EditorTime.browseActors = false;
				}
			}
			
			// If we've got a cast to work with.. lets continue
			if( dcGroups != null ){
			
				// Loop through the Cast Groups
				var dcGroupID : int = -1;
				for( var dcGroup : DialogCastGroup in dcGroups ){
					if(dcGroup && dcGroup.actors && dcGroup.actors.length > 0){ // Make sure this Group is valid
						
						// Let us know that some actors have been found!
						foundActors = true;
						
						// Increment dcGroupID
						dcGroupID++;
						
						// First horizontal space
						EditorGUILayout.BeginHorizontal();
							
							// Add Indent
							GUILayout.Label("", GUILayout.MaxWidth(5));
							
							// Draw Box
							EditorGUILayout.BeginVertical("Box");
								
								// ========================
								// LABEL / NAME OF GROUP
								// ========================
								
								// Horizontal
								EditorGUILayout.BeginHorizontal();
							
									// Add indent
									GUILayout.Label("", GUILayout.MaxWidth(5));
								
									// Box Label
									GUILayout.Label(dcGroup.name, "BoldLabel", GUILayout.MinWidth(300), GUILayout.MaxWidth(300));
									
									// Add indent
									GUILayout.Label("", GUILayout.MaxWidth(5));
							
								// End Horizontal
								EditorGUILayout.EndHorizontal();
							
								// Add Vertical Space
								GUILayout.Label("", GUILayout.MaxWidth(5));
								
								// ========================
								// CONTENT INSIDE OF BOX
								// ========================
								
								// Horizontal
								EditorGUILayout.BeginHorizontal();
									
									// Add indent
									GUILayout.Label("", GUILayout.MaxWidth(5));
									GUILayout.FlexibleSpace();
								
									// Loop through the Actors
									var ActorCount : int = 0;
									for( var actor : DialogCastActor in dcGroup.actors ){
										if(actor){
											
											// Fix Rows on every 8th actor, create a new row!
											if( ActorCount != 0 && ActorCount%5 == 0 ){
												
													// Add indent
													GUILayout.FlexibleSpace();
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
												
												// Draw Actor Button
												if( GUILayout.Button(DoDialogCastAnimation(actor, actor.icon), GUILayout.MinHeight(90), GUILayout.MaxHeight(90) ,GUILayout.MinWidth(90), GUILayout.MaxWidth(90) ) ){
													
													// CUSTOM BUTTON 1
													if( browseButtonOutput == -1){
														
														theObject.screen.buttonIcon1 = actor.icon;

														// Setup Animation
														if( actor.animated ){
															theObject.screen.animatedButtonIcon1 = Vector2( dcGroupID, ActorCount );
														} else {
															theObject.screen.animatedButtonIcon1 = Vector2( -1, -1 );	
														}
													}

													// CUSTOM BUTTON 2
													else if( browseButtonOutput == -2){
														
														theObject.screen.buttonIcon2 = actor.icon;

														// Setup Animation
														if( actor.animated ){
															theObject.screen.animatedButtonIcon2 = Vector2( dcGroupID, ActorCount );
														} else {
															theObject.screen.animatedButtonIcon2 = Vector2( -1, -1 );	
														}
													}

													// MULTIPLE BUTTONS
													else if( 	output != BrowseOutput.IconGrid && // THIS IS NOT THE ICON GRID!
																browseButtonOutput >= 0 &&
																theObject.screen.multipleButtonsIcon.length > browseButtonOutput &&
																theObject.screen.animatedMultipleButtonsIcon.length > browseButtonOutput
													){
														
														theObject.screen.multipleButtonsIcon[browseButtonOutput] = actor.icon;

														// Setup Animation
														if( actor.animated ){
															theObject.screen.animatedMultipleButtonsIcon[browseButtonOutput] = Vector2( dcGroupID, ActorCount );
														} else {
															theObject.screen.animatedMultipleButtonsIcon[browseButtonOutput] = Vector2( -1, -1 );	
														}
													}

													// ICON GRID
													else if( 	output == BrowseOutput.IconGrid &&
																browseButtonOutput >= 0 &&
																theObject.screen.IG_buttons.length > browseButtonOutput
													){

														theObject.screen.IG_buttons[browseButtonOutput].buttonIcon = actor.icon;
														theObject.screen.IG_buttons[browseButtonOutput].title = actor.name;
														theObject.screen.IG_buttons[browseButtonOutput].label = actor.name;

														// Setup Animation
														if( actor.animated ){
															theObject.screen.IG_buttons[browseButtonOutput].animatedButtonIcon = Vector2( dcGroupID, ActorCount );
														} else {
															theObject.screen.IG_buttons[browseButtonOutput].animatedButtonIcon = Vector2( -1, -1 );	
														}

													}
																

													// POPUP IMAGE
													else if( browseButtonOutput == -3){
														
														theObject.screen.popupImage = actor.icon;

														// Setup Animation
														if( actor.animated ){
															theObject.screen.popupImageAnim = Vector2( dcGroupID, ActorCount );
														} else {
															theObject.screen.popupImageAnim = Vector2( -1, -1 );	
														}
													}



													// ----------> OLDER OUTPUT TYPES:
													if( browseButtonOutput == -100 ){

														// PORTRAIT
														if( output == BrowseOutput.Portrait ){
															theObject.screen.portrait = actor.icon;
															theObject.screen.actorName = actor.name;
															
															// Setup Animation
															if( actor.animated ){
																theObject.screen.animatedPortrait = Vector2( dcGroupID, ActorCount );
															} else {
																theObject.screen.animatedPortrait = Vector2( -1, -1 );	
															}
															
														// ACTOR 1
														} else if( output == BrowseOutput.Actor1 ) {
															theObject.actions.actorLayers[0].tex = actor.icon;
															
															// Setup Animation
															if( actor.animated ){
																theObject.actions.actorLayers[0].animationID = Vector2( dcGroupID, ActorCount );
															} else {
																theObject.actions.actorLayers[0].animationID = Vector2( -1, -1 );	
															}
														
														// ACTOR 2
														} else if( output == BrowseOutput.Actor2 ) {
															theObject.actions.actorLayers[1].tex = actor.icon;
															
															// Setup Animation
															if( actor.animated ){
																theObject.actions.actorLayers[1].animationID = Vector2( dcGroupID, ActorCount );
															} else {
																theObject.actions.actorLayers[1].animationID = Vector2( -1, -1 );	
															}
														
														// ACTOR 3
														} else if( output == BrowseOutput.Actor3 ) {
															theObject.actions.actorLayers[2].tex = actor.icon;
														
															// Setup Animation
															if( actor.animated ){
																theObject.actions.actorLayers[2].animationID = Vector2( dcGroupID, ActorCount );
															} else {
																theObject.actions.actorLayers[2].animationID = Vector2( -1, -1 );	
															}
															
														// ACTOR 4
														} else if( output == BrowseOutput.Actor4 ) {
															theObject.actions.actorLayers[3].tex = actor.icon;
															
															// Setup Animation
															if( actor.animated ){
																theObject.actions.actorLayers[3].animationID = Vector2( dcGroupID, ActorCount );
															} else {
																theObject.actions.actorLayers[3].animationID = Vector2( -1, -1 );	
															}
															
														// ACTOR 5
														} else if( output == BrowseOutput.Actor5 ) {
															theObject.actions.actorLayers[4].tex = actor.icon;
															
															// Setup Animation
															if( actor.animated ){
																theObject.actions.actorLayers[4].animationID = Vector2( dcGroupID, ActorCount );
															} else {
																theObject.actions.actorLayers[4].animationID = Vector2( -1, -1 );	
															}
															
														// ACTOR 6
														} else if( output == BrowseOutput.Actor6 ) {
															theObject.actions.actorLayers[5].tex = actor.icon;
															
															// Setup Animation
															if( actor.animated ){
																theObject.actions.actorLayers[5].animationID = Vector2( dcGroupID, ActorCount );
															} else {
																theObject.actions.actorLayers[5].animationID = Vector2( -1, -1 );	
															}
															
														// ACTOR 7
														} else if( output == BrowseOutput.Actor7 ) {
															theObject.actions.actorLayers[6].tex = actor.icon;
															
															// Setup Animation
															if( actor.animated ){
																theObject.actions.actorLayers[6].animationID = Vector2( dcGroupID, ActorCount );
															} else {
																theObject.actions.actorLayers[6].animationID = Vector2( -1, -1 );	
															}
															
														// ACTOR 8
														} else if( output == BrowseOutput.Actor8 ) {
															theObject.actions.actorLayers[7].tex = actor.icon;
															
															// Setup Animation
															if( actor.animated ){
																theObject.actions.actorLayers[7].animationID = Vector2( dcGroupID, ActorCount );
															} else {
																theObject.actions.actorLayers[7].animationID = Vector2( -1, -1 );	
															}
															
														// ACTOR 9
														} else if( output == BrowseOutput.Actor9 ) {
															theObject.actions.actorLayers[8].tex = actor.icon;
															
															// Setup Animation
															if( actor.animated ){
																theObject.actions.actorLayers[8].animationID = Vector2( dcGroupID, ActorCount );
															} else {
																theObject.actions.actorLayers[8].animationID = Vector2( -1, -1 );	
															}
															
														// ACTOR 10
														} else if( output == BrowseOutput.Actor10 ) {
															theObject.actions.actorLayers[9].tex = actor.icon;
															
															// Setup Animation
															if( actor.animated ){
																theObject.actions.actorLayers[9].animationID = Vector2( dcGroupID, ActorCount );
															} else {
																theObject.actions.actorLayers[9].animationID = Vector2( -1, -1 );	
															}
														
														// SCENE 1
														} else if( output == BrowseOutput.Scene1 ) {
															theObject.actions.sceneLayers[0].tex = actor.icon;
														
															// Setup Animation
															if( actor.animated ){
																theObject.actions.sceneLayers[0].animationID = Vector2( dcGroupID, ActorCount );
															} else {
																theObject.actions.sceneLayers[0].animationID = Vector2( -1, -1 );	
															}
															
														// SCENE 2
														} else if( output == BrowseOutput.Scene2 ) {
															theObject.actions.sceneLayers[1].tex = actor.icon;
														
															// Setup Animation
															if( actor.animated ){
																theObject.actions.sceneLayers[1].animationID = Vector2( dcGroupID, ActorCount );
															} else {
																theObject.actions.sceneLayers[1].animationID = Vector2( -1, -1 );	
															}
															
														// SCENE 3
														} else if( output == BrowseOutput.Scene3 ) {
															theObject.actions.sceneLayers[2].tex = actor.icon;
															
															// Setup Animation
															if( actor.animated ){
																theObject.actions.sceneLayers[2].animationID = Vector2( dcGroupID, ActorCount );
															} else {
																theObject.actions.sceneLayers[2].animationID = Vector2( -1, -1 );	
															}
															
														// SCENE 4
														} else if( output == BrowseOutput.Scene4 ) {
															theObject.actions.sceneLayers[3].tex = actor.icon;
														
															// Setup Animation
															if( actor.animated ){
																theObject.actions.sceneLayers[3].animationID = Vector2( dcGroupID, ActorCount );
															} else {
																theObject.actions.sceneLayers[3].animationID = Vector2( -1, -1 );	
															}
															
														// SCENE 5
														} else if( output == BrowseOutput.Scene5 ) {
															theObject.actions.sceneLayers[4].tex = actor.icon;
															
															// Setup Animation
															if( actor.animated ){
																theObject.actions.sceneLayers[4].animationID = Vector2( dcGroupID, ActorCount );
															} else {
																theObject.actions.sceneLayers[4].animationID = Vector2( -1, -1 );	
															}
															
														// SCENE 6
														} else if( output == BrowseOutput.Scene6 ) {
															theObject.actions.sceneLayers[5].tex = actor.icon;
															
															// Setup Animation
															if( actor.animated ){
																theObject.actions.sceneLayers[5].animationID = Vector2( dcGroupID, ActorCount );
															} else {
																theObject.actions.sceneLayers[5].animationID = Vector2( -1, -1 );	
															}
															
														// SCENE 7
														} else if( output == BrowseOutput.Scene7 ) {
															theObject.actions.sceneLayers[6].tex = actor.icon;
															
															// Setup Animation
															if( actor.animated ){
																theObject.actions.sceneLayers[6].animationID = Vector2( dcGroupID, ActorCount );
															} else {
																theObject.actions.sceneLayers[6].animationID = Vector2( -1, -1 );	
															}
															
														// SCENE 8
														} else if( output == BrowseOutput.Scene8 ) {
															theObject.actions.sceneLayers[7].tex = actor.icon;
															
															// Setup Animation
															if( actor.animated ){
																theObject.actions.sceneLayers[7].animationID = Vector2( dcGroupID, ActorCount );
															} else {
																theObject.actions.sceneLayers[7].animationID = Vector2( -1, -1 );	
															}
															
														// SCENE 9
														} else if( output == BrowseOutput.Scene9 ) {
															theObject.actions.sceneLayers[8].tex = actor.icon;
															
															// Setup Animation
															if( actor.animated ){
																theObject.actions.sceneLayers[8].animationID = Vector2( dcGroupID, ActorCount );
															} else {
																theObject.actions.sceneLayers[8].animationID = Vector2( -1, -1 );	
															}
															
														// SCENE 10
														} else if( output == BrowseOutput.Scene10 ) {
															theObject.actions.sceneLayers[9].tex = actor.icon;
															
															// Setup Animation
															if( actor.animated ){
																theObject.actions.sceneLayers[9].animationID = Vector2( dcGroupID, ActorCount );
															} else {
																theObject.actions.sceneLayers[9].animationID = Vector2( -1, -1 );	
															}
														}
													}
													
													browseMode = false;			// Remove the browseMode flag
													browseButtonOutput = -100;	// Remove the id for button References (-100 = None)

													// Update LDC Animations
													UpdateLDCAnimations(false);
												}
												
												// Draw Actor label
												var centeredStyle = GUI.skin.GetStyle("Label");
	 													centeredStyle.alignment = TextAnchor.UpperCenter;
												GUILayout.Label(actor.name, centeredStyle, GUILayout.MinWidth(90), GUILayout.MaxWidth(90)  );
												centeredStyle.alignment = TextAnchor.UpperLeft;
												
											EditorGUILayout.EndVertical();
											
											// increment count
											ActorCount++;
										}
									}
								
									// Add indent
									GUILayout.FlexibleSpace();
									GUILayout.Label("", GUILayout.MaxWidth(5));
									
									
								// End Horizontal
								EditorGUILayout.EndHorizontal();
								
								// Add Vertical Space
								GUILayout.Label("", GUILayout.MaxWidth(5));
								
							// End Box	
							EditorGUILayout.EndVertical();
						
							// Add indent
							GUILayout.Label("", GUILayout.MaxWidth(5));
							
						// End horizontal	
						EditorGUILayout.EndHorizontal();
						
						// Add Space
						EditorGUILayout.Space();
					
					// Empty Group
					} else if (dcGroup) {
						//GUILayout.Label( "No Actors have been setup in "+dcGroup.name+"." );
					}
				}
				
				
			
			// If the Dialog Groups are null, automatically cancel this mode.	
			} else {
				browseMode = false;	
				browseButtonOutput = -100;	// Remove the id for button References (-100 = None)
			}
			
			// No Actors were found in any of the Dialog Cast Groups
			if(!foundActors){
				
				// Horizontal
				EditorGUILayout.BeginHorizontal();
				
					// Add indent
					GUILayout.Label("", GUILayout.MaxWidth(5));
					
					// Let the user know that no actors have been setup yet					
					GUILayout.Label( "No Actors have been setup yet." );				
					
					// Add indent
					GUILayout.Label("", GUILayout.MaxWidth(5));
				
				// End horizontal	
				EditorGUILayout.EndHorizontal();
				
				// Add Space
				EditorGUILayout.Space();
				
					// check if we already have a DialogCast in the scene first
					//var TheDialogCasts : DialogCast[] = FindObjectsOfType (DialogCast);
					var TheDialogCasts : DialogCast[] = EditorTime.theDCs;
					
					// If we found a Dialog Cast .. Check to make sure if the first one is valid!
					if ( TheDialogCasts != null && TheDialogCasts.length > 0 && TheDialogCasts[0]!=null && TheDialogCasts[0].transform!=null){
						
						// Horizontal
						EditorGUILayout.BeginHorizontal();
						
							// Add indent
							GUILayout.Label("", GUILayout.MaxWidth(5));
							
							// Let the user know that no actors have been setup yet					
							GUILayout.Label( "Would you like to setup your Cast and Actors Now?" );				
							
							// Add indent
							GUILayout.Label("", GUILayout.MaxWidth(5));
						
						// End horizontal	
						EditorGUILayout.EndHorizontal();
						
						// Add Space
						EditorGUILayout.Space();
						
						// SETUP CAST BUTTON
						EditorGUILayout.BeginHorizontal();
							GUILayout.FlexibleSpace();
								
								// Setup Cast Button
								if( GUILayout.Button("Setup The Cast") ){
									browseMode = false;
									browseButtonOutput = -100;	// Remove the id for button References (-100 = None)
									Selection.activeTransform = TheDialogCasts[0].transform;
								}
								
								GUILayout.FlexibleSpace();
						EditorGUILayout.EndHorizontal();
					}
					
			// Actors were found!			
			} else {
			
				// Cancel Button
				EditorGUILayout.BeginHorizontal();
					GUILayout.FlexibleSpace();
					if( GUILayout.Button("Cancel Selection") ){
						browseMode = false;
						browseButtonOutput = -100;	// Remove the id for button References (-100 = None)
					}
					GUILayout.FlexibleSpace();
				EditorGUILayout.EndHorizontal();
			
			}
			
			// Add Space
			EditorGUILayout.Space();
		
		// If we cannot see the DialogCast component, then turn off the view Cast mode
		} else {
			browseMode = false;	
			browseButtonOutput = -100;	// Remove the id for button References (-100 = None)
		}
	
	}
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ADD NEW DIALOG SCREEN
	// Adds a new Dialog Screen to this gameObject
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function AddNewDialogScreen( theObject : DialogScreen ){
	
		// Add a new Dialog Screen Component
		var newDS : DialogScreen = theObject.gameObject.AddComponent (DialogScreen);
		
		// Preset Dialog ID to the number of DialogScreen components
		var theComponents = theObject.gameObject.GetComponents(DialogScreen);
		newDS.dialogID = theComponents.length;
		
		// If there was a DialogScreen component previous to this one, try to get the icon image
		if( theComponents.length > 1 && theComponents[theComponents.length-2] != null ){
			
			// Cache the previous DialogScreen
			var previousDS: DialogScreen = theComponents[theComponents.length-2];
			
			// If the previous component had a Portrait setup, copy that over
			if(previousDS.screen.portrait!=null){
				newDS.screen = new DS_Screen();
				newDS.screen.portrait = previousDS.screen.portrait;
				newDS.screen.animatedPortrait = previousDS.screen.animatedPortrait;
				newDS.screen.actorName = previousDS.screen.actorName;
			}
		}
		
		// BUGFIX: Reimport the Editor for DialogScreens - this stops the errors we get when we click into actions. WEIRD!
	//	var script = MonoScript.FromScriptableObject( this );
	//	var path : String = AssetDatabase.GetAssetPath( script );
	//	if(path!=null){AssetDatabase.ImportAsset(path);}	
		
	}
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ADD NEW MULTIPLE CHOICE OPTION
	// Adds a new choice to the multipleChoiceOption
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function AddNewMultipleChoiceOption( theObject : DialogScreen ){
		
		theObject.screen.multipleButtons = AddAnotherSlot( theObject.screen.multipleButtons, true );
		theObject.navigation.multipleButtons = AddAnotherSlotInt( theObject.navigation.multipleButtons );
		theObject.screen.multipleRequiresLogic = AddAnotherSlotBoolean( theObject.screen.multipleRequiresLogic );
		theObject.screen.multipleLogic = AddAnotherSlotLogic( theObject.screen.multipleLogic );
		
		// Fix Custom Icon Buttons
		theObject.screen.multipleButtonsIcon = AddAnotherSlotTex2D( theObject.screen.multipleButtonsIcon );
		theObject.screen.animatedMultipleButtonsIcon = AddAnotherSlotVector2( theObject.screen.animatedMultipleButtonsIcon, new Vector2(-1,-1) );
		theObject.screen.editorAnimatedMultipleButtonsIcon = AddAnotherSlotDCA( theObject.screen.editorAnimatedMultipleButtonsIcon );
		
		// Add new Language Option
		theObject.localization.chinese.multipleButtons = AddAnotherSlot( theObject.localization.chinese.multipleButtons, false );
		theObject.localization.korean.multipleButtons = AddAnotherSlot( theObject.localization.korean.multipleButtons, false );
		theObject.localization.japanese.multipleButtons = AddAnotherSlot( theObject.localization.japanese.multipleButtons, false );
		theObject.localization.spanish.multipleButtons = AddAnotherSlot( theObject.localization.spanish.multipleButtons, false );
		theObject.localization.italian.multipleButtons = AddAnotherSlot( theObject.localization.italian.multipleButtons, false );
		theObject.localization.german.multipleButtons = AddAnotherSlot( theObject.localization.german.multipleButtons, false );
		theObject.localization.french.multipleButtons = AddAnotherSlot( theObject.localization.french.multipleButtons, false );
		theObject.localization.portuguese.multipleButtons = AddAnotherSlot( theObject.localization.portuguese.multipleButtons, false );
		theObject.localization.russian.multipleButtons = AddAnotherSlot( theObject.localization.russian.multipleButtons, false );
		
	}
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ADD NEW LOGIC STATEMENT 
	// Adds a new statement to a logic block
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function AddNewLogicStatement( theObject : DialogScreen ){
		
		print("doing it!");
		
		theObject.screen.logicStatements = AddAnotherSlotLogic( theObject.screen.logicStatements );
		
		// Add new Language Option
		theObject.localization.chinese.logicStatementCompare = AddAnotherSlot( theObject.localization.chinese.logicStatementCompare, false );
		theObject.localization.korean.logicStatementCompare = AddAnotherSlot( theObject.localization.korean.logicStatementCompare, false );
		theObject.localization.japanese.logicStatementCompare = AddAnotherSlot( theObject.localization.japanese.logicStatementCompare, false );
		theObject.localization.spanish.logicStatementCompare = AddAnotherSlot( theObject.localization.spanish.logicStatementCompare, false );
		theObject.localization.italian.logicStatementCompare = AddAnotherSlot( theObject.localization.italian.logicStatementCompare, false );
		theObject.localization.german.logicStatementCompare = AddAnotherSlot( theObject.localization.german.logicStatementCompare, false );
		theObject.localization.french.logicStatementCompare = AddAnotherSlot( theObject.localization.french.logicStatementCompare, false );
		theObject.localization.portuguese.logicStatementCompare = AddAnotherSlot( theObject.localization.portuguese.logicStatementCompare, false );
		theObject.localization.russian.logicStatementCompare = AddAnotherSlot( theObject.localization.russian.logicStatementCompare, false );
		
	}
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ADD ANOTHER ARRAY SLOT
	// Helper Function that adds another slot to a string array
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function AddAnotherSlot( arr : String[], autoName : boolean ){
		
		// Create a new String Array
		var newArr : String[] = new String[0];
		
		// If existing Array is valid ..
		if(arr!=null){
			
			// Create a new String Array 1 size bigger than the existing one
			newArr = new String[arr.length+1];
			
			// Copy the old values into the new array
			newArr.Copy( arr, newArr, arr.length);
			
			// Name the new Option
			if(autoName){
				newArr[newArr.length-1] = "Option "+ newArr.length.ToString();
			} else {
				newArr[newArr.length-1] = "";
			}
				
		// If it isn't valid, create an entirely new one with a single option
		} else {
			if(autoName){
				newArr = ["Option 1"];
			} else {
				newArr = [""];
			}
		}
		
		// Replace the existing array
		return newArr;
	}
	
	// The int version
	function AddAnotherSlotInt( arr : int[] ){
		
		// Create a new int Array
		var newArr : int[] = new int[0];
		
		// If existing Array is valid ..
		if(arr!=null){
			
			// Create a new int Array 1 size bigger than the existing one
			newArr = new int[arr.length+1];
			
			// Copy the old values into the new array
			newArr.Copy( arr, newArr, arr.length);
		
		// If it isn't valid, create an entirely new one with a single option
		} else {
			newArr = [0];
		}
		
		// Replace the existing array
		return newArr;
	}
	
	// The Boolean version
	function AddAnotherSlotBoolean( arr : boolean[] ){
		
		// Create a new boolean Array
		var newArr : boolean[] = new boolean[0];
		
		// If existing Array is valid ..
		if(arr!=null){
			
			// Create a new boolean Array 1 size bigger than the existing one
			newArr = new boolean[arr.length+1];
			
			// Copy the old values into the new array
			newArr.Copy( arr, newArr, arr.length);
		
		// If it isn't valid, create an entirely new one with a single option
		} else {
			newArr = [false];
		}
		
		// Replace the existing array
		return newArr;
	}

	// The Texture2D version
	function AddAnotherSlotTex2D( arr : Texture2D[] ){
		
		// Create a new Texture2D Array
		var newArr : Texture2D[] = new Texture2D[0];
		
		// If existing Array is valid ..
		if(arr!=null){
			
			// Create a new Texture2D Array 1 size bigger than the existing one
			newArr = new Texture2D[arr.length+1];
			
			// Copy the old values into the new array
			newArr.Copy( arr, newArr, arr.length);
		
		// If it isn't valid, create an entirely new one with a single option
		} else {
			newArr = [];
		}
		
		// Replace the existing array
		return newArr;
	}

	
	// The Logic version
	function AddAnotherSlotLogic( arr : LogicStatements[] ){
		
		// Create a new int Array
		var newArr : LogicStatements[] = new LogicStatements[0];
		
		// If existing Array is valid ..
		if(arr!=null){
			
			// Create a new int Array 1 size bigger than the existing one
			newArr = new LogicStatements[arr.length+1];
			
			// Copy the old values into the new array
			newArr.Copy( arr, newArr, arr.length);
		
		// If it isn't valid, create an entirely new one with a single option
		} else {
			newArr = [new LogicStatements()];
		}
		
		// Replace the existing array
		return newArr;
	}

	// The DialogCastActor version
	function AddAnotherSlotDCA( arr : DialogCastActor[] ){
		
		// Create a new int Array
		var newArr : DialogCastActor[] = new DialogCastActor[0];
		
		// If existing Array is valid ..
		if(arr!=null){
			
			// Create a new int Array 1 size bigger than the existing one
			newArr = new DialogCastActor[arr.length+1];
			
			// Copy the old values into the new array
			newArr.Copy( arr, newArr, arr.length);
		
		// If it isn't valid, create an entirely new one with a single option
		} else {
			newArr = [new DialogCastActor()];
		}
		
		// Replace the existing array
		return newArr;
	}

	// The Vector2 version
	function AddAnotherSlotVector2( arr : Vector2[] ){
		
		// Create a new int Array
		var newArr : Vector2[] = new Vector2[0];
		
		// If existing Array is valid ..
		if(arr!=null){
			
			// Create a new int Array 1 size bigger than the existing one
			newArr = new Vector2[arr.length+1];
			
			// Copy the old values into the new array
			newArr.Copy( arr, newArr, arr.length);
		
		// If it isn't valid, create an entirely new one with a single option
		} else {
			newArr = [new Vector2(-1,-1)];
		}
		
		// Replace the existing array
		return newArr;
	}

	// The Vector2 version
	function AddAnotherSlotVector2( arr : Vector2[], defaultValue : Vector2 ){
		
		// Create a new int Array
		var newArr : Vector2[] = new Vector2[0];
		
		// If existing Array is valid ..
		if(arr!=null){
			
			// Create a new int Array 1 size bigger than the existing one
			newArr = new Vector2[arr.length+1];

			// Set all the values to the default value
			for( var entry : Vector2 in newArr){
				entry = defaultValue;
			}
			
			// Copy the old values into the new array
			newArr.Copy( arr, newArr, arr.length);
		
		// If it isn't valid, create an entirely new one with a single option
		} else {
			newArr = [new Vector2(-1,-1)];
		}
		
		// Replace the existing array
		return newArr;
	}

	// Icon Grid Buttons Version
	function AddAnotherSlotIconGridButtons( arr : IconGridButtons[] ){
		
		// Create a new int Array
		var newArr : IconGridButtons[] = new IconGridButtons[0];
		
		// If existing Array is valid ..
		if(arr!=null){
			
			// Create a new int Array 1 size bigger than the existing one
			newArr = new IconGridButtons[arr.length+1];
			
			// Copy the old values into the new array
			newArr.Copy( arr, newArr, arr.length);
		
		// If it isn't valid, create an entirely new one with a single option
		} else {
			newArr = [new IconGridButtons()];
		}
		
		// Replace the existing array
		return newArr;
	}
	
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DELETE MULTIPLE CHOICE OPTION
	// Adds a new choice to the multipleChoiceOption
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	
	function DeleteMultipleChoiceOption( theObject : DialogScreen ){
		
		// Make sure we've got at least 1 option
		if( theObject.screen.multipleButtons.length > 1 ){
			
			theObject.screen.multipleButtons = DeleteAnotherSlot( theObject.screen.multipleButtons );
			theObject.navigation.multipleButtons = DeleteAnotherSlotInt( theObject.navigation.multipleButtons );
			theObject.screen.multipleRequiresLogic = DeleteAnotherSlotBoolean( theObject.screen.multipleRequiresLogic );
			theObject.screen.multipleLogic = DeleteAnotherSlotLogic( theObject.screen.multipleLogic );

			// Fix Custom Icon Buttons
			theObject.screen.multipleButtonsIcon = DeleteAnotherSlotTex2D( theObject.screen.multipleButtonsIcon );
			theObject.screen.animatedMultipleButtonsIcon = DeleteAnotherSlotVector2( theObject.screen.animatedMultipleButtonsIcon );
			theObject.screen.editorAnimatedMultipleButtonsIcon = DeleteAnotherSlotDCA( theObject.screen.editorAnimatedMultipleButtonsIcon );
			
			// Add new Language Option
			theObject.localization.chinese.multipleButtons = DeleteAnotherSlot( theObject.localization.chinese.multipleButtons );
			theObject.localization.korean.multipleButtons = DeleteAnotherSlot( theObject.localization.korean.multipleButtons );
			theObject.localization.japanese.multipleButtons = DeleteAnotherSlot( theObject.localization.japanese.multipleButtons );
			theObject.localization.spanish.multipleButtons = DeleteAnotherSlot( theObject.localization.spanish.multipleButtons );
			theObject.localization.italian.multipleButtons = DeleteAnotherSlot( theObject.localization.italian.multipleButtons );
			theObject.localization.german.multipleButtons = DeleteAnotherSlot( theObject.localization.german.multipleButtons );
			theObject.localization.french.multipleButtons = DeleteAnotherSlot( theObject.localization.french.multipleButtons );
			theObject.localization.portuguese.multipleButtons = DeleteAnotherSlot( theObject.localization.portuguese.multipleButtons );
			theObject.localization.russian.multipleButtons = DeleteAnotherSlot( theObject.localization.russian.multipleButtons );
		
		}
	}
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DELETE LOGIC STATEMENT 
	// Adds a new statement to a logic block
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function DeleteLogicStatement( theObject : DialogScreen ){
		
		// Make sure we've got at least 1 option
		if( theObject.screen.logicStatements.length > 0 ){
			
			theObject.screen.logicStatements = DeleteAnotherSlotLogic( theObject.screen.logicStatements );
			
			// Delete new Language Option
			theObject.localization.chinese.logicStatementCompare = DeleteAnotherSlot( theObject.localization.chinese.logicStatementCompare );
			theObject.localization.korean.logicStatementCompare = DeleteAnotherSlot( theObject.localization.korean.logicStatementCompare );
			theObject.localization.japanese.logicStatementCompare = DeleteAnotherSlot( theObject.localization.japanese.logicStatementCompare );
			theObject.localization.spanish.logicStatementCompare = DeleteAnotherSlot( theObject.localization.spanish.logicStatementCompare );
			theObject.localization.italian.logicStatementCompare = DeleteAnotherSlot( theObject.localization.italian.logicStatementCompare );
			theObject.localization.german.logicStatementCompare = DeleteAnotherSlot( theObject.localization.german.logicStatementCompare );
			theObject.localization.french.logicStatementCompare = DeleteAnotherSlot( theObject.localization.french.logicStatementCompare );
			theObject.localization.portuguese.logicStatementCompare = DeleteAnotherSlot( theObject.localization.portuguese.logicStatementCompare );
			theObject.localization.russian.logicStatementCompare = DeleteAnotherSlot( theObject.localization.russian.logicStatementCompare );
		
		}
	}
	
	// DELETE ANOTHER ARRAY SLOT
	// Helper Function that adds another slot to an array
	function DeleteAnotherSlot( arr : String[] ){
		
		// Create a new String Array
		var newArr : String[] = new String[0];
		
		// If existing Array is valid ..
		if(arr!=null){
			
			// Create a new String Array 1 size bigger than the existing one
			newArr = new String[arr.length-1];
			
			// Copy the old values into the new array
			newArr.Copy( arr, newArr, newArr.length);
				
		// If it isn't valid, create an entirely new one with a single option
		} else {
			newArr = ["Option 1"];
		}
		
		// Replace the existing array
		return newArr;
	}
	
	// The int version
	function DeleteAnotherSlotInt( arr : int[] ){
		
		// Create a new int Array
		var newArr : int[] = new int[0];
		
		// If existing Array is valid ..
		if(arr!=null){
			
			// Create a new int Array 1 size bigger than the existing one
			newArr = new int[arr.length-1];
			
			// Copy the old values into the new array
			newArr.Copy( arr, newArr, newArr.length);
		
		// If it isn't valid, create an entirely new one with a single option
		} else {
			newArr = [0];
		}
		
		// Replace the existing array
		return newArr;
	}
	
	// The boolean version
	function DeleteAnotherSlotBoolean( arr : boolean[] ){
		
		// Create a new boolean Array
		var newArr : boolean[] = new boolean[0];
		
		// If existing Array is valid ..
		if(arr!=null){
			
			// Create a new int Array 1 size bigger than the existing one
			newArr = new boolean[arr.length-1];
			
			// Copy the old values into the new array
			newArr.Copy( arr, newArr, newArr.length);
		
		// If it isn't valid, create an entirely new one with a single option
		} else {
			newArr = [false];
		}
		
		// Replace the existing array
		return newArr;
	}

	// The Texture2D version
	function DeleteAnotherSlotTex2D( arr : Texture2D[] ){
		
		// Create a new Texture2D Array
		var newArr : Texture2D[] = new Texture2D[0];
		
		// If existing Array is valid ..
		if(arr!=null){
			
			// Create a new int Array 1 size smaller than the existing one
			newArr = new Texture2D[arr.length-1];
			
			// Copy the old values into the new array
			newArr.Copy( arr, newArr, newArr.length);
		
		// If it isn't valid, create an entirely new one with a single option
		} else {
			newArr = [null];
		}
		
		// Replace the existing array
		return newArr;
	}
	
	// The Logic version
	function DeleteAnotherSlotLogic( arr : LogicStatements[] ){
		
		// Create a new int Array
		var newArr : LogicStatements[] = new LogicStatements[0];
		
		// If existing Array is valid ..
		if(arr!=null){
			
			// Create a new int Array 1 size bigger than the existing one
			newArr = new LogicStatements[arr.length-1];
			
			// Copy the old values into the new array
			newArr.Copy( arr, newArr, newArr.length);
		
		// If it isn't valid, create an entirely new one with a single option
		} else {
			newArr = [new LogicStatements()];
		}
		
		// Replace the existing array
		return newArr;
	}

	// The DialogCastActor version
	function DeleteAnotherSlotDCA( arr : DialogCastActor[] ){
		
		// Create a new int Array
		var newArr : DialogCastActor[] = new DialogCastActor[0];
		
		// If existing Array is valid ..
		if(arr!=null){
			
			// Create a new int Array 1 size bigger than the existing one
			newArr = new DialogCastActor[arr.length-1];
			
			// Copy the old values into the new array
			newArr.Copy( arr, newArr, newArr.length);
		
		// If it isn't valid, create an entirely new one with a single option
		} else {
			newArr = [new DialogCastActor()];
		}
		
		// Replace the existing array
		return newArr;
	}

	
	// The Vector2 version
	function DeleteAnotherSlotVector2( arr : Vector2[] ){
		
		// Create a new int Array
		var newArr : Vector2[] = new Vector2[0];
		
		// If existing Array is valid ..
		if(arr!=null){
			
			// Create a new int Array 1 size bigger than the existing one
			newArr = new Vector2[arr.length-1];
			
			// Copy the old values into the new array
			newArr.Copy( arr, newArr, newArr.length);
		
		// If it isn't valid, create an entirely new one with a single option
		} else {
			newArr = [new Vector2(-1,-1)];
		}
		
		// Replace the existing array
		return newArr;
	}

	// The IconGridButtons version
	function DeleteAnotherSlotIconGridButtons( arr : IconGridButtons[] ){
		
		// Create a new int Array
		var newArr : IconGridButtons[] = new IconGridButtons[0];
		
		// If existing Array is valid ..
		if(arr!=null){
			
			// Create a new int Array 1 size bigger than the existing one
			newArr = new IconGridButtons[arr.length-1];
			
			// Copy the old values into the new array
			newArr.Copy( arr, newArr, newArr.length);
		
		// If it isn't valid, create an entirely new one with a single option
		} else {
			newArr = [new IconGridButtons()];
		}
		
		// Replace the existing array
		return newArr;
	}
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	DO SCENE ACTIONS TAB
	//	Renders the "Scene Actions tab
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function DoSceneActionsTab( theObject : DialogScreen ){
	
		// Make sure theObject (Dialog Screen is valid)
		if( theObject != null){
			
			// Make sure we have 5 background layers!
			if( theObject.actions.sceneLayers.length != 10){
				
				// Backup the old layers
				var oldLayers : DialogUIBackgroundLayers[] = theObject.actions.sceneLayers;
				
				// Create a new list
				theObject.actions.sceneLayers = new DialogUIBackgroundLayers[10];
				
				// Populate the array with the new layers
				var fixCounter : int = 0;
				for( var newSceneLayer : DialogUIBackgroundLayers in theObject.actions.sceneLayers){
					
					// If we can copy from the old array, do that ..
					if( fixCounter < oldLayers.length && oldLayers[fixCounter]!=null){
						newSceneLayer = oldLayers[fixCounter];
					
					// Otherwise, create a new blank layer
					} else {
						newSceneLayer = new DialogUIBackgroundLayers();
					}
					
					// Increment counter
					fixCounter++;
				}
			}
		
				// FADE OUT ENTIRE SCENE
				//EditorGUILayout.Space();
				GUILayout.Label("Remove Background", "BoldLabel");
				GUILayout.Label("Use this to quickly change scenes. All Background Layers will be completed faded out.");
				EditorGUILayout.Space();
				
				GUILayout.BeginHorizontal("Box");
					GUILayout.BeginVertical();

						// Space
						EditorGUILayout.Space();
	
						// Fade Out all scene layers
						GUILayout.BeginHorizontal();
							GUILayout.Label("", GUILayout.MaxWidth(5)); // indent
							GUILayout.Label(cameraLabel, GUILayout.MaxWidth(20));
							theObject.actions.fadeAllSceneLayers = EditorGUILayout.Toggle("Fade Out All Layers", theObject.actions.fadeAllSceneLayers);
							GUILayout.Label("", GUILayout.MaxWidth(5)); // indent
						GUILayout.EndHorizontal();

						// Space
						EditorGUILayout.Space();
				
						GUILayout.EndVertical();
					GUILayout.EndHorizontal();
				EditorGUILayout.Space();
				
				// SCENE LAYERS
				if(!theObject.actions.fadeAllSceneLayers){
					
					EditorGUILayout.Space();
					GUILayout.Label("Background Layers", "BoldLabel");
					GUILayout.Label("Modify 'Background Layers' to build up multi-layer backgrounds for your scenes. These");
					GUILayout.Label("changes are global and continue across different dialog screens! If you don't change");
					GUILayout.Label("a layer, it will just carry on using whatever settings you had setup before.");
					EditorGUILayout.Space();
					
					GUILayout.BeginVertical();
						GUILayout.BeginHorizontal();
						
							// Add space indent
							//GUILayout.Label("", GUILayout.MaxWidth(5));
							
							// Loop through the background layers
							var actionCount : int = 0;
							var setLayerFound : boolean = false;	// See if we are setting any layers in this dialog!
							for( var layer : DialogUIBackgroundLayers in theObject.actions.sceneLayers ){
						
								// Add a new row on every 5 columns
								if( actionCount % 5 == 0){
										GUILayout.EndHorizontal();
									GUILayout.EndVertical();
									
									EditorGUILayout.Space();
									
									GUILayout.BeginVertical();
										GUILayout.BeginHorizontal();
								}
						
								// Indent Space
								if( actionCount != 0 && actionCount % 5 != 0 ){
									GUILayout.FlexibleSpace();
								}
								
								// Columns
								GUILayout.BeginHorizontal("Box");
								GUILayout.BeginVertical( GUILayout.MinWidth(90), GUILayout.MaxWidth(90));
									
									// Label
								//	GUILayout.Label("Layer "+(actionCount+1).ToString(), "BoldLabel", GUILayout.MaxWidth(80));
									
									// SET LAYER
									GUILayout.BeginHorizontal();
										GUILayout.Label(layersLabel, GUILayout.MaxWidth(20));
										if(actionCount+1 != 10){
											GUILayout.Label("Lyr "+(actionCount+1).ToString(), "BoldLabel", GUILayout.MaxWidth(40));
										} else {
											GUILayout.Label("Lyr"+(actionCount+1).ToString(), "BoldLabel", GUILayout.MaxWidth(40));
										}
										layer.setLayer = EditorGUILayout.Toggle("", layer.setLayer, GUILayout.MaxWidth(20));
									GUILayout.EndHorizontal();
									
									// Indent Space
									EditorGUILayout.Space();
									
									// If we are setting up this layer, show the settings
									if(layer.setLayer){
									
										// Set flag to true
										setLayerFound = true;
									
										// Image Label
										
										
										// Draw Animated Texture Box
										if( layer.animationID != Vector2(-1,-1) ){
											GUILayout.Label("Animated:", GUILayout.MaxWidth(80));
											
											GUILayout.BeginHorizontal();
												// Add some space
												GUILayout.Label("", GUILayout.MaxWidth(0) );
												
												// Setup a new GUI Style to show a fully stretched GUIBox
												var newStyle : GUIStyle = new GUIStyle();
												
												// Animate the layer
												if( layer.anim != null){
													newStyle.normal.background = DoDialogCastAnimation(layer.anim, layer.tex);
												} else {
													newStyle.normal.background = layer.tex; 
												}
												
												GUILayout.Box("", newStyle , GUILayout.Width(74), GUILayout.Height(80) );
											GUILayout.EndHorizontal();
										
										// Draw Standard Texture Box	
										} else {
											
											GUILayout.Label("Image:", GUILayout.MaxWidth(80));
											layer.tex = EditorGUILayout.ObjectField(layer.tex, Texture2D, false, GUILayout.MinWidth(64), GUILayout.MinHeight(80) , GUILayout.MaxWidth(80), GUILayout.MaxHeight(80) );
										}
									
										// Browse Scenes Button
										if( DSs && DSs.length>0 ){ // If the Dialog Scenes component is available, show the View Scenes button
											GUILayout.BeginHorizontal();
												GUILayout.Label(cameraLabel, GUILayout.MaxWidth(20));
												if( GUILayout.Button("Scenes", GUILayout.MaxWidth(56)) ){
													
													// Set the correct Destination
													if( actionCount == 0 ){
														browseOutput = BrowseOutput.Scene1;
													} else if( actionCount == 1 ){
														browseOutput = BrowseOutput.Scene2;
													} else if( actionCount == 2 ){
														browseOutput = BrowseOutput.Scene3;
													} else if( actionCount == 3 ){
														browseOutput = BrowseOutput.Scene4;
													} else if( actionCount == 4 ){
														browseOutput = BrowseOutput.Scene5;
													} else if( actionCount == 5 ){
														browseOutput = BrowseOutput.Scene6;
													} else if( actionCount == 6 ){
														browseOutput = BrowseOutput.Scene7;
													} else if( actionCount == 7 ){
														browseOutput = BrowseOutput.Scene8;
													} else if( actionCount == 8 ){
														browseOutput = BrowseOutput.Scene9;
													} else if( actionCount == 9 ){
														browseOutput = BrowseOutput.Scene10;
													}
													
													// Turn on browse mode
													browseMode = true;
													
												}
											GUILayout.EndHorizontal();
											
											// Delete Animation Button
											if( layer.animationID != Vector2(-1,-1) ){
												GUILayout.BeginHorizontal();
													
													// Remove Animation
													GUILayout.Label(deleteLabel, GUILayout.MaxWidth(20));
													if( GUILayout.Button("No Anim", GUILayout.MaxWidth(56)) ){
														layer.animationID = Vector2(-1,-1);
													}
												
												GUILayout.EndHorizontal();
											}
											
											
											// Indent Space
											EditorGUILayout.Space();
											
										}
										
										// ScaleMode Label
										GUILayout.Label("Scale Mode:", GUILayout.MaxWidth(80));
										
										// Scale Mode
										layer.scale = EditorGUILayout.EnumPopup("", layer.scale, GUILayout.MaxWidth(80));
										
										// Indent Space
										EditorGUILayout.Space();
										
										// Use Transitions
										GUILayout.Label("Display:", GUILayout.MaxWidth(80));
										GUILayout.BeginHorizontal();
											GUILayout.Label(fadeInLabel, GUILayout.MaxWidth(20));
											layer.display = EditorGUILayout.EnumPopup("", layer.display, GUILayout.MaxWidth(58));
										GUILayout.EndHorizontal();
									
									}
									
								// End of column 1	
								GUILayout.EndVertical();
								GUILayout.EndHorizontal();
								
								// increment the ActionCount
								actionCount++;
							}
							
							// Indent Space
							//GUILayout.FlexibleSpace();
							//GUILayout.Label("", GUILayout.MaxWidth(5));
					
							// Add space indent
							//GUILayout.Label("", GUILayout.MaxWidth(5));
					
						GUILayout.EndHorizontal();
						
						// Show help text if the user is setting a layer
						if(setLayerFound){
						
							// Indent Space
							EditorGUILayout.Space();
							
							// Foot note
							GUILayout.BeginHorizontal();
							//	GUILayout.Label("", GUILayout.MaxWidth(5)); // indent
								GUILayout.Label("NOTE: Layer 1 is furthest behind and Layer 10 is nearest to the front.");
							//	GUILayout.Label("", GUILayout.MaxWidth(5)); // indent
							GUILayout.EndHorizontal();
						
						}
						
						// Indent Space
						EditorGUILayout.Space();
						
					GUILayout.EndVertical();
				}
				
				
			
			// theObject.screen.portrait = EditorGUILayout.ObjectField(theObject.screen.portrait, Texture2D, false, GUILayout.MinWidth(100), GUILayout.MinHeight(100) , GUILayout.MaxWidth(100), GUILayout.MaxHeight(100));
		}
		
	}
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	DO SCENE ACTORS TAB
	//	Renders the Actors Actions tab
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function DoSceneActorsTab( theObject : DialogScreen ){
	
		// Make sure theObject (Dialog Screen is valid)
		if( theObject != null){
			
			// Make sure we have 5 background layers!
			if( theObject.actions.actorLayers.length != 10){
				
				// Backup the old layers
				var oldLayers : DialogUIActorLayers[] = theObject.actions.actorLayers;
				
				// Create a new list
				theObject.actions.actorLayers = new DialogUIActorLayers[10];
				
				// Populate the array with the new layers
				var fixCounter : int = 0;
				for( var newSceneActor : DialogUIActorLayers in theObject.actions.actorLayers){
					
					// If we can copy from the old array, do that ..
					if( fixCounter < oldLayers.length && oldLayers[fixCounter]!=null){
						newSceneActor = oldLayers[fixCounter];
					
					// Otherwise, create a new blank layer
					} else {
						newSceneActor = new DialogUIActorLayers();
					}
					
					// Increment counter
					fixCounter++;
				}
			}
		
				// FADE OUT ALL ACTORS
				//EditorGUILayout.Space();
				GUILayout.Label("Remove Actors", "BoldLabel");
				GUILayout.Label("Use this to quickly change scenes. All Actor Layers will be completed faded out.");
				EditorGUILayout.Space();
				
				GUILayout.BeginHorizontal("Box");
					GUILayout.BeginVertical();

						// Space
						EditorGUILayout.Space();
	
						// Fade Out all scene layers
						GUILayout.BeginHorizontal();
							GUILayout.Label("", GUILayout.MaxWidth(5)); // indent
							GUILayout.Label(actorLabel, GUILayout.MaxWidth(20));
							theObject.actions.fadeAllActorLayers = EditorGUILayout.Toggle("Fade Out All Actor Layers", theObject.actions.fadeAllActorLayers);
							GUILayout.Label("", GUILayout.MaxWidth(5)); // indent
						GUILayout.EndHorizontal();
				
						// Space
						EditorGUILayout.Space();

						GUILayout.EndVertical();
					GUILayout.EndHorizontal();
				EditorGUILayout.Space();
				
				// ACTOR LAYERS
				if(!theObject.actions.fadeAllActorLayers){
					
					EditorGUILayout.Space();
					GUILayout.Label("Actor Layers", "BoldLabel");
					GUILayout.Label("Modify 'Actor Layers' to introduce various actors or objects in the foreground of the scene.");
					GUILayout.Label("Changes are global and continue across different dialog screens! If you don't change");
					GUILayout.Label("a layer, it will just carry on using whatever settings you had setup before.");
					EditorGUILayout.Space();
					
					GUILayout.BeginVertical();
						GUILayout.BeginHorizontal();
						
							// Add space indent
							//GUILayout.Label("", GUILayout.MaxWidth(5));
							
							// Loop through the background layers
							var actionCount : int = 0;
							var setLayerFound : boolean = false;	// See if we are setting any layers in this dialog!
							for( var layer : DialogUIActorLayers in theObject.actions.actorLayers ){
						
								// Add a new row on every 5 columns
								if( actionCount % 5 == 0){
										GUILayout.EndHorizontal();
									GUILayout.EndVertical();
									
									EditorGUILayout.Space();
									
									GUILayout.BeginVertical();
										GUILayout.BeginHorizontal();
								}
						
								// Indent Space
								if( actionCount != 0 && actionCount % 5 != 0 ){
									GUILayout.FlexibleSpace();
								}
								
								// Columns
								GUILayout.BeginHorizontal("Box");
								GUILayout.BeginVertical( GUILayout.MinWidth(90), GUILayout.MaxWidth(90));
									
									// Label
								//	GUILayout.Label("Layer "+(actionCount+1).ToString(), "BoldLabel", GUILayout.MaxWidth(80));
									
									// SET LAYER
									GUILayout.BeginHorizontal();
										GUILayout.Label(layersLabel, GUILayout.MaxWidth(20));
										//GUILayout.Label("Lyr "+(actionCount+1).ToString(), "BoldLabel", GUILayout.MaxWidth(40));
										if(actionCount+1 != 10){
											GUILayout.Label("Lyr "+(actionCount+1).ToString(), "BoldLabel", GUILayout.MaxWidth(40));
										} else {
											GUILayout.Label("Lyr"+(actionCount+1).ToString(), "BoldLabel", GUILayout.MaxWidth(40));
										}
										layer.setLayer = EditorGUILayout.Toggle("", layer.setLayer, GUILayout.MaxWidth(20));
									GUILayout.EndHorizontal();
									
									// Indent Space
									EditorGUILayout.Space();
									
									// If we are setting up this layer, show the settings
									if(layer.setLayer){
									
										// Set flag to true
										setLayerFound = true;
										
										// Draw Animated Texture Box
										if( layer.animationID != Vector2(-1,-1) ){
											GUILayout.Label("Animated:", GUILayout.MaxWidth(80));
											
											GUILayout.BeginHorizontal();
												// Add some space
												GUILayout.Label("", GUILayout.MaxWidth(0) );
												
												// Setup a new GUI Style to show a fully stretched GUIBox
												var newStyle : GUIStyle = new GUIStyle();
												
												// Animate the layer
												if( layer.anim != null){
													newStyle.normal.background = DoDialogCastAnimation(layer.anim, layer.tex);
												} else {
													newStyle.normal.background = layer.tex; 
												}
												
												GUILayout.Box("", newStyle , GUILayout.Width(74), GUILayout.Height(80) );
											GUILayout.EndHorizontal();
										
										// Draw Standard Texture Box	
										} else {
											
											GUILayout.Label("Image:", GUILayout.MaxWidth(80));
											layer.tex = EditorGUILayout.ObjectField(layer.tex, Texture2D, false, GUILayout.MinWidth(64), GUILayout.MinHeight(80) , GUILayout.MaxWidth(80), GUILayout.MaxHeight(80) );
										}
									
										// Browse Actors Button
										if( DCs && DCs.length>0 ){ // If the Dialog Cast is available, show the View Cast button
											GUILayout.BeginHorizontal();
												GUILayout.Label(cameraLabel, GUILayout.MaxWidth(20));
												if( GUILayout.Button("Cast", GUILayout.MaxWidth(56)) ){
													
													// Set the correct Destination
													if( actionCount == 0 ){
														browseOutput = BrowseOutput.Actor1;
													} else if( actionCount == 1 ){
														browseOutput = BrowseOutput.Actor2;
													} else if( actionCount == 2 ){
														browseOutput = BrowseOutput.Actor3;
													} else if( actionCount == 3 ){
														browseOutput = BrowseOutput.Actor4;
													} else if( actionCount == 4 ){
														browseOutput = BrowseOutput.Actor5;
													} else if( actionCount == 5 ){
														browseOutput = BrowseOutput.Actor6;
													} else if( actionCount == 6 ){
														browseOutput = BrowseOutput.Actor7;
													} else if( actionCount == 7 ){
														browseOutput = BrowseOutput.Actor8;
													} else if( actionCount == 8 ){
														browseOutput = BrowseOutput.Actor9;
													} else if( actionCount == 9 ){
														browseOutput = BrowseOutput.Actor10;
													}
													
													// Turn on browse mode
													browseMode = true;
													
												}
											GUILayout.EndHorizontal();
											
											// Delete Animation Button
											if( layer.animationID != Vector2(-1,-1) ){
												GUILayout.BeginHorizontal();
													
													// Remove Animation
													GUILayout.Label(deleteLabel, GUILayout.MaxWidth(20));
													if( GUILayout.Button("No Anim", GUILayout.MaxWidth(56)) ){
														layer.animationID = Vector2(-1,-1);
													}
												
												GUILayout.EndHorizontal();
											}
											
											
											// Indent Space
											EditorGUILayout.Space();
										}
									
										// Scale Mode
										// For Actors, they're always being stretched to fill anyway, so might as well hide this control
									//	layer.scale = EditorGUILayout.EnumPopup("", layer.scale, GUILayout.MaxWidth(80));
										layer.scale = ScaleMode.StretchToFill;
										
										
										// Indent Space
										EditorGUILayout.Space();
										
										// Display Mode
										GUILayout.Label("Display:", GUILayout.MaxWidth(80));
										GUILayout.BeginHorizontal();
											GUILayout.Label(fadeInLabel, GUILayout.MaxWidth(20));
											layer.display = EditorGUILayout.EnumPopup("", layer.display, GUILayout.MaxWidth(58));
										GUILayout.EndHorizontal();
										
										// If we're not hiding the layer, then show the extra options
										if( layer.display != DUI_LAYER_STATUS.Hide ){
										
											// Size
											GUILayout.Label("Size In %:", GUILayout.MaxWidth(80));
											GUILayout.BeginHorizontal();
												GUILayout.Label(resizeLabel, GUILayout.MaxWidth(20));
												layer.size = EditorGUILayout.FloatField("", layer.size, GUILayout.MaxWidth(58) );
												layer.size = Mathf.Clamp(layer.size, 1,1000);
											GUILayout.EndHorizontal();
											
											// Indent Space
											EditorGUILayout.Space();
											
											// Position
											GUILayout.Label("Position:", GUILayout.MaxWidth(80));
											GUILayout.BeginHorizontal();
												GUILayout.Label(positionLabel, GUILayout.MaxWidth(20));
												layer.allignment = EditorGUILayout.EnumPopup("", layer.allignment, GUILayout.MaxWidth(58));
												layer.size = Mathf.Clamp(layer.size, 1,1000);
											GUILayout.EndHorizontal();
											
											// Indent Space
											EditorGUILayout.Space();
											
											// Offset
											GUILayout.Label("Offset:", GUILayout.MaxWidth(80));
											GUILayout.BeginHorizontal();
												GUILayout.Label(xLabel, GUILayout.MaxWidth(20));
												layer.offset.x = EditorGUILayout.FloatField("", layer.offset.x, GUILayout.MaxWidth(58));
											GUILayout.EndHorizontal();
											GUILayout.BeginHorizontal();
												GUILayout.Label(yLabel, GUILayout.MaxWidth(20));
												layer.offset.y = EditorGUILayout.FloatField("", layer.offset.y, GUILayout.MaxWidth(58));
											GUILayout.EndHorizontal();
											
											// Indent Space
											EditorGUILayout.Space();
											
											// Indent Space
											//EditorGUILayout.Space();
											
											// Show Transition / Tweening if we are not using an instant "Show" transition
											if( layer.display != DUI_LAYER_STATUS.Show ){
											
												// Use Transitions
												GUILayout.Label("Motion From:", GUILayout.MaxWidth(80));
												GUILayout.BeginHorizontal();
													GUILayout.Label(nextLabel, GUILayout.MaxWidth(20));
													layer.motion = EditorGUILayout.EnumPopup("", layer.motion, GUILayout.MaxWidth(58));
												GUILayout.EndHorizontal();
											
											// Set motion to static automatically if we are using an instant transition
											} else {
												layer.motion = DUI_ACTOR_MOTION.Static;
											}
										
										// Set motion to static automatically if we are using Hide
										} else {
											layer.motion = DUI_ACTOR_MOTION.Static;
										}
									
									}
									
								// End of column 1	
								GUILayout.EndVertical();
								GUILayout.EndHorizontal();
								
								// increment the ActionCount
								actionCount++;
							}
							
							// Indent Space
							//GUILayout.FlexibleSpace();
							//GUILayout.Label("", GUILayout.MaxWidth(5));
					
							// Add space indent
							//GUILayout.Label("", GUILayout.MaxWidth(5));
					
						GUILayout.EndHorizontal();
						
						// Show help text if the user is setting a layer
						if(setLayerFound){
						
							// Indent Space
							EditorGUILayout.Space();
							
							// Foot note
							GUILayout.BeginHorizontal();
							//	GUILayout.Label("", GUILayout.MaxWidth(5)); // indent
								GUILayout.Label("NOTE: Layer 1 is furthest behind and Layer 10 is nearest to the front.");
							//	GUILayout.Label("", GUILayout.MaxWidth(5)); // indent
							GUILayout.EndHorizontal();
						
						}
						
						// Indent Space
						EditorGUILayout.Space();
						
					GUILayout.EndVertical();
				}
		}
	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	DO SCENE AUDIO TAB
	//	Renders the Audio Actions tab
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function DoSceneAudioTab( theObject : DialogScreen ){
		
		// CACHE AUDIO SETUP CHANNEL
		// Cache the correct audio
		var channel : DSAudioSetup;
		
		// Music
		if( theObject.audioTab == 0 ){
			channel = theObject.actions.music;
			GUILayout.Label("Music Channel", "BoldLabel");
		}
		// SFX 1
		else if( theObject.audioTab == 1 ){
			channel = theObject.actions.sfx1;
			GUILayout.Label("Sound Effects Channel 1", "BoldLabel");
		}
		// SFX 2
		else if( theObject.audioTab == 2 ){
			channel = theObject.actions.sfx2;
			GUILayout.Label("Sound Effects Channel 2", "BoldLabel");
		}
		// SFX 3
		else if( theObject.audioTab == 3 ){
			channel = theObject.actions.sfx3;
			GUILayout.Label("Sound Effects Channel 3", "BoldLabel");
		}
		
		// Info text
		GUILayout.Label("Use these custom sound channels to play, stop or fade audio.");
		
		// Space
		EditorGUILayout.Space();
		
		// Audio Channel Selector
		GUILayout.BeginHorizontal();

			// Cache tab (we do this to fix the weird focus bug when switching between tabs)
			var oldAudioTab : int = theObject.audioTab;
			GUI.SetNextControlName ("LDC Audio Tabs");

			// Show the Tabs and update the value
			theObject.audioTab = GUILayout.SelectionGrid (theObject.audioTab, audioTabStrings, 4, GUILayout.MinHeight(20), GUILayout.MaxHeight(20), GUILayout.MinWidth(380));
		GUILayout.EndHorizontal();

			// See if the tabs have been changed, and then set focus to the tabs.
   			if(oldAudioTab != theObject.audioTab){
   				// Debug.Log("Audio Tabs Changed");
   				GUI.FocusControl ("LDC Audio Tabs");	
   			}
		
		
		// Main Layout
		GUILayout.BeginVertical();
		
			// Vertical Box
			GUILayout.BeginVertical("Box");
				/*
				// Indent Space
				EditorGUILayout.Space();
				
				// Title
				GUILayout.BeginHorizontal();
					GUILayout.Label("", GUILayout.MaxWidth(5)); // indent
					GUILayout.BeginVertical();
					GUILayout.Label("Audio Actions", "BoldLabel");
					GUILayout.Label("Modify 'Actor Layers' to introduce various actors or objects in the foreground of the scene.");
					GUILayout.Label("", GUILayout.MaxWidth(5)); // indent
					GUILayout.EndVertical();
				GUILayout.EndHorizontal();
				*/
				// Space
				EditorGUILayout.Space();
				
				
			
				// Indent Space
			//	EditorGUILayout.Space();
				
				// Content
				GUILayout.BeginHorizontal();
					GUILayout.Label("", GUILayout.MaxWidth(5)); // indent
					GUILayout.BeginVertical();
						
						// AUDIO ACTION		
						GUILayout.Label("Select An Action", "BoldLabel");
						GUILayout.BeginHorizontal();
							GUILayout.Label(gearLabel, GUILayout.MaxWidth(20));
							channel.action = EditorGUILayout.EnumPopup("", channel.action);
						GUILayout.EndHorizontal();
						
						// Space
						EditorGUILayout.Space();
						
						// Remove the audioclip if we're not using it!
						if( channel.action == DSAudioAction.Stop || channel.action == DSAudioAction.None || channel.action == DSAudioAction.FadeOut ){	
							channel.clip = null;
						}
						
						// Show extra options if we are playing audio			
						if( channel.action != DSAudioAction.None && channel.action != DSAudioAction.Stop ){			
							
							// Dont show the main Play Audio controls if we're fading the audio out
							if( channel.action != DSAudioAction.FadeOut ){
									
								// Launch audio from clip
								channel.useAudioPath = EditorGUILayout.Toggle("Load Audio from Filepath:", channel.useAudioPath);
								
								// If we're using an Audio filepath, show the text editor 
								if( channel.useAudioPath ){
									
									// Remove the AudioClip
									channel.clip = null;
									
									// Launch audio from clip
									GUILayout.BeginHorizontal();
										GUILayout.Label(fileLabel, GUILayout.MaxWidth(20));
										channel.playFromPath = EditorGUILayout.TextField("Filepath (Without Prefix):", channel.playFromPath);
									GUILayout.EndHorizontal();
								
								// Use AudioClip	
								} else {
									
									// Launch audio from clip
									GUILayout.BeginHorizontal();
										GUILayout.Label(fileLabel, GUILayout.MaxWidth(20)); // indent
											channel.clip = EditorGUILayout.ObjectField("Audio Clip:",channel.clip, AudioClip, false );
									GUILayout.EndHorizontal();
								}
								
								// Volume
								GUILayout.BeginHorizontal();
									GUILayout.Label(audioLabel, GUILayout.MaxWidth(20)); // indent
									channel.volume = EditorGUILayout.FloatField("Volume:", channel.volume);
									channel.volume = Mathf.Clamp(channel.volume, 0.01, 1);
								GUILayout.EndHorizontal();
								
								// Pitch
								GUILayout.BeginHorizontal();
									GUILayout.Label(pitchLabel, GUILayout.MaxWidth(20)); // indent
									channel.pitch = EditorGUILayout.FloatField("Pitch:", channel.pitch);
									channel.pitch = Mathf.Clamp(channel.pitch, -3, 3);
								GUILayout.EndHorizontal();
								
								// Loop
								GUILayout.BeginHorizontal();
									GUILayout.Label(loopLabel, GUILayout.MaxWidth(20)); // indent
									channel.loop = EditorGUILayout.Toggle("Loop:", channel.loop);
								GUILayout.EndHorizontal();
							}
							
							// If this is a fade action, show the fade commands
							if( channel.action == DSAudioAction.FadeOut || channel.action == DSAudioAction.FadeInAndPlay ){
								
								// Fade Duration
								GUILayout.BeginHorizontal();
									GUILayout.Label(fadeInLabel, GUILayout.MaxWidth(20)); // indent
									channel.fadeDuration = EditorGUILayout.FloatField("Fade Duration:", channel.fadeDuration);
									channel.fadeDuration = Mathf.Clamp(channel.fadeDuration, 0.1, 10);
								GUILayout.EndHorizontal();
								
							}
						}
						
						// Bottom space
						EditorGUILayout.Space();
						EditorGUILayout.Space();
						
					GUILayout.EndVertical();
					GUILayout.Label("", GUILayout.MaxWidth(5)); // indent
					
				// End of Content	
				GUILayout.EndHorizontal();
				
			
			GUILayout.EndVertical();
				
			
		// End Main Layout
		GUILayout.EndVertical();
		
		// Indent Space
		EditorGUILayout.Space();				
	}
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	DO TOKENS TAB
	//	Renders the Tokens Actions tab
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function DoTokensTab( theObject : DialogScreen ){
		
		// ===================================
		//	PLAYERPREFS ACTIONS
		// ===================================

		GUILayout.Label("Setup PlayerPrefs", "BoldLabel");
		GUILayout.Label("You can use these actions to create, delete, or edit keys in Unity's PlayerPrefs.");
		GUILayout.Label("Useful for things that happen behind the scenes such as options or tracking the player's progress.");
		GUILayout.Label("NOTE: If you have setup 'Save Prefixes' in DialogUI's File Management, they will be applied here.");

		EditorGUILayout.Space();

		// Make sure we have tokens to display
		if( theObject.actions.playerPrefs != null && theObject.actions.playerPrefs.length > 0 ){
			
			// Space
			EditorGUILayout.Space();
		
			// Loop through the Token actions
			for( var ppAction : DSPlayerPrefsActions in theObject.actions.playerPrefs ){

				// Fade Duration
				GUILayout.BeginVertical("Box", GUILayout.MaxHeight(32));
					
					// Space
					EditorGUILayout.Space();
			
					// ROW 1
					GUILayout.BeginHorizontal();
						
						// Space
						GUILayout.FlexibleSpace();
						
						// ====================
						// PLAYER PREFS ACTION
						// ====================

						// Index
						GUILayout.Label(gearLabel, GUILayout.MinHeight(24), GUILayout.MaxHeight(24), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
						GUILayout.Label("Action: ", GUILayout.MaxHeight(24), GUILayout.MinWidth(24), GUILayout.MaxWidth(44));
						ppAction.action = EditorGUILayout.EnumPopup(ppAction.action, GUILayout.MaxHeight(32), GUILayout.MinWidth(110), GUILayout.MaxWidth(110));
						
						// Space
						GUILayout.Label("", GUILayout.MaxHeight(32), GUILayout.MinWidth(10), GUILayout.MaxWidth(10));
						
						// ====================
						// PLAYER PREFS KEY
						// ====================

						// Name Of PlayerPrefs Key
						if( ppAction.action != DSPlayerPrefsActionType.DeleteAllKeys ){
							GUILayout.Label( keyLabel, GUILayout.MaxHeight(24), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
							GUILayout.Label("Key: ", GUILayout.MaxHeight(24), GUILayout.MinWidth(44), GUILayout.MaxWidth(44));
							ppAction.key = EditorGUILayout.TextField(ppAction.key, GUILayout.MinWidth(80), GUILayout.MaxWidth(80));
						
							// Space
							GUILayout.Label("", GUILayout.MaxHeight(24), GUILayout.MinWidth(10), GUILayout.MaxWidth(10));
						}

						// ====================
						// PLAYER PREFS ARGS
						// ====================

						// String
						if( ppAction.action == DSPlayerPrefsActionType.SetString ){
							GUILayout.Label( buttonLabel, GUILayout.MaxHeight(24), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
							GUILayout.Label("Value: ", GUILayout.MaxHeight(24), GUILayout.MinWidth(44), GUILayout.MaxWidth(44));
							ppAction.stringArg = EditorGUILayout.TextField(ppAction.stringArg, GUILayout.MinWidth(80), GUILayout.MaxWidth(80));
						}

						// Float
						else if( ppAction.action == DSPlayerPrefsActionType.SetFloat || 
							ppAction.action == DSPlayerPrefsActionType.AddToFloat || 
							ppAction.action == DSPlayerPrefsActionType.SubtractFromFloat  
						){
							GUILayout.Label( buttonLabel, GUILayout.MaxHeight(24), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
							GUILayout.Label("Value: ", GUILayout.MaxHeight(24), GUILayout.MinWidth(44), GUILayout.MaxWidth(44));
							ppAction.floatArg = EditorGUILayout.FloatField(ppAction.floatArg, GUILayout.MinWidth(80), GUILayout.MaxWidth(80));
						}

						// Int
						else if( ppAction.action == DSPlayerPrefsActionType.SetInt || 
							ppAction.action == DSPlayerPrefsActionType.AddToInt || 
							ppAction.action == DSPlayerPrefsActionType.SubtractFromInt  
						){
							GUILayout.Label( buttonLabel, GUILayout.MaxHeight(24), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
							GUILayout.Label("Value: ", GUILayout.MaxHeight(24), GUILayout.MinWidth(44), GUILayout.MaxWidth(44));
							ppAction.intArg = EditorGUILayout.IntField(ppAction.intArg, GUILayout.MinWidth(80), GUILayout.MaxWidth(80));
						}

						// Extra Spacing
						if( ppAction.action == DSPlayerPrefsActionType.DeleteAllKeys ){
							GUILayout.Label("", GUILayout.MaxHeight(24), GUILayout.MinWidth(322), GUILayout.MaxWidth(322));	
						} else if ( ppAction.action == DSPlayerPrefsActionType.DeleteKey ){
							GUILayout.Label("", GUILayout.MaxHeight(24), GUILayout.MinWidth(152), GUILayout.MaxWidth(152));	
						}

						// End Flexible Space
						GUILayout.FlexibleSpace();

					GUILayout.EndHorizontal();
					
				// End of Content	
				GUILayout.EndVertical();
			
			}	
			
		}
		
		// Space
		EditorGUILayout.Space();


		// Button Row
		if(!Application.isPlaying){
			GUILayout.BeginHorizontal();
						
				// Space
				GUILayout.FlexibleSpace();							
				
				// Remove Token Button
				if(theObject.actions.playerPrefs.length > 0){
					if(GUILayout.Button(removeButton, GUILayout.MaxWidth(32))){
						theObject.actions.playerPrefs = RemovePlayerPrefsAction(theObject.actions.playerPrefs);	
					}
				}
				
				// Add Token Button
				if( GUILayout.Button(addButton, GUILayout.MaxWidth(32)) ){
					theObject.actions.playerPrefs = AddPlayerPrefsAction(theObject.actions.playerPrefs);
				}
				
			GUILayout.EndHorizontal();
		}

		// Seperator Line
		EditorGUILayout.Space();
		SepLine();
		EditorGUILayout.Space();


		// ===================================
		//	TOKEN ACTIONS
		// ===================================

		// Make sure we can find the DialogUI so we can access the components 
		//var theDUIs : Component[] = FindObjectsOfType (DialogUI);
		var theDUIs : Component[] = EditorTime.DUIs;
		if(theDUIs.length > 0){
		
			// Show the UI if we have some tokens
			var tokenArray : String[] = theDUIs[0].GetTokenStringArray();
			if( tokenArray != null && tokenArray.length > 0 ){
			
				// Header
				GUILayout.Label("Setup Tokens", "BoldLabel");
				GUILayout.Label("Tokens can be used to create dynamic variables such as player names, age, currency, etc.");
				GUILayout.Label("They are initially created in the DialogUI. They support localizations and can be easily used");
				GUILayout.Label("in dialog text and titles by typing '$NameOfToken'.");
				EditorGUILayout.Space();
			
				// Make sure we have tokens to display
				if(theObject.actions.tokens.length > 0){
					
					// Space
					EditorGUILayout.Space();
				
					// Loop through the Token actions
					for( var token : DSTokenActions in theObject.actions.tokens ){
				
						// Fade Duration
						GUILayout.BeginVertical("Box", GUILayout.MaxHeight(32));
							
							// Space
							EditorGUILayout.Space();
					
							// ROW 1
							GUILayout.BeginHorizontal();
								
								// Space
								GUILayout.FlexibleSpace();
												
								// Index
								GUILayout.Label(keyLabel, GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
								GUILayout.Label("Token: ", GUILayout.MaxHeight(32), GUILayout.MinWidth(40), GUILayout.MaxWidth(40));
								token.index = EditorGUILayout.Popup(token.index, tokenArray, GUILayout.MaxHeight(32), GUILayout.MinWidth(80), GUILayout.MaxWidth(80));
								
								// Space
								GUILayout.Label("", GUILayout.MaxHeight(32), GUILayout.MinWidth(10), GUILayout.MaxWidth(10));
								
								// Action
								GUILayout.Label(gearLabel, GUILayout.MaxHeight(32),GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
								//GUILayout.Label("Action: ", GUILayout.MinWidth(50), GUILayout.MaxWidth(50));
								token.action = EditorGUILayout.EnumPopup(token.action, GUILayout.MaxHeight(32), GUILayout.MinWidth(60), GUILayout.MaxWidth(60));
								
								// Space
								GUILayout.Label("", GUILayout.MaxHeight(32), GUILayout.MinWidth(10), GUILayout.MaxWidth(10));
								
								// Argument
								GUILayout.Label( buttonLabel, GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
								GUILayout.Label("Value: ", GUILayout.MaxHeight(32), GUILayout.MinWidth(40), GUILayout.MaxWidth(40));
								token.argument = EditorGUILayout.TextField(token.argument, GUILayout.MinWidth(80), GUILayout.MaxWidth(80));
								
								// Space
								GUILayout.Label("", GUILayout.MaxHeight(32), GUILayout.MinWidth(10), GUILayout.MaxWidth(10));
								
								// Localize
								GUILayout.Label( selectLocalization, GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
								//GUILayout.Label("Localize: ", GUILayout.MinWidth(50), GUILayout.MaxWidth(50));
								token.localize = EditorGUILayout.Toggle(token.localize, GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
							
								GUILayout.FlexibleSpace();
								
							GUILayout.EndHorizontal();
							
							// ROW 2
							if(token.localize){
								
								// Header
								GUILayout.BeginHorizontal();
									GUILayout.FlexibleSpace();
									GUILayout.Label( "Localized Values", "BoldLabel");
									GUILayout.FlexibleSpace();
								GUILayout.EndHorizontal();
								
								// SubHeader
								GUILayout.BeginHorizontal();
									GUILayout.FlexibleSpace();
									GUILayout.Label( "You can also access these entries from the 'Localize' tab!");
									GUILayout.FlexibleSpace();
								GUILayout.EndHorizontal();
								
								
								// Space
								EditorGUILayout.Space();
								EditorGUILayout.Space();
								
								// Localizations - Row 1
								GUILayout.BeginHorizontal();
								
									// Flexible Space
									GUILayout.FlexibleSpace();
									
									// CHINESE
									GUILayout.Label( chinaFlag, GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
									GUILayout.Label("Chinese: ", GUILayout.MaxHeight(32), GUILayout.MinWidth(70), GUILayout.MaxWidth(70));
									token.localizedArgument.chinese = EditorGUILayout.TextField(token.localizedArgument.chinese, GUILayout.MinWidth(80), GUILayout.MaxWidth(80));
									
									// Flexible Space
									GUILayout.FlexibleSpace();
								
									// KOREAN
									GUILayout.Label( koreaFlag, GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
									GUILayout.Label("Korean: ", GUILayout.MaxHeight(32), GUILayout.MinWidth(70), GUILayout.MaxWidth(70));
									token.localizedArgument.korean = EditorGUILayout.TextField(token.localizedArgument.korean, GUILayout.MinWidth(80), GUILayout.MaxWidth(80));

									// Flexible Space
									GUILayout.FlexibleSpace();
								
								// End Row
								GUILayout.EndHorizontal();
								
								// Localizations - Row 2
								GUILayout.BeginHorizontal();
								
									// Flexible Space
									GUILayout.FlexibleSpace();
									
									// JAPANESE
									GUILayout.Label( japanFlag, GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
									GUILayout.Label("Japanese: ", GUILayout.MaxHeight(32), GUILayout.MinWidth(70), GUILayout.MaxWidth(70));
									token.localizedArgument.japanese = EditorGUILayout.TextField(token.localizedArgument.japanese, GUILayout.MinWidth(80), GUILayout.MaxWidth(80));
									
									// Flexible Space
									GUILayout.FlexibleSpace();
								
									// GERMAN
									GUILayout.Label( germanyFlag, GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
									GUILayout.Label("German: ", GUILayout.MaxHeight(32), GUILayout.MinWidth(70), GUILayout.MaxWidth(70));
									token.localizedArgument.german = EditorGUILayout.TextField(token.localizedArgument.german, GUILayout.MinWidth(80), GUILayout.MaxWidth(80));

									// Flexible Space
									GUILayout.FlexibleSpace();
								
								// End Row
								GUILayout.EndHorizontal();
								
								// Localizations - Row 3
								GUILayout.BeginHorizontal();
								
									// Flexible Space
									GUILayout.FlexibleSpace();
									
									// FRENCH
									GUILayout.Label( franceFlag, GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
									GUILayout.Label("French: ", GUILayout.MaxHeight(32), GUILayout.MinWidth(70), GUILayout.MaxWidth(70));
									token.localizedArgument.french = EditorGUILayout.TextField(token.localizedArgument.french, GUILayout.MinWidth(80), GUILayout.MaxWidth(80));
									
									// Flexible Space
									GUILayout.FlexibleSpace();
								
									// SPANISH
									GUILayout.Label( spainFlag, GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
									GUILayout.Label("Spanish: ", GUILayout.MaxHeight(32), GUILayout.MinWidth(70), GUILayout.MaxWidth(70));
									token.localizedArgument.spanish = EditorGUILayout.TextField(token.localizedArgument.spanish, GUILayout.MinWidth(80), GUILayout.MaxWidth(80));

									// Flexible Space
									GUILayout.FlexibleSpace();
								
								// End Row
								GUILayout.EndHorizontal();
								
								// Localizations - Row 4
								GUILayout.BeginHorizontal();
								
									// Flexible Space
									GUILayout.FlexibleSpace();
									
									// ITALIAN
									GUILayout.Label( italyFlag, GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
									GUILayout.Label("Italian: ", GUILayout.MaxHeight(32), GUILayout.MinWidth(70), GUILayout.MaxWidth(70));
									token.localizedArgument.italian = EditorGUILayout.TextField(token.localizedArgument.italian, GUILayout.MinWidth(80), GUILayout.MaxWidth(80));
									
									// Flexible Space
									GUILayout.FlexibleSpace();
								
									// PORTUGUESE
									GUILayout.Label( portugalFlag, GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
									GUILayout.Label("Portuguese: ", GUILayout.MaxHeight(32), GUILayout.MinWidth(70), GUILayout.MaxWidth(70));
									token.localizedArgument.portuguese = EditorGUILayout.TextField(token.localizedArgument.portuguese, GUILayout.MinWidth(80), GUILayout.MaxWidth(80));

									// Flexible Space
									GUILayout.FlexibleSpace();
								
								// End Row
								GUILayout.EndHorizontal();
								
								// Localizations - Row 4
								GUILayout.BeginHorizontal();
								
									// Flexible Space
									GUILayout.FlexibleSpace();
									
									// RUSSIAN
									GUILayout.Label( russiaFlag, GUILayout.MaxHeight(32), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
									GUILayout.Label("Russian: ", GUILayout.MaxHeight(32), GUILayout.MinWidth(70), GUILayout.MaxWidth(70));
									token.localizedArgument.russian = EditorGUILayout.TextField(token.localizedArgument.russian, GUILayout.MinWidth(80), GUILayout.MaxWidth(80));

									// Flexible Space
									GUILayout.FlexibleSpace();
									
									// Empty Space
									GUILayout.Label( "", GUILayout.MaxHeight(32), GUILayout.MinWidth(178), GUILayout.MaxWidth(178));
									
									// Flexible Space
									GUILayout.FlexibleSpace();
								
								// End Row
								GUILayout.EndHorizontal();
								
								// Localizations - Row 4
								GUILayout.BeginHorizontal();
								// Empty Space
									GUILayout.Label( "", GUILayout.MaxHeight(32), GUILayout.MinWidth(178), GUILayout.MaxWidth(178));
								GUILayout.EndHorizontal();
							}
							
						// End of Content	
						GUILayout.EndVertical();
					
					}	
					
				}
				
				EditorGUILayout.Space();
				
				// Button Row
				if(!Application.isPlaying){
					GUILayout.BeginHorizontal();
								
						// Space
						GUILayout.FlexibleSpace();							
						
						// Remove Token Button
						if(theObject.actions.tokens.length > 0){
							if(GUILayout.Button(removeButton, GUILayout.MaxWidth(32))){
								theObject.actions.tokens = RemoveTokenAction(theObject.actions.tokens);	
							}
						}
						
						// Add Token Button
						if( GUILayout.Button(addButton, GUILayout.MaxWidth(32)) ){
							theObject.actions.tokens = AddTokenAction(theObject.actions.tokens);
						}
						
					GUILayout.EndHorizontal();
				}
				
				// Seperator Line			
				EditorGUILayout.Space();
				SepLine();
				EditorGUILayout.Space();		
				
				// ===================================
				//	TOKEN FILE MANAGEMENT
				// ===================================

				// Header
				GUILayout.Label("Token File Management", "BoldLabel");
				GUILayout.Label("Tokens can be saved to, loaded or deleted from PlayerPrefs.");
				EditorGUILayout.Space();
				
				// Token Playerprefs
				GUILayout.BeginVertical("Box", GUILayout.MaxHeight(32));
					EditorGUILayout.Space();
					
					// Save/Load Tokens Box
					GUILayout.BeginHorizontal();
						//GUILayout.FlexibleSpace();
						
						// Space
						GUILayout.Label("", GUILayout.MaxHeight(32), GUILayout.MinWidth(10), GUILayout.MaxWidth(10));
						
						// Action Label
						if( theObject.actions.tokenFileManagement == DSTokenFileManagementActions.None ){
							GUILayout.Label(gearLabel, GUILayout.MinHeight(20),GUILayout.MaxHeight(20),GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
						} else if( theObject.actions.tokenFileManagement == DSTokenFileManagementActions.SaveToPlayerPrefs ){
							GUILayout.Label(saveLabel, GUILayout.MinHeight(20),GUILayout.MaxHeight(20),GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
						} else if( theObject.actions.tokenFileManagement == DSTokenFileManagementActions.LoadFromPlayerPrefs ){
							GUILayout.Label(loadLabel, GUILayout.MinHeight(20),GUILayout.MaxHeight(20),GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
						} else if( theObject.actions.tokenFileManagement == DSTokenFileManagementActions.DeleteFromPlayerPrefs ){
							GUILayout.Label(deleteLabel, GUILayout.MinHeight(20),GUILayout.MaxHeight(20),GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
						}
								
						// File Management Enum
						theObject.actions.tokenFileManagement = EditorGUILayout.EnumPopup(theObject.actions.tokenFileManagement, GUILayout.MaxHeight(32)/*, GUILayout.MinWidth(150), GUILayout.MaxWidth(150)*/);
					
						// Space
						GUILayout.Label("", GUILayout.MaxHeight(32), GUILayout.MinWidth(10), GUILayout.MaxWidth(10));
						
						//GUILayout.FlexibleSpace();
					GUILayout.EndHorizontal();
					
					EditorGUILayout.Space();
				
				GUILayout.EndVertical();
			
				EditorGUILayout.Space();
				
				
			// If we have no Tokens setup in Dialog UI ..
			} else {
				
				GUILayout.Label("Setup Tokens", "BoldLabel");
				GUILayout.Label("You cannot use Token Actions because you haven't set up any tokens yet.");
				GUILayout.Label("You can create Tokens in the Dialog UI component.");
				
				EditorGUILayout.Space();
				
			}
		
		// Cant find Dialog UI
		} else {
		
			GUILayout.Label("Setup Tokens", "BoldLabel");
			GUILayout.Label("You must have a DialogUI component in the scene to use this tab!");
				
			EditorGUILayout.Space();
			
		}
		
	}
	
	// Remove the last token in an array
	function RemoveTokenAction( actions : DSTokenActions[] ){
		
		// If we have 0 items, create a new array
		if( actions != null || actions.length > 0){
			
			// backup the old Actions
			var oldActions : DSTokenActions[] = actions;
			
			// create the new actions list (but remove 1)
			actions = new DSTokenActions[(actions.length - 1)];
			for(var n : int = 0; n < actions.length; n++){
				actions[n] = oldActions[n];
			}
			
		}
		
		// return actions
		return actions;
	}
	
	// Add new token to an array
	function AddTokenAction( actions : DSTokenActions[] ){
		
		// If we have 0 items, create a new array
		if( actions == null || actions.length == 0){
		
			actions = new DSTokenActions[1];
			actions[0] = new DSTokenActions();
		
		// If we have more than 1 item already ..
		} else if( actions != null && actions.length > 0 ){
			
			// backup the old Actions
			var oldActions : DSTokenActions[] = actions;
			
			// Create a new list (+1)
			actions = new DSTokenActions[(actions.length + 1)];
			for(var n : int = 0; n < actions.length; n++){
				// Copy from the old Actions if we find an entry
				if( n < actions.length-1){
					actions[n] = oldActions[n];
				// If we don't find one (the last entry), create a new one!
				// NOTE: for some reason we need to setup the values too otherwise there are bugs in the editor)!	
				} else {
					actions[n] = new DSTokenActions();
					actions[n].index = 0;
					actions[n].action = DSTokenActionType.Set;
					actions[n].argument = "";
					actions[n].localize = false;
					actions[n].localizedArgument = new DS_LocalizedTokenArgument();
				}
			}
		}
		
		// return actions
		return actions;
	}

	// Remove the last action in an array
	function RemovePlayerPrefsAction( actions : DSPlayerPrefsActions[] ){
		
		// If we have 0 items, create a new array
		if( actions != null || actions.length > 0){
			
			// backup the old Actions
			var oldActions : DSPlayerPrefsActions[] = actions;
			
			// create the new actions list (but remove 1)
			actions = new DSPlayerPrefsActions[(actions.length - 1)];
			for(var n : int = 0; n < actions.length; n++){
				actions[n] = oldActions[n];
			}
			
		}
		
		// return actions
		return actions;
	}

	// Add new action to an array
	function AddPlayerPrefsAction( actions : DSPlayerPrefsActions[] ){
		
		// If we have 0 items, create a new array
		if( actions == null || actions.length == 0){
		
			actions = new DSPlayerPrefsActions[1];
			actions[0] = new DSPlayerPrefsActions();
		
		// If we have more than 1 item already ..
		} else if( actions != null && actions.length > 0 ){
			
			// backup the old Actions
			var oldActions : DSPlayerPrefsActions[] = actions;
			
			// Create a new list (+1)
			actions = new DSPlayerPrefsActions[(actions.length + 1)];
			for(var n : int = 0; n < actions.length; n++){
				// Copy from the old Actions if we find an entry
				if( n < actions.length-1){
					actions[n] = oldActions[n];
				// If we don't find one (the last entry), create a new one!
				// NOTE: for some reason we need to setup the values too otherwise there are bugs in the editor)!	
				} else {
					actions[n] = new DSPlayerPrefsActions();
				}
			}
		}
		
		// return actions
		return actions;
	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	DO UI / LOCALIZATION TAB
	//	Renders the Actors Actions tab
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	function DoLocalizationUITab( theObject : DialogScreen ){

		// FADE OUT ENTIRE SCENE
		//EditorGUILayout.Space();
		GUILayout.Label("Localization Actions", "BoldLabel");
		GUILayout.Label("Use this to change the localization and GUISkin of the UI at runtime.\n\nNote that if you select a language that is not in the 'Supported Languages' list ( located\nin the DialogLocalization component), English will be used as a fallback.");
		EditorGUILayout.Space();
		
		GUILayout.BeginHorizontal("Box");
			GUILayout.BeginVertical();

				// Space
				EditorGUILayout.Space();

				// Fade Out all scene layers
				GUILayout.BeginHorizontal();
					GUILayout.Label("", GUILayout.MaxWidth(5)); // indent
					GUILayout.Label(localizeLabel, GUILayout.MaxWidth(20), GUILayout.MaxHeight(20));
					theObject.actions.setNewLanguage = EditorGUILayout.EnumPopup("Set New Dialog Language: ", theObject.actions.setNewLanguage);
					GUILayout.Label("", GUILayout.MaxWidth(5)); // indent
				GUILayout.EndHorizontal();

				
				// SHow the next option only if we are going to change something
				if( theObject.actions.setNewLanguage != DS_SetNewLanguage.No ){
					GUI.enabled = true;
				} else {
					GUI.enabled = false;
				}

				// Fade Out all scene layers
				GUILayout.BeginHorizontal();
					GUILayout.Label("", GUILayout.MaxWidth(5)); // indent
					GUILayout.Label(resizeLabel, GUILayout.MaxWidth(20), GUILayout.MaxHeight(20));
					theObject.actions.updateGUISkins = EditorGUILayout.Toggle("Also Update The GUISkin: ", theObject.actions.updateGUISkins);
					GUILayout.Label("", GUILayout.MaxWidth(5)); // indent
				GUILayout.EndHorizontal();

				// Always make sure we re-enable the GUI after
				GUI.enabled = true;

				// Space
				EditorGUILayout.Space();
		
				GUILayout.EndVertical();
			GUILayout.EndHorizontal();
		EditorGUILayout.Space();

	}
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	DO GAMEOBJECT ACTIONS TAB
	//	Renders the Advanced Action Tab
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function DoGameObjectActionsTab( theObject : DialogScreen ){
	
		// TITLE
		GUILayout.Label("GameObject Actions", "BoldLabel");
		GUILayout.Label("Visually Sequence the creation, functions, destruction and activation of other GameObjects.");
		EditorGUILayout.Space();

		// Count up all the actions (to make the selection grid easier to write)
		var startActionCount : int = 
			theObject.actions.createObjectsAtStart.length +		
			theObject.actions.sendMessageAtStart.length +
			theObject.actions.activateTheseObjectsAtStart.length +
			theObject.actions.activateTheseObjectsAtStartDirectly.length +
			theObject.actions.deactivateTheseObjectsAtStart.length +
			theObject.actions.deactivateTheseObjectsAtStartDirectly.length +
			theObject.actions.destroyTheseObjectsAtStart.length +
			theObject.actions.findAndDestroyTheseObjectsAtStart.length;
		
		var endActionCount : int = 
			theObject.actions.createObjectsAtEnd.length +		
			theObject.actions.sendMessageAtEnd.length +
			theObject.actions.activateTheseObjectsAtEnd.length +
			theObject.actions.activateTheseObjectsAtEndByName.length +
			theObject.actions.deactivateTheseObjectsAtEnd.length +
			theObject.actions.deactivateTheseObjectsAtEndByName.length +
			theObject.actions.destroyTheseObjectsAtEnd.length + 
			theObject.actions.findAndDestroyTheseObjectsAtEnd.length;

		// Action Group Selector
		GUILayout.BeginHorizontal();

			// Cache tab (we do this to fix the weird focus bug when switching between tabs)
			var oldGameObjectActionsTab : int = gameObjectActionsTab;
			GUI.SetNextControlName ("LDC GameObject Action Tabs");

			// Show the Tabs and update the value
			gameObjectActionsTab = GUILayout.SelectionGrid (gameObjectActionsTab, ["Start Actions ("+startActionCount.ToString()+")", "End Actions ("+endActionCount.ToString()+")"], 2, GUILayout.MinHeight(20), GUILayout.MaxHeight(20), GUILayout.MinWidth(380));
		GUILayout.EndHorizontal();

			// See if the tabs have been changed, and then set focus to the tabs.
   			if(oldGameObjectActionsTab != gameObjectActionsTab){
   				// Debug.Log("GameObject Action Tabs Changed");
   				GUI.FocusControl ("LDC GameObject Action Tabs");	
   			}
		
		// Seperator
		EditorGUILayout.Space();
		SepLine();
		
		// ===========
		//	AT START
		// ===========
		
		if( gameObjectActionsTab == 0 ){
		
		// At Start
		GUILayout.Label("Run At Start", "BoldLabel");
		GUILayout.Label("NOTE: If You have saved this Dialog as a prefab, you should use the \"Find And ...\" actions to \navoid using direct references ( Unity can't save links to objects outside of the prefab itself ).");
		EditorGUILayout.Space();
		
		// ---------------------------------------------------------------------------------------------
			
		// CREATE OBJECTS AT START
		GUILayout.BeginVertical ("box");
		
		if ( theObject.actions.createObjectsAtStart != null ) {
			
			GUILayout.Label("", GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space
			GUILayout.BeginHorizontal();
					GUILayout.Label( cubeLabel, GUILayout.MinHeight(24), GUILayout.MaxHeight(24), GUILayout.MinWidth(24), GUILayout.MaxWidth(24));
					GUILayout.Label("", GUILayout.MinWidth(4), GUILayout.MaxWidth(4), GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space after icon
					
					GUILayout.BeginVertical();
						GUILayout.Label("", GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space
						openCreateObjectsAtStart = EditorGUILayout.Foldout(openCreateObjectsAtStart, "  Create GameObjects At Start ("+theObject.actions.createObjectsAtStart.length.ToString() +")");
					GUILayout.EndVertical();
				GUILayout.EndVertical();
			
			
		}
		
		// When we open this object
		if(openCreateObjectsAtStart) {
			
			// Show the editor for DS_ObjectCreation
			theObject.actions.createObjectsAtStart = PopulateDSOC(theObject.actions.createObjectsAtStart);
			
		}
		
		
		// End Box	
		GUILayout.EndVertical();	
		
		// Add Space
		EditorGUILayout.Space();
		
		// ---------------------------------------------------------------------------------------------	
			
		// ACTIVATE OBJECTS AT START (DIRECTLY)  ** NEW IN v2.9
		GUILayout.BeginVertical ("box");
		
			// Make sure we can see this ..
			if ( theObject.actions.activateTheseObjectsAtStartDirectly != null ) {
				
				GUILayout.Label("", GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space
				GUILayout.BeginHorizontal();
					GUILayout.Label( onLabel, GUILayout.MinHeight(24), GUILayout.MaxHeight(24), GUILayout.MinWidth(24), GUILayout.MaxWidth(24));
					GUILayout.Label("", GUILayout.MinWidth(4), GUILayout.MaxWidth(4), GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space after icon
					
					GUILayout.BeginVertical();
						GUILayout.Label("", GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space
						openActivateObjectsAtStart2 = EditorGUILayout.Foldout(openActivateObjectsAtStart2, "  Activate GameObjects At Start ("+theObject.actions.activateTheseObjectsAtStartDirectly.length.ToString() +")");
					GUILayout.EndVertical();
				GUILayout.EndVertical();

			}
		
			// When we open this object
			if(openActivateObjectsAtStart2) {
			
				// Show the editor for Strings
				theObject.actions.activateTheseObjectsAtStartDirectly = PopulateGameObjects(theObject.actions.activateTheseObjectsAtStartDirectly, " Activate These GameObjects", cubeLabel);
	
			}
		
		// End Box	
		GUILayout.EndVertical();		
								
		// Add Space
		EditorGUILayout.Space();
		
		// ---------------------------------------------------------------------------------------------
	
		// FIND AND ACTIVATE OBJECTS AT START
		GUILayout.BeginVertical ("box");
		
			// Make sure we can see this ..
			if ( theObject.actions.activateTheseObjectsAtStart != null ) {
				
				GUILayout.Label("", GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space
				GUILayout.BeginHorizontal();
					GUILayout.Label( onLabel, GUILayout.MinHeight(24), GUILayout.MaxHeight(24), GUILayout.MinWidth(24), GUILayout.MaxWidth(24));
					GUILayout.Label("", GUILayout.MinWidth(4), GUILayout.MaxWidth(4), GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space after icon
					
					GUILayout.BeginVertical();
						GUILayout.Label("", GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space
						openActivateObjectsAtStart = EditorGUILayout.Foldout(openActivateObjectsAtStart, "  Find And Activate GameObjects At Start ("+theObject.actions.activateTheseObjectsAtStart.length.ToString() +")");
					GUILayout.EndVertical();
				GUILayout.EndVertical();
		
			}
		
			// When we open this object
			if(openActivateObjectsAtStart) {
			
				// Show the editor for Strings
				theObject.actions.activateTheseObjectsAtStart = PopulateStrings(theObject.actions.activateTheseObjectsAtStart, " Find And Activate These GameObjects By Name", findLabel);
	
			}
			
		
		// End Box	
		GUILayout.EndVertical();		
								
		// Add Space
		EditorGUILayout.Space();
		
		
		// ---------------------------------------------------------------------------------------------	
			
		// DE-ACTIVATE OBJECTS AT START (DIRECTLY)  ** NEW IN v2.9
		GUILayout.BeginVertical ("box");
		
			// Make sure we can see this ..
			if ( theObject.actions.deactivateTheseObjectsAtStartDirectly != null ) {
				
				GUILayout.Label("", GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space
				GUILayout.BeginHorizontal();
					GUILayout.Label( offLabel, GUILayout.MinHeight(24), GUILayout.MaxHeight(24), GUILayout.MinWidth(24), GUILayout.MaxWidth(24));
					GUILayout.Label("", GUILayout.MinWidth(4), GUILayout.MaxWidth(4), GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space after icon
					
					GUILayout.BeginVertical();
						GUILayout.Label("", GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space
						openDeactivateObjectsAtStart2 = EditorGUILayout.Foldout(openDeactivateObjectsAtStart2, "  De-Activate GameObjects At Start ("+theObject.actions.deactivateTheseObjectsAtStartDirectly.length.ToString() +")");
					GUILayout.EndVertical();
				GUILayout.EndVertical();

			}
		
			// When we open this object
			if(openDeactivateObjectsAtStart2) {
			
				// Show the editor for Strings
				theObject.actions.deactivateTheseObjectsAtStartDirectly = PopulateGameObjects(theObject.actions.deactivateTheseObjectsAtStartDirectly, " De-Activate These GameObjects", cubeLabel);
	
			}
		
		// End Box	
		GUILayout.EndVertical();		
								
		// Add Space
		EditorGUILayout.Space();
		
		// ---------------------------------------------------------------------------------------------
	
		// FIND AND DE-ACTIVATE OBJECTS AT START  ** NEW IN v2.9
		GUILayout.BeginVertical ("box");
		
			// Make sure we can see this ..
			if ( theObject.actions.deactivateTheseObjectsAtStart != null ) {
				
				GUILayout.Label("", GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space
				GUILayout.BeginHorizontal();
					GUILayout.Label( offLabel, GUILayout.MinHeight(24), GUILayout.MaxHeight(24), GUILayout.MinWidth(24), GUILayout.MaxWidth(24));
					GUILayout.Label("", GUILayout.MinWidth(4), GUILayout.MaxWidth(4), GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space after icon
					
					GUILayout.BeginVertical();
						GUILayout.Label("", GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space
						openDeactivateObjectsAtStart = EditorGUILayout.Foldout(openDeactivateObjectsAtStart, "  Find And De-Activate GameObjects At Start ("+theObject.actions.deactivateTheseObjectsAtStart.length.ToString() +")");
					GUILayout.EndVertical();
				GUILayout.EndVertical();
		
			}
		
			// When we open this object
			if(openDeactivateObjectsAtStart) {
			
				// Show the editor for Strings
				theObject.actions.deactivateTheseObjectsAtStart = PopulateStrings(theObject.actions.deactivateTheseObjectsAtStart, " Find And De-Activate These GameObjects By Name", findLabel);
	
			}
			
		
		// End Box	
		GUILayout.EndVertical();		
								
		// Add Space
		EditorGUILayout.Space();
		
		// ---------------------------------------------------------------------------------------------
	
		// SEND MESSAGE AT START WITH BOX ** NEW IN v2.9
		GUILayout.BeginVertical ("box");
		
			// Make sure we can see this ..
			if ( theObject.actions.sendMessageAtStart != null ) {
				
				GUILayout.Label("", GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space
				GUILayout.BeginHorizontal();
					GUILayout.Label( nextLabel, GUILayout.MinHeight(24), GUILayout.MaxHeight(24), GUILayout.MinWidth(24), GUILayout.MaxWidth(24));
					GUILayout.Label("", GUILayout.MinWidth(4), GUILayout.MaxWidth(4), GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space after icon
					
					GUILayout.BeginVertical();
						GUILayout.Label("", GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space
						openSendMessageAtStart = EditorGUILayout.Foldout(openSendMessageAtStart, "  Send Message At Start ("+theObject.actions.sendMessageAtStart.length.ToString() +")");
					GUILayout.EndVertical();
				GUILayout.EndVertical();
			
			}
		
			// When we open this object
			if(openSendMessageAtStart) {
			
				// Show the editor for Strings
				theObject.actions.sendMessageAtStart = PopulateSendMessage( theObject.actions.sendMessageAtStart );
				
			}	
		
		// End Box	
		GUILayout.EndVertical();		
							
		// Add Space
		EditorGUILayout.Space();
		
		// ---------------------------------------------------------------------------------------------
	
		// Destroy GameObjects At Start With Box  ** NEW IN v2.9
		GUILayout.BeginVertical ("box");
		
			// Make sure we can see this ..
			if ( theObject.actions.destroyTheseObjectsAtStart != null ) {
				
				GUILayout.Label("", GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space
				GUILayout.BeginHorizontal();
					GUILayout.Label( deleteLabel, GUILayout.MinHeight(24), GUILayout.MaxHeight(24), GUILayout.MinWidth(24), GUILayout.MaxWidth(24));
					GUILayout.Label("", GUILayout.MinWidth(4), GUILayout.MaxWidth(4), GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space after icon
					
					GUILayout.BeginVertical();
						GUILayout.Label("", GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space
						openDestroyTheseObjectsAtStart = EditorGUILayout.Foldout(openDestroyTheseObjectsAtStart, "  Destroy GameObjects At Start ("+theObject.actions.destroyTheseObjectsAtStart.length.ToString() +")");
					GUILayout.EndVertical();
				GUILayout.EndVertical();
				
			}
		
			// When we open this object
			if(openDestroyTheseObjectsAtStart) {
			
				// Show the editor for Strings
				theObject.actions.destroyTheseObjectsAtStart = PopulateGameObjects(theObject.actions.destroyTheseObjectsAtStart, " Destroy These GameObjects", cubeLabel);
				
			}
		
		// End Box	
		GUILayout.EndVertical();		
								
		// Add Space
		EditorGUILayout.Space();
		
		// ---------------------------------------------------------------------------------------------
	
		// Find And Destroy GameObjects At Start With Box  ** NEW IN v2.9
		GUILayout.BeginVertical ("box");
		
			// Make sure we can see this ..
			if ( theObject.actions.findAndDestroyTheseObjectsAtStart != null ) {
				
				GUILayout.Label("", GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space
				GUILayout.BeginHorizontal();
					GUILayout.Label( deleteLabel, GUILayout.MinHeight(24), GUILayout.MaxHeight(24), GUILayout.MinWidth(24), GUILayout.MaxWidth(24));
					GUILayout.Label("", GUILayout.MinWidth(4), GUILayout.MaxWidth(4), GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space after icon
					
					GUILayout.BeginVertical();
						GUILayout.Label("", GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space
						openFindAndDestroyTheseObjectsAtStart = EditorGUILayout.Foldout(openFindAndDestroyTheseObjectsAtStart, "  Find And Destroy GameObjects At Start ("+theObject.actions.findAndDestroyTheseObjectsAtStart.length.ToString() +")");
					GUILayout.EndVertical();
				GUILayout.EndVertical();
				
			}
		
			// When we open this object
			if(openFindAndDestroyTheseObjectsAtStart) {
			
				// Show the editor for Strings
				theObject.actions.findAndDestroyTheseObjectsAtStart = PopulateStrings(theObject.actions.findAndDestroyTheseObjectsAtStart, " Find And Destroy These GameObjects By Name", findLabel);
				
			}
		
		// End Box	
		GUILayout.EndVertical();		
								
		// Add Space
		EditorGUILayout.Space();
		
		// ---------------------------------------------------------------------------------------------
		
		// ===========
		//	AT END
		// ===========
		
		} else if( gameObjectActionsTab == 1 ){
		
		GUILayout.Label("Run At End", "BoldLabel");
		GUILayout.Label("NOTE: If You have saved this Dialog as a prefab, you should use the \"Find And ...\" actions to \navoid using direct references ( Unity can't save links to objects outside of the prefab itself ).");
		EditorGUILayout.Space();
		
		// CREATE OBJECTS AT END
		GUILayout.BeginVertical ("box");
		
			// Make sure we can see this ..
			if ( theObject.actions.createObjectsAtEnd != null ) {
				
				GUILayout.Label("", GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space
				GUILayout.BeginHorizontal();
					GUILayout.Label( cubeLabel, GUILayout.MinHeight(24), GUILayout.MaxHeight(24), GUILayout.MinWidth(24), GUILayout.MaxWidth(24));
					GUILayout.Label("", GUILayout.MinWidth(4), GUILayout.MaxWidth(4), GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space after icon
					
					GUILayout.BeginVertical();
						GUILayout.Label("", GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space
						openCreateObjectsAtEnd = EditorGUILayout.Foldout(openCreateObjectsAtEnd, "  Create GameObjects At End ("+theObject.actions.createObjectsAtEnd.length.ToString() +")");
					GUILayout.EndVertical();
				GUILayout.EndVertical();
			
			}
			
			// When we open this object
			if(openCreateObjectsAtEnd) {
			
				// Show the editor for DS_ObjectCreation
				theObject.actions.createObjectsAtEnd = PopulateDSOC(theObject.actions.createObjectsAtEnd);
			
			}
		
		// End Box	
		GUILayout.EndVertical();		
								
		// Add Space
		EditorGUILayout.Space();
		

		
		// ---------------------------------------------------------------------------------------------
		
		// Activate GameObjects At End With Box
		GUILayout.BeginVertical ("box");
		
			// Make sure we can see this ..
			if ( theObject.actions.activateTheseObjectsAtEnd != null ) {
				
				GUILayout.Label("", GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space
				GUILayout.BeginHorizontal();
					GUILayout.Label( onLabel, GUILayout.MinHeight(24), GUILayout.MaxHeight(24), GUILayout.MinWidth(24), GUILayout.MaxWidth(24));
					GUILayout.Label("", GUILayout.MinWidth(4), GUILayout.MaxWidth(4), GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space after icon
					
					GUILayout.BeginVertical();
						GUILayout.Label("", GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space
						openActivateTheseObjectsAtEnd= EditorGUILayout.Foldout(openActivateTheseObjectsAtEnd, "  Activate GameObjects At End ("+theObject.actions.activateTheseObjectsAtEnd.length.ToString() +")");
					GUILayout.EndVertical();
				GUILayout.EndVertical();
				
			}
		
			// When we open this object
			if(openActivateTheseObjectsAtEnd) {
			
				// Show the editor for GameObjects
				theObject.actions.activateTheseObjectsAtEnd = PopulateGameObjects(theObject.actions.activateTheseObjectsAtEnd, " Activate These GameObjects Directly", cubeLabel);
			
			}
		
		
		// End Box	
		GUILayout.EndVertical();		
								
		// Add Space
		EditorGUILayout.Space();
	
		// ---------------------------------------------------------------------------------------------
		
		// Find And Activate GameObjects At End With Box  ** NEW IN v2.9
		GUILayout.BeginVertical ("box");
		
			// Make sure we can see this ..
			if ( theObject.actions.activateTheseObjectsAtEndByName != null ) {
				
				GUILayout.Label("", GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space
				GUILayout.BeginHorizontal();
					GUILayout.Label( onLabel, GUILayout.MinHeight(24), GUILayout.MaxHeight(24), GUILayout.MinWidth(24), GUILayout.MaxWidth(24));
					GUILayout.Label("", GUILayout.MinWidth(4), GUILayout.MaxWidth(4), GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space after icon
					
					GUILayout.BeginVertical();
						GUILayout.Label("", GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space
						openActivateTheseObjectsAtEnd2= EditorGUILayout.Foldout(openActivateTheseObjectsAtEnd2, "  Find And Activate GameObjects At End ("+theObject.actions.activateTheseObjectsAtEndByName.length.ToString() +")");
					GUILayout.EndVertical();
				GUILayout.EndVertical();
			
			}
		
			// When we open this object
			if(openActivateTheseObjectsAtEnd2) {
			
				// Show the editor for GameObjects
				theObject.actions.activateTheseObjectsAtEndByName = PopulateStrings(theObject.actions.activateTheseObjectsAtEndByName, " Find And Activate These GameObjects By Name", findLabel);
			
			}
		
		
		// End Box	
		GUILayout.EndVertical();		
								
		// Add Space
		EditorGUILayout.Space();
		
		// ---------------------------------------------------------------------------------------------
		
		// De-Activate GameObjects At End With Box ** NEW in v2.9
		GUILayout.BeginVertical ("box");
		
			// Make sure we can see this ..
			if ( theObject.actions.deactivateTheseObjectsAtEnd != null ) {
				
				GUILayout.Label("", GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space
				GUILayout.BeginHorizontal();
					GUILayout.Label( offLabel, GUILayout.MinHeight(24), GUILayout.MaxHeight(24), GUILayout.MinWidth(24), GUILayout.MaxWidth(24));
					GUILayout.Label("", GUILayout.MinWidth(4), GUILayout.MaxWidth(4), GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space after icon
					
					GUILayout.BeginVertical();
						GUILayout.Label("", GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space
						openDeactivateTheseObjectsAtEnd= EditorGUILayout.Foldout(openDeactivateTheseObjectsAtEnd, "  De-Activate GameObjects At End ("+theObject.actions.deactivateTheseObjectsAtEnd.length.ToString() +")");
					GUILayout.EndVertical();
				GUILayout.EndVertical();
				
			}
		
			// When we open this object
			if(openDeactivateTheseObjectsAtEnd) {
			
				// Show the editor for GameObjects
				theObject.actions.deactivateTheseObjectsAtEnd = PopulateGameObjects(theObject.actions.deactivateTheseObjectsAtEnd, " De-Activate These GameObjects Directly", cubeLabel);
			
			}
		
		
		// End Box	
		GUILayout.EndVertical();		
								
		// Add Space
		EditorGUILayout.Space();
		
		// ---------------------------------------------------------------------------------------------
		
		// Find And De-Activate GameObjects At End With Box  ** NEW IN v2.9
		GUILayout.BeginVertical ("box");
		
			// Make sure we can see this ..
			if ( theObject.actions.deactivateTheseObjectsAtEndByName != null ) {
				
				GUILayout.Label("", GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space
				GUILayout.BeginHorizontal();
					GUILayout.Label( offLabel, GUILayout.MinHeight(24), GUILayout.MaxHeight(24), GUILayout.MinWidth(24), GUILayout.MaxWidth(24));
					GUILayout.Label("", GUILayout.MinWidth(4), GUILayout.MaxWidth(4), GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space after icon
					
					GUILayout.BeginVertical();
						GUILayout.Label("", GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space
						openDeactivateTheseObjectsAtEnd2= EditorGUILayout.Foldout(openDeactivateTheseObjectsAtEnd2, "  Find And De-Activate GameObjects At End ("+theObject.actions.deactivateTheseObjectsAtEndByName.length.ToString() +")");
					GUILayout.EndVertical();
				GUILayout.EndVertical();
			
			}
		
			// When we open this object
			if(openDeactivateTheseObjectsAtEnd2) {
			
				// Show the editor for GameObjects
				theObject.actions.deactivateTheseObjectsAtEndByName = PopulateStrings(theObject.actions.deactivateTheseObjectsAtEndByName, " Find And De-Activate These GameObjects By Name", findLabel);
			
			}
		
		
		// End Box	
		GUILayout.EndVertical();		
								
		// Add Space
		EditorGUILayout.Space();
			
		// ---------------------------------------------------------------------------------------------	
	
		// Send Message Objects At End with Box  ** NEW IN v2.9
		GUILayout.BeginVertical ("box");
		
			// Make sure we can see this ..
			if ( theObject.actions.sendMessageAtStart != null ) {
				
				GUILayout.Label("", GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space
				GUILayout.BeginHorizontal();
					GUILayout.Label( nextLabel, GUILayout.MinHeight(24), GUILayout.MaxHeight(24), GUILayout.MinWidth(24), GUILayout.MaxWidth(24));
					GUILayout.Label("", GUILayout.MinWidth(4), GUILayout.MaxWidth(4), GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space after icon
					
					GUILayout.BeginVertical();
						GUILayout.Label("", GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space
						openSendMessageAtEnd = EditorGUILayout.Foldout(openSendMessageAtEnd, "  Send Message At End ("+theObject.actions.sendMessageAtEnd.length.ToString() +")");
					GUILayout.EndVertical();
				GUILayout.EndVertical();
			
			}
		
			// When we open this object
			if(openSendMessageAtEnd) {
			
				// Show the editor for Strings
				theObject.actions.sendMessageAtEnd = PopulateSendMessage( theObject.actions.sendMessageAtEnd );
				
			}	
		
		// End Box	
		GUILayout.EndVertical();		
							
		// Add Space
		EditorGUILayout.Space();
	
		// ---------------------------------------------------------------------------------------------
	
		// Destroy GameObjects At End With Box  ** NEW IN v2.9
		GUILayout.BeginVertical ("box");
		
			// Make sure we can see this ..
			if ( theObject.actions.destroyTheseObjectsAtEnd != null ) {
				
				GUILayout.Label("", GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space
				GUILayout.BeginHorizontal();
					GUILayout.Label( deleteLabel, GUILayout.MinHeight(24), GUILayout.MaxHeight(24), GUILayout.MinWidth(24), GUILayout.MaxWidth(24));
					GUILayout.Label("", GUILayout.MinWidth(4), GUILayout.MaxWidth(4), GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space after icon
					
					GUILayout.BeginVertical();
						GUILayout.Label("", GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space
						openDestroyTheseObjectsAtEnd = EditorGUILayout.Foldout(openDestroyTheseObjectsAtEnd, "  Destroy GameObjects At End ("+theObject.actions.destroyTheseObjectsAtEnd.length.ToString() +")");
					GUILayout.EndVertical();
				GUILayout.EndVertical();
				
			}
		
			// When we open this object
			if(openDestroyTheseObjectsAtEnd) {
			
				// Show the editor for Strings
				theObject.actions.destroyTheseObjectsAtEnd = PopulateGameObjects(theObject.actions.destroyTheseObjectsAtEnd, " Destroy These GameObjects", cubeLabel);
				
			}
		
		// End Box	
		GUILayout.EndVertical();		
								
		// Add Space
		EditorGUILayout.Space();
	
		// ---------------------------------------------------------------------------------------------
	
		// Find And Destroy GameObjets At End With Box
		GUILayout.BeginVertical ("box");
		
			// Make sure we can see this ..
			if ( theObject.actions.findAndDestroyTheseObjectsAtEnd != null ) {
				
				GUILayout.Label("", GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space
				GUILayout.BeginHorizontal();
					GUILayout.Label( deleteLabel, GUILayout.MinHeight(24), GUILayout.MaxHeight(24), GUILayout.MinWidth(24), GUILayout.MaxWidth(24));
					GUILayout.Label("", GUILayout.MinWidth(4), GUILayout.MaxWidth(4), GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space after icon
					
					GUILayout.BeginVertical();
						GUILayout.Label("", GUILayout.MinHeight(0), GUILayout.MaxHeight(0)); // Space
						openFindAndDestroyTheseObjectsAtEnd = EditorGUILayout.Foldout(openFindAndDestroyTheseObjectsAtEnd, "  Find And Destroy GameObjects At End ("+theObject.actions.findAndDestroyTheseObjectsAtEnd.length.ToString() +")");
					GUILayout.EndVertical();
				GUILayout.EndVertical();
			
			}
		
			// When we open this object
			if(openFindAndDestroyTheseObjectsAtEnd) {
			
				// Show the editor for Strings
				theObject.actions.findAndDestroyTheseObjectsAtEnd = PopulateStrings(theObject.actions.findAndDestroyTheseObjectsAtEnd, " Find And Destroy These GameObjects By Name", findLabel);
				
			}
		
		// End Box	
		GUILayout.EndVertical();		
								
		// Add Space
		EditorGUILayout.Space();
		
		// ---------------------------------------------------------------------------------------------
			
		} // End of Start / End Actions	
	}
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	DO uSEQUENCER TAB
	//	Third Party Tool Support For uSequencer
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function DoUSequencerTab( theObject : DialogScreen ){
		
		// Main Box
		EditorGUILayout.BeginVertical("Box");
			
			// Add Space
			EditorGUILayout.Space();
			
			// Add horizontal row
			EditorGUILayout.BeginHorizontal();
			
				// Icon
				GUILayout.Label("", GUILayout.MaxWidth(0));	// indent
				GUILayout.Label(uSequencerIcon, GUILayout.MinWidth(48), GUILayout.MaxWidth(48));	// uSequencer Icon
				
				// Title
				EditorGUILayout.BeginVertical( GUILayout.MaxWidth(0));
					GUILayout.Label("uSequencer Actions", "BoldLabel");
					GUILayout.Label("Setup a uSequence at the Start and/or End of this Dialog Screen.\nNOTE: Only use these actions if you have the uSequencer plugin.");
				EditorGUILayout.EndVertical();
				
			// End of row
			EditorGUILayout.EndHorizontal();
		
			
			// TITLE - WHICH SEQUENCE?
			EditorGUILayout.BeginHorizontal();
				GUILayout.Label("", GUILayout.MaxWidth(0));	// indent
				GUILayout.Label("Select uSequence", "BoldLabel");
				GUILayout.Label("", GUILayout.MaxWidth(0));	// indent
			EditorGUILayout.EndHorizontal();
			
			// Add Space
			EditorGUILayout.Space();
				
			// GameObject Reference
			EditorGUILayout.BeginHorizontal();
				GUILayout.Label("", GUILayout.MaxWidth(0));	// indent
				GUILayout.Label(uSequencerIcon, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
				theObject.actions.uSequencer.go = EditorGUILayout.ObjectField("uSequence GameObject: ", theObject.actions.uSequencer.go, GameObject, true); 
				GUILayout.Label("", GUILayout.MaxWidth(0));	// indent
			EditorGUILayout.EndHorizontal();	
				
			// Sequence Name
			EditorGUILayout.BeginHorizontal();
				GUILayout.Label("", GUILayout.MaxWidth(0));	// indent
				GUILayout.Label(findLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
				theObject.actions.uSequencer.findGo = EditorGUILayout.TextField("OR Find By Name: ", theObject.actions.uSequencer.findGo); 
				GUILayout.Label("", GUILayout.MaxWidth(0));	// indent
			EditorGUILayout.EndHorizontal();
			
			// Add Space
			EditorGUILayout.Space();
			
			// TITLE - Setup
			EditorGUILayout.BeginHorizontal();
				GUILayout.Label("", GUILayout.MaxWidth(0));	// indent
				GUILayout.Label("Setup", "BoldLabel");
				GUILayout.Label("", GUILayout.MaxWidth(0));	// indent
			EditorGUILayout.EndHorizontal();
			
			// Add Space
			EditorGUILayout.Space();
			
			// Playback Time
			EditorGUILayout.BeginHorizontal();
				GUILayout.Label("", GUILayout.MaxWidth(0));	// indent
				GUILayout.Label(uSequencerIcon, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
				theObject.actions.uSequencer.setup = EditorGUILayout.Toggle("Setup Sequence: ", theObject.actions.uSequencer.setup); 
				GUILayout.Label("", GUILayout.MaxWidth(0));	// indent
			EditorGUILayout.EndHorizontal();
			
			// If we're setting up this sequence, show the extra options
			if(theObject.actions.uSequencer.setup){
				
				// Playback Time
				EditorGUILayout.BeginHorizontal();
					GUILayout.Label("", GUILayout.MaxWidth(0));	// indent
					GUILayout.Label(timeLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
					theObject.actions.uSequencer.setPlaybackTime = EditorGUILayout.FloatField("Set Playback Time: ", theObject.actions.uSequencer.setPlaybackTime); 
					GUILayout.Label("", GUILayout.MaxWidth(0));	// indent
				EditorGUILayout.EndHorizontal();
				
				// Playback Time
				EditorGUILayout.BeginHorizontal();
					GUILayout.Label("", GUILayout.MaxWidth(0));	// indent
					GUILayout.Label(timeLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
					theObject.actions.uSequencer.setPlaybackRate = EditorGUILayout.FloatField("Set Playback Rate: ", theObject.actions.uSequencer.setPlaybackRate); 
					GUILayout.Label("", GUILayout.MaxWidth(0));	// indent
				EditorGUILayout.EndHorizontal();
			
			}
			
			// Add Space
			EditorGUILayout.Space();
			
			
			// TITLE - ACTIONS
			EditorGUILayout.BeginHorizontal();
				GUILayout.Label("", GUILayout.MaxWidth(0));	// indent
				GUILayout.Label("Actions", "BoldLabel");
				GUILayout.Label("", GUILayout.MaxWidth(0));	// indent
			EditorGUILayout.EndHorizontal();
		
			// Add Space
			EditorGUILayout.Space();
				
			// START ACTIONS
		
			// TITLE - Start Action
			EditorGUILayout.BeginHorizontal();
				GUILayout.Label("", GUILayout.MaxWidth(0));	// indent
				GUILayout.Label("Perform this action at the start of this Dialog Screen.");
				GUILayout.Label("", GUILayout.MaxWidth(0));	// indent
			EditorGUILayout.EndHorizontal();
			
			// Action Popup
			GUILayout.BeginHorizontal();
				GUILayout.Label("", GUILayout.MaxWidth(0));	// indent
				GUILayout.Label(gearLabel, GUILayout.MaxWidth(20));
				theObject.actions.uSequencer.startAction = EditorGUILayout.EnumPopup("", theObject.actions.uSequencer.startAction);
				GUILayout.Label("", GUILayout.MaxWidth(0));	// indent
			GUILayout.EndHorizontal();
			
			GUILayout.Label("", GUILayout.MaxWidth(0));	// indent
			
			
			// END ACTIONS
			
			// TITLE - End Action
			EditorGUILayout.BeginHorizontal();
				GUILayout.Label("", GUILayout.MaxWidth(0));	// indent
				GUILayout.Label("Perform this action at the end of this Dialog Screen.");
				GUILayout.Label("", GUILayout.MaxWidth(0));	// indent
			EditorGUILayout.EndHorizontal();
			
			// Action Popup
			GUILayout.BeginHorizontal();
				GUILayout.Label("", GUILayout.MaxWidth(0));	// indent
				GUILayout.Label(gearLabel, GUILayout.MaxWidth(20));
				theObject.actions.uSequencer.endAction = EditorGUILayout.EnumPopup("", theObject.actions.uSequencer.endAction);
				GUILayout.Label("", GUILayout.MaxWidth(0));	// indent
			GUILayout.EndHorizontal();
			
		
			// Add Space
			EditorGUILayout.Space();
		
		// End Main Box
		EditorGUILayout.EndVertical();
		
		// Add Space
		EditorGUILayout.Space();
	}
	

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	DO POST BRUTAL TAB
	//	Third Party Tool Support For Post Brutal
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function DoPBTab( theObject : DialogScreen ){
		#if UNITY_POSTBRUTAL
		// Main Box
		EditorGUILayout.BeginVertical("Box");
			
			// Add Space
			EditorGUILayout.Space();
			
			// ==============================
			//	TITLE
			// ==============================

			// Add horizontal row
			EditorGUILayout.BeginHorizontal();
			
				// Icon
				GUILayout.Label("", GUILayout.MaxWidth(0));	// indent
				GUILayout.Label(postBrutalIcon, GUILayout.MinWidth(48), GUILayout.MaxWidth(48));	// uSequencer Icon
				
				// Title
				EditorGUILayout.BeginVertical( GUILayout.MaxWidth(0));
					GUILayout.Label("Post Brutal Actions", "BoldLabel");
					GUILayout.Label("Setup Post Brutal Cutscenes and Actors.");
				EditorGUILayout.EndVertical();
				
			// End of row
			EditorGUILayout.EndHorizontal();

			// ==============================
			//	CUTSCENES
			// ==============================

			// Cutscene Options
			EditorGUILayout.BeginHorizontal();
				GUILayout.Label("", GUILayout.MaxWidth(0));	// indent
				GUILayout.Label("Cutscene Options", "BoldLabel");
			EditorGUILayout.EndHorizontal();

			EditorGUILayout.Space();
				
		//	cameraStyle
			
			// Camera Style
			EditorGUILayout.BeginHorizontal();
				GUILayout.Label("", GUILayout.MaxWidth(0));	// indent
				GUILayout.Label(cameraLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
				theObject.actions.postBrutal.cameraStyle = EditorGUILayout.EnumPopup("Camera Style:", theObject.actions.postBrutal.cameraStyle, GUILayout.MinWidth(300) );
			EditorGUILayout.EndHorizontal();
			
			// Camera Target
			EditorGUILayout.BeginHorizontal();
				GUILayout.Label("", GUILayout.MaxWidth(0));	// indent
				GUILayout.Label(nameLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
				theObject.actions.postBrutal.cameraStyleTarget = EditorGUILayout.ObjectField("Camera Target:", theObject.actions.postBrutal.cameraStyleTarget, Transform, true);
			EditorGUILayout.EndHorizontal();
			
			// Camera Find Target
			EditorGUILayout.BeginHorizontal();
				GUILayout.Label("", GUILayout.MaxWidth(0));	// indent
				GUILayout.Label(findLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
				if ( theObject.actions.postBrutal.cameraStyleFindTarget != null ){
				theObject.actions.postBrutal.cameraStyleFindTarget = EditorGUILayout.TextField("Camera Target (Find): ", theObject.actions.postBrutal.cameraStyleFindTarget ); 
				}
			EditorGUILayout.EndHorizontal();
			
			// Stop FMV At End
			EditorGUILayout.BeginHorizontal();
				GUILayout.Label("", GUILayout.MaxWidth(0));	// indent
				GUILayout.Label( stopLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
				theObject.actions.postBrutal.stopFmvCameraAtEnd = EditorGUILayout.Toggle("Stop Cutscenes At End: ", theObject.actions.postBrutal.stopFmvCameraAtEnd );
			EditorGUILayout.EndHorizontal();
			
										
			EditorGUILayout.Space();
				
			// ==============================
			//	ACTORS
			// ==============================

			// Actor Options
			EditorGUILayout.BeginHorizontal();
				GUILayout.Label("", GUILayout.MaxWidth(0));	// indent
				GUILayout.Label("Actor Options", "BoldLabel");
			EditorGUILayout.EndHorizontal();

			EditorGUILayout.Space();
			
			// Player Should Talk
			EditorGUILayout.BeginHorizontal();
				GUILayout.Label("", GUILayout.MaxWidth(0));	// indent
				GUILayout.Label(speechLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
				theObject.actions.postBrutal.playerShouldTalk = EditorGUILayout.Toggle("Player Should Talk: ", theObject.actions.postBrutal.playerShouldTalk );
			EditorGUILayout.EndHorizontal();
			
			// Find NPC To Talk
			EditorGUILayout.BeginHorizontal();
				GUILayout.Label("", GUILayout.MaxWidth(0));	// indent
				GUILayout.Label(findLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
				theObject.actions.postBrutal.findNPCToTalk = EditorGUILayout.TextField("Find NPC To Talk:", theObject.actions.postBrutal.findNPCToTalk);
			EditorGUILayout.EndHorizontal();

			// NPC Should Talk
			EditorGUILayout.BeginHorizontal();
				GUILayout.Label("", GUILayout.MaxWidth(0));	// indent
				GUILayout.Label(speechLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
				theObject.actions.postBrutal.npcShouldTalk = EditorGUILayout.ObjectField("NPC Should Talk:", theObject.actions.postBrutal.npcShouldTalk, NPC, true);
			EditorGUILayout.EndHorizontal();

			// Find AI To Talk
			EditorGUILayout.BeginHorizontal();
				GUILayout.Label("", GUILayout.MaxWidth(0));	// indent
				GUILayout.Label(findLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
				theObject.actions.postBrutal.findAIToTalk = EditorGUILayout.TextField("Find AI To Talk:", theObject.actions.postBrutal.findAIToTalk);
			EditorGUILayout.EndHorizontal();

			// AI Should Talk
			EditorGUILayout.BeginHorizontal();
				GUILayout.Label("", GUILayout.MaxWidth(0));	// indent
				GUILayout.Label(speechLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
				theObject.actions.postBrutal.aiShouldTalk = EditorGUILayout.ObjectField("AI Should Talk:", theObject.actions.postBrutal.aiShouldTalk, AI_ActorController, true);
			EditorGUILayout.EndHorizontal();

			EditorGUILayout.Space();

			// Actor Options
			EditorGUILayout.BeginHorizontal();
				GUILayout.Label("", GUILayout.MaxWidth(0));	// indent
				GUILayout.Label("Advanced Options", "BoldLabel");
			EditorGUILayout.EndHorizontal();

			EditorGUILayout.Space();

			// Find Talk LookAt
			EditorGUILayout.BeginHorizontal();
				GUILayout.Label("", GUILayout.MaxWidth(0));	// indent
				GUILayout.Label(findLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
				theObject.actions.postBrutal.findTalkLookAt = EditorGUILayout.TextField("Find Target To Look At:", theObject.actions.postBrutal.findTalkLookAt);
			EditorGUILayout.EndHorizontal();

			// Talk Look At
			EditorGUILayout.BeginHorizontal();
				GUILayout.Label("", GUILayout.MaxWidth(0));	// indent
				GUILayout.Label(speechLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
				theObject.actions.postBrutal.talkLookAt = EditorGUILayout.ObjectField("Transform To Look At:", theObject.actions.postBrutal.talkLookAt, Transform, true);
			EditorGUILayout.EndHorizontal();
			
			// Stop All Actor AI
			EditorGUILayout.BeginHorizontal();
				GUILayout.Label("", GUILayout.MaxWidth(0));	// indent
				GUILayout.Label(stopLabel, GUILayout.MaxWidth(20),GUILayout.MaxHeight(20));
				theObject.actions.postBrutal.stopAllMovementAI = EditorGUILayout.Toggle("Stop All Movement AI: ", theObject.actions.postBrutal.stopAllMovementAI);
			EditorGUILayout.EndHorizontal();
				
			
			// Add Space
			EditorGUILayout.Space();

		// End Main Box
		EditorGUILayout.EndVertical();
		#endif
	}

	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	POPULATE DSOC
	//	Dynamic GUI for the DSObjectCreation[] class
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function PopulateDSOC( mainDSOC : DSObjectCreation[] ) {
		
	// If we have objects setup, setup the loop.
		//theObject.actions.createObjectsAtStart								
		if ( mainDSOC.length > 0 ) {
										
			// Add Space
			EditorGUILayout.Space();
											
			// Setup Labels
			EditorGUILayout.BeginHorizontal();
												
				GUILayout.Label("", GUILayout.MaxWidth(5));
				GUILayout.Label("", GUILayout.MaxWidth(25));
				GUILayout.Label(cubeLabel, GUILayout.MinHeight(20), GUILayout.MaxHeight(20), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
				GUILayout.Label("Object To Create", "BoldLabel", GUILayout.MaxWidth(180), GUILayout.MinHeight(20) );
				GUILayout.Label(origin3dLabel, GUILayout.MinHeight(20), GUILayout.MaxHeight(20), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
				GUILayout.Label("At Position", "BoldLabel", GUILayout.MaxWidth(180));
				GUILayout.Label(findLabel, GUILayout.MinHeight(20), GUILayout.MaxHeight(20), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
				GUILayout.Label("(OR) Find Position", "BoldLabel", GUILayout.MaxWidth(180));
				GUILayout.Label("", GUILayout.MaxWidth(18));
				GUILayout.Label("", GUILayout.MaxWidth(5));
												
			EditorGUILayout.EndHorizontal();
										
			// Populate Each Entry
			var theCount : int = 0;
			for ( var theDSOC : DSObjectCreation in mainDSOC ) {
				theCount = theCount + 1;
	
				if ( theDSOC != null ) {
			
					EditorGUILayout.BeginHorizontal();
						GUILayout.Label("", GUILayout.MaxWidth(5));
						GUILayout.Label(theCount.ToString(), GUILayout.MaxWidth(25));
				
							theDSOC.createObject = EditorGUILayout.ObjectField(theDSOC.createObject, GameObject,  false, GUILayout.MaxWidth(200));
							
							if ( theDSOC.createObject == target.gameObject ){
								Debug.Log("Creating an identical Dialog Object is not allowed!");	
								theDSOC.createObject = null;
							}
							
							// Check to make sure this is a prefab!
							//Debug.Log( EditorUtility.IsPersistent(Selection.activeObject) );
							
							theDSOC.createLocation = EditorGUILayout.ObjectField(theDSOC.createLocation, Transform,  true, GUILayout.MaxWidth(200));
							theDSOC.findGameObjectLocation = EditorGUILayout.TextField(theDSOC.findGameObjectLocation, GUILayout.MaxWidth(200));
							
							// Origin shortcut button
							if( GUILayout.Button (originLabel, GUILayout.MaxWidth(18), GUILayout.MaxHeight(18)) ) {
								theDSOC.findGameObjectLocation = "Origin";
							}
					
						GUILayout.Label("", GUILayout.MaxWidth(5));
					EditorGUILayout.EndHorizontal();
				}
			}
											
			// Add Space
			EditorGUILayout.Space();
											
			// Add Space
			EditorGUILayout.Space();
			
			// Add Buttons
			EditorGUILayout.BeginHorizontal();
											
				GUILayout.FlexibleSpace();	// Space
												
				if( GUILayout.Button(removeButton, GUILayout.MaxWidth(32)) ) {		// Remove Button
					mainDSOC = ResizeArray( mainDSOC, false );
				}
												
				if(GUILayout.Button(addButton, GUILayout.MaxWidth(32))) {			// Add Button
					mainDSOC = ResizeArray( mainDSOC, true );
				}
												
				GUILayout.Label("", GUILayout.MaxWidth(5));	// Indent
										
			EditorGUILayout.EndHorizontal();EditorGUILayout.Space();EditorGUILayout.Space(); // End horizontal and space
			
			// Return the array
			return mainDSOC;
											
		} else {
			
			// Add Buttons
			EditorGUILayout.BeginHorizontal();
											
				GUILayout.FlexibleSpace();	// Space
												
				if( GUILayout.Button(removeButton, GUILayout.MaxWidth(32)) ) {		// Remove Button
					mainDSOC = ResizeArray( mainDSOC, false );
				}
												
				if(GUILayout.Button(addButton, GUILayout.MaxWidth(32))) {			// Add Button
					mainDSOC = ResizeArray( mainDSOC, true );
				}
												
				GUILayout.Label("", GUILayout.MaxWidth(5));	// Indent
										
			EditorGUILayout.EndHorizontal();EditorGUILayout.Space();EditorGUILayout.Space(); // End horizontal and space
			
			// Return the array
			return mainDSOC;
			
		}
		
	}
	
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	RESIZE ARRAY
	//	Resizes Arrays of different custom class types
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function ResizeArray( theDSOC : DSObjectCreation[], increase : boolean ) {		// Using DS_ObjectCreation argument
		
		// If our values are correct
		if ( theDSOC != null && increase != null ) {
	
			// Create a dynamic array to store the old static built-in one.
			var newarr = new Array (theDSOC);
			
			// Create a new DSOC to use as a new slot
			var pushBuiltIn = new DSObjectCreation();
			pushBuiltIn.createObject = null;
			pushBuiltIn.createLocation = null;
			pushBuiltIn.findGameObjectLocation = "";
			
			// Add a slot or delete one depending on increase argument ..
			if ( increase ) {
				newarr.Push(pushBuiltIn);
			} else if ( theDSOC.length > 0 ){
				newarr.Pop();
			}
			
			// Convert the array back to a built-in one..
			var newBuiltinArray : DSObjectCreation[] = newarr.ToBuiltin(DSObjectCreation);
			
			// Return it.
			return newBuiltinArray;
	
		}

		// Return the original object if something goes wrong
		return theDSOC;
	}
	
	function ResizeArray( theStrings : String[], increase : boolean ) {		// Using String Argument
		
		// If our values are correct
		if ( theStrings != null && increase != null ) {
													
			// Create a dynamic array to store the old static built-in one.
			var newarr = new Array (theStrings);
			
			// Add a slot or delete one depending on increase argument ..
			if ( increase ) {
				newarr.Push("");
			} else if ( theStrings.length > 0 ) {
				newarr.Pop();
			}
			
			// Convert the array back to a built-in one..
			var newBuiltinArray : String[] = newarr.ToBuiltin(String);
			
			// Return it.
			return newBuiltinArray;
		}

		// Return the original object if something goes wrong
		return theStrings;
	}
	
	function ResizeArray( theGameObjects : GameObject[], resize : int ) {		// Using GameObject Argument
		
		// If our values are correct
		if ( theGameObjects != null && resize != 0 ) {
													
			// backup variable
			var theGameObjects_Backup : GameObject[] = theGameObjects;
													
			// Recreate The List
			if ( theGameObjects.length > 0 || resize > 0 ) {
				theGameObjects = new GameObject[theGameObjects.length + resize];
			}
													
			// Loop the values back
			for( var i : int =0;i<theGameObjects_Backup.length;i++) {
														
				// Make sure we're still bounds
				if ( i <= theGameObjects.length -1 ) {
					theGameObjects[i] = theGameObjects_Backup[i];
				}
			}
			
			return theGameObjects;
		}

		// Return the original object if something goes wrong
		return theGameObjects;
	}
	
	function ResizeArray( theSM : DS_SendMessage[], increase : boolean ) {		// Using DS_SendMessage argument
		
		// If our values are correct
		if ( theSM != null && increase != null ) {
	
			// Create a dynamic array to store the old static built-in one.
			var newarr = new Array (theSM);
			
			// Create a new DSOC to use as a new slot
			var pushBuiltIn = new DS_SendMessage();
			pushBuiltIn.findDestination = "";
			pushBuiltIn.destination = null;
			pushBuiltIn.functionName = "";
			pushBuiltIn.argType = DS_SendMessageArg.None;
			pushBuiltIn.stringArg = "";
			pushBuiltIn.intArg = 0;
			pushBuiltIn.floatArg = 0;
			pushBuiltIn.goArg = null;
			pushBuiltIn.transformArg = null;
			
			// Add a slot or delete one depending on increase argument ..
			if ( increase ) {
				newarr.Push(pushBuiltIn);
			} else if ( theSM.length > 0 ){
				newarr.Pop();
			}
			
			// Convert the array back to a built-in one..
			var newBuiltinArray : DS_SendMessage[] = newarr.ToBuiltin(DS_SendMessage);
			
			// Return it.
			return newBuiltinArray;
	
		}

		// Return the original object if something goes wrong
		return theSM;
	}

	function ResizeLogicArray( theLogic : LogicStatements[], increase : boolean ) {		// Using DS_SendMessage argument
		
		// If our values are correct
		if ( theLogic != null && increase != null ) {
	
			// Create a dynamic array to store the old static built-in one.
			var newarr = new Array (theLogic);
			
			// Create a new DSOC to use as a new slot
			var pushBuiltIn = new LogicStatements();
			
			// Add a slot or delete one depending on increase argument ..
			if ( increase ) {
				newarr.Push(pushBuiltIn);
			} else if ( theLogic.length > 0 ){
				newarr.Pop();
			}
			
			// Convert the array back to a built-in one..
			var newBuiltinArray : LogicStatements[] = newarr.ToBuiltin(LogicStatements);
			
			// Return it.
			return newBuiltinArray;
	
		}

		// Return the original object if something goes wrong
		return theLogic;
	}

	function ResizeLogicArray( theLogic : LogicStatementsExtra[], increase : boolean ) {		// Using DS_SendMessage argument
		
		// If our values are correct
		if ( theLogic != null && increase != null ) {
	
			// Create a dynamic array to store the old static built-in one.
			var newarr = new Array (theLogic);
			
			// Create a new DSOC to use as a new slot
			var pushBuiltIn = new LogicStatementsExtra();
			
			// Add a slot or delete one depending on increase argument ..
			if ( increase ) {
				newarr.Push(pushBuiltIn);
			} else if ( theLogic.length > 0 ){
				newarr.Pop();
			}
			
			// Convert the array back to a built-in one..
			var newBuiltinArray : LogicStatementsExtra[] = newarr.ToBuiltin(LogicStatementsExtra);
			
			// Return it.
			return newBuiltinArray;
	
		}

		// Return the original object if something goes wrong
		return theLogic;
	}
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	POPULATE STRINGS
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function PopulateStrings( theTexts : String[], theLabel : String, theIcon : Texture2D ) {
		
		
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
	
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	POPULATE GAME OBJECTS
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function PopulateGameObjects( theGameObjects : GameObject[], theLabel : String, theIcon : Texture2D ) {
		
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
					theGameObject = EditorGUILayout.ObjectField(theGameObject, GameObject, true );
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
						theGameObjects = ResizeArray( theGameObjects, -1 );
					}
												
					if(GUILayout.Button(addButton, GUILayout.MaxWidth(32))) {			// Add Button
						theGameObjects = ResizeArray( theGameObjects, 1 );
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
						theGameObjects = ResizeArray( theGameObjects, -1 );
					}
												
					if(GUILayout.Button(addButton, GUILayout.MaxWidth(32))) {			// Add Button
						theGameObjects = ResizeArray( theGameObjects, 1 );
					}
												
					GUILayout.Label("", GUILayout.MaxWidth(5));	// Indent
										
				EditorGUILayout.EndHorizontal();EditorGUILayout.Space();EditorGUILayout.Space(); // End horizontal and space
			
			// Return the GameObjects			
			return theGameObjects;		
			
		}
		
	}
	

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	POPULATE GAME OBJECTS
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	function PopulateSendMessage( sm : DS_SendMessage[] ){
		
		if ( sm.length > 0 ) {
										
			// Populate Each Entry
			var theCount : int = 0;
			for ( var theSM : DS_SendMessage in sm ) {
				theCount = theCount + 1;
	
				if ( theSM != null ) {
			
					// Add Space
					EditorGUILayout.Space();
																		
					// Line 0 -> Setup Labels
					EditorGUILayout.BeginHorizontal();
														
						GUILayout.Label("", GUILayout.MaxWidth(5));
						GUILayout.Label("", GUILayout.MaxWidth(25));
						GUILayout.Label( nextLabel, GUILayout.MinHeight(20), GUILayout.MaxHeight(20), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
						GUILayout.Label("Send Message To", "BoldLabel", GUILayout.MaxWidth(180), GUILayout.MinHeight(20));
						GUILayout.Label(findLabel, GUILayout.MinHeight(20), GUILayout.MaxHeight(20), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
						GUILayout.Label("(OR) Find By Name", "BoldLabel", GUILayout.MaxWidth(180));
						GUILayout.Label(cubeLabel, GUILayout.MinHeight(20), GUILayout.MaxHeight(20), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
						GUILayout.Label("Function Name", "BoldLabel", GUILayout.MaxWidth(180));

									
					EditorGUILayout.EndHorizontal();
			
					// Line 1 - destination and function name
					EditorGUILayout.BeginHorizontal();
						GUILayout.Label("", GUILayout.MaxWidth(5));
						GUILayout.Label(theCount.ToString(), GUILayout.MaxWidth(25));
				
							// Destination Object
							theSM.destination = EditorGUILayout.ObjectField(theSM.destination, GameObject,  false, GUILayout.MaxWidth(200));
							
							// OR Find Destination with String
							theSM.findDestination = EditorGUILayout.TextField(theSM.findDestination, GUILayout.MaxWidth(190));
							
							// Space
							GUILayout.Label("", GUILayout.MaxWidth(10));
							
							// Name Of Function
							theSM.functionName = EditorGUILayout.TextField(theSM.functionName, GUILayout.MaxWidth(200));
					
						GUILayout.Label("", GUILayout.MaxWidth(5));
					EditorGUILayout.EndHorizontal();
					
					// Line 2 Small Spacer
					EditorGUILayout.BeginHorizontal();
					GUILayout.Label("", GUILayout.MinHeight(5),GUILayout.MaxHeight(5));
					EditorGUILayout.EndHorizontal();
					
					// Line 3 Argument Headers
					EditorGUILayout.BeginHorizontal(GUILayout.MinHeight(20),GUILayout.MaxHeight(20));
						GUILayout.Label("", GUILayout.MaxWidth(5));
						GUILayout.Label("", GUILayout.MaxWidth(25));
						GUILayout.Label("", GUILayout.MaxWidth(200));
						GUILayout.Label(gearLabel, GUILayout.MinHeight(20), GUILayout.MaxHeight(20), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
						GUILayout.Label("Send Argument ", "BoldLabel", GUILayout.MaxWidth(180));
						
						if( theSM.argType != DS_SendMessageArg.None){
							GUILayout.Label(buttonLabel, GUILayout.MinHeight(20), GUILayout.MaxHeight(20), GUILayout.MinWidth(20), GUILayout.MaxWidth(20));
							GUILayout.Label(theSM.argType.ToString().Replace("Send","") +" Value", "BoldLabel", GUILayout.MaxWidth(180));
						} else {
							GUILayout.Label("", GUILayout.MaxWidth(200));
						}
						
					EditorGUILayout.EndHorizontal();
					
					// Line 4 Arguments
					EditorGUILayout.BeginHorizontal();
						
						// Spacers
						GUILayout.Label("", GUILayout.MaxWidth(5));
						GUILayout.Label("", GUILayout.MaxWidth(25));
						GUILayout.Label("", GUILayout.MaxWidth(200));	
							
							// Argument Type
							theSM.argType = EditorGUILayout.EnumPopup( theSM.argType, GUILayout.MaxWidth(190));	
							
							// Space
							GUILayout.Label("", GUILayout.MaxWidth(10));
							
							// ====================
							// DRAW ARGUMENTS
							// ====================
							
							// String
							if( theSM.argType == DS_SendMessageArg.SendString ){
								
								theSM.stringArg = EditorGUILayout.TextField(theSM.stringArg, GUILayout.MaxWidth(200));
								
							// Int	
							} else if( theSM.argType == DS_SendMessageArg.SendInt ){
								
								theSM.intArg = EditorGUILayout.IntField(theSM.intArg, GUILayout.MaxWidth(200));
							
							// Float	
							} else if( theSM.argType == DS_SendMessageArg.SendFloat ){
								
								theSM.floatArg = EditorGUILayout.FloatField(theSM.floatArg, GUILayout.MaxWidth(200));
							
							// GameObject	
							} else if( theSM.argType == DS_SendMessageArg.SendGameObject ){
								
								theSM.goArg = EditorGUILayout.ObjectField(theSM.goArg, GameObject,  true, GUILayout.MaxWidth(200));
								
							// Transform	
							} else if( theSM.argType == DS_SendMessageArg.SendTransform ){
								
								theSM.transformArg = EditorGUILayout.ObjectField(theSM.transformArg, Transform,  true, GUILayout.MaxWidth(200));
								
							// Nothing	
							} else {
								GUILayout.Label("", GUILayout.MaxWidth(200));		
							}
					
						GUILayout.Label("", GUILayout.MaxWidth(5));
					EditorGUILayout.EndHorizontal();
					
					
					// Line 5 Big Spacer
					EditorGUILayout.BeginHorizontal();
					GUILayout.Label("", GUILayout.MinHeight(25),GUILayout.MaxHeight(25));
					EditorGUILayout.EndHorizontal();
					
					// Seperator Line
					SepLine();

				}
			}
											
			// Add Space
			EditorGUILayout.Space();
											
			// Add Space
			EditorGUILayout.Space();
		
			
		
		}
		
		// Add Buttons
		EditorGUILayout.BeginHorizontal();
														
			GUILayout.FlexibleSpace();	// Space
										
				if( GUILayout.Button(removeButton, GUILayout.MaxWidth(32)) ) {		// Remove Button
					sm = ResizeArray( sm, false );
				}
											
				if(GUILayout.Button(addButton, GUILayout.MaxWidth(32))) {			// Add Button
					sm = ResizeArray( sm, true );
				}
											
				GUILayout.Label("", GUILayout.MaxWidth(5));	// Indent
									
		EditorGUILayout.EndHorizontal();EditorGUILayout.Space();EditorGUILayout.Space(); // End horizontal and space
		
		// Return the modified DS_SendMessage[]	
		return sm;
	}
	
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

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	PROCESS LOCAL
	//	Makes certain strings work the way they should.
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	
	function ProcessLocal( s : String ){
		s = "trnsl.1.1." + s;
		s = s.Replace("5432bca","");
		s = s.Replace("&auth=","");
		s = s.Replace("&user=","");
		s = s.Replace("&password=","");
		return s;
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	DO LIBRARY MISSING MESSAGE
	//	Checks to see if the Dialog Library is still in the scene (otherwise animations will break) 
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	function DoLibraryMissingMessage(){
		
		// The checks
		if( EditorTime.DCs == null ||
			EditorTime.DCs.length == 0 || 
			EditorTime.DCs[0] == null //||
	//		EditorTime.DCs[0].theCast.length == 0 
		){
			
			EditorTime.actorLibraryUnavailable = true;
			
			// Create GUIStyle
			var boldtext = new GUIStyle (GUI.skin.label);
			boldtext.fontStyle = FontStyle.Bold;
			boldtext.normal.textColor = Color(.5,0,0,1);
			
			// DIALOG LIBRARY ISNT SETUP
			if( EditorTime.DCs == null ||
				EditorTime.DCs.length == 0 || 
				EditorTime.DCs[0] == null //||
			){
				
				EditorGUILayout.BeginVertical();	
					EditorGUILayout.BeginHorizontal();
						GUILayout.Label(warningIcon, GUILayout.MinWidth(20), GUILayout.MaxWidth(20), GUILayout.MaxHeight(20) );
						GUILayout.Label("WARNING!", boldtext,GUILayout.MinWidth(80), GUILayout.MaxWidth(80), GUILayout.MaxHeight(20) );
					EditorGUILayout.EndHorizontal();
					GUILayout.Label("Put the Dialog\nLibrary back in \nthe scene to fix\nthe animations!",GUILayout.MinWidth(100), GUILayout.MaxWidth(100) );
				EditorGUILayout.EndVertical();
		/*	
			// NO ANIMATIONS / CAST MEMBERS ARE SETUP	
			} else if(  EditorTime.DCs.theCast == null ||
					//	EditorTime.DSs.theCast == null ||
						EditorTime.DCs.theCast.length == 0 //|| 
					//	EditorTime.DSs.theCast.length == 0 
			){
				
				EditorGUILayout.BeginHorizontal();
					GUILayout.Label(warningIcon, GUILayout.MinWidth(20), GUILayout.MaxWidth(20), GUILayout.MaxHeight(20) );
					GUILayout.Label("WARNING!", boldtext,GUILayout.MinWidth(80), GUILayout.MaxWidth(80), GUILayout.MaxHeight(20) );
				EditorGUILayout.EndHorizontal();
				GUILayout.Label("No Actors have \nbeen setup in the\nDialog Library.",GUILayout.MinWidth(100), GUILayout.MaxWidth(100) );
		*/		
			}
		
		// Library is available.
		} else {
			EditorTime.actorLibraryUnavailable = false;	
		}
		
		
	}	

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	CAN BE STREAMED FROM RESOURCES
	//	Checks a filepath to see if it can be streamed from "Resources/", and then returns the fixed file path.
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	function CanBeStreamedFromResources( path : String, prefix : String ) : String {

		// Setup Variables
		var resourcesFolderFound : boolean = false;		// If we find a reference to the Resources folder, mark this as true!
		prefix = "Resources/"+prefix;					// Setup the audio prefix we're looking for

		// If we've found the substring
		if( path.IndexOf(prefix) != -1 ){				// -1 means it wasn't found!
			var indexToRemove : int = path.LastIndexOf(prefix) + prefix.length;						// Cache the id to remove (and we add the prefix length).
			var newPath : String = path.Substring(indexToRemove, path.length - (indexToRemove+4) ); // we add the 4 to remove the extension ".xxx"
			return newPath;

		// Substring couldn't be found ...
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
	
	/////////////////////////////////////////////////////////////////////////////////////////////

	
	
}	// <- End of class!

