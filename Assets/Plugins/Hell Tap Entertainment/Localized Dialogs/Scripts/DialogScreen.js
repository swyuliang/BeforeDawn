////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// 	DialogScreen.js
//
//	Sets up this individual LDC Dialog Screen.
//
//	Created By Melli Georgiou
//	© 2012 - 2015 Hell Tap Entertainment LTD
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

#pragma strict

import System.Reflection;
@script RequireComponent(DialogController);			// Require A DialogController for this script to work.

// EDITOR VALUES
#if UNITY_EDITOR
	@HideInInspector
	var tab : int = 0;
	@HideInInspector
	var selLanguage : int = 0;						// NOTE: Languages aren't synced with the editor yet.
	@HideInInspector
	var actionTab : int = 0;
	@HideInInspector
	var thirdPartyActionTab : int = 0;
	@HideInInspector
	var audioTab : int = 0;
	@HideInInspector
	var iconGridTab : int = 0;
	@System.NonSerialized
	var created : boolean = false;					// We use this with the editor so we can fix a weird glitch!
	@System.NonSerialized
	var runLocalizeAll : boolean = false;			// We use this in the Editor so we can launch Localize All in every DialogScreen.
	@System.NonSerialized
	var isTranslating : boolean = false;			// We use this in the Editor to flag if this object is in the middle of a translation
	@System.NonSerialized
	var isLastDialogScreen : boolean = false;		// Is this the last dialog screen component? We use this to show the Add New Screen button.
	@System.NonSerialized
	var totalDialogScreens : int = 0;				// How many dialog screens are there in this thread.
#endif

// Setup
private var dc : DialogController = null;
var isActive : boolean = false;
var dialogID : int = 1;
var note : String = "Empty Note";				// ** NEW in v3. Add small notes to each dialog.
var useAutoNotes : boolean = true;				// When this is enabled, it automatically creates a note based on title and dialogtext.

// Screen
var screen : DS_Screen = new DS_Screen();
var localization : DS_Localizations = new DS_Localizations();
var navigation : DS_Navigation = new DS_Navigation();
var actions : DS_Actions = new DS_Actions();


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	AWAKE
//	Backup The English data so we can swap back to it later
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Awake(){ BackupEnglish(); }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	START
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Start () {
	
	// Cache Dialog Controller
	dc = GetComponent(DialogController);
	
	// Cache the AudioSetups to have the same AudioSource as the DialogUI
	if( DialogUI != null && DialogUI.dui != null ){
		actions.music.source = DialogUI.dui.musicSource;
		actions.sfx1.source = DialogUI.dui.sfx1Source;
		actions.sfx2.source = DialogUI.dui.sfx2Source;
		actions.sfx3.source = DialogUI.dui.sfx3Source;
	}
	
	// Post Brutal Setup
	#if UNITY_POSTBRUTAL
		
		// Setup Screen using the VoiceRoom Library
		if( screen.useVoiceRoom && VoiceRoomAudio != null ){
		
			screen.actorName = "Player";
			screen.dialogText = VoiceRoomAudio.GetSpeechEntry(screen.voiceRoomIndex);
		
		// Localize The Strings at start
		} else {
			Localize();
		}

	// Commercial LDC Setup
	#else
		Localize();
	#endif
	
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	STRING ARRAY IS EMPTY
//	(Helps Localization) Checks to see if any string in a String[] are not blank. Returns true if this array is empty.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function StringArrayIsEmpty( arr : String[] ){
	
	var isEmpty : boolean = true;
	for( var theString : String in arr){
		if(theString!=""){
			isEmpty = false;
		}
	}
	
	// Return the result
	return isEmpty;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	LOCALIZE TOKENS
//	Localizes Token tabs
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function LocalizeTokens(){

	// Loop through all the tokens and localize them at start
	for( var token : DSTokenActions in actions.tokens ){

		// If this token has the localize flag set, let's do it!
		if(token.localize){
			
			// ENGLISH
			if (	DialogLocalization.language == "English" &&
					token.localizedArgument.english != "" ){
				token.argument = token.localizedArgument.english;
			}

			// CHINESE
			else if (	DialogLocalization.language == "Chinese" &&
					token.localizedArgument.chinese != "" ){
				token.argument = token.localizedArgument.chinese;
			}
			
			// KOREAN
			else if (	DialogLocalization.language == "Korean" &&
						token.localizedArgument.korean != "" ){
				token.argument = token.localizedArgument.korean;
			}
			
			// JAPANESE
			else if (	DialogLocalization.language == "Japanese" &&
						token.localizedArgument.japanese != "" ){
				token.argument = token.localizedArgument.japanese;
			}
			
			// GERMAN
			else if (	DialogLocalization.language == "German" &&
						token.localizedArgument.german != "" ){
				token.argument = token.localizedArgument.german;
			}
			
			// FRENCH
			else if (	DialogLocalization.language == "French" &&
						token.localizedArgument.french != "" ){
				token.argument = token.localizedArgument.french;
			}
			
			// SPANISH
			else if (	DialogLocalization.language == "Spanish" &&
						token.localizedArgument.spanish != "" ){
				token.argument = token.localizedArgument.spanish;
			}
			
			// ITALIAN
			else if (	DialogLocalization.language == "Italian" &&
						token.localizedArgument.italian != "" ){
				token.argument = token.localizedArgument.italian;
			}
			
			// PORTUGUESE
			else if (	DialogLocalization.language == "Portuguese" &&
						token.localizedArgument.portuguese != "" ){
				token.argument = token.localizedArgument.portuguese;
			}
			
			// RUSSIAN
			else if (	DialogLocalization.language == "Russian" &&
						token.localizedArgument.russian != "" ){
				token.argument = token.localizedArgument.russian;
			}
		
		}
	}	
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	BACKUP ENGLISH
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function BackupEnglish(){

	// Core Data
	localization.english.actorName = screen.actorName;
	localization.english.dialogText = screen.dialogText;
	localization.english.soundToLoad = screen.soundToLoad; 
	localization.english.soundPitch = screen.soundPitch;
	localization.english.changeAudio = false;	// English Audio is the default so this should be false
	
	// Buttons
	localization.english.customButton1 = screen.customButton1;
	localization.english.customButton2 = screen.customButton2;
	localization.english.dataEntryDefaultValue = screen.dataEntryDefaultValue;
	localization.english.passwordAnswer = screen.passwordAnswer;
	localization.english.multipleButtons = screen.multipleButtons;
		
	// Localize the comparison strings in each logic statement
	if( screen.logicStatements != null && screen.logicStatements.length > 0 ){
		localization.english.logicStatementCompare = new String[screen.logicStatements.length];
		var i : int = 0;
		for( var s : String in localization.english.logicStatementCompare ){

			// Set the compare string
			s = screen.logicStatements[i].compare;

			// Increment loop
			i++;
		}
	}

	// Setup English Backup of Tokens
	if( actions.tokens.length > 0 ){
		for( var t : DSTokenActions in actions.tokens ){
			t.localizedArgument.english = t.argument;
		}
	}

}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	LOCALIZE
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function Localize() {
	
	// Localize All Tokens
	LocalizeTokens();
	
	// Helper variable for localizing logic statements
	var loopCounter : int = 0;

	// ENGLISH
	if ( DialogLocalization.language == "English" ) {	
		if( localization.english.actorName != "" ){ screen.actorName = localization.english.actorName; }
		if( localization.english.dialogText != "" ){ screen.dialogText = localization.english.dialogText; }
		if ( localization.english.changeAudio ){ screen.soundToLoad = localization.english.soundToLoad; screen.soundPitch = localization.english.soundPitch; }
		if( localization.english.customButton1 != "" ){ screen.customButton1 = localization.english.customButton1; }
		if( localization.english.customButton2 != "" ){ screen.customButton2 = localization.english.customButton2; }
		if( localization.english.dataEntryDefaultValue != "" ){ screen.dataEntryDefaultValue = localization.english.dataEntryDefaultValue; }
		if( localization.english.passwordAnswer != "" ){ screen.passwordAnswer = localization.english.passwordAnswer; }
		if( !StringArrayIsEmpty(localization.english.multipleButtons) ){ screen.multipleButtons = localization.english.multipleButtons; }
		
		// Localize the comparison strings in each logic statement
		if( screen.logicStatements != null && screen.logicStatements.length > 0 && 
			localization.english.logicStatementCompare != null && 
			localization.english.logicStatementCompare.length == screen.logicStatements.length){ 
			loopCounter = 0;	// Reset counter
			for( var logic0 : LogicStatements in screen.logicStatements ){ 							// Loop through the logic events
				if(logic0!=null && localization.english.logicStatementCompare[loopCounter]!=""){		// Make sure the statement is valid and not blank, otherwise default language is used
					logic0.compare = localization.english.logicStatementCompare[loopCounter];			// Copy over the localized version
				}
				loopCounter++;
			}
		}
	}
		
	// CHINESE
	if ( DialogLocalization.language == "Chinese" ) {	
		if( localization.chinese.actorName != "" ){ screen.actorName = localization.chinese.actorName; }
		if( localization.chinese.dialogText != "" ){ screen.dialogText = localization.chinese.dialogText; }
		if ( localization.chinese.changeAudio ){ screen.soundToLoad = localization.chinese.soundToLoad; screen.soundPitch = localization.chinese.soundPitch; }
		if( localization.chinese.customButton1 != "" ){ screen.customButton1 = localization.chinese.customButton1; }
		if( localization.chinese.customButton2 != "" ){ screen.customButton2 = localization.chinese.customButton2; }
		if( localization.chinese.dataEntryDefaultValue != "" ){ screen.dataEntryDefaultValue = localization.chinese.dataEntryDefaultValue; }
		if( localization.chinese.passwordAnswer != "" ){ screen.passwordAnswer = localization.chinese.passwordAnswer; }
		if( !StringArrayIsEmpty(localization.chinese.multipleButtons) ){ screen.multipleButtons = localization.chinese.multipleButtons; }
		
		// Localize the comparison strings in each logic statement
		if( screen.logicStatements != null && screen.logicStatements.length > 0 && 
			localization.chinese.logicStatementCompare != null && 
			localization.chinese.logicStatementCompare.length == screen.logicStatements.length){ 
			loopCounter = 0;	// Reset counter
			for( var logic1 : LogicStatements in screen.logicStatements ){ 							// Loop through the logic events
				if(logic1!=null && localization.chinese.logicStatementCompare[loopCounter]!=""){		// Make sure the statement is valid and not blank, otherwise default language is used
					logic1.compare = localization.chinese.logicStatementCompare[loopCounter];			// Copy over the localized version
				}
				loopCounter++;
			}
		}
	}
	
	// KOREAN
	else if ( DialogLocalization.language == "Korean" ) {	
		if( localization.korean.actorName != "" ){ screen.actorName = localization.korean.actorName; }
		if( localization.korean.dialogText != "" ){ screen.dialogText = localization.korean.dialogText; }
		if ( localization.korean.changeAudio ){ screen.soundToLoad = localization.korean.soundToLoad; screen.soundPitch = localization.korean.soundPitch; }
		if( localization.korean.customButton1 != "" ){ screen.customButton1 = localization.korean.customButton1; }
		if( localization.korean.customButton2 != "" ){ screen.customButton2 = localization.korean.customButton2; }
		if( localization.korean.passwordAnswer != "" ){ screen.passwordAnswer = localization.korean.passwordAnswer; }
		if( !StringArrayIsEmpty(localization.korean.multipleButtons) ){ screen.multipleButtons = localization.korean.multipleButtons; }
		
		// Localize the comparison strings in each logic statement
		if( screen.logicStatements != null && screen.logicStatements.length > 0 && 
			localization.korean.logicStatementCompare != null && 
			localization.korean.logicStatementCompare.length == screen.logicStatements.length){ 
			loopCounter = 0;	// Reset counter
			for( var logic2 : LogicStatements in screen.logicStatements ){ 							// Loop through the logic events
				if(logic2!=null && localization.korean.logicStatementCompare[loopCounter]!=""){		// Make sure the statement is valid and not blank, otherwise default language is used
					logic2.compare = localization.korean.logicStatementCompare[loopCounter];			// Copy over the localized version
				}
				loopCounter++;
			}
		}
	}
	
	// JAPANESE
	else if ( DialogLocalization.language == "Japanese" ) {	
		if( localization.japanese.actorName != "" ){ screen.actorName = localization.japanese.actorName; }
		if( localization.japanese.dialogText != "" ){ screen.dialogText = localization.japanese.dialogText; }
		if ( localization.japanese.changeAudio ){ screen.soundToLoad = localization.japanese.soundToLoad; screen.soundPitch = localization.japanese.soundPitch; }
		if( localization.japanese.customButton1 != "" ){ screen.customButton1 = localization.japanese.customButton1; }
		if( localization.japanese.customButton2 != "" ){ screen.customButton2 = localization.japanese.customButton2; }
		if( localization.japanese.passwordAnswer != "" ){ screen.passwordAnswer = localization.japanese.passwordAnswer; }
		if( !StringArrayIsEmpty(localization.japanese.multipleButtons) ){ screen.multipleButtons = localization.japanese.multipleButtons; }
		
		// Localize the comparison strings in each logic statement
		if( screen.logicStatements != null && screen.logicStatements.length > 0 && 
			localization.japanese.logicStatementCompare != null && 
			localization.japanese.logicStatementCompare.length == screen.logicStatements.length){ 
			loopCounter = 0;	// Reset counter
			for( var logic3 : LogicStatements in screen.logicStatements ){ 								// Loop through the logic events
				if(logic3!=null && localization.japanese.logicStatementCompare[loopCounter]!=""){		// Make sure the statement is valid and not blank, otherwise default language is used
					logic3.compare = localization.japanese.logicStatementCompare[loopCounter];			// Copy over the localized version
				}
				loopCounter++;
			}
		}
	}
	
	// SPANISH
	else if ( DialogLocalization.language == "Spanish" ) {	
		if( localization.spanish.actorName != "" ){ screen.actorName = localization.spanish.actorName; }
		if( localization.spanish.dialogText != "" ){ screen.dialogText = localization.spanish.dialogText; }
		if ( localization.spanish.changeAudio ){ screen.soundToLoad = localization.spanish.soundToLoad; screen.soundPitch = localization.spanish.soundPitch; }
		if( localization.spanish.customButton1 != "" ){ screen.customButton1 = localization.spanish.customButton1; }
		if( localization.spanish.customButton2 != "" ){ screen.customButton2 = localization.spanish.customButton2; }
		if( localization.spanish.passwordAnswer != "" ){ screen.passwordAnswer = localization.spanish.passwordAnswer; }
		if( !StringArrayIsEmpty(localization.spanish.multipleButtons) ){ screen.multipleButtons = localization.spanish.multipleButtons; }
		
		// Localize the comparison strings in each logic statement
		if( screen.logicStatements != null && screen.logicStatements.length > 0 && 
			localization.spanish.logicStatementCompare != null && 
			localization.spanish.logicStatementCompare.length == screen.logicStatements.length){ 
			loopCounter = 0;	// Reset counter
			for( var logic4 : LogicStatements in screen.logicStatements ){ 							// Loop through the logic events
				if(logic4!=null && localization.spanish.logicStatementCompare[loopCounter]!=""){		// Make sure the statement is valid and not blank, otherwise default language is used
					logic4.compare = localization.spanish.logicStatementCompare[loopCounter];			// Copy over the localized version
				}
				loopCounter++;
			}
		}
	}
	
	// SPANISH
	else if ( DialogLocalization.language == "Italian" ) {	
		if( localization.italian.actorName != "" ){ screen.actorName = localization.italian.actorName; }
		if( localization.italian.dialogText != "" ){ screen.dialogText = localization.italian.dialogText; }
		if ( localization.italian.changeAudio ){ screen.soundToLoad = localization.italian.soundToLoad; screen.soundPitch = localization.italian.soundPitch; }
		if( localization.italian.customButton1 != "" ){ screen.customButton1 = localization.italian.customButton1; }
		if( localization.italian.customButton2 != "" ){ screen.customButton2 = localization.italian.customButton2; }
		if( localization.italian.passwordAnswer != "" ){ screen.passwordAnswer = localization.italian.passwordAnswer; }
		if( !StringArrayIsEmpty(localization.italian.multipleButtons) ){ screen.multipleButtons = localization.italian.multipleButtons; }
		
		// Localize the comparison strings in each logic statement
		if( screen.logicStatements != null && screen.logicStatements.length > 0 && 
			localization.italian.logicStatementCompare != null && 
			localization.italian.logicStatementCompare.length == screen.logicStatements.length){ 
			loopCounter = 0;	// Reset counter
			for( var logic5 : LogicStatements in screen.logicStatements ){ 							// Loop through the logic events
				if(logic5!=null && localization.italian.logicStatementCompare[loopCounter]!=""){		// Make sure the statement is valid and not blank, otherwise default language is used
					logic5.compare = localization.italian.logicStatementCompare[loopCounter];			// Copy over the localized version
				}
				loopCounter++;
			}
		}
	}
	
	// GERMAN
	else if ( DialogLocalization.language == "German" ) {	
		if( localization.german.actorName != "" ){ screen.actorName = localization.german.actorName; }
		if( localization.german.dialogText != "" ){ screen.dialogText = localization.german.dialogText; }
		if ( localization.german.changeAudio ){ screen.soundToLoad = localization.german.soundToLoad; screen.soundPitch = localization.german.soundPitch; }
		if( localization.german.customButton1 != "" ){ screen.customButton1 = localization.german.customButton1; }
		if( localization.german.customButton2 != "" ){ screen.customButton2 = localization.german.customButton2; }
		if( localization.german.passwordAnswer != "" ){ screen.passwordAnswer = localization.german.passwordAnswer; }
		if( !StringArrayIsEmpty(localization.german.multipleButtons) ){ screen.multipleButtons = localization.german.multipleButtons; }
		
		// Localize the comparison strings in each logic statement
		if( screen.logicStatements != null && screen.logicStatements.length > 0 && 
			localization.german.logicStatementCompare != null && 
			localization.german.logicStatementCompare.length == screen.logicStatements.length){ 
			loopCounter = 0;	// Reset counter
			for( var logic6 : LogicStatements in screen.logicStatements ){ 							// Loop through the logic events
				if(logic6!=null && localization.german.logicStatementCompare[loopCounter]!=""){		// Make sure the statement is valid and not blank, otherwise default language is used
					logic6.compare = localization.german.logicStatementCompare[loopCounter];			// Copy over the localized version
				}
				loopCounter++;
			}
		}
	}
	
	// FRENCH
	else if ( DialogLocalization.language == "French" ) {	
		if( localization.french.actorName != "" ){ screen.actorName = localization.french.actorName; }
		if( localization.french.dialogText != "" ){ screen.dialogText = localization.french.dialogText; }
		if ( localization.french.changeAudio ){ screen.soundToLoad = localization.french.soundToLoad; screen.soundPitch = localization.french.soundPitch; }
		if( localization.french.customButton1 != "" ){ screen.customButton1 = localization.french.customButton1; }
		if( localization.french.customButton2 != "" ){ screen.customButton2 = localization.french.customButton2; }
		if( localization.french.passwordAnswer != "" ){ screen.passwordAnswer = localization.french.passwordAnswer; }
		if( !StringArrayIsEmpty(localization.french.multipleButtons) ){ screen.multipleButtons = localization.french.multipleButtons; }
		
		// Localize the comparison strings in each logic statement
		if( screen.logicStatements != null && screen.logicStatements.length > 0 && 
			localization.french.logicStatementCompare != null && 
			localization.french.logicStatementCompare.length == screen.logicStatements.length){ 
			loopCounter = 0;	// Reset counter
			for( var logic7 : LogicStatements in screen.logicStatements ){ 							// Loop through the logic events
				if(logic7!=null && localization.french.logicStatementCompare[loopCounter]!=""){		// Make sure the statement is valid and not blank, otherwise default language is used
					logic7.compare = localization.french.logicStatementCompare[loopCounter];			// Copy over the localized version
				}
				loopCounter++;
			}
		}
	}
	
	// PORTUGUESE
	else if ( DialogLocalization.language == "Portuguese" ) {	
		if( localization.portuguese.actorName != "" ){ screen.actorName = localization.portuguese.actorName; }
		if( localization.portuguese.dialogText != "" ){ screen.dialogText = localization.portuguese.dialogText; }
		if ( localization.portuguese.changeAudio ){ screen.soundToLoad = localization.portuguese.soundToLoad; screen.soundPitch = localization.portuguese.soundPitch; }
		if( localization.portuguese.customButton1 != "" ){ screen.customButton1 = localization.portuguese.customButton1; }
		if( localization.portuguese.customButton2 != "" ){ screen.customButton2 = localization.portuguese.customButton2; }
		if( localization.portuguese.passwordAnswer != "" ){ screen.passwordAnswer = localization.portuguese.passwordAnswer; }
		if( !StringArrayIsEmpty(localization.portuguese.multipleButtons) ){ screen.multipleButtons = localization.portuguese.multipleButtons; }
		
		// Localize the comparison strings in each logic statement
		if( screen.logicStatements != null && screen.logicStatements.length > 0 && 
			localization.portuguese.logicStatementCompare != null && 
			localization.portuguese.logicStatementCompare.length == screen.logicStatements.length){ 
			loopCounter = 0;	// Reset counter
			for( var logic8 : LogicStatements in screen.logicStatements ){ 								// Loop through the logic events
				if(logic8!=null && localization.portuguese.logicStatementCompare[loopCounter]!=""){		// Make sure the statement is valid and not blank, otherwise default language is used
					logic8.compare = localization.portuguese.logicStatementCompare[loopCounter];			// Copy over the localized version
				}
				loopCounter++;
			}
		}
	}
	
	// RUSSIAN
	else if ( DialogLocalization.language == "Russian" ) {	
		if( localization.russian.actorName != "" ){ screen.actorName = localization.russian.actorName; }
		if( localization.russian.dialogText != "" ){ screen.dialogText = localization.russian.dialogText; }
		if ( localization.russian.changeAudio ){ screen.soundToLoad = localization.russian.soundToLoad; screen.soundPitch = localization.russian.soundPitch; }
		if( localization.russian.customButton1 != "" ){ screen.customButton1 = localization.russian.customButton1; }
		if( localization.russian.customButton2 != "" ){ screen.customButton2 = localization.russian.customButton2; }
		if( localization.russian.passwordAnswer != "" ){ screen.passwordAnswer = localization.russian.passwordAnswer; }
		if( !StringArrayIsEmpty(localization.russian.multipleButtons) ){ screen.multipleButtons = localization.russian.multipleButtons; }
		
		// Localize the comparison strings in each logic statement
		if( screen.logicStatements != null && screen.logicStatements.length > 0 && 
			localization.russian.logicStatementCompare != null && 
			localization.russian.logicStatementCompare.length == screen.logicStatements.length){ 
			loopCounter = 0;	// Reset counter
			for( var logic9 : LogicStatements in screen.logicStatements ){ 							// Loop through the logic events
				if(logic9!=null && localization.russian.logicStatementCompare[loopCounter]!=""){		// Make sure the statement is valid and not blank, otherwise default language is used
					logic9.compare = localization.russian.logicStatementCompare[loopCounter];			// Copy over the localized version
				}
				loopCounter++;
			}
		}
	}
	
	// SKIP IF UNKNOWN LANGUAGE
	else {
		
		// debug message to let us know that the language is not supported and we are rolling back to english!
		if( DialogLocalization.language != "English" ){
			Debug.Log(gameObject.name+" (DialogScreen ID: "+dialogID+") - Localization defaulting to English.");
		}
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	SETUP
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Setup() {

	yield;	// 1 frame delay!

	// If this is the current screen and we can see the DialogUI
	if ( isActive && DialogUI != null && !DialogUI.dui.forceClose ){
	
		// Set up the screen and tell the ui to Fade in
		if ( DialogUI.status == DUISTATUS.ENDED || DialogUI.status == DUISTATUS.WAITFORSCREEN ) { 
			
			// If we are using Dialog Logic, then use the LogicSetup() function instead.
			if( screen.dialogStyle == DIALOGSTYLE.Logic ){
			
				LogicSetup();
			
			// Otherwise, setup the dialog normally ..	
			} else {

				// ============================
				//	DO LOCALIZE ACTIONS FIRST
				// ============================

					// If we have set this to anything but no, send the function to DialogLocalization
					if( actions.setNewLanguage != DS_SetNewLanguage.No ){
						DialogUI.ChangeLanguage( actions.setNewLanguage, actions.updateGUISkins );
					}

				// ============================
				//	OTHER ACTIONS
				// ============================
			
				// Setup Tokens
				DialogUI.dui.TokenActions(actions.tokens);
				
				// Use Actor Name in commercial LDC.
				#if !UNITY_POSTBRUTAL
					DialogUI.actorName = screen.actorName;
				#endif

				// Use Player's real name (Post Brutal LDC)
				#if UNITY_POSTBRUTAL
					if( (screen.actorName == "Player" || screen.actorName == "player") && PlayerController!=null && PlayerController.pc !=null ){
						DialogUI.actorName = PlayerController.pc.stats.name;
					// Otherwise use the name that's specified
					} else {
						DialogUI.actorName = screen.actorName;
					}
				#endif
				
				// Dialog Text
				DialogUI.dialogText = screen.dialogText;
		
				// Update portrait (Commercial LDC)
				#if !UNITY_POSTBRUTAL
					DialogUI.portrait = screen.portrait;
				#endif

				// Update Portrait (Post Brutal LDC)
				#if UNITY_POSTBRUTAL
					// Update portrait
					if ( !screen.useVoiceRoom ) {
						DialogUI.portrait = screen.portrait;
					
					// Use Player Profile Pic if we have set the VoiceRoom flag
					} else if(screen.useVoiceRoom && MainUI != null){
						DialogUI.portrait = MainUI.mui.playerPortrait2D;
					}
				#endif

				// Setup Portrait Animation
				if( screen.animatedPortrait != Vector2(-1,-1) && DialogCast!=null && DialogCast.GetAnimation( screen.animatedPortrait.x, screen.animatedPortrait.y) != null ){
					DialogUI.portraitAnimation = DialogCast.GetAnimation( screen.animatedPortrait.x, screen.animatedPortrait.y);
				} else {
					DialogUI.portraitAnimation = null;	
				}

				// Update the Popup Values
				DialogUI.popupImage = screen.popupImage;
				DialogUI.popupSizeX = screen.popupSizeX;
				DialogUI.popupSizeY = screen.popupSizeY;
				DialogUI.popupBackgroundAlpha = screen.popupBackgroundAlpha;
				DialogUI.popupOptions = screen.popupOptions;

				// Setup Popup Image Background
				if( screen.popupImageAnim != Vector2(-1,-1) && DialogScenes!=null && DialogScenes.GetAnimation( screen.popupImageAnim.x, screen.popupImageAnim.y) != null ){
					DialogUI.popupImageAnimation = DialogScenes.GetAnimation( screen.popupImageAnim.x, screen.popupImageAnim.y);
				} else {
					DialogUI.popupImageAnimation = null;	
				}

				// Reset Scroll Positions (the scroll view for Icon Grids, etc)
				DialogUI.scrollPosition = Vector2.zero;

				// Update the Icon View values
				DialogUI.IG_WindowSizeX = screen.IG_WindowSizeX;
				DialogUI.IG_WindowSizeY = screen.IG_WindowSizeY;
				DialogUI.IG_WindowOffsetX = screen.IG_WindowOffsetX;
				DialogUI.IG_WindowOffsetY = screen.IG_WindowOffsetY;
				DialogUI.IG_WindowShowTitle = screen.IG_WindowShowTitle;
				DialogUI.IG_WindowShowSubtitle = screen.IG_WindowShowSubtitle;
				DialogUI.IG_AddSpaceBetweenSubtitleAndContent = screen.IG_AddSpaceBetweenSubtitleAndContent;
				DialogUI.IG_useXScrolling = screen.IG_useXScrolling;
				DialogUI.IG_useYScrolling = screen.IG_useYScrolling;
				DialogUI.IG_BackgroundAlpha = screen.IG_BackgroundAlpha;
				DialogUI.IG_showPanelBG = screen.IG_showPanelBG;
				DialogUI.IG_iconSizeX = screen.IG_iconSizeX;
				DialogUI.IG_iconSizeY = screen.IG_iconSizeY;
				DialogUI.IG_iconsPerRow = screen.IG_iconsPerRow;
				DialogUI.IG_IconSpacer = screen.IG_IconSpacer;
				DialogUI.IG_AddInnerIconSpacing = screen.IG_AddInnerIconSpacing;
				DialogUI.IG_showIconLabels = screen.IG_showIconLabels;
				DialogUI.IG_iconLabelSize = screen.IG_iconLabelSize;
				DialogUI.IG_firstIconIsCloseButton = screen.IG_firstIconIsCloseButton;
				DialogUI.IG_closeButtonSize = screen.IG_closeButtonSize;
				DialogUI.IG_showButtonBackgrounds = screen.IG_showButtonBackgrounds;
				DialogUI.IG_buttonImagePosition = screen.IG_buttonImagePosition;
				//DialogUI.IG_buttons = screen.IG_buttons;
				SetupIconGrid(); // We apply logic to the Icon Grid

				// Set Duration
				DialogUI.screenDuration = navigation.secondsToDisplay;
			
				// Tell the DialogUI to activate and set up the fade in
				DialogUI.isActive = true;
				DialogUI.screen = this;
	
				DialogUI.dialogStyle = screen.dialogStyle;
				DialogUI.customButton1 = screen.customButton1;
				DialogUI.customButton2 = screen.customButton2;
				
				//Evaluate Multple Buttons after running logic.
				SetupMultipleButtons();

				// Setup Custom Button Icons
				SetupCustomButtonIcons();
				
				DialogUI.dataEntryToken = screen.dataEntryToken;
				DialogUI.dataEntryFormat = screen.dataEntryFormat;
				DialogUI.dataEntryCharacterLimit = screen.dataEntryCharacterLimit;
				DialogUI.dataEntryDefaultValue = screen.dataEntryDefaultValue;
				DialogUI.dataEntryString = screen.dataEntryDefaultValue;	// Set value to default!
				DialogUI.dataEntryAnchor = screen.dataEntryAnchor;
				
				DialogUI.passwordMatchToToken = screen.passwordMatchToToken;
				DialogUI.passwordAnswer = screen.passwordAnswer;
				DialogUI.passwordCaseSensitive = screen.passwordCaseSensitive;
				DialogUI.passwordMask = screen.passwordMask;
				
				DialogUI.hideNextButton = navigation.hideNextButton;
				DialogUI.noPortraitFadeIn = navigation.noPortraitFadeIn;
				DialogUI.noPortraitFadeOut = navigation.noPortraitFadeOut;
				
				DialogUI.setupTextField = true;
				
				DialogUI.titleOffset = screen.titleOffset;
				DialogUI.subtitleOffset = screen.subtitleOffset;
				DialogUI.titleColor = screen.titleColor;
				DialogUI.subtitleColor = screen.subtitleColor;
				DialogUI.hideDialogBackground = navigation.hideDialogBackground;
				
				DialogUI.status = DUISTATUS.SHOW;
				
				// Setup Background and Actor Layers
				SetupBackgroundLayers();
				SetupActorLayers();
				
				// Setup Audio Actions
				SetupAudioActions();
				
				// Setup Audio if we need to, also make sure we can see the DialogUI local component (dui)
				if ( screen.soundToLoad != "" && DialogUI.dui != null ){
					// Important to send this to the dui instance otherwise the yield co-routine wont work!
					DialogUI.dui.PlayAudio(screen.soundToLoad, screen.soundPitch);	
				}
				

				// POST BRUTAL ACTIONS
				#if UNITY_POSTBRUTAL
					// Talk Animations
					DialogUI.playerShouldTalk = actions.postBrutal.playerShouldTalk;

					// NPC Actors
					if( GameObject.Find(actions.postBrutal.findNPCToTalk) != null &&
						GameObject.Find(actions.postBrutal.findNPCToTalk).GetComponent(NPC) != null
					){
						// Override the NPC Should talk field with the newly found one.
						actions.postBrutal.npcShouldTalk = GameObject.Find(actions.postBrutal.findNPCToTalk).GetComponent(NPC);
					}
					DialogUI.npcShouldTalk = actions.postBrutal.npcShouldTalk;

					// AI Actors
					if( GameObject.Find(actions.postBrutal.findAIToTalk) != null &&
						GameObject.Find(actions.postBrutal.findAIToTalk).GetComponent(AI_ActorController) != null
					){
						// Override the NPC Should talk field with the newly found one.
						actions.postBrutal.aiShouldTalk = GameObject.Find(actions.postBrutal.findAIToTalk).GetComponent(AI_ActorController);
					}
					DialogUI.aiShouldTalk = actions.postBrutal.aiShouldTalk;
					
					// If we're using voiceRoom in this screen, send the the PlayVoiceRoomAudio function instead of the normal one!
					if( screen.useVoiceRoom && DialogUI.dui != null ){
						
						DialogUI.dui.PlayVoiceRoomAudio( screen.voiceRoomIndex );
							
					// Setup Audio if we need to, also make sure we can see the DialogUI local component (dui)
					} else if ( screen.soundToLoad != "" && DialogUI.dui != null ){
						
						// Important to send this to the dui instance otherwise the yield co-routine wont work!
						DialogUI.dui.PlayAudio(screen.soundToLoad, screen.soundPitch );	
					}

					// Look At
					if( GameObject.Find(actions.postBrutal.findTalkLookAt) != null ){
						// Override the Look At field with the newly found one.
						actions.postBrutal.talkLookAt = GameObject.Find(actions.postBrutal.findTalkLookAt).transform;
					}
						DialogUI.talkLookAt = actions.postBrutal.talkLookAt;
					
					
					// Stop AI Movement
					Actors.stopAllMovementAI = actions.postBrutal.stopAllMovementAI;
				#endif

				// ACTIONS
				CreateObjectsAtStartOfScreen();	
				ActivateObjectsAtStartOfScreen();
				DeactivateObjectsAtStartOfScreen();
				SendMessageAtStart();
				DestroyObjectsAtStartOfScreen();
				
				// DIALOG TEXT EFFECTS
				DialogUI.dui.SetupDialogTextEffects();
				
				// THIRD PARTY START FUNCTIONS
				ThirdPartyStart();
				
				// PLAYERPREFS ACTIONS
				DoPlayerPrefsActions();

				// TOKEN - FILE MANAGEMENT
				if( actions.tokenFileManagement == DSTokenFileManagementActions.SaveToPlayerPrefs ){
					DialogUI.SaveTokensToDisk();
				} else if( actions.tokenFileManagement == DSTokenFileManagementActions.LoadFromPlayerPrefs ){
					DialogUI.LoadTokensFromDisk();
				} else if( actions.tokenFileManagement == DSTokenFileManagementActions.DeleteFromPlayerPrefs ){
					DialogUI.DeleteTokensFromDisk();
				}
				
				// SETUP BUTTON FOCUS
				SetupUIButtonFocus();
				
				// POST BRUTAL ACTIONS CONTINUED ...
				#if UNITY_POSTBRUTAL
					// Setup Camera Style
					if(FMV!=null){
						FMV.Setup(actions.postBrutal.cameraStyle, actions.postBrutal.cameraStyleTarget, actions.postBrutal.cameraStyleFindTarget);
					}
				#endif

				// DO API CALLBACKS AT START
				DoAPICallBacksAtStart();

			}
		}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	SETUP UI BUTTON FOCUS
//	Sets up button focus for DialogUI ( Allows us to use joysticks / arrow keys to navigate buttons )
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function SetupUIButtonFocus(){
	
	// DialogUI is available...
	if(DialogUI!=null){
		
		// Setup the appropriate DialogStyle
		switch(screen.dialogStyle){
			
			// Next Button
			case DIALOGSTYLE.NextButton:
				DialogUI.buttonNames = [ DialogUI.dui.LocalizeNextButton() ];
				break;

			#if UNITY_POSTBRUTAL
				// Next Button
				case DIALOGSTYLE.VoiceRoom:
					DialogUI.buttonNames = [ DialogUI.dui.LocalizeNextButton() ];
					break;
			#endif
				
			// One Button	
			case DIALOGSTYLE.OneButton:
				DialogUI.buttonNames = [ screen.customButton1 ];
				break;
				
			// Yes / No Button
			case DIALOGSTYLE.YesOrNo:
				DialogUI.buttonNames = [ DialogUI.dui.LocalizeYesButton(), DialogUI.dui.LocalizeNoButton() ];
				break;
				
			// Two Buttons	
			case DIALOGSTYLE.TwoButtons:
				DialogUI.buttonNames = [ screen.customButton1, screen.customButton2 ];
				break;

			// Multiple Buttons	
			case DIALOGSTYLE.MultipleButtons:
			//	DialogUI.buttonNames = screen.multipleButtons;
				DialogUI.buttonNames = screen.multipleButtonsEvaluated;
				break;
				
			// Data Entry
			case DIALOGSTYLE.DataEntry:
				DialogUI.buttonNames = ["TextField","Submit"];
				break;	
				
			// Password
			case DIALOGSTYLE.Password:
				DialogUI.buttonNames = ["TextField","Submit"];
				break;	
				
			// Logic
			case DIALOGSTYLE.Logic:
				DialogUI.buttonNames = [""];
				break;	

			// Popup	
			case DIALOGSTYLE.Popup:
				if( screen.popupOptions == POPUP_OPTIONS.TwoButtons){
					DialogUI.buttonNames = [ screen.customButton1, screen.customButton2 ];
				} else if( screen.popupOptions == POPUP_OPTIONS.OneButton){
					DialogUI.buttonNames = [ screen.customButton1 ];	
				}
				break;		

			// Icon Grid
			case DIALOGSTYLE.IconGrid:
				// Dynamically Create the Icon Grid Names
				var iconGridNames : String[] = new String[screen.IG_buttonsEvaluated.length];
				for(var i = 0; i < screen.IG_buttonsEvaluated.length; i++){
					//iconGridNames[i] = screen.IG_buttonsEvaluated[i].title;
					iconGridNames[i] = i.ToString();
				}
				DialogUI.buttonNames = iconGridNames;
				break;				
		}
		
		// Reset The other Button Focus Settings
		DialogUI.currentSelection = 0;
		DialogUI.buttons = new boolean[DialogUI.buttonNames.length];	// All of these are false by default.

	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	SETUP MULTIPLE BUTTONS
//	Evaluates logic and builds a new button and navigation array to pass to the DialogUI.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function SetupMultipleButtons(){
	
	//print("SetupMultipleButtons() Dialog ID:"+dialogID);
	
	// Create new arrays for buttons and navigation
	var buttonArr : Array = new Array();
	var navArr : Array = new Array();

	// custom Icons
	var customIconArray : Array = new Array();
	var customAnimArray : Array = new Array();
	
	// Clear the arrays
	buttonArr.Clear();
	navArr.Clear();
	customIconArray.Clear();
	customAnimArray.Clear();
	
	// if the arrays are setup correctly...
	if( screen.dialogStyle == DIALOGSTYLE.MultipleButtons &&
		screen.multipleButtons.length > 0 && 
		screen.multipleButtons.length == navigation.multipleButtons.length &&
		screen.multipleButtons.length == screen.multipleButtonsIcon.length &&
		screen.multipleButtons.length == screen.animatedMultipleButtonsIcon.length
	){
		
		// Loop through the multiple buttons and recreate the new arrays
		var i : int = 0;	// Create index id to loop with
		for( var btn : String in screen.multipleButtons ){
			
			// Evaluate Logic if needed
			if( screen.multipleRequiresLogic[i] == false || /*IsLogicTrue(screen.multipleLogic[i])*/ 
				ProcessTokenLogicEventWithExtraConditions( screen.multipleLogic[i] ) 
			){
				buttonArr.Add(screen.multipleButtons[i]);
				navArr.Add(navigation.multipleButtons[i]);

				customIconArray.Add(screen.multipleButtonsIcon[i]);
				customAnimArray.Add(screen.animatedMultipleButtonsIcon[i]);
			}
			
			// Add to the index
			i++;
		}
	} else {
	//	Debug.Log("LDC: Problem with Evaluated Multiple Button Consistency. Dialog Screen ID: " + dialogID );
	}
	
	// Convert the arrays to the built in evaluated ones
	screen.multipleButtonsEvaluated = buttonArr.ToBuiltin(String) as String[];
	navigation.multipleButtonsEvaluated = navArr.ToBuiltin(int) as int[];

	// Setup the evaluated arrays (we will use them when setting up custom Icons in its own function)
	screen.multipleButtonsIconEvaluated = customIconArray.ToBuiltin(Texture2D) as Texture2D[];
	screen.animatedMultipleButtonsIconEvaluated = customAnimArray.ToBuiltin(Vector2) as Vector2[];
	
	// Send The multple buttons strings to DialogUI
	DialogUI.multipleButtons = screen.multipleButtonsEvaluated;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	SETUP ICON GRID
//	Evaluates logic and builds a new array to pass to the DialogUI.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function SetupIconGrid(){
	
	//print("SetupMultipleButtons() Dialog ID:"+dialogID);
	
	// Create new array
	var IGArr : Array = new Array();
	IGArr.Clear();
	
	// if the arrays are setup correctly...
	if( screen.dialogStyle == DIALOGSTYLE.IconGrid &&
		screen.IG_buttons.length > 0
	){
		
		// Loop through the multiple buttons and recreate the new arrays
		var i : int = 0;	// Create index id to loop with
		for( var IGBtn : IconGridButtons in screen.IG_buttons ){
			
			// Evaluate Logic if needed
			if( IGBtn.requiresLogic == false ||
				ProcessTokenLogicEventWithExtraConditions( IGBtn.logicStatements ) 
			){
				IGBtn.logicFailed = false;
				IGArr.Add( IGBtn );
			
			// if logic failed ...
			} else {
				// If we set failed logic to disable, add it to the array, but mark the logic as failing!
				if( IGBtn.ifLogicFails == LDC_IFLOGICFAILS.DisableButton  ){
					IGBtn.logicFailed = true;
					IGArr.Add( IGBtn );
				}
			}
			
			// Add to the index
			i++;
		}
	} else {
	//	Debug.Log("LDC: Problem with Icon Grid Button Consistency. Dialog Screen ID: " + dialogID );
	}
	
	// Convert the array to the built in evaluated one
	screen.IG_buttonsEvaluated = IGArr.ToBuiltin(IconGridButtons) as IconGridButtons[];
	
	// Send The multple buttons strings to DialogUI
	DialogUI.IG_buttons = screen.IG_buttonsEvaluated;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	LOGIC SETUP
//	Uses the Logic to figure out which screen to navigate to
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function LogicSetup() {
	
	// Make sure the logic statements are valid and we have some setup
	if( screen.logicStatements != null && screen.logicStatements.length > 0 && DialogUI != null && DialogUI.dui != null ){
		
		// Setup a flag to check whether we found a logic event to use.
		var logicFound : boolean = false;
		
		// Loop through the statements
		for( var event : LogicStatements in screen.logicStatements ){
			if(event!=null){
					
				// PROCESS THE LOGIC EVENT
				if( ProcessTokenLogicEventWithExtraConditions(event) ){

					// We have found an event to use - this stops the default screen from being used.
					logicFound = true;
					
					// Should we end the navigation dialog now?
					if( event.endDialogAfterThis){
						isActive = false;

						// Setup Dialog UI
						DialogUI.isActive = false;
						DialogUI.status = DUISTATUS.ENDED;
						DialogUI.screenDuration = 0;
						
						// Setup Dialog Controller
						dc.status = DCSTATUS.ENDED;
						dc.currentScreen = null;
						dc.currentID = 0;
						
						// Destroy GameObject too?
						if( event.destroyAtEnd ){
							Destroy(gameObject);
						}
					
					// Otherwise, move to the next screen	
					} else {
							
						// Setup the screen to use the default navigation
						dc.status = DCSTATUS.NEXT;
						dc.nextID = event.goToScreen;
						isActive = false;
						DialogUI.status = DUISTATUS.FADEOUT;
					}
					
					// Stop the loop early
					break;

				}
			}
		}
				
		// If no logic was found, lets use the default screen
		if(!logicFound){
			
			Debug.Log( "LDC LOGIC: Using default navigation");
			
			// Should we end the navigation dialog now?
			if(navigation.endDialogAfterThis){
				isActive = false;
	
				// Setup Dialog UI
				DialogUI.isActive = false;
				DialogUI.status = DUISTATUS.ENDED;
				DialogUI.screenDuration = 0;
				
				// Setup Dialog Controller
				dc.status = DCSTATUS.ENDED;
				dc.currentScreen = null;
				dc.currentID = 0;
				
				// Destroy GameObject too?
				if( navigation.destroyAtEnd ){
					Destroy(gameObject);
				}
			
			// Otherwise, move to the next screen	
			} else {
					
				// Setup the screen to use the default navigation
				dc.status = DCSTATUS.NEXT;
				dc.nextID = navigation.logicDefaultNavigation;
				isActive = false;
				DialogUI.status = DUISTATUS.FADEOUT;
			}
			
		}
		
	// if we have no logic setup, use the default screen to navigate to	
	} else {
		
		Debug.Log( "LDC LOGIC: Using default navigation");
		
		// Should we end the navigation dialog now?
		if(navigation.endDialogAfterThis){
			isActive = false;

			// Setup Dialog UI
			DialogUI.isActive = false;
			DialogUI.status = DUISTATUS.ENDED;
			DialogUI.screenDuration = 0;
			
			// Setup Dialog Controller
			dc.status = DCSTATUS.ENDED;
			dc.currentScreen = null;
			dc.currentID = 0;
			
			// Destroy GameObject too?
			if( navigation.destroyAtEnd ){
				Destroy(gameObject);
			}
		
		// Otherwise, move to the next screen	
		} else {
				
			// Setup the screen to use the default navigation
			dc.status = DCSTATUS.NEXT;
			dc.nextID = navigation.logicDefaultNavigation;
			isActive = false;
			DialogUI.status = DUISTATUS.FADEOUT;
		}
	}
	
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	PROCESSES AN ENTIRE LOGIC EVENT WITH EXTRA CONDITIONS
//	Returns true / false.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Processes A Token Logic Event With All Conditions
function ProcessTokenLogicEventWithExtraConditions( event : LogicStatements ) : boolean {

	// Store the result
	var result : boolean = true;

	// Make sure the event is valid
	if(event!=null){

		// Handle the main event first.
		if(
			// If this is a Token based event, make sure there are tokens setup, and attempt to process the event.
			event.logicType == DS_LOGIC_TYPE.Token && DialogUI.dui.tokens != null && DialogUI.dui.tokens.length > 0 && DialogUI.dui.tokens[event.token] != null && ProcessTokenLogicEvent(event) == true ||

			// If this is a PlayerPrefs based event, attempt to process the event.
			event.logicType != DS_LOGIC_TYPE.Token && ProcessPlayerPrefsLogicEvent(event) == true
		){

			// If the main event has returned true, we need to check if we have any extra conditions
			if( event.extraConditions != null && event.extraConditions.length > 0){

				// Loop through the extra conditions
				for( var event2 : LogicStatementsExtra in event.extraConditions ){
					if(event2!=null){ // make sure this condition is valid.

							// Handle the new events
							if(
								// If this is a Token based event, make sure there are tokens setup, and attempt to process the event.
								event2.logicType == DS_LOGIC_TYPE.Token && DialogUI.dui.tokens != null && DialogUI.dui.tokens.length > 0 && DialogUI.dui.tokens[event2.token] != null && ProcessTokenLogicEvent(event2) == true ||

								// If this is a PlayerPrefs based event, attempt to process the event.
								event2.logicType != DS_LOGIC_TYPE.Token && ProcessPlayerPrefsLogicEvent(event2) == true
							){

								// NOTE: If this event returns true, we'll just move on and test the next one. 
								// (The return status should still be set to true at this point.)

							// This event didn't pass, we'll end the loop here too.
							} else { result = false; break; }

					// An event was invalid. Return false and also break the loop.
					} else { result = false; break; } 
				}

			// If there are no extra conditions, return true!	
			} else { result = true; }

		// Main Event failed.
		} else { result = false; }

	// This event isn't valid, return false.	
	} else { result = false; }

	// Return the result - if the token logic passed, we will return true.
	return result;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	PROCESSES THE LOGIC IN A TOKEN-BASED EVENT
//	Returns true / false.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Processes a single Logic Event
function ProcessTokenLogicEvent( event : LogicStatements ){

	// Debug
	//print("DIALOG SCREEN: ProcessTokenLogicEvent()");

	// Cache token
	var token : String = DialogUI.dui.tokens[event.token].value;
	
	// Helper variables
	var valueAsFloat = floatRef();
	var argumentAsFloat = floatRef();
	var parseFailed : boolean = false;
	var conditionIsTrue : boolean = false;
	
	// EVENT -> EQUALS
	if( event.operator == DS_LOGIC_OPERATOR.Equals ){
		
		// Parse Original Value
		if ( DialogUI.ParseTokenAsFloat(token, valueAsFloat) ){							  
		}else{
		   Debug.Log("LDC: Unable to parse '{0}'." + token); 
		   parseFailed = true; 
		}
		
		// Parse Argument
		if ( DialogUI.ParseTokenAsFloat(event.compare, argumentAsFloat) ){						  
		}else{
		   Debug.Log("LDC: Unable to parse '{0}'." + event.compare);
		   parseFailed = true;  
		}
		
		// If token matches compare string (as values)
		if( !parseFailed && valueAsFloat.value == argumentAsFloat.value ){
			Debug.Log( "LDC LOGIC MATCH: " + valueAsFloat.value + " == " + argumentAsFloat.value );
			conditionIsTrue = true;
			
		// If token matches compare string
		} else if( parseFailed && token == event.compare ){
			Debug.Log( "LDC LOGIC MATCH: " + token + " == " + event.compare );
			conditionIsTrue = true;
		}
	}
	
	// EVENT -> IS NOT
	else if( event.operator == DS_LOGIC_OPERATOR.IsNot ){
		// Parse Original Value
		if ( DialogUI.ParseTokenAsFloat(token, valueAsFloat) ){	
		//	 Debug.Log(valueAsFloat);
		}else{
		   Debug.Log("LDC: Unable to parse '{0}'." + token); 
		   parseFailed = true; 
		}
		
		// Parse Argument
		if ( DialogUI.ParseTokenAsFloat(event.compare, argumentAsFloat) ){	
		//	 Debug.Log(argumentAsFloat);
		}else{
		   Debug.Log("LDC: Unable to parse '{0}'." + event.compare);
		   parseFailed = true;  
		}
		
		// If token matches compare string (as values)
		if( !parseFailed && valueAsFloat.value != argumentAsFloat.value ){
			Debug.Log( "LDC LOGIC MATCH: " + valueAsFloat.value + " != " + argumentAsFloat.value );
			conditionIsTrue = true;
			
		// If token matches compare string
		} else if( parseFailed && token != event.compare ){
			Debug.Log( "LDC LOGIC MATCH: " + token + " != " + event.compare );
			conditionIsTrue = true;
		}
	}
	
	// EVENT -> GREATER THAN
	else if( event.operator == DS_LOGIC_OPERATOR.GreaterThan ){
		
		// Parse Original Value
		if ( DialogUI.ParseTokenAsFloat(token, valueAsFloat) ){	
		//	 Debug.Log(valueAsFloat);
		}else{
		   Debug.Log("LDC: Unable to parse '{0}'." + token); 
		   parseFailed = true; 
		}
		
		// Parse Argument
		if ( DialogUI.ParseTokenAsFloat(event.compare, argumentAsFloat) ){
		//	 Debug.Log(argumentAsFloat);
		}else{
		   Debug.Log("LDC: Unable to parse '{0}'." + event.compare);
		   parseFailed = true;  
		}
		
		// Parse was successful
		if(!parseFailed){
			// If token matches compare string
			if( valueAsFloat.value > argumentAsFloat.value ){
				Debug.Log( "LDC LOGIC MATCH: " + valueAsFloat.value + " > " + argumentAsFloat.value );
				conditionIsTrue = true;
			}
		}
	}
	
	// EVENT -> LOWER THAN
	else if( event.operator == DS_LOGIC_OPERATOR.LessThan ){
		
		// Parse Original Value
		if ( DialogUI.ParseTokenAsFloat(token, valueAsFloat) ){	
		//	 Debug.Log(valueAsFloat);
		}else{
		   Debug.Log("LDC: Unable to parse '{0}'." + token); 
		   parseFailed = true; 
		}
		
		// Parse Argument
		if ( DialogUI.ParseTokenAsFloat(event.compare, argumentAsFloat) ){	
		//	 Debug.Log(argumentAsFloat);
		}else{
		   Debug.Log("LDC: Unable to parse '{0}'." + event.compare);
		   parseFailed = true;  
		}
		
		// Parse was successful
		if(!parseFailed){
			// If token matches compare string
			if( valueAsFloat.value < argumentAsFloat.value ){
				Debug.Log( "LDC LOGIC MATCH: " + valueAsFloat.value + " < " + argumentAsFloat.value );
				conditionIsTrue = true;
			}
		}
	}
	
	// DID THIS CONDITION RESULT TO TRUE?
	if(conditionIsTrue){
		return true;
	}

	// If something went wrong, return false.
	return false;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	PROCESSES THE LOGIC IN A TOKEN-BASED EVENT
//	Returns true / false.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Processes a single Logic Event (Extra)
// This function is the same as the above, but overloaded to use LogicStatementsExtra as the type.
function ProcessTokenLogicEvent( event : LogicStatementsExtra ){

	// Debug
	//print("DIALOG SCREEN: ProcessTokenLogicEvent()");

	// Cache token
	var token : String = DialogUI.dui.tokens[event.token].value;
	
	// Helper variables
	var valueAsFloat = floatRef();
	var argumentAsFloat = floatRef();
	var parseFailed : boolean = false;
	var conditionIsTrue : boolean = false;
	
	// EVENT -> EQUALS
	if( event.operator == DS_LOGIC_OPERATOR.Equals ){
		
		// Parse Original Value
		if ( DialogUI.ParseTokenAsFloat(token, valueAsFloat) ){							  
		}else{
		   Debug.Log("LDC: Unable to parse '{0}'." + token); 
		   parseFailed = true; 
		}
		
		// Parse Argument
		if ( DialogUI.ParseTokenAsFloat(event.compare, argumentAsFloat) ){						  
		}else{
		   Debug.Log("LDC: Unable to parse '{0}'." + event.compare);
		   parseFailed = true;  
		}
		
		// If token matches compare string (as values)
		if( !parseFailed && valueAsFloat.value == argumentAsFloat.value ){
			Debug.Log( "LDC LOGIC MATCH: " + valueAsFloat.value + " == " + argumentAsFloat.value );
			conditionIsTrue = true;
			
		// If token matches compare string
		} else if( parseFailed && token == event.compare ){
			Debug.Log( "LDC LOGIC MATCH: " + token + " == " + event.compare );
			conditionIsTrue = true;
		}
	}
	
	// EVENT -> IS NOT
	else if( event.operator == DS_LOGIC_OPERATOR.IsNot ){
		// Parse Original Value
		if ( DialogUI.ParseTokenAsFloat(token, valueAsFloat) ){	
		//	 Debug.Log(valueAsFloat);
		}else{
		   Debug.Log("LDC: Unable to parse '{0}'." + token); 
		   parseFailed = true; 
		}
		
		// Parse Argument
		if ( DialogUI.ParseTokenAsFloat(event.compare, argumentAsFloat) ){	
		//	 Debug.Log(argumentAsFloat);
		}else{
		   Debug.Log("LDC: Unable to parse '{0}'." + event.compare);
		   parseFailed = true;  
		}
		
		// If token matches compare string (as values)
		if( !parseFailed && valueAsFloat.value != argumentAsFloat.value ){
			Debug.Log( "LDC LOGIC MATCH: " + valueAsFloat.value + " != " + argumentAsFloat.value );
			conditionIsTrue = true;
			
		// If token matches compare string
		} else if( parseFailed && token != event.compare ){
			Debug.Log( "LDC LOGIC MATCH: " + token + " != " + event.compare );
			conditionIsTrue = true;
		}
	}
	
	// EVENT -> GREATER THAN
	else if( event.operator == DS_LOGIC_OPERATOR.GreaterThan ){
		
		// Parse Original Value
		if ( DialogUI.ParseTokenAsFloat(token, valueAsFloat) ){	
		//	 Debug.Log(valueAsFloat);
		}else{
		   Debug.Log("LDC: Unable to parse '{0}'." + token); 
		   parseFailed = true; 
		}
		
		// Parse Argument
		if ( DialogUI.ParseTokenAsFloat(event.compare, argumentAsFloat) ){
		//	 Debug.Log(argumentAsFloat);
		}else{
		   Debug.Log("LDC: Unable to parse '{0}'." + event.compare);
		   parseFailed = true;  
		}
		
		// Parse was successful
		if(!parseFailed){
			// If token matches compare string
			if( valueAsFloat.value > argumentAsFloat.value ){
				Debug.Log( "LDC LOGIC MATCH: " + valueAsFloat.value + " > " + argumentAsFloat.value );
				conditionIsTrue = true;
			}
		}
	}
	
	// EVENT -> LOWER THAN
	else if( event.operator == DS_LOGIC_OPERATOR.LessThan ){
		
		// Parse Original Value
		if ( DialogUI.ParseTokenAsFloat(token, valueAsFloat) ){	
		//	 Debug.Log(valueAsFloat);
		}else{
		   Debug.Log("LDC: Unable to parse '{0}'." + token); 
		   parseFailed = true; 
		}
		
		// Parse Argument
		if ( DialogUI.ParseTokenAsFloat(event.compare, argumentAsFloat) ){	
		//	 Debug.Log(argumentAsFloat);
		}else{
		   Debug.Log("LDC: Unable to parse '{0}'." + event.compare);
		   parseFailed = true;  
		}
		
		// Parse was successful
		if(!parseFailed){
			// If token matches compare string
			if( valueAsFloat.value < argumentAsFloat.value ){
				Debug.Log( "LDC LOGIC MATCH: " + valueAsFloat.value + " < " + argumentAsFloat.value );
				conditionIsTrue = true;
			}
		}
	}
	
	// DID THIS CONDITION RESULT TO TRUE?
	if(conditionIsTrue){
		return true;
	}

	// If something went wrong, return false.
	return false;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	PROCESSES THE LOGIC IN A PLAYER PREFS-BASED EVENT
//	Returns true / false.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function ProcessPlayerPrefsLogicEvent( event : LogicStatements ){

	// ======================
	// AUTO FALSES
	// ======================

	// Debug
	print("DIALOG SCREEN: ProcessPlayerPrefsLogicEvent()");

	// If this key doesn't exist, or is "", return false now.
	if( event.ppKey == "" || 
		#if UNITY_POSTBRUTAL
			event.ppOperator != DS_PLAYERPREF_LOGIC_OPERATOR.DoesNotExist && Engine.com != null && Engine.HasKey(event.ppKey) == false ||
			event.ppOperator != DS_PLAYERPREF_LOGIC_OPERATOR.DoesNotExist && Engine.com == null && PlayerPrefs.HasKey(event.ppKey) == false 
		#else
			event.ppOperator != DS_PLAYERPREF_LOGIC_OPERATOR.DoesNotExist && PlayerPrefs.HasKey(event.ppKey) == false 
		#endif
	){
		Debug.Log("LDC: PlayerPrefs Key (\""+event.ppKey+"\") Does not exist or is blank - logic returned false.");
		return false;
	}

	// If this is a String and we're using greater than / less than, automatically return false.
	if( event.logicType == DS_LOGIC_TYPE.PrefString && 
		(event.ppOperator == DS_PLAYERPREF_LOGIC_OPERATOR.GreaterThan || event.ppOperator == DS_PLAYERPREF_LOGIC_OPERATOR.LessThan )
	){
		Debug.Log("LDC: PlayerPrefs strings are not compatible with greater than / less than operators - logic returned false.");
		return false;
	}

	// ======================
	// AUTO TRUES
	// ======================

	// If we are checking that a key shouldn't exist, and it doesn't, return true now.
	if( event.ppKey != "" && 
		#if UNITY_POSTBRUTAL
			event.ppOperator == DS_PLAYERPREF_LOGIC_OPERATOR.DoesNotExist && Engine.com != null && Engine.HasKey(event.ppKey) == false ||
			event.ppOperator == DS_PLAYERPREF_LOGIC_OPERATOR.DoesNotExist && Engine.com == null && PlayerPrefs.HasKey(event.ppKey) == false 
		#else
			event.ppOperator == DS_PLAYERPREF_LOGIC_OPERATOR.DoesNotExist && PlayerPrefs.HasKey(event.ppKey) == false 
		#endif
	){
		Debug.Log("LDC: PlayerPrefs Key (\""+event.ppKey+"\") Does not exist - logic returned true.");
		return true;
	}

	// If we are checking that a key should exist, and it does, return true now...
	if( event.ppKey != "" && 
		#if UNITY_POSTBRUTAL
			event.ppOperator == DS_PLAYERPREF_LOGIC_OPERATOR.Exists && Engine.com != null && Engine.HasKey(event.ppKey) == true ||
			event.ppOperator == DS_PLAYERPREF_LOGIC_OPERATOR.Exists && Engine.com == null && PlayerPrefs.HasKey(event.ppKey) == true 
		#else
			event.ppOperator == DS_PLAYERPREF_LOGIC_OPERATOR.Exists && PlayerPrefs.HasKey(event.ppKey) == true 
		#endif
	){
		Debug.Log("LDC: PlayerPrefs Key (\""+event.ppKey+"\") Exists - logic returned true.");
		return true;
	}

	// ======================
	// SETUP TOKEN VARIABLE
	// ======================
	
	#if UNITY_POSTBRUTAL

		// Setup token variable we'll use to test.
		var token : String;

		// Use the Engine routines as the primary method.
		if( Engine.com != null && Engine.HasKey(event.ppKey) == true ){
			if( event.logicType == DS_LOGIC_TYPE.PrefString ){
				token = Engine.GetString(event.ppKey);
			} else if( event.logicType == DS_LOGIC_TYPE.PrefFloat ){
				token = Engine.GetFloat(event.ppKey).ToString();
			} else if( event.logicType == DS_LOGIC_TYPE.PrefInt){
				token = Engine.GetInt(event.ppKey).ToString();
			}

		// Otherwise, try to get the key using PlayerPrefs	
		} else if ( Engine.com == null && PlayerPrefs.HasKey(event.ppKey) == true){
			if( event.logicType == DS_LOGIC_TYPE.PrefString ){
			token = PlayerPrefs.GetString(event.ppKey);
			} else if( event.logicType == DS_LOGIC_TYPE.PrefFloat ){
				token = PlayerPrefs.GetFloat(event.ppKey).ToString();
			} else if( event.logicType == DS_LOGIC_TYPE.PrefInt){
				token = PlayerPrefs.GetInt(event.ppKey).ToString();
			}
		}

	// COMMERCIAL LDC	
	#else
		// Cache Playerprefs value into token string.
		var token : String;
		if( event.logicType == DS_LOGIC_TYPE.PrefString ){
			token = PlayerPrefs.GetString(event.ppKey);
		} else if( event.logicType == DS_LOGIC_TYPE.PrefFloat ){
			token = PlayerPrefs.GetFloat(event.ppKey).ToString();
		} else if( event.logicType == DS_LOGIC_TYPE.PrefInt){
			token = PlayerPrefs.GetInt(event.ppKey).ToString();
		}
	#endif

	// ======================
	// RUN THE LOGIC
	// ======================

	// Helper variables
	var valueAsFloat = floatRef();
	var argumentAsFloat = floatRef();
	var parseFailed : boolean = false;
	var conditionIsTrue : boolean = false;
	
	// EVENT -> EQUALS
	if( event.ppOperator == DS_PLAYERPREF_LOGIC_OPERATOR.Equals ){
		
		// Parse Original Value
		if ( DialogUI.ParseTokenAsFloat(token, valueAsFloat) ){							  
		}else{
		   Debug.Log("LDC: Unable to parse '{0}'." + token); 
		   parseFailed = true; 
		}
		
		// Parse Argument
		if ( DialogUI.ParseTokenAsFloat(event.compare, argumentAsFloat) ){						  
		}else{
		   Debug.Log("LDC: Unable to parse '{0}'." + event.compare);
		   parseFailed = true;  
		}
		
		// If token matches compare string (as values)
		if( !parseFailed && valueAsFloat.value == argumentAsFloat.value ){
			Debug.Log( "LDC LOGIC MATCH: " + valueAsFloat.value + " == " + argumentAsFloat.value );
			conditionIsTrue = true;
			
		// If token matches compare string
		} else if( parseFailed && token == event.compare ){
			Debug.Log( "LDC LOGIC MATCH: " + token + " == " + event.compare );
			conditionIsTrue = true;
		}
	}
	
	// EVENT -> IS NOT
	else if( event.ppOperator == DS_PLAYERPREF_LOGIC_OPERATOR.IsNot ){
		// Parse Original Value
		if ( DialogUI.ParseTokenAsFloat(token, valueAsFloat) ){	
		//	 Debug.Log(valueAsFloat);
		}else{
		   Debug.Log("LDC: Unable to parse '{0}'." + token); 
		   parseFailed = true; 
		}
		
		// Parse Argument
		if ( DialogUI.ParseTokenAsFloat(event.compare, argumentAsFloat) ){	
		//	 Debug.Log(argumentAsFloat);
		}else{
		   Debug.Log("LDC: Unable to parse '{0}'." + event.compare);
		   parseFailed = true;  
		}
		
		// If token matches compare string (as values)
		if( !parseFailed && valueAsFloat.value != argumentAsFloat.value ){
			Debug.Log( "LDC LOGIC MATCH: " + valueAsFloat.value + " != " + argumentAsFloat.value );
			conditionIsTrue = true;
			
		// If token matches compare string
		} else if( parseFailed && token != event.compare ){
			Debug.Log( "LDC LOGIC MATCH: " + token + " != " + event.compare );
			conditionIsTrue = true;
		}
	}
	
	// EVENT -> GREATER THAN
	else if( event.ppOperator == DS_PLAYERPREF_LOGIC_OPERATOR.GreaterThan ){
		
		// Parse Original Value
		if ( DialogUI.ParseTokenAsFloat(token, valueAsFloat) ){	
		//	 Debug.Log(valueAsFloat);
		}else{
		   Debug.Log("LDC: Unable to parse '{0}'." + token); 
		   parseFailed = true; 
		}
		
		// Parse Argument
		if ( DialogUI.ParseTokenAsFloat(event.compare, argumentAsFloat) ){
		//	 Debug.Log(argumentAsFloat);
		}else{
		   Debug.Log("LDC: Unable to parse '{0}'." + event.compare);
		   parseFailed = true;  
		}
		
		// Parse was successful
		if(!parseFailed){
			// If token matches compare string
			if( valueAsFloat.value > argumentAsFloat.value ){
				Debug.Log( "LDC LOGIC MATCH: " + valueAsFloat.value + " > " + argumentAsFloat.value );
				conditionIsTrue = true;
			}
		}
	}
	
	// EVENT -> LOWER THAN
	else if( event.ppOperator == DS_PLAYERPREF_LOGIC_OPERATOR.LessThan ){
		
		// Parse Original Value
		if ( DialogUI.ParseTokenAsFloat(token, valueAsFloat) ){	
		//	 Debug.Log(valueAsFloat);
		}else{
		   Debug.Log("LDC: Unable to parse '{0}'." + token); 
		   parseFailed = true; 
		}
		
		// Parse Argument
		if ( DialogUI.ParseTokenAsFloat(event.compare, argumentAsFloat) ){	
		//	 Debug.Log(argumentAsFloat);
		}else{
		   Debug.Log("LDC: Unable to parse '{0}'." + event.compare);
		   parseFailed = true;  
		}
		
		// Parse was successful
		if(!parseFailed){
			// If token matches compare string
			if( valueAsFloat.value < argumentAsFloat.value ){
				Debug.Log( "LDC LOGIC MATCH: " + valueAsFloat.value + " < " + argumentAsFloat.value );
				conditionIsTrue = true;
			}
		}
	}
	
	// DID THIS CONDITION RESULT TO TRUE?
	if(conditionIsTrue){
		return true;
	}

	// If something went wrong, return false.
	return false;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	PROCESSES THE LOGIC IN A PLAYER PREFS-BASED EVENT (EXTRA)
//	Returns true / false.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// NOTE: This is the same as the above function but overloaded to use LogicStatementsExtra as the filetype
function ProcessPlayerPrefsLogicEvent( event : LogicStatementsExtra ){

	// ======================
	// AUTO FALSES
	// ======================

	// Debug
	print("DIALOG SCREEN: ProcessPlayerPrefsLogicEvent()");

	// If this key doesn't exist, or is "", return false now.
	if( event.ppKey == "" || 
		#if UNITY_POSTBRUTAL
			event.ppOperator != DS_PLAYERPREF_LOGIC_OPERATOR.DoesNotExist && Engine.com != null && Engine.HasKey(event.ppKey) == false ||
			event.ppOperator != DS_PLAYERPREF_LOGIC_OPERATOR.DoesNotExist && Engine.com == null && PlayerPrefs.HasKey(event.ppKey) == false 
		#else
			event.ppOperator != DS_PLAYERPREF_LOGIC_OPERATOR.DoesNotExist && PlayerPrefs.HasKey(event.ppKey) == false 
		#endif
	){
		Debug.Log("LDC: PlayerPrefs Key (\""+event.ppKey+"\") Does not exist or is blank - logic returned false.");
		return false;
	}

	// If this is a String and we're using greater than / less than, automatically return false.
	if( event.logicType == DS_LOGIC_TYPE.PrefString && 
		(event.ppOperator == DS_PLAYERPREF_LOGIC_OPERATOR.GreaterThan || event.ppOperator == DS_PLAYERPREF_LOGIC_OPERATOR.LessThan )
	){
		Debug.Log("LDC: PlayerPrefs strings are not compatible with greater than / less than operators - logic returned false.");
		return false;
	}

	// ======================
	// AUTO TRUES
	// ======================

	// If we are checking that a key shouldn't exist, and it doesn't, return true now.
	if( event.ppKey != "" && 
		#if UNITY_POSTBRUTAL
			event.ppOperator == DS_PLAYERPREF_LOGIC_OPERATOR.DoesNotExist && Engine.com != null && Engine.HasKey(event.ppKey) == false ||
			event.ppOperator == DS_PLAYERPREF_LOGIC_OPERATOR.DoesNotExist && Engine.com == null && PlayerPrefs.HasKey(event.ppKey) == false 
		#else
			event.ppOperator == DS_PLAYERPREF_LOGIC_OPERATOR.DoesNotExist && PlayerPrefs.HasKey(event.ppKey) == false 
		#endif
	){
		Debug.Log("LDC: PlayerPrefs Key (\""+event.ppKey+"\") Does not exist - logic returned true.");
		return true;
	}

	// If we are checking that a key should exist, and it does, return true now...
	if( event.ppKey != "" && 
		#if UNITY_POSTBRUTAL
			event.ppOperator == DS_PLAYERPREF_LOGIC_OPERATOR.Exists && Engine.com != null && Engine.HasKey(event.ppKey) == true ||
			event.ppOperator == DS_PLAYERPREF_LOGIC_OPERATOR.Exists && Engine.com == null && PlayerPrefs.HasKey(event.ppKey) == true 
		#else
			event.ppOperator == DS_PLAYERPREF_LOGIC_OPERATOR.Exists && PlayerPrefs.HasKey(event.ppKey) == true 
		#endif
	){
		Debug.Log("LDC: PlayerPrefs Key (\""+event.ppKey+"\") Exists - logic returned true.");
		return true;
	}

	// ======================
	// SETUP TOKEN VARIABLE
	// ======================
	
	#if UNITY_POSTBRUTAL

		// Setup token variable we'll use to test.
		var token : String;

		// Use the Engine routines as the primary method.
		if( Engine.com != null && Engine.HasKey(event.ppKey) == true ){
			if( event.logicType == DS_LOGIC_TYPE.PrefString ){
				token = Engine.GetString(event.ppKey);
			} else if( event.logicType == DS_LOGIC_TYPE.PrefFloat ){
				token = Engine.GetFloat(event.ppKey).ToString();
			} else if( event.logicType == DS_LOGIC_TYPE.PrefInt){
				token = Engine.GetInt(event.ppKey).ToString();
			}

		// Otherwise, try to get the key using PlayerPrefs	
		} else if ( Engine.com == null && PlayerPrefs.HasKey(event.ppKey) == true){
			if( event.logicType == DS_LOGIC_TYPE.PrefString ){
			token = PlayerPrefs.GetString(event.ppKey);
			} else if( event.logicType == DS_LOGIC_TYPE.PrefFloat ){
				token = PlayerPrefs.GetFloat(event.ppKey).ToString();
			} else if( event.logicType == DS_LOGIC_TYPE.PrefInt){
				token = PlayerPrefs.GetInt(event.ppKey).ToString();
			}
		}

	// COMMERCIAL LDC	
	#else
		// Cache Playerprefs value into token string.
		var token : String;
		if( event.logicType == DS_LOGIC_TYPE.PrefString ){
			token = PlayerPrefs.GetString(event.ppKey);
		} else if( event.logicType == DS_LOGIC_TYPE.PrefFloat ){
			token = PlayerPrefs.GetFloat(event.ppKey).ToString();
		} else if( event.logicType == DS_LOGIC_TYPE.PrefInt){
			token = PlayerPrefs.GetInt(event.ppKey).ToString();
		}
	#endif

	// ======================
	// RUN THE LOGIC
	// ======================

	// Helper variables
	var valueAsFloat = floatRef();
	var argumentAsFloat = floatRef();
	var parseFailed : boolean = false;
	var conditionIsTrue : boolean = false;
	
	// EVENT -> EQUALS
	if( event.ppOperator == DS_PLAYERPREF_LOGIC_OPERATOR.Equals ){
		
		// Parse Original Value
		if ( DialogUI.ParseTokenAsFloat(token, valueAsFloat) ){							  
		}else{
		   Debug.Log("LDC: Unable to parse '{0}'." + token); 
		   parseFailed = true; 
		}
		
		// Parse Argument
		if ( DialogUI.ParseTokenAsFloat(event.compare, argumentAsFloat) ){						  
		}else{
		   Debug.Log("LDC: Unable to parse '{0}'." + event.compare);
		   parseFailed = true;  
		}
		
		// If token matches compare string (as values)
		if( !parseFailed && valueAsFloat.value == argumentAsFloat.value ){
			Debug.Log( "LDC LOGIC MATCH: " + valueAsFloat.value + " == " + argumentAsFloat.value );
			conditionIsTrue = true;
			
		// If token matches compare string
		} else if( parseFailed && token == event.compare ){
			Debug.Log( "LDC LOGIC MATCH: " + token + " == " + event.compare );
			conditionIsTrue = true;
		}
	}
	
	// EVENT -> IS NOT
	else if( event.ppOperator == DS_PLAYERPREF_LOGIC_OPERATOR.IsNot ){
		// Parse Original Value
		if ( DialogUI.ParseTokenAsFloat(token, valueAsFloat) ){	
		//	 Debug.Log(valueAsFloat);
		}else{
		   Debug.Log("LDC: Unable to parse '{0}'." + token); 
		   parseFailed = true; 
		}
		
		// Parse Argument
		if ( DialogUI.ParseTokenAsFloat(event.compare, argumentAsFloat) ){	
		//	 Debug.Log(argumentAsFloat);
		}else{
		   Debug.Log("LDC: Unable to parse '{0}'." + event.compare);
		   parseFailed = true;  
		}
		
		// If token matches compare string (as values)
		if( !parseFailed && valueAsFloat.value != argumentAsFloat.value ){
			Debug.Log( "LDC LOGIC MATCH: " + valueAsFloat.value + " != " + argumentAsFloat.value );
			conditionIsTrue = true;
			
		// If token matches compare string
		} else if( parseFailed && token != event.compare ){
			Debug.Log( "LDC LOGIC MATCH: " + token + " != " + event.compare );
			conditionIsTrue = true;
		}
	}
	
	// EVENT -> GREATER THAN
	else if( event.ppOperator == DS_PLAYERPREF_LOGIC_OPERATOR.GreaterThan ){
		
		// Parse Original Value
		if ( DialogUI.ParseTokenAsFloat(token, valueAsFloat) ){	
		//	 Debug.Log(valueAsFloat);
		}else{
		   Debug.Log("LDC: Unable to parse '{0}'." + token); 
		   parseFailed = true; 
		}
		
		// Parse Argument
		if ( DialogUI.ParseTokenAsFloat(event.compare, argumentAsFloat) ){
		//	 Debug.Log(argumentAsFloat);
		}else{
		   Debug.Log("LDC: Unable to parse '{0}'." + event.compare);
		   parseFailed = true;  
		}
		
		// Parse was successful
		if(!parseFailed){
			// If token matches compare string
			if( valueAsFloat.value > argumentAsFloat.value ){
				Debug.Log( "LDC LOGIC MATCH: " + valueAsFloat.value + " > " + argumentAsFloat.value );
				conditionIsTrue = true;
			}
		}
	}
	
	// EVENT -> LOWER THAN
	else if( event.ppOperator == DS_PLAYERPREF_LOGIC_OPERATOR.LessThan ){
		
		// Parse Original Value
		if ( DialogUI.ParseTokenAsFloat(token, valueAsFloat) ){	
		//	 Debug.Log(valueAsFloat);
		}else{
		   Debug.Log("LDC: Unable to parse '{0}'." + token); 
		   parseFailed = true; 
		}
		
		// Parse Argument
		if ( DialogUI.ParseTokenAsFloat(event.compare, argumentAsFloat) ){	
		//	 Debug.Log(argumentAsFloat);
		}else{
		   Debug.Log("LDC: Unable to parse '{0}'." + event.compare);
		   parseFailed = true;  
		}
		
		// Parse was successful
		if(!parseFailed){
			// If token matches compare string
			if( valueAsFloat.value < argumentAsFloat.value ){
				Debug.Log( "LDC LOGIC MATCH: " + valueAsFloat.value + " < " + argumentAsFloat.value );
				conditionIsTrue = true;
			}
		}
	}
	
	// DID THIS CONDITION RESULT TO TRUE?
	if(conditionIsTrue){
		return true;
	}

	// If something went wrong, return false.
	return false;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	IS LOGIC TRUE
//	Evaluates a single logic statement and returns true / false
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function IsLogicTrue( event : LogicStatements ){

	// PROCESS THE LOGIC EVENT
	if( // If this is a Token based event, make sure there are tokens setup, and attempt to process the event.
		event.logicType == DS_LOGIC_TYPE.Token && DialogUI.dui.tokens.length > 0 && ProcessTokenLogicEvent(event) == true ||

		// If this is a PlayerPrefs based event, attempt to process the event.
		event.logicType != DS_LOGIC_TYPE.Token && ProcessPlayerPrefsLogicEvent(event) == true
	){
		return true;
	}
		
	// If anything went wrong, return false
	return false;	

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	SETUP BACKGROUND LAYERS
//	Applies the correct settings to the DialogUI
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function SetupBackgroundLayers(){

	// Make sure the array is valid
	if( DialogUI != null && DialogUI.dui != null && actions.sceneLayers != null && actions.sceneLayers.length > 0 ){
		
		// SETUP BACKGROUND LAYERS		
		// Loop through the scene Layers
		var counter : int = 0;
		for( var sceneLayer : DialogUIBackgroundLayers in actions.sceneLayers ){
			
			// If we are supposed to setup this layer ..
			if(sceneLayer != null && DialogUI.dui.bgLayers[counter] != null && (sceneLayer.setLayer || actions.fadeAllSceneLayers) ){
				
				// Normal setup if we're not fading out the entire scene
				if(!actions.fadeAllSceneLayers){
					DialogUI.dui.bgLayers[counter].tex = sceneLayer.tex;
					DialogUI.dui.bgLayers[counter].scale = sceneLayer.scale;
					DialogUI.dui.bgLayers[counter].display = sceneLayer.display;
					DialogUI.dui.bgLayers[counter].animationID = sceneLayer.animationID;
				}
				
				// Setup DialogUI Animation
				if( DialogUI.dui.bgLayers[counter].animationID != Vector2(-1,-1) && 
					DialogScenes!=null && 
					DialogScenes.GetAnimation( DialogUI.dui.bgLayers[counter].animationID.x, DialogUI.dui.bgLayers[counter].animationID.y) != null 
				){
					// Cache the correct DialogCastActor
					var dca : DialogCastActor = DialogScenes.GetAnimation( DialogUI.dui.bgLayers[counter].animationID.x, DialogUI.dui.bgLayers[counter].animationID.y);
					
					// Setup a new DialogCastActor variable and copy over the settings.
					DialogUI.dui.bgLayers[counter].anim = new DialogCastActor();
					DialogUI.dui.bgLayers[counter].anim.name = dca.name;
					DialogUI.dui.bgLayers[counter].anim.icon = dca.icon;
					DialogUI.dui.bgLayers[counter].anim.animated = dca.animated;
					DialogUI.dui.bgLayers[counter].anim.frames = dca.frames;
					DialogUI.dui.bgLayers[counter].anim.loopToFrame = dca.loopToFrame;
					DialogUI.dui.bgLayers[counter].anim.animationSpeed = dca.animationSpeed;
					DialogUI.dui.bgLayers[counter].anim.timer = 0;
					DialogUI.dui.bgLayers[counter].anim.currentFrame = 0;
					
				} else {
					DialogUI.dui.bgLayers[counter].anim = null;	
				}
				
				// Instant Transitions
				if( actions.fadeAllSceneLayers ){
					DialogUI.dui.bgLayers[counter].display = DUI_LAYER_STATUS.FadeOut;
					DialogUI.dui.bgLayers[counter].opacity = 1;	
					
				}else if( DialogUI.dui.bgLayers[counter].display == DUI_LAYER_STATUS.FadeIn ){
					DialogUI.dui.bgLayers[counter].opacity = 0;
					
				} else if( DialogUI.dui.bgLayers[counter].display == DUI_LAYER_STATUS.FadeOut ){
					DialogUI.dui.bgLayers[counter].opacity = 1;	
					
				} else if( DialogUI.dui.bgLayers[counter].display == DUI_LAYER_STATUS.Hide ){
					DialogUI.dui.bgLayers[counter].opacity = 0;
					DialogUI.dui.bgLayers[counter].tex = null;
					
				} else if ( DialogUI.dui.bgLayers[counter].display == DUI_LAYER_STATUS.Show ){
					DialogUI.dui.bgLayers[counter].opacity = 1;
				}
			}
			
			// increment counter
			counter++;
			
		}
		
		// POST OPTIMIZATION
		// Check if any background layers are active, then we'll turn on the optimization variable to display the backgrounds.
		var displayBackgroundLayers : boolean = false;
		for(var bgLayer : DialogUIBackgroundLayers in DialogUI.dui.bgLayers ){
			if(bgLayer!=null && bgLayer.display != DUI_LAYER_STATUS.Hide ){
				displayBackgroundLayers = true;
			}
		}
		
		// Set the optimization
		DialogUI.dui.displayBackgroundLayers = displayBackgroundLayers;
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	SETUP ACTOR LAYERS
//	Applies the correct settings to the DialogUI
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function SetupActorLayers(){

	// Make sure the array is valid
	if( DialogUI != null && DialogUI.dui != null && actions.actorLayers != null && actions.actorLayers.length > 0 ){
		
		// SETUP BACKGROUND LAYERS		
		// Loop through the scene Layers
		var counter : int = 0;
		for( var actorLayer : DialogUIActorLayers in actions.actorLayers ){
			
			// If we are supposed to setup this layer ..
			if(actorLayer != null && DialogUI.dui.bgActors[counter] != null &&  (actorLayer.setLayer || actions.fadeAllActorLayers) ){
				
				// Normal setup if we're not fading out the entire scene
				if(!actions.fadeAllActorLayers){
					DialogUI.dui.bgActors[counter].tex = actorLayer.tex;
					DialogUI.dui.bgActors[counter].scale = actorLayer.scale;
					DialogUI.dui.bgActors[counter].display = actorLayer.display;
					DialogUI.dui.bgActors[counter].allignment = actorLayer.allignment;
					DialogUI.dui.bgActors[counter].motion = actorLayer.motion;
					DialogUI.dui.bgActors[counter].offset = actorLayer.offset;
					DialogUI.dui.bgActors[counter].animationID = actorLayer.animationID;
					
					// Setup DialogUI Animation
					if( DialogUI.dui.bgActors[counter].animationID != Vector2(-1,-1) && 
						DialogCast!=null && 
						DialogCast.GetAnimation( DialogUI.dui.bgActors[counter].animationID.x, DialogUI.dui.bgActors[counter].animationID.y) != null 
					){
						// Cache the correct DialogCastActor
						var dca : DialogCastActor = DialogCast.GetAnimation( DialogUI.dui.bgActors[counter].animationID.x, DialogUI.dui.bgActors[counter].animationID.y);
						
						// Setup a new DialogCastActor variable and copy over the settings.
						DialogUI.dui.bgActors[counter].anim = new DialogCastActor();
						DialogUI.dui.bgActors[counter].anim.name = dca.name;
						DialogUI.dui.bgActors[counter].anim.icon = dca.icon;
						DialogUI.dui.bgActors[counter].anim.animated = dca.animated;
						DialogUI.dui.bgActors[counter].anim.frames = dca.frames;
						DialogUI.dui.bgActors[counter].anim.loopToFrame = dca.loopToFrame;
						DialogUI.dui.bgActors[counter].anim.animationSpeed = dca.animationSpeed;
						DialogUI.dui.bgActors[counter].anim.timer = 0;
						DialogUI.dui.bgActors[counter].anim.currentFrame = 0;
					
					
					} else {
						DialogUI.dui.bgActors[counter].anim = null;	
					}
					
					
					// Calculate Size using the original source texture
					if( actorLayer.tex != null ){
						
						// Calculate Rect Size
						DialogUI.dui.bgActors[counter].rect.width = actorLayer.tex.width*( actorLayer.size / 100 );
						DialogUI.dui.bgActors[counter].rect.height = actorLayer.tex.height*( actorLayer.size / 100 );
						
						// Calculate Rect Position
						DialogUI.dui.bgActors[counter].rect = CalculateRectPosition( DialogUI.dui.bgActors[counter].rect, DialogUI.dui.bgActors[counter].allignment, DialogUI.dui.bgActors[counter].offset );
					}
				}
				
				// Instant Transitions
				if( actions.fadeAllActorLayers ){
					DialogUI.dui.bgActors[counter].display = DUI_LAYER_STATUS.FadeOut;
					DialogUI.dui.bgActors[counter].opacity = 1;	
					
				}else if( DialogUI.dui.bgActors[counter].display == DUI_LAYER_STATUS.FadeIn ){
					DialogUI.dui.bgActors[counter].opacity = 0;
					
				} else if( DialogUI.dui.bgActors[counter].display == DUI_LAYER_STATUS.FadeOut ){
					DialogUI.dui.bgActors[counter].opacity = 1;	
					
				} else if( DialogUI.dui.bgActors[counter].display == DUI_LAYER_STATUS.Hide ){
					DialogUI.dui.bgActors[counter].opacity = 0;
					DialogUI.dui.bgActors[counter].tex = null;
					
				} else if ( DialogUI.dui.bgActors[counter].display == DUI_LAYER_STATUS.Show ){
					DialogUI.dui.bgActors[counter].opacity = 1;
				}
			}
			
			// increment counter
			counter++;
			
		}
		
		// POST OPTIMIZATION
		// Check if any background layers are active, then we'll turn on the optimization variable to display the backgrounds.
		var displayActorLayers : boolean = false;
		for(var bgActor : DialogUIActorLayers in DialogUI.dui.bgActors ){
			if(bgActor!=null && bgActor.display != DUI_LAYER_STATUS.Hide ){
				displayActorLayers = true;
			}
		}
		
		// Set the optimization
		DialogUI.dui.displayActorLayers = displayActorLayers;
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	CALCULATE RECT POSITION
//	Using a rect with the width and height already set, and the allignment and offsets sent as args, we'll return a complete rect with a position
//	NOTE: Based on screen res of 960x640
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function CalculateRectPosition( theRect : Rect, pos : DUI_ACTOR_ALLIGN, offset : Vector2 ){
	
	//Debug.Log("Fixing Rect Position");
	
	// TOP LEFT
	if( pos == DUI_ACTOR_ALLIGN.TopLeft ){
		theRect.x = 0;
		theRect.y = 0;
	}
	
	// TOP
	else if( pos == DUI_ACTOR_ALLIGN.Top ){
		theRect.x = (960/2)-(theRect.width/2);
		theRect.y = 0;
	}
	
	// TOP RIGHT
	else if( pos == DUI_ACTOR_ALLIGN.TopRight ){
		theRect.x = 960 - theRect.width;
		theRect.y = 0;
	}
	
	// LEFT
	else if( pos == DUI_ACTOR_ALLIGN.MidLeft ){
		theRect.x = 0;
		theRect.y = (640/2)-(theRect.height/2);
	}
	
	// MIDDLE
	else if( pos == DUI_ACTOR_ALLIGN.Middle ){
		theRect.x = (960/2)-(theRect.width/2);
		theRect.y = (640/2)-(theRect.height/2);
	}
	
	// RIGHT
	else if( pos == DUI_ACTOR_ALLIGN.MidRight ){
		theRect.x = 960 - theRect.width;
		theRect.y = (640/2)-(theRect.height/2);
	}
	
	// BOTTOM LEFT
	else if( pos == DUI_ACTOR_ALLIGN.BotLeft ){
		theRect.x = 0;
		theRect.y = 640 - theRect.height;
	}
	
	// BOTTOM
	else if( pos == DUI_ACTOR_ALLIGN.Bottom ){
		theRect.x = (960/2)-(theRect.width/2);
		theRect.y = 640 - theRect.height;
	}
	
	// BOTTOM RIGHT
	else if( pos == DUI_ACTOR_ALLIGN.BotRight ){
		theRect.x = 960 - theRect.width;
		theRect.y = 640 - theRect.height;
	}
	
	// ADD OFFSET
	theRect.x += offset.x;
	theRect.y += offset.y;
	
	// Returns the complete Rect
	return theRect;
	
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	SETUP AUDIO ACTIONS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function SetupAudioActions(){
	
	// Make sure we can see the DialogUI
	if( DialogUI != null && DialogUI.dui != null ){
			
		// ID 0 - Music Channel
		if( actions.music.action != DSAudioAction.None ){
			DialogUI.dui.SetupAudio( 0, CreateAudioSetupInstance( actions.music ) );
		}
		
		// ID 1 - SFX 1 Channel
		if( actions.sfx1.action != DSAudioAction.None ){
			DialogUI.dui.SetupAudio( 1, CreateAudioSetupInstance( actions.sfx1 ) );
		}
		
		// ID 2 - SFX 2 Channel
		if( actions.sfx2.action != DSAudioAction.None ){
			DialogUI.dui.SetupAudio( 2, CreateAudioSetupInstance( actions.sfx2 ) );
		}
		
		// ID 3 - SFX 3 Channel
		if( actions.sfx3.action != DSAudioAction.None ){
			DialogUI.dui.SetupAudio( 3, CreateAudioSetupInstance( actions.sfx3 ) );
		}
	
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	CREATE AUDIO SETUP INSTANCE
//	Creates an instance of the DSAudioSetup class and returns it
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function CreateAudioSetupInstance( setup : DSAudioSetup ){
	
	// Create a new class
	var newSetup : DSAudioSetup = new DSAudioSetup();
	
	// Copy the values from the original setup
	newSetup.source = setup.source;
	newSetup.action = setup.action;
	newSetup.useAudioPath = setup.useAudioPath;
	newSetup.playFromPath = setup.playFromPath;
	newSetup.clip = setup.clip;
	newSetup.volume = setup.volume;
	newSetup.currentVolume = setup.currentVolume;
	newSetup.pitch = setup.pitch;
	newSetup.loop = setup.loop;
	newSetup.fadeDuration = setup.fadeDuration;

	// Return the instance
	return newSetup;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	PREPARE NEW DIALOGS AND LOAD LEVELS AT END
//	Handles linking to new scenes and new dialogs
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function PrepareNewDialogsAndLoadLevelsAtEnd(){

	// Restart Level At End?
	if( navigation.restartLevelAtEnd ){

		DialogUI.API_LoadLevel( Application.loadedLevelName );

	// Load Level At End?
	} else if ( navigation.loadLevelAtEnd != "" ){

		DialogUI.API_LoadLevel( navigation.loadLevelAtEnd );

	// Check for Dialog prefabs..
	} else if( navigation.instantiateDialogPrefabAtEnd != null ){
		//DialogUI.API_CreateDialog(navigation.instantiateDialogPrefabAtEnd); // Old Routine.

		var createdDialogGO : GameObject = Instantiate(navigation.instantiateDialogPrefabAtEnd);
		if(createdDialogGO!=null && createdDialogGO.GetComponent(DialogController)!=null){
			var createdDC : DialogController = createdDialogGO.GetComponent(DialogController);
			DialogUI.changeThreadDC = createdDC;
			DialogUI.changeThreadOverrideID = navigation.newStartID;
		} else {
			Debug.Log("LDC: Warning - The Object you have created to play does not have a DialogController. This navigation action was skipped.");
		}

	// Otherwise, see if we can find a dialog to play in the scene	
	} else if ( navigation.findAndPlayOtherDialogAtEnd != "" ){

		// Does this object exist?
		if( GameObject.Find(navigation.findAndPlayOtherDialogAtEnd) != null ){

			// Cache the GameObject
			var findGO : GameObject = GameObject.Find(navigation.findAndPlayOtherDialogAtEnd);

			// Make sure its valid and has a DialogController
			if( findGO != null && findGO.GetComponent(DialogController) != null ){
				var findDC : DialogController = findGO.GetComponent(DialogController);
				//findDC.Play();
				DialogUI.changeThreadDC = findDC;
				DialogUI.changeThreadOverrideID = navigation.newStartID;

			} else {
				Debug.Log("LDC: Warning - The Object you are to find and play does not have a DialogController. This navigation action was skipped.");
			}
		} else {
			Debug.Log("LDC: Warning - The Object you are to find and play could not be found. This navigation action was skipped.");
		}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	NAVIGATION CALLBACK
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function NavigationCallback( buttonID : int, buttonName : String ){

	// Debug Navigation Callback
	/*
	Debug.Log(
			"LDC GameObject Name:"+	gameObject.name + " \n" +
			"GameObject To Find: "+	navigation.navigationCallbackGOName + " \n" +
			"Function: "+			navigation.navigationCallbackFunctionName + " \n" +
			"DialogID: "+			dialogID + " \n" +
			"ButtonID: "+			buttonID + " \n" +
			"ButtonName: "+			buttonName + " \n" +
			"Custom String: "+		navigation.navigationCallbackArg
	);
	*/

	// If we've setup a GameObject to find and a function, then send the navigation callback...
	if( navigation.navigationCallbackGOName != "" &&
		navigation.navigationCallbackFunctionName == ""
	){	
		Debug.Log("LDC: Couldn't create Navigation callback on DialogID "+dialogID+". No function name was given.");

	// If we've setup a GameObject to find and a function, then send the navigation callback...
	} else if( navigation.navigationCallbackGOName != "" &&
		navigation.navigationCallbackFunctionName != ""
	){
		// Make sure the GameObject to find exists
		if( GameObject.Find(navigation.navigationCallbackGOName) != null ){

			// Cache the GameObject
			var goSM : GameObject = GameObject.Find(navigation.navigationCallbackGOName);

			// Send message log
			Debug.Log("LDC: Sending NavigationCallback to GameObject: "+ goSM.name+"...");

			// Send the message
			goSM.SendMessage(
				navigation.navigationCallbackFunctionName,
				[gameObject.name, dialogID.ToString(), buttonID.ToString(), buttonName, DialogUI.dui.ApplyTokens(navigation.navigationCallbackArg) ] as String[],
				SendMessageOptions.DontRequireReceiver
			);

		// GameObject doesn't exist...
		} else {
			Debug.Log("LDC: Couldn't create Navigation callback on DialogID "+dialogID+". Couldn't use SendMessage because the GameObject named '"+navigation.navigationCallbackGOName + "'' was not found in the scene.");
		}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	THE DIALOGUI HAS REPORTED THE USER JUST PRESSED THE SKIP BUTTON
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Skip(){
		
	// Make sure we're not forcing the dialogUI close
	if ( DialogUI.status != DUISTATUS.FORCECLOSE ){
	
		// End the dialog now
		if( navigation.endDialogAfterThis ){
			
			// Setup Screen
			isActive = false;
			
			// Setup Dialog Controller to end, unless we are connecting to a new thread
			if( navigation.instantiateDialogPrefabAtEnd == null && navigation.findAndPlayOtherDialogAtEnd == "" ){

				// Setup Dialog UI
				DialogUI.isActive = false;
				DialogUI.status = DUISTATUS.ENDED;
				DialogUI.screenDuration = 0;

				dc.status = DCSTATUS.ENDED;
				dc.currentScreen = null;
				dc.currentID = 0;

			// Otherwise, start fading out the DialogUI so we can jump threads!	
			} else {
				DialogUI.status = DUISTATUS.FADEOUT;
			}

			// Post Brutal Actions
			#if UNITY_POSTBRUTAL
				// Turn off player / NPC flags.
				DialogUI.playerShouldTalk = false;
				DialogUI.npcShouldTalk = null;

				// If this is the last dialog, make sure we stop any FMVs
				if ( FMV!=null){ FMV.Stop(); }
			#endif
			
		// Next Screen	
		} else {
			dc.status = DCSTATUS.NEXT;
			dc.nextID = navigation.screenToLoadOnNext;
			isActive = false;
			DialogUI.status = DUISTATUS.FADEOUT;
		}
		
		// Post Brutal Actions
		#if UNITY_POSTBRUTAL

			// Stop FMV Camera At End
			if ( FMV!=null && actions.postBrutal.stopFmvCameraAtEnd ){
				Debug.Log("Calling FMV Stop()");
				FMV.Stop();
			}
		#endif

		// Actions
		CreateObjectsAtEndOfScreen();
		ActivateObjectsAtEndOfScreen();
		DeactivateObjectsAtEndOfScreen();
		SendMessageAtEnd();
		DestroyObjectsAtEndOfScreen();
		
		ThirdPartyEnd();

		// API Callbacks
		DoAPICallBacksAtEnd();
		
		// Navigation Callback
		if( screen.dialogStyle == DIALOGSTYLE.NextButton ){
			NavigationCallback( 0, "Next" );
		} else {
			NavigationCallback( 0, screen.customButton1 );
		}

		// Prepare New Dialog At End
		if ( navigation.endDialogAfterThis ){
			PrepareNewDialogsAndLoadLevelsAtEnd();
		}

		// Destroy This dialog object at end
		if ( navigation.endDialogAfterThis && navigation.destroyAtEnd ){
			Destroy(gameObject);
		}
	}
	
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	THE DIALOGUI HAS REPORTED THE USER JUST PRESSED A MULTIPLE CHOICE BUTTON
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function MultipleChoiceNext( mcID : int ){
	
	// Make sure we're not forcing the dialogUI close
	if ( DialogUI.status != DUISTATUS.FORCECLOSE ){
	
		// End the dialog now
		if( navigation.endDialogAfterThis ){
			
			// Setup Screen
			isActive = false;
			
			// Setup Dialog Controller to end, unless we are connecting to a new thread
			if( navigation.instantiateDialogPrefabAtEnd == null && navigation.findAndPlayOtherDialogAtEnd == "" ){

				// Setup Dialog UI
				DialogUI.isActive = false;
				DialogUI.status = DUISTATUS.ENDED;
				DialogUI.screenDuration = 0;

				dc.status = DCSTATUS.ENDED;
				dc.currentScreen = null;
				dc.currentID = 0;

			// Otherwise, start fading out the DialogUI so we can jump threads!	
			} else {
				DialogUI.status = DUISTATUS.FADEOUT;
			}
			
			// Post Brutal Actions
			#if UNITY_POSTBRUTAL
				// Turn off player / NPC flags.
				DialogUI.playerShouldTalk = false;
				DialogUI.npcShouldTalk = null;

				// If this is the last dialog, make sure we stop any FMVs
				if ( FMV!=null){ FMV.Stop(); }
			#endif

		// Next Screen	
		} else {
			dc.status = DCSTATUS.NEXT;
			dc.nextID = navigation.multipleButtonsEvaluated[mcID];
			isActive = false;
			DialogUI.status = DUISTATUS.FADEOUT;
		}

		// Post Brutal Actions
		#if UNITY_POSTBRUTAL

			// Stop FMV Camera At End
			if ( FMV!=null && actions.postBrutal.stopFmvCameraAtEnd ){
				Debug.Log("Calling FMV Stop()");
				FMV.Stop();
			}
		#endif
		
		// Actions
		CreateObjectsAtEndOfScreen();
		ActivateObjectsAtEndOfScreen();
		DeactivateObjectsAtEndOfScreen();
		SendMessageAtEnd();
		DestroyObjectsAtEndOfScreen();
		
		ThirdPartyEnd();

		// API Callbacks
		DoAPICallBacksAtEnd();

		// Navigation Callback
		NavigationCallback( mcID, screen.multipleButtonsEvaluated[mcID] );
		
		// Prepare New Dialog At End
		if ( navigation.endDialogAfterThis ){
			PrepareNewDialogsAndLoadLevelsAtEnd();
		}

		// Destroy This dialog object at end
		if ( navigation.endDialogAfterThis && navigation.destroyAtEnd ){
			Destroy(gameObject);
		}
	}
	
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	THE DIALOGUI HAS REPORTED THE USER JUST PRESSED AN ICON GRID BUTTON
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function IconGridNext( igID : int ){
	
	// Make sure we're not forcing the dialogUI close
	if ( DialogUI.status != DUISTATUS.FORCECLOSE ){
	
		// End the dialog now
		if( navigation.endDialogAfterThis ){
			
			// Setup Screen
			isActive = false;
			
			// Setup Dialog Controller to end, unless we are connecting to a new thread
			if( navigation.instantiateDialogPrefabAtEnd == null && navigation.findAndPlayOtherDialogAtEnd == "" ){

				// Setup Dialog UI
				DialogUI.isActive = false;
				DialogUI.status = DUISTATUS.ENDED;
				DialogUI.screenDuration = 0;

				dc.status = DCSTATUS.ENDED;
				dc.currentScreen = null;
				dc.currentID = 0;

			// Otherwise, start fading out the DialogUI so we can jump threads!	
			} else {
				DialogUI.status = DUISTATUS.FADEOUT;
			}
			
			// Post Brutal Actions
			#if UNITY_POSTBRUTAL
				// Turn off player / NPC flags.
				DialogUI.playerShouldTalk = false;
				DialogUI.npcShouldTalk = null;

				// If this is the last dialog, make sure we stop any FMVs
				if ( FMV!=null){ FMV.Stop(); }
			#endif

		// Next Screen	
		} else {
			dc.status = DCSTATUS.NEXT;
			dc.nextID = screen.IG_buttonsEvaluated[igID].nextID;
			isActive = false;
			DialogUI.status = DUISTATUS.FADEOUT;
		}

		// Post Brutal Actions
		#if UNITY_POSTBRUTAL

			// Stop FMV Camera At End
			if ( FMV!=null && actions.postBrutal.stopFmvCameraAtEnd ){
				Debug.Log("Calling FMV Stop()");
				FMV.Stop();
			}
		#endif
		
		// Actions
		CreateObjectsAtEndOfScreen();
		ActivateObjectsAtEndOfScreen();
		DeactivateObjectsAtEndOfScreen();
		SendMessageAtEnd();
		DestroyObjectsAtEndOfScreen();
		
		ThirdPartyEnd();

		// API Callbacks
		DoAPICallBacksAtEnd();

		// Navigation Callback
		NavigationCallback( igID, screen.IG_buttonsEvaluated[igID].title );
		
		// Prepare New Dialog At End
		if ( navigation.endDialogAfterThis ){
			PrepareNewDialogsAndLoadLevelsAtEnd();
		}

		// Destroy This dialog object at end
		if ( navigation.endDialogAfterThis && navigation.destroyAtEnd ){
			Destroy(gameObject);
		}
	}
	
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	THE DIALOGUI HAS REPORTED THE USER JUST PRESSED THE YES BUTTON
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Yes(){
	
	// Make sure we're not forcing the dialogUI close
	if ( DialogUI.status != DUISTATUS.FORCECLOSE ){
		
		// End the dialog now
		if( navigation.endDialogAfterThis ){
			
			// Setup Screen
			isActive = false;
			
			// Setup Dialog Controller to end, unless we are connecting to a new thread
			if( navigation.instantiateDialogPrefabAtEnd == null && navigation.findAndPlayOtherDialogAtEnd == "" ){

				// Setup Dialog UI
				DialogUI.isActive = false;
				DialogUI.status = DUISTATUS.ENDED;
				DialogUI.screenDuration = 0;

				dc.status = DCSTATUS.ENDED;
				dc.currentScreen = null;
				dc.currentID = 0;

			// Otherwise, start fading out the DialogUI so we can jump threads!	
			} else {
				DialogUI.status = DUISTATUS.FADEOUT;
			}

			// Post Brutal Actions
			#if UNITY_POSTBRUTAL
				// Turn off player / NPC flags.
				DialogUI.playerShouldTalk = false;
				DialogUI.npcShouldTalk = null;

				// If this is the last dialog, make sure we stop any FMVs
				if ( FMV!=null){ FMV.Stop(); }
			#endif
			
		// Next Screen	
		} else {
			dc.status = DCSTATUS.NEXT;
			dc.nextID = navigation.screenToLoadOnYes;
			isActive = false;
			DialogUI.status = DUISTATUS.FADEOUT;
		}
		
		// Post Brutal Actions
		#if UNITY_POSTBRUTAL

			// Stop FMV Camera At End
			if ( FMV!=null && actions.postBrutal.stopFmvCameraAtEnd ){
				Debug.Log("Calling FMV Stop()");
				FMV.Stop();
			}
		#endif

		// Actions
		CreateObjectsAtEndOfScreen();
		ActivateObjectsAtEndOfScreen();
		DeactivateObjectsAtEndOfScreen();
		SendMessageAtEnd();
		DestroyObjectsAtEndOfScreen();
		
		ThirdPartyEnd();

		// API Callbacks
		DoAPICallBacksAtEnd();
		
		// Navigation Callback
		if( screen.dialogStyle == DIALOGSTYLE.YesOrNo ){
			NavigationCallback( 0, "Yes" );
		} else {
			NavigationCallback( 0, screen.customButton1 );
		}
		
		// Prepare New Dialog At End
		if ( navigation.endDialogAfterThis ){
			PrepareNewDialogsAndLoadLevelsAtEnd();
		}

		// Destroy This dialog object at end
		if ( navigation.endDialogAfterThis && navigation.destroyAtEnd ){
			Destroy(gameObject);
		}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	THE DIALOGUI HAS REPORTED THE USER JUST PRESSED THE NO BUTTON
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function No(){
	
	// Make sure we're not forcing the dialogUI to close
	if ( DialogUI.status != DUISTATUS.FORCECLOSE ){
		
		// End the dialog now
		if( navigation.endDialogAfterThis ){
			
			// Setup Screen
			isActive = false;
			
			// Setup Dialog Controller to end, unless we are connecting to a new thread
			if( navigation.instantiateDialogPrefabAtEnd == null && navigation.findAndPlayOtherDialogAtEnd == "" ){

				// Setup Dialog UI
				DialogUI.isActive = false;
				DialogUI.status = DUISTATUS.ENDED;
				DialogUI.screenDuration = 0;

				dc.status = DCSTATUS.ENDED;
				dc.currentScreen = null;
				dc.currentID = 0;

			// Otherwise, start fading out the DialogUI so we can jump threads!	
			} else {
				DialogUI.status = DUISTATUS.FADEOUT;
			}

			// Post Brutal Actions
			#if UNITY_POSTBRUTAL
				// Turn off player / NPC flags.
				DialogUI.playerShouldTalk = false;
				DialogUI.npcShouldTalk = null;

				// If this is the last dialog, make sure we stop any FMVs
				if ( FMV!=null){ FMV.Stop(); }
			#endif
			
		// Next Screen	
		} else {
			dc.status = DCSTATUS.NEXT;
			dc.nextID = navigation.screenToLoadOnNo;
			isActive = false;
			DialogUI.status = DUISTATUS.FADEOUT;
		}

		// Post Brutal Actions
		#if UNITY_POSTBRUTAL

			// Stop FMV Camera At End
			if ( FMV!=null && actions.postBrutal.stopFmvCameraAtEnd ){
				Debug.Log("Calling FMV Stop()");
				FMV.Stop();
			}
		#endif
		
		// Actions
		CreateObjectsAtEndOfScreen();
		ActivateObjectsAtEndOfScreen();
		DeactivateObjectsAtEndOfScreen();
		SendMessageAtEnd();
		DestroyObjectsAtEndOfScreen();
		
		ThirdPartyEnd();

		// API Callbacks
		DoAPICallBacksAtEnd();

		// Navigation Callback
		if( screen.dialogStyle == DIALOGSTYLE.YesOrNo ){
			NavigationCallback( 1, "No" );
		} else {
			NavigationCallback( 1, screen.customButton2 );
		}
		
		// Prepare New Dialog At End
		if ( navigation.endDialogAfterThis ){
			PrepareNewDialogsAndLoadLevelsAtEnd();
		}

		// Destroy This dialog object at end
		if ( navigation.endDialogAfterThis && navigation.destroyAtEnd ){
			Destroy(gameObject);
		}
	
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	CREATE OBJECTS AT START OF SCREEN
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function CreateObjectsAtStartOfScreen(){
	
	// If this has been setup, run it!
	if ( actions.createObjectsAtStart.length > 0 ) {
						
		// Loop through the objects
		for(var i=0; i < actions.createObjectsAtStart.length; i++){
				
			// if the array item has actually been setup ..
			if (actions.createObjectsAtStart[i].createObject != null ) {
						
				// default position for creating objects 
				var createTransform = this.transform;
						
				// If there is a position to create this object, setup the variable.
				if ( actions.createObjectsAtStart[i].createLocation != null ) {
						
					createTransform = actions.createObjectsAtStart[i].createLocation;
				}
						
				// If there is a position to create this object, setup the variable.
				if ( GameObject.Find( actions.createObjectsAtStart[i].findGameObjectLocation ) != null) {
						
					createTransform = GameObject.Find( actions.createObjectsAtStart[i].findGameObjectLocation ).transform;
				}
						
				// Create the Object
				var theObject : GameObject = Instantiate(actions.createObjectsAtStart[i].createObject, createTransform.position, createTransform.rotation);
						
			} 
		}	
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	CREATE OBJECTS AT END OF SCREEN
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function CreateObjectsAtEndOfScreen(){
	
//	print(gameObject.name + ": CreateObjectsAtEndOfScreen()");

	// If this has been setup, run it!
	if ( actions.createObjectsAtEnd.length > 0 ) {
						
		// Loop through the objects
		for(var i=0; i < actions.createObjectsAtEnd.length; i++){
				
			// if the array item has actually been setup ..
			if ( actions.createObjectsAtEnd[i].createObject != null ) {
						
				// default position for creating objects 
				var createTransform = this.transform;
						
				// If there is a position to create this object, setup the variable.
				if ( actions.createObjectsAtEnd[i].createLocation != null ) {
						
					createTransform = actions.createObjectsAtEnd[i].createLocation;
				}
						
				// If there is a position to create this object, setup the variable.
				if ( GameObject.Find( actions.createObjectsAtEnd[i].findGameObjectLocation ) != null) {
						
					createTransform = GameObject.Find( actions.createObjectsAtEnd[i].findGameObjectLocation ).transform;
				}
						
				// Create the Object
				var theObject = Instantiate(actions.createObjectsAtEnd[i].createObject, createTransform.position, createTransform.rotation);
						
			} 
		}	
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	ACTIVATE OBJECTS AT START OF SCREEN
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function ActivateObjectsAtStartOfScreen(){

	// Activate Objects On Start
	if ( actions.activateTheseObjectsAtStart.length > 0 ) {
		
		// Loop through objects and activate them
		for ( var toFind : String in actions.activateTheseObjectsAtStart ) {
			
			// If we have setup a name to search for
			if ( toFind != null ) {
			
				// cache the object
				var toActivateAtStart : GameObject = GameObject.Find(toFind);
			
				// If the object was found, activate it.
				if ( toActivateAtStart != null ) {
					
					#if UNITY_3_4
					    toActivateAtStart.SetActiveRecursively(true);
					#elif UNITY_3_5
					    toActivateAtStart.SetActiveRecursively(true);
					#else
						// Unity 4 or higher!
					    toActivateAtStart.SetActive(true);
					#endif
					
				}
			}
		}	
	}
	
	// Activate Objects At Start Directly
	if ( actions.activateTheseObjectsAtStartDirectly.length > 0 ) {
	
		// Loop through objects and activate them
		for ( var toActivate : GameObject in actions.activateTheseObjectsAtStartDirectly ) {
		
			if ( toActivate != null ) {
				
				#if UNITY_3_4
				    toActivate.SetActiveRecursively(true);
				#elif UNITY_3_5
				    toActivate.SetActiveRecursively(true);
				#else
					// Unity 4 or higher!
				   toActivate.SetActive(true);
				#endif
			}
		}	
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	DE-ACTIVATE OBJECTS AT START OF SCREEN
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function DeactivateObjectsAtStartOfScreen(){

	// Activate Objects On Start
	if ( actions.deactivateTheseObjectsAtStart.length > 0 ) {
		
		// Loop through objects and activate them
		for ( var toFind : String in actions.deactivateTheseObjectsAtStart ) {
			
			// If we have setup a name to search for
			if ( toFind != null ) {
			
				// cache the object
				var toDeactivateAtStart : GameObject = GameObject.Find(toFind);
			
				// If the object was found, activate it.
				if ( toDeactivateAtStart != null ) {
					
					#if UNITY_3_4
					    toDeactivateAtStart.SetActiveRecursively(false);
					#elif UNITY_3_5
					    toDeactivateAtStart.SetActiveRecursively(false);
					#else
						// Unity 4 or higher!
					    toDeactivateAtStart.SetActive(false);
					#endif
					
				}
			}
		}	
	}
	
	// Activate Objects At Start Directly
	if ( actions.deactivateTheseObjectsAtStartDirectly.length > 0 ) {
	
		// Loop through objects and activate them
		for ( var toDeactivate : GameObject in actions.deactivateTheseObjectsAtStartDirectly ) {
		
			if ( toDeactivate != null ) {
				
				#if UNITY_3_4
				    toDeactivate.SetActiveRecursively(false);
				#elif UNITY_3_5
				    toDeactivate.SetActiveRecursively(false);
				#else
					// Unity 4 or higher!
				   toDeactivate.SetActive(false);
				#endif
			}
		}	
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	ACTIVATE OBJECTS AT END OF SCREEN
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function ActivateObjectsAtEndOfScreen(){
	
	// Activate Objects On Destroy
	if ( actions.activateTheseObjectsAtEnd.length > 0 ) {
	
		// Loop through objects and activate them
		for ( var toActivate : GameObject in actions.activateTheseObjectsAtEnd ) {
		
			if ( toActivate != null ) {
				
				#if UNITY_3_4
				    toActivate.SetActiveRecursively(true);
				#elif UNITY_3_5
				    toActivate.SetActiveRecursively(true);
				#else
					// Unity 4 or higher!
				   toActivate.SetActive(true);
				#endif
			}
		}	
	}
	
	// Activate Objects At End By Name
	if ( actions.activateTheseObjectsAtEndByName.length > 0 ) {
		
		// Loop through objects and activate them
		for ( var toFind : String in actions.activateTheseObjectsAtEndByName ) {
			
			// If we have setup a name to search for
			if ( toFind != null ) {
			
				// cache the object
				var toActivateAtEnd : GameObject = GameObject.Find(toFind);
			
				// If the object was found, activate it.
				if ( toActivateAtEnd != null ) {
					
					#if UNITY_3_4
					    toActivateAtEnd.SetActiveRecursively(true);
					#elif UNITY_3_5
					    toActivateAtEnd.SetActiveRecursively(true);
					#else
						// Unity 4 or higher!
					    toActivateAtEnd.SetActive(true);
					#endif
					
				}
			}
		}	
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	DE-ACTIVATE OBJECTS AT END OF SCREEN
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function DeactivateObjectsAtEndOfScreen(){
	
	// Activate Objects On Destroy
	if ( actions.deactivateTheseObjectsAtEnd.length > 0 ) {
	
		// Loop through objects and activate them
		for ( var toDeactivate : GameObject in actions.deactivateTheseObjectsAtEnd ) {
		
			if ( toDeactivate != null ) {
				
				#if UNITY_3_4
				    toDeactivate.SetActiveRecursively(false);
				#elif UNITY_3_5
				    toDeactivate.SetActiveRecursively(false);
				#else
					// Unity 4 or higher!
				   toDeactivate.SetActive(false);
				#endif
			}
		}	
	}
	
	// Activate Objects At End By Name
	if ( actions.deactivateTheseObjectsAtEndByName.length > 0 ) {
		
		// Loop through objects and activate them
		for ( var toFind : String in actions.deactivateTheseObjectsAtEndByName ) {
			
			// If we have setup a name to search for
			if ( toFind != null ) {
			
				// cache the object
				var toDeactivateAtEnd : GameObject = GameObject.Find(toFind);
			
				// If the object was found, activate it.
				if ( toDeactivateAtEnd != null ) {
					
					#if UNITY_3_4
					    toDeactivateAtEnd.SetActiveRecursively(false);
					#elif UNITY_3_5
					    toDeactivateAtEnd.SetActiveRecursively(false);
					#else
						// Unity 4 or higher!
					    toDeactivateAtEnd.SetActive(false);
					#endif
					
				}
			}
		}	
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	DESTROY OBJECTS AT START OF SCREEN
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function DestroyObjectsAtStartOfScreen(){
	
	// Destroy these objects on destroy
	if ( actions.findAndDestroyTheseObjectsAtStart.length > 0 ) {
	
		// Loop through these objects and delete them
		for ( var destroyObject : String in actions.findAndDestroyTheseObjectsAtStart ) {
			
			// make sure this isnt an empty reference
			if ( GameObject.Find(destroyObject) != null ) {
				
				var destroyThis : GameObject = GameObject.Find(destroyObject);
				Destroy(destroyThis);
			}
		}
	}
	
	// Destroy GameObjects Directly
	if ( actions.destroyTheseObjectsAtStart.length > 0 ) {
		// Loop through objects and destroy them
		for ( var toDestroy : GameObject in actions.destroyTheseObjectsAtStart ) {
			// make sure this isnt an empty reference
			if ( toDestroy != null ) { Destroy( toDestroy ); }
		}	
	}
	
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	DESTROY OBJECTS AT END OF SCREEN
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function DestroyObjectsAtEndOfScreen(){
	
	// Destroy these objects on destroy
	if ( actions.findAndDestroyTheseObjectsAtEnd.length > 0 ) {
	
		// Loop through these objects and delete them
		for ( var destroyObject : String in actions.findAndDestroyTheseObjectsAtEnd ) {
			
			// make sure this isnt an empty reference
			if ( GameObject.Find(destroyObject) != null ) {
				
				var destroyThis : GameObject = GameObject.Find(destroyObject);
				Destroy(destroyThis);
			}
		}
	}
	
	// Destroy GameObjects Directly
	if ( actions.destroyTheseObjectsAtEnd.length > 0 ) {
		// Loop through objects and destroy them
		for ( var toDestroy : GameObject in actions.destroyTheseObjectsAtEnd ) {
			// make sure this isnt an empty reference
			if ( toDestroy != null ) { Destroy( toDestroy ); }
		}	
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	SEND MESSAGE AT START
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function SendMessageAtStart(){
	
	// Destroy these objects on destroy
	if ( actions.sendMessageAtStart.length > 0 ) {
	
		// Loop through these objects and delete them
		for ( var sm : DS_SendMessage in actions.sendMessageAtStart ) {
			
			// Find A New Destination
			if ( sm.findDestination != "" && GameObject.Find(sm.findDestination) != null ){
				sm.destination = GameObject.Find(sm.findDestination);
			}
			
			// Make sure we have a valid destination and we have set a function name
			if ( sm.destination != null && sm.functionName != "" ) {
				
				// Send Message with no argument
				if( sm.argType == DS_SendMessageArg.None ){
					sm.destination.SendMessage(sm.functionName);
				}
				
				// Send Message based on argument - String
				else if( sm.argType == DS_SendMessageArg.SendString ){
					sm.destination.SendMessage(sm.functionName, sm.stringArg);
				}
				
				// Send Message based on argument - Int
				else if( sm.argType == DS_SendMessageArg.SendInt ){
					sm.destination.SendMessage(sm.functionName, sm.intArg);
				}
				
				// Send Message based on argument - Float
				else if( sm.argType == DS_SendMessageArg.SendFloat ){
					sm.destination.SendMessage(sm.functionName, sm.floatArg);
				}
				
				// Send Message based on argument - GameObject
				else if( sm.argType == DS_SendMessageArg.SendGameObject ){
					sm.destination.SendMessage(sm.functionName, sm.goArg );
				}
				
				// Send Message based on argument - Transform
				else if( sm.argType == DS_SendMessageArg.SendTransform ){
					sm.destination.SendMessage(sm.functionName, sm.transformArg );
				}
			}
		}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	SEND MESSAGE AT END
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function SendMessageAtEnd(){
	
	// Destroy these objects on destroy
	if ( actions.sendMessageAtEnd.length > 0 ) {
	
		// Loop through these objects and delete them
		for ( var sm : DS_SendMessage in actions.sendMessageAtEnd ) {
			
			// Find A New Destination
			if ( sm.findDestination != "" && GameObject.Find(sm.findDestination) != null ){
				sm.destination = GameObject.Find(sm.findDestination);
			}
			
			// Make sure we have a valid destination and we have set a function name
			if ( sm.destination != null && sm.functionName != "" ) {
				
				// Send Message with no argument
				if( sm.argType == DS_SendMessageArg.None ){
					sm.destination.SendMessage(sm.functionName);
				}
				
				// Send Message based on argument - String
				else if( sm.argType == DS_SendMessageArg.SendString ){
					sm.destination.SendMessage(sm.functionName, sm.stringArg);
				}
				
				// Send Message based on argument - Int
				else if( sm.argType == DS_SendMessageArg.SendInt ){
					sm.destination.SendMessage(sm.functionName, sm.intArg);
				}
				
				// Send Message based on argument - Float
				else if( sm.argType == DS_SendMessageArg.SendFloat ){
					sm.destination.SendMessage(sm.functionName, sm.floatArg);
				}
				
				// Send Message based on argument - GameObject
				else if( sm.argType == DS_SendMessageArg.SendGameObject ){
					sm.destination.SendMessage(sm.functionName, sm.goArg );
				}
				
				// Send Message based on argument - Transform
				else if( sm.argType == DS_SendMessageArg.SendTransform ){
					sm.destination.SendMessage(sm.functionName, sm.transformArg );
				}
			}
		}
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	DO PLAYER PREFS ACTIONS
//	Loops through the PlayerPrefs Actions and performs them.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function DoPlayerPrefsActions(){

	// Setup prefix
	var prefix : String = "";										// Setup an empty prefix because the next statement needs this!
	if(	DialogUI != null && DialogUI.dui != null ){					// Make sure we can see Dialog.dui	
		prefix = DialogUI.dui.fileManagement.savePrefix.ToUpper();	// Convert the prefix into upper case to match the rest of the save key.
		prefix = DialogUI.MakeSavePrefixSafe(prefix);				// Remove bad characters and add some formatting to make it look good in the Plists
	}

	// If we have PlayerPref actions ...
	if(actions.playerPrefs.length > 0){

		// Helper variables
		var oldFloat : float = 0;
		var oldInt : int = 0;

		// Loop through them
		for( var ppAction : DSPlayerPrefsActions in actions.playerPrefs){
			// Make sure this action is valid
			if( ppAction!=null ){

				// =============================
				// DELETE ALL KEYS
				// =============================

				if( ppAction.action == DSPlayerPrefsActionType.DeleteAllKeys ){

					// UNIVERSAL METHOD
					Debug.Log("LDC: PlayerPrefs Action - Deleting All Keys In PlayerPrefs.");
					PlayerPrefs.DeleteAll();
				}

				// =============================
				// DELETE SPECIFIC KEY
				// =============================

				else if( ppAction.action == DSPlayerPrefsActionType.DeleteKey ){
					
					// POST BRUTAL METHOD
					#if UNITY_POSTBRUTAL
						// Delete The Key
						if( Engine!=null && Engine.com!=null && Engine.HasKey(ppAction.key) ){
							Engine.DeleteKey(ppAction.key);
							continue; // Skip this iteration now before PlayerPrefs kicks in.
						}
					#endif

					// COMMERCIAL LDC METHOD
					if( PlayerPrefs.HasKey(prefix+ppAction.key) ){
						Debug.Log("LDC: PlayerPrefs Action - Deleting Key In PlayerPrefs ( \"" + (prefix+ppAction.key) +"\").");
						PlayerPrefs.DeleteKey(prefix+ppAction.key);
					} else {
						Debug.Log("LDC: PlayerPrefs Error - Can't Delete Key because it doesn't exist ( \"" + (prefix+ppAction.key) +"\")." );
					}

				}

				// =============================
				// SET STRING
				// =============================

				else if( ppAction.action == DSPlayerPrefsActionType.SetString ){
					
					// POST BRUTAL METHOD
					#if UNITY_POSTBRUTAL
						// Create A String Key
						if( Engine!=null && Engine.com!=null ){
							Engine.SetString(ppAction.key,ppAction.stringArg);
							continue; // Skip this iteration now before PlayerPrefs kicks in.
						}
					#endif

					// COMMERCIAL LDC METHOD
					if( PlayerPrefs.HasKey(prefix+ppAction.key) ){
						PlayerPrefs.DeleteKey(prefix+ppAction.key);
					}
					Debug.Log("LDC: PlayerPrefs Action - Setting String ( \"" + (prefix+ppAction.key) +"\") to " + ppAction.stringArg);
					PlayerPrefs.SetString(prefix+ppAction.key, ppAction.stringArg);

				}

				// =============================
				// SET FLOAT
				// =============================

				else if( ppAction.action == DSPlayerPrefsActionType.SetFloat ){
					
					// POST BRUTAL METHOD
					#if UNITY_POSTBRUTAL
						// Create A String Key
						if( Engine!=null && Engine.com!=null ){
							Debug.Log("LDC (PB): PlayerPrefs Action - Setting Float ( \"" + (ppAction.key) +"\") to " + ppAction.floatArg);
							Engine.SetFloat(ppAction.key,ppAction.floatArg);
							continue; // Skip this iteration now before PlayerPrefs kicks in.
						}
					#endif

					// COMMERCIAL LDC METHOD
					if( PlayerPrefs.HasKey(prefix+ppAction.key) ){
						PlayerPrefs.DeleteKey(prefix+ppAction.key);
					}
					Debug.Log("LDC: PlayerPrefs Action - Setting Float ( \"" + (prefix+ppAction.key) +"\") to " + ppAction.floatArg);
					PlayerPrefs.SetFloat(prefix+ppAction.key, ppAction.floatArg);

				}

				// =============================
				// SET INT
				// =============================

				else if( ppAction.action == DSPlayerPrefsActionType.SetInt ){
					
					// POST BRUTAL METHOD
					#if UNITY_POSTBRUTAL
						// Create A String Key
						if( Engine!=null && Engine.com!=null ){
							Debug.Log("LDC (PB): PlayerPrefs Action - Setting Int ( \"" + (ppAction.key) +"\") to " + ppAction.intArg);
							Engine.SetInt(ppAction.key,ppAction.intArg);
							continue; // Skip this iteration now before PlayerPrefs kicks in.
						}
					#endif

					// COMMERCIAL LDC METHOD
					if( PlayerPrefs.HasKey(prefix+ppAction.key) ){
						PlayerPrefs.DeleteKey(prefix+ppAction.key);
					}
					Debug.Log("LDC: PlayerPrefs Action - Setting Int ( \"" + (prefix+ppAction.key) +"\") to " + ppAction.intArg);
					PlayerPrefs.SetInt(prefix+ppAction.key, ppAction.intArg);

				}

				// =============================
				// ADD TO FLOAT
				// =============================

				else if( ppAction.action == DSPlayerPrefsActionType.AddToFloat ){
					
					// POST BRUTAL METHOD
					#if UNITY_POSTBRUTAL
						// Create A String Key
						if( Engine!=null && Engine.com!=null ){
							// cache the old float.
							oldFloat = Engine.GetFloat(ppAction.key);	// If this key doesn't exist, it will return 0.
							Debug.Log("LDC (PB): PlayerPrefs Action - Add To Float ( \"" + (ppAction.key) +"\") to " + oldFloat + " + " + ppAction.floatArg + " = "+ (oldFloat+ppAction.floatArg) );
							Engine.SetFloat(ppAction.key, (oldFloat+ppAction.floatArg) );
							continue; // Skip this iteration now before PlayerPrefs kicks in.
							
						}
					#endif

					// COMMERCIAL LDC METHOD
					oldFloat = PlayerPrefs.GetFloat(prefix+ppAction.key);	// If this key doesn't exist, it will return 0.

					// Delete the old key before we replace it
					if( PlayerPrefs.HasKey(prefix+ppAction.key) ){
						PlayerPrefs.DeleteKey(prefix+ppAction.key);
					}

					// Set Float to the combined 2 values.
					Debug.Log("LDC: PlayerPrefs Action - Add To Float ( \"" + (prefix+ppAction.key) +"\") to " + oldFloat + " + " + ppAction.floatArg + " = "+ (oldFloat+ppAction.floatArg) );
					PlayerPrefs.SetFloat(prefix+ppAction.key, (oldFloat+ppAction.floatArg) );

				}

				// =============================
				// SUBTRACT FROM FLOAT
				// =============================

				else if( ppAction.action == DSPlayerPrefsActionType.SubtractFromFloat ){
					
					// POST BRUTAL METHOD
					#if UNITY_POSTBRUTAL
						// Create A String Key
						if( Engine!=null && Engine.com!=null ){
							// cache the old float.
							oldFloat = Engine.GetFloat(ppAction.key);	// If this key doesn't exist, it will return 0.
							Debug.Log("LDC (PB): PlayerPrefs Action - Subtract From Float ( \"" + (ppAction.key) +"\") to " + oldFloat + " - " + ppAction.floatArg + " = "+ (oldFloat-ppAction.floatArg) );
							Engine.SetFloat(ppAction.key, (oldFloat-ppAction.floatArg) );
							continue; // Skip this iteration now before PlayerPrefs kicks in.
							
						}
					#endif

					// COMMERCIAL LDC METHOD
					oldFloat = PlayerPrefs.GetFloat(prefix+ppAction.key);	// If this key doesn't exist, it will return 0.

					// Delete the old key before we replace it
					if( PlayerPrefs.HasKey(prefix+ppAction.key) ){
						PlayerPrefs.DeleteKey(prefix+ppAction.key);
					}

					// Set Float to the combined 2 values.
					Debug.Log("LDC: PlayerPrefs Action - Subtract From Float ( \"" + (prefix+ppAction.key) +"\") to " + oldFloat + " - " + ppAction.floatArg + " = "+ (oldFloat-ppAction.floatArg) );
					PlayerPrefs.SetFloat(prefix+ppAction.key, (oldFloat - ppAction.floatArg) );

				}

				// =============================
				// ADD TO INT
				// =============================

				else if( ppAction.action == DSPlayerPrefsActionType.AddToInt ){
					
					// POST BRUTAL METHOD
					#if UNITY_POSTBRUTAL
						// Create A String Key
						if( Engine!=null && Engine.com!=null ){
							// cache the old float.
							oldInt = Engine.GetInt(ppAction.key);	// If this key doesn't exist, it will return 0.
							Debug.Log("LDC (PB): PlayerPrefs Action - Add To Int ( \"" + (ppAction.key) +"\") to " + oldInt + " + " + ppAction.intArg + " = "+ (oldInt+ppAction.intArg) );
							Engine.SetInt(ppAction.key, (oldInt+ppAction.intArg) );
							continue; // Skip this iteration now before PlayerPrefs kicks in.
							
						}
					#endif

					// COMMERCIAL LDC METHOD
					oldInt = PlayerPrefs.GetInt(prefix+ppAction.key);	// If this key doesn't exist, it will return 0.

					// Delete the old key before we replace it
					if( PlayerPrefs.HasKey(prefix+ppAction.key) ){
						PlayerPrefs.DeleteKey(prefix+ppAction.key);
					}

					// Set Float to the combined 2 values.
					Debug.Log("LDC: PlayerPrefs Action - Add To Int ( \"" + (prefix+ppAction.key) +"\") to " + oldInt + " + " + ppAction.intArg + " = "+ (oldInt+ppAction.intArg) );
					PlayerPrefs.SetInt(prefix+ppAction.key, (oldInt+ppAction.intArg) );

				}

				// =============================
				// SUBTRACT FROM INT
				// =============================

				else if( ppAction.action == DSPlayerPrefsActionType.SubtractFromInt ){
					
					// POST BRUTAL METHOD
					#if UNITY_POSTBRUTAL
						// Create A String Key
						if( Engine!=null && Engine.com!=null ){
							// cache the old float.
							oldInt = Engine.GetInt(ppAction.key);	// If this key doesn't exist, it will return 0.
							Debug.Log("LDC (PB): PlayerPrefs Action - Subtract From Int ( \"" + (ppAction.key) +"\") to " + oldInt + " - " + ppAction.intArg + " = "+ (oldInt-ppAction.intArg) );
							Engine.SetInt(ppAction.key, (oldInt-ppAction.intArg) );
							continue; // Skip this iteration now before PlayerPrefs kicks in.
							
						}
					#endif

					// COMMERCIAL LDC METHOD
					oldInt = PlayerPrefs.GetInt(prefix+ppAction.key);	// If this key doesn't exist, it will return 0.

					// Delete the old key before we replace it
					if( PlayerPrefs.HasKey(prefix+ppAction.key) ){
						PlayerPrefs.DeleteKey(prefix+ppAction.key);
					}

					// Set Float to the combined 2 values.
					Debug.Log("LDC: PlayerPrefs Action - Subtract From Int ( \"" + (prefix+ppAction.key) +"\") to " + oldInt + " - " + ppAction.intArg + " = "+ (oldInt-ppAction.intArg) );
					PlayerPrefs.SetInt(prefix+ppAction.key, (oldInt-ppAction.intArg) );

				}

			}
		}
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	THIRD PARTY START FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function ThirdPartyStart(){
	
	// ================
	//	USEQUENCER
	// ================
	
	// Make sure the reference to the uSequencer gameObject is figured out straight away.
	if( actions.uSequencer.go == null && actions.uSequencer.findGo != "" && GameObject.Find(actions.uSequencer.findGo)!=null){
		actions.uSequencer.go = GameObject.Find(actions.uSequencer.findGo);
	}
	
	// Do actions if we've references a uSequencer GameObject
	if(actions.uSequencer.go != null){
		
		// Setup Speed And Rate
		if(actions.uSequencer.setup){
			actions.uSequencer.go.SendMessage("SetPlaybackTime",actions.uSequencer.setPlaybackTime);
			actions.uSequencer.go.SendMessage("SetPlaybackRate",actions.uSequencer.setPlaybackRate);
		}
		
		// ==============
		// START ACTIONS
		// ==============
		
		// Play / Resume
		if(actions.uSequencer.startAction == DSuSequencerActionType.Play){
			actions.uSequencer.go.SendMessage("Play", SendMessageOptions.DontRequireReceiver);
		}
		
		// Pause
		else if(actions.uSequencer.startAction == DSuSequencerActionType.Pause){
			actions.uSequencer.go.SendMessage("Pause", SendMessageOptions.DontRequireReceiver);
		}
		
		// Stop
		else if(actions.uSequencer.startAction == DSuSequencerActionType.Stop){
			actions.uSequencer.go.SendMessage("Stop", SendMessageOptions.DontRequireReceiver);
		}
		
		// Skip
		else if(actions.uSequencer.startAction == DSuSequencerActionType.Skip){
			actions.uSequencer.go.SendMessage("Skip", SendMessageOptions.DontRequireReceiver);
		}
		
	}
	
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	THIRD PARTY END FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function ThirdPartyEnd(){
	
	// ================
	//	USEQUENCER
	// ================
	
	// Do actions if we've references a uSequencer GameObject
	if(actions.uSequencer.go != null){
		
		// ==============
		// END ACTIONS
		// ==============
				
		// Play / Resume
		if(actions.uSequencer.endAction == DSuSequencerActionType.Play){
			actions.uSequencer.go.SendMessage("Play", SendMessageOptions.DontRequireReceiver);
		}
		
		// Pause
		else if(actions.uSequencer.endAction == DSuSequencerActionType.Pause){
			actions.uSequencer.go.SendMessage("Pause", SendMessageOptions.DontRequireReceiver);
		}
		
		// Stop
		else if(actions.uSequencer.endAction == DSuSequencerActionType.Stop){
			actions.uSequencer.go.SendMessage("Stop", SendMessageOptions.DontRequireReceiver);
		}
		
		// Skip
		else if(actions.uSequencer.endAction == DSuSequencerActionType.Skip){
			actions.uSequencer.go.SendMessage("Skip", SendMessageOptions.DontRequireReceiver);
		}
		
	}
	
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	DO API CALLBACKS
//	If functions were passed via the API, do them now.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function DoAPICallBacksAtStart(){

	// Do JS Function Array
	if( actions.callbacksAtStart != null && actions.callbacksAtStart.length > 0 ){
		for( var callback : Function in actions.callbacksAtStart ){
			if(callback!=null){
				callback();
			}
		}
	}

	// Run Action At Start
	if( actions.actionAtStart != null ){
		actions.actionAtStart();
	}
}

function DoAPICallBacksAtEnd(){

	// Do JS Function Array
	if( actions.callbacksAtEnd != null && actions.callbacksAtEnd.length > 0 ){
		for( var callback : Function in actions.callbacksAtEnd ){
			if(callback!=null){
				callback();
			}
		}
	}

	// Run Action At End
	if( actions.actionAtEnd != null ){
		actions.actionAtEnd();
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	SETUP CUSTOM BUTTON ICONS
//	Sets up the animatable icons as well as creating the multiple custom button array.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function SetupCustomButtonIcons(){
	
	// ==================================
	//	CUSTOM BUTTON 1
	// ==================================

	// Icon
	DialogUI.buttonIcon1 = screen.buttonIcon1;

	// If we have a valid animation, cache the DialogCastActor otherwise set it to null.
	if( screen.animatedButtonIcon1 != Vector2(-1,-1) &&
		DialogButtons!=null &&
		DialogButtons.GetAnimation( screen.animatedButtonIcon1.x, screen.animatedButtonIcon1.y) != null 
	){
		DialogUI.buttonIcon1Animation = DialogButtons.GetAnimation( screen.animatedButtonIcon1.x, screen.animatedButtonIcon1.y);
	} else {
		DialogUI.buttonIcon1Animation = null;
	}

	// ==================================
	//	CUSTOM BUTTON 2
	// ==================================

	// Icon
	DialogUI.buttonIcon2 = screen.buttonIcon2;

	// If we have a valid animation, cache the DialogCastActor otherwise set it to null.
	if( screen.animatedButtonIcon2 != Vector2(-1,-1) &&
		DialogButtons!=null &&
		DialogButtons.GetAnimation( screen.animatedButtonIcon2.x, screen.animatedButtonIcon2.y) != null 
	){
		DialogUI.buttonIcon2Animation = DialogButtons.GetAnimation( screen.animatedButtonIcon2.x, screen.animatedButtonIcon2.y);
	} else {
		DialogUI.buttonIcon2Animation = null;
	}

	// ==================================
	//	MULTIPLE BUTTONS
	// ==================================

	// Copy of the icons directly
	DialogUI.multipleButtonsIcon = screen.multipleButtonsIconEvaluated;

	// Create a new array
	var arr : Array = new Array();
	arr.Clear();

	// Loop through the vector array and create a new DialogCastActor array
	if( screen.animatedMultipleButtonsIconEvaluated.length > 0 ){
		for( var animV2 : Vector2 in screen.animatedMultipleButtonsIconEvaluated ){

			// If we have a valid animation, cache the DialogCastActor otherwise set it to null.
			if( animV2 != Vector2(-1,-1) &&
				DialogButtons!=null &&
				DialogButtons.GetAnimation( animV2.x, animV2.y) != null
			){
				// Cache the DialogCastActor and make sure its valid
				var newAnim : DialogCastActor = DialogButtons.GetAnimation( animV2.x, animV2.y);
				if( newAnim != null){

					// Add it to the array
					arr.Add(newAnim);

				// If the value isn't valid...
				} else {

					// Add null to the array
					arr.Add(null);
				}

			// If we dont have a valid animation or there isn't one setup...	
			} else {

				// Add null to the array
				arr.Add(null);
			}
		}
	}

	// Convert the DialogUI value to a builtin list using our array.
	DialogUI.multipleButtonsIconAnimation = arr.ToBuiltin(DialogCastActor) as DialogCastActor[];

}

