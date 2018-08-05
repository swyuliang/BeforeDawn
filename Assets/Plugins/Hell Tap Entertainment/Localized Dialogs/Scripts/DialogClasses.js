////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// 	DialogClasses.js
//
//	A list of classes used in LDC.
//
//	Created By Melli Georgiou
//	© 2012 - 2015 Hell Tap Entertainment LTD
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

#pragma strict

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	DIALOG SCREENS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Dialog Styles
enum DIALOGSTYLE{ 			
					NextButton, 
					YesOrNo, 
					OneButton, 
					TwoButtons,
					MultipleButtons,
					DataEntry,
					Password,
					Logic,
					Title,
					#if UNITY_POSTBRUTAL
						VoiceRoom,
					#endif
					Popup,
					IconGrid
				};

class DS_Screen {
	var dialogStyle : DIALOGSTYLE = DIALOGSTYLE.NextButton;
	#if UNITY_POSTBRUTAL
		var useVoiceRoom : boolean = false;
		var voiceRoomIndex : int;
	#endif
	var actorName : String = "";												// Doubles up as the title
	var dialogText : String = "";												// The actual dialog / conversation text
	var portrait : Texture2D;													// Portrait Icon
	var soundToLoad : String = "";												// Soundfilepath
	var soundPitch : float = 1.0;												// Soundpitch
	var soundFlag : boolean = false;											// ?
	var portraitFlag : boolean = false;											// ?
	var customButton1 : String = "OK";											// Custom Button 1 Label
	var customButton2 : String = "Cancel";										// Custom Button 2 Label
	var multipleButtons : String[] = ["Option 1","Option 2", "Option 3"];		// Multiple Button Label Array

	// ** NEW in 3.8 -> CustomButtonIcons
	var buttonIcon1 : Texture2D;												// Custom Button 1 Icon
	var buttonIcon2 : Texture2D;												// Custom Button 2 Icon
	var multipleButtonsIcon : Texture2D[] = new Texture2D[3];					// Custom Multiple Button Icons
	@System.NonSerialized
	var multipleButtonsIconEvaluated : Texture2D[] = new Texture2D[3];			// Custom Multiple Button Icons (After Logic)

	var animatedButtonIcon1 : Vector2 = Vector2(-1,-1);							// The current Group, then animation ID to use (-1 means dont animate) ***
	var animatedButtonIcon2 : Vector2 = Vector2(-1,-1);							// The current Group, then animation ID to use (-1 means dont animate) ***
	var animatedMultipleButtonsIcon : Vector2[] = [Vector2(-1,-1),Vector2(-1,-1),Vector2(-1,-1)]; 	// The current Group, then animation ID to use
	@System.NonSerialized
	var animatedMultipleButtonsIconEvaluated : Vector2[] = [Vector2(-1,-1),Vector2(-1,-1),Vector2(-1,-1)]; 	// (After Logic)

		// Editor Helper Values
		#if UNITY_EDITOR
			@System.NonSerialized
			var editorAnimatedButtonIcon1 : DialogCastActor;							// Caches the animation temporarily in the editor.
			@System.NonSerialized
			var editorAnimatedButtonIcon2 : DialogCastActor;							// Caches the animation temporarily in the editor.
			//@System.NonSerialized
			var editorAnimatedMultipleButtonsIcon : DialogCastActor[] = new DialogCastActor[3];	// Caches the animation temporarily in the editor.
		#endif

	// *************************


	// ** NEW in 3.3 -> Titles
	var titleOffset : Vector2 = Vector2(64,64);									// Screen Offset to position the title.
	var subtitleOffset : Vector2 = Vector2(64,128);								// Screen Offset to position the subtitle.
	var titleColor : Color = Color.white;										// Text color of the title.
	var subtitleColor : Color = Color.white;									// Text color of the subtitle.
	
	// ** NEW in 3.2 -> Multiple Buttons have logic conditions
	@System.NonSerialized
	var multipleButtonsEvaluated : String[] = ["Option 1","Option 2", "Option 3"];	// The final multipleButtons after we apply logic to it.
	var multipleRequiresLogic : boolean[] = [false,false,false];					// Does this button require logic?
	var multipleLogic : LogicStatements[] = new LogicStatements[3]; 				// conditions for each button.
	
	var dataEntryToken : int = 0;												// Which token should we use for Data Entry
	var dataEntryFormat : DS_DATA_FORMAT = DS_DATA_FORMAT.Text;					// The format of the data (number or text)
	var dataEntryCharacterLimit : int = 25;										// The character limit of the text
	var dataEntryDefaultValue : String = "";									// The default value for the edit field
	var dataEntryAnchor : DS_DATA_ANCHOR = DS_DATA_ANCHOR.Bottom;				// How the Data Entry screen is displayed
	var passwordMatchToToken : boolean = false;									// Password must match dataEntryToken.
	var passwordAnswer : String = "";											// The correct password for this screen.
	var passwordCaseSensitive : boolean = false;								// Should we enforce caps when comparing the password?
	var passwordMask : boolean = false;											// Should we use a password Mask? ( chars display: **** )
	var logicStatements : LogicStatements[] = new LogicStatements[0];			// Logic Statements (in Logic Screen)
	
	// NEW in v3.0
	var animatedPortrait : Vector2 = Vector2(-1,-1);							// The current Group, then animation ID to use (-1 means dont animate) ***
	#if UNITY_EDITOR 
		@System.NonSerialized
		var editorPortraitAnimation : DialogCastActor;								// Caches the animation temporarily in the editor.
	#endif

	// NEW in v4.0 - Popup
	var popupImage : Texture2D;														// The background tex we will display in the popupImage
	var popupSizeX : int = 1024;													// X Size of Popup
	var popupSizeY : int = 600;														// Y Size of Popup
	var popupBackgroundAlpha : float = 1;											// The opacity of the background
	var popupImageAnim : Vector2 = Vector2(-1,-1);									// The current Group, then animation ID to use
	#if UNITY_EDITOR 
		@System.NonSerialized
		var editorPopupImageAnim : DialogCastActor;									// Caches the animation temporarily in the editor.
	#endif
	var popupOptions : POPUP_OPTIONS = POPUP_OPTIONS.OneButton;						// The "options" of the Popup Dialog, 1 button, 2 buttons, etc.

	// ========================
	// NEW in v4.2 - Icon Grid
	// ========================

	// Setup the window and content area ...
	var IG_WindowSizeX : int = 1474;												// X Size of Window
	var IG_WindowSizeY : int = 1024;												// Y Size of Window
	var IG_WindowOffsetX : int = 0;													// Move the window X Pixels
	var IG_WindowOffsetY : int = 0;													// Move the window Y Pixels
	var IG_useXScrolling : boolean = false;											// use a scroll view with X Scrolling
	var IG_useYScrolling : boolean = false;											// use a scroll view with Y Scrolling
	var IG_WindowShowTitle : boolean = true;										// Should we show the title?
	var IG_WindowShowSubtitle : boolean = true;										// Should we show the subtitle?
	var IG_AddSpaceBetweenSubtitleAndContent : boolean = false;						// Should we add space between the content and titles?
	var IG_showPanelBG : boolean = true;											// Should we show the Panel BG graphic as the window?
	var IG_BackgroundAlpha : float = 1;												// The opacity of the background
	// NOTE: We share the variables for the Popup background to dispay it.

	// Icons
	var IG_iconSizeX : int = 150;													// X Size of the icons
	var IG_iconSizeY : int = 150;													// Y Size of the icons
	var IG_iconsPerRow : int = 4;													// Number of icons to display per row
	var IG_IconSpacer : int = 48;													// Spacer between icons
	var IG_AddInnerIconSpacing : int = 16;											// Apply Spacing inside of buttons
	var IG_showIconLabels : boolean = true;											// Show info under the icons?
	var IG_iconLabelSize : int = 32;												// The Y space of the labels (under the icons)
	var IG_firstIconIsCloseButton : boolean = true;									// If this is set to true, first button is on the top right.
	var IG_closeButtonSize : int = 100;												// Size of the close button
	var IG_showButtonBackgrounds : boolean = true;									// Should we render the button backgrounds normally?
	var IG_buttonImagePosition : ImagePosition = ImagePosition.ImageOnly;			// The image button position

	// Buttons
	var IG_buttons : IconGridButtons[] = new IconGridButtons[1];					// the buttons being displayed in the Icon Grid
	@System.NonSerialized
	var IG_buttonsEvaluated : IconGridButtons[] = new IconGridButtons[1];			// the buttons being displayed in the Icon Grid (After Logic is applied)
}

	// Icon Grid Buttons
	class IconGridButtons{

		// Basics
		var title : String = "Button Title";										// Name of the button
		var label : String = "Label";												// The Label of the button
		var failedLabel : String = "Unavailable";									// Label if logic fails
		var requiresLogic : boolean = false;										// Does this button require logic?
		var logicStatements : LogicStatements = new LogicStatements();				// Logic Statements
		var ifLogicFails : LDC_IFLOGICFAILS = LDC_IFLOGICFAILS.DisableButton;		// Disable / Hide failed logic buttons

		// After Logic Tests
		@System.NonSerialized
		var logicFailed : boolean = false;											// Did the Logic test fail?

		// Icon
		var buttonIcon : Texture2D;													// Custom Button 1 Icon
		var animatedButtonIcon : Vector2 = Vector2(-1,-1);							// The current Group, then animation ID to use (-1 means dont animate) ***
		#if UNITY_EDITOR
			@System.NonSerialized
			var editorButtonAnim : DialogCastActor;									// Caches the animation temporarily in the editor.
		#endif

		// Dialog Cast Actor
		static var dca : DialogCastActor = null;									// The current Group, then animation ID to use

		// Scrolling Helper
		var currentRect : Rect = new Rect();										// We track the last rect we used so we can use keyboard focusing

		// Navigation
		var nextID : int = 0;														// The Next Dialog ID

	}

	// Popup Enum
	enum POPUP_OPTIONS{OneButton,TwoButtons}

	// Logic Fail Enum
	enum LDC_IFLOGICFAILS{HideButton,DisableButton}

// Logic Class
class LogicStatements{
	var token : int = 0;
	var operator : DS_LOGIC_OPERATOR = DS_LOGIC_OPERATOR.Equals;
	var compare : String = "";
	var goToScreen : int = 1;
	var endDialogAfterThis : boolean = false;
	var destroyAtEnd : boolean = false;

	// ***** New in LDC v3.5
	var logicType : DS_LOGIC_TYPE = DS_LOGIC_TYPE.Token;										// Type of logic to test (Token, Playerprefs, etc).
	var ppKey : String = "ENTER_KEY";															// PlayerPrefs Key to check.
	var ppOperator : DS_PLAYERPREF_LOGIC_OPERATOR = DS_PLAYERPREF_LOGIC_OPERATOR.Exists;		// operator for Playerprefs.

	var extraConditions : LogicStatementsExtra[] = new LogicStatementsExtra[0]; 				// extra conditions can be added to LogicStatements.
}

// Logic Class  *** New in LDC v4
class LogicStatementsExtra{

	// Token Tests
	var token : int = 0;
	var operator : DS_LOGIC_OPERATOR = DS_LOGIC_OPERATOR.Equals;
	var compare : String = "";

	// Logic Tests
	var logicType : DS_LOGIC_TYPE = DS_LOGIC_TYPE.Token;										// Type of logic to test (Token, Playerprefs, etc).
	var ppKey : String = "ENTER_KEY";															// PlayerPrefs Key to check.
	var ppOperator : DS_PLAYERPREF_LOGIC_OPERATOR = DS_PLAYERPREF_LOGIC_OPERATOR.Exists;		// operator for Playerprefs.
}

// Logic Operators
enum DS_LOGIC_OPERATOR{Equals,IsNot,GreaterThan,LessThan}
enum DS_LOGIC_TYPE{Token,PrefString,PrefFloat,PrefInt}								 		// ** New in LDC 3.5
enum DS_PLAYERPREF_LOGIC_OPERATOR{Exists,DoesNotExist,Equals,IsNot,GreaterThan,LessThan}	// ** New in LDC 3.5

// Screen Anchor
enum DS_DATA_ANCHOR{Top,Middle,Bottom}

// Data Entry Formats
enum DS_DATA_FORMAT{Text,Number};

class DS_Localizations{
	var english : DS_Language = new DS_Language();		// This is used to backup the original english
	var chinese : DS_Language = new DS_Language();
	var korean : DS_Language = new DS_Language();
	var japanese : DS_Language = new DS_Language();
	var spanish : DS_Language = new DS_Language();
	var italian : DS_Language = new DS_Language();
	var german : DS_Language = new DS_Language();
	var french : DS_Language = new DS_Language();
	var portuguese : DS_Language = new DS_Language();
	var russian : DS_Language = new DS_Language();		
}

class DS_Language {
	
	var actorName : String = "";
	var dialogText : String = "";
	var changeAudio : boolean = false;
	var soundToLoad : String = "";
	var soundPitch : float = 1.0;
	var customButton1 : String = "";
	var customButton2 : String = "";
	var multipleButtons : String[] = ["","", ""];
	var dataEntryDefaultValue : String = "";
	var passwordAnswer : String = "";
	var logicStatementCompare : String[];		// Add this later!
}

class DS_Navigation {

	var endFlag : boolean = false;
	var secondsToDisplay : float = 3.0;
	var hideNextButton : boolean = false;				// new in v1.1
	var hideDialogBackground : boolean = false;			// ** NEW in 3.3 - Hides the dialog background (black strip) during this screen.
	var screenToLoadOnNext : int = 0;
	var screenToLoadOnYes : int = 0;
	var screenToLoadOnNo : int = 0;
	var multipleButtons : int[] = [0,0,0];				// new in v1.5
	@System.NonSerialized
	var multipleButtonsEvaluated : int[] = [0,0,0];		// ** NEW IN 3.2 - The final multipleButtons after we apply logic to it.

	// Sends a callback to a GameObject as a String[] letting it know which id was pressed.
	var navigationCallbackGOName : String = "";								// Name of callback object
	var navigationCallbackFunctionName : String = "";						// Name of callback Function
	var navigationCallbackArg : String = "";								// Send this String argument too

	var logicDefaultNavigation : int = 1;				// new in v2.5
	var noPortraitFadeIn : boolean = false;				// new in v1.1 	
	var noPortraitFadeOut : boolean = false;			// new in v1.1 	
	var endDialogAfterThis : boolean = false;
	var destroyAtEnd : boolean = false;

	// Connect New Dialog At End
	var instantiateDialogPrefabAtEnd : GameObject;				// Instantiate a Dialog at end.
	var findAndPlayOtherDialogAtEnd : String = "";				// Find and Play this Dialog At End.
	var useDifferentStartID : boolean = false;					// should we override the StartID? (this is only used in the editor)
	var newStartID : int = 0;									// 0 = use standard startID, anything else is an override.

	// Load Level
	var restartLevelAtEnd : boolean = false;				// Should we restart the level at end?
	var loadLevelAtEnd : String = "";						// Load Level At End
	
}	

class DS_Actions{
		
	// Object Creation
	var createObjectsAtStart : DSObjectCreation[] = new DSObjectCreation[0];		// Creates Objects when the screen has started
	var createObjectsAtEnd : DSObjectCreation[] = new DSObjectCreation[0];			// Creates Objects when the screen has ended
	
	// Send Message
	var sendMessageAtStart : DS_SendMessage[] = new DS_SendMessage[0];				// Sends A Message to another message to run a function -> from v2.9
	var sendMessageAtEnd : DS_SendMessage[] = new DS_SendMessage[0];				// Sends A Message to another message to run a function -> from v2.9
	
	// Object Activation
	var activateTheseObjectsAtStart : String[] = new String[0];						// Find And Activate these Objects when the screen has started
/*NEW*/	var activateTheseObjectsAtStartDirectly : GameObject[] = new GameObject[0];		// ** Find And Activate these Objects when the screen has started -> from v2.9
	var activateTheseObjectsAtEnd : GameObject[] = new GameObject[0];				// Activate these Objects when the screen has ended
/*NEW*/	var activateTheseObjectsAtEndByName : String[] = new String[0];					// ** Find And Activate these Objects when the screen has ended -> from v2.9
	
	// Object De-Activation
/*NEW*/	var deactivateTheseObjectsAtStart : String[] = new String[0];					// Find And Activate these Objects when the screen has started -> from v2.9
/*NEW*/	var deactivateTheseObjectsAtStartDirectly : GameObject[] = new GameObject[0];	// ** Find And Activate these Objects when the screen has started -> from v2.9
/*NEW*/	var deactivateTheseObjectsAtEnd : GameObject[] = new GameObject[0];				// Activate these Objects when the screen has ended -> from v2.9
/*NEW*/	var deactivateTheseObjectsAtEndByName : String[] = new String[0];				// ** Find And Activate these Objects when the screen has ended -> from v2.9
	
	// Destroy GameObjects
/*NEW*/	var findAndDestroyTheseObjectsAtStart : String[] = new String[0];				// Find And destroy these game objects when the screen has started -> from v2.9
	var findAndDestroyTheseObjectsAtEnd : String[] = new String[0];					// Find And destroy these game objects when the screen has ended
/*NEW*/	var destroyTheseObjectsAtStart : GameObject[] = new GameObject[0];				// Destroy these game objects when the screen has started -> from v2.9
/*NEW*/	var destroyTheseObjectsAtEnd : GameObject[] = new GameObject[0];				// Destroy these game objects when the screen has started -> from v2.9
	
	// VISUAL NOVEL STYLE OPTIONS ( New in v2.0 )
	
	// Scene	
	var fadeAllSceneLayers : boolean = false;										// A Flag to tell the Dialog UI to fadeOut the scene completely.
	var sceneLayers : DialogUIBackgroundLayers[] = new DialogUIBackgroundLayers[10];// mimics the DialogUI setup
	
	// Actors	
	var fadeAllActorLayers : boolean = false;										// A Flag to tell the Dialog UI to fadeOut all actors completely.
	var actorLayers : DialogUIActorLayers[] = new DialogUIActorLayers[10];			// mimics the DialogUI setup
	
	// Music and Audio SFX
	var music : DSAudioSetup = new DSAudioSetup();
	var sfx1 : DSAudioSetup = new DSAudioSetup();
	var sfx2 : DSAudioSetup = new DSAudioSetup();
	var sfx3 : DSAudioSetup = new DSAudioSetup();
	
	// TOKENS
	var tokens : DSTokenActions[] = new DSTokenActions[0];
	var tokenFileManagement : DSTokenFileManagementActions = DSTokenFileManagementActions.None;	// Actions for Token File Management

	// PLAYERPREFS
	var playerPrefs : DSPlayerPrefsActions[] = new DSPlayerPrefsActions[0];						// ** NEW in Unity v3.5. Actions for PlayerPrefs.
	
	// API CALLBACKS
	// These are only avaible via the API.
	var callbacksAtStart : Function[];						// ** NEW in Unity v3.5. Call these functions at the start of this screen.
	var callbacksAtEnd : Function[];						// ** NEW in Unity v3.5. Call these functions at the end of this screen.
	var actionAtStart : System.Action;						// ** NEW in Unity v3.8. Call this action at the end of this screen.
	var actionAtEnd : System.Action;						// ** NEW in Unity v3.8. Call this action at the end of this screen.

	// ===================
	// THIRD PARTY TOOLS
	// ===================
	
	//var camMotion : DSActionsFor_camMotion = new DSActionsFor_camMotion();
	var uSequencer : DSActionsFor_uSequencer = new DSActionsFor_uSequencer();

	// POST BRUTAL ACTIONS
	#if UNITY_POSTBRUTAL
		var postBrutal : DSActionsFor_PostBrutal = new DSActionsFor_PostBrutal();
	#endif

	// =====================
	// lOCALIZATION ACTIONS
	// =====================

	var setNewLanguage : DS_SetNewLanguage = DS_SetNewLanguage.No;		// Should we update the localization Language?
	var updateGUISkins : boolean = true;								// This is used if "setNewLanguage" is Not No.
}

	// Set New Language
	enum DS_SetNewLanguage{No,AutoDetect,English,Chinese,Korean,Japanese,Spanish,Italian,German,French,Portuguese,Russian}

 	// POST BRUTAL CUSTOM ACTIONS CLASS
 	#if UNITY_POSTBRUTAL
		class DSActionsFor_PostBrutal{

			// Talk Animations
			var playerShouldTalk : boolean = false;				// Causes the player to run talking animation
			var findNPCToTalk : String = "";					// Find an NPC to talk for this screen.
			var npcShouldTalk : NPC = null;						// Causes NPC to run talking animation
			var findAIToTalk : String = "";						// Find an AI Actor to talk for this screen.
			var aiShouldTalk : AI_ActorController = null;		// Causes an AI Actor to run talking animation
			
			// Setup Camera
			var cameraStyle : FMVMODE = FMVMODE.IGNORE;			// From the FMV Class
			var cameraStyleTarget : Transform = null;			// An argument to send to the FMV class.
			var cameraStyleFindTarget : String = "";			// An argument to send to the FMV class.
			var stopFmvCameraAtEnd : boolean = false;			// Stops the FMV Camera at the end

			// Look At Transform
			var findTalkLookAt : String = "";					// Looks for a Transform to lookat when talking
			var talkLookAt : Transform = null;					// The actual LookAt Transform when talking
			
			// Options
			var stopAllMovementAI : boolean = true;				// By default, all AI enemies will stop moving during dialog.
		}
	#endif


	enum DSTokenFileManagementActions{None,SaveToPlayerPrefs,LoadFromPlayerPrefs,DeleteFromPlayerPrefs}

	// uSequencer Action Class
	enum DSuSequencerActionType{None,Play,Pause,Stop,Skip}
	class DSActionsFor_uSequencer{
		var go : GameObject = null;													// The actual gameObject of the uSequencer component 
		var findGo : String = "";													// The name of the uSequencer GameObject
		var setup : boolean = false;												// Setup playback Time / Rate.
		var setPlaybackTime : float = 0.0;											// SetPlayback Time
		var setPlaybackRate : float = 1.0;											// SetPlayback Rate
		var startAction : DSuSequencerActionType = DSuSequencerActionType.None;		// What action should we use
		var endAction : DSuSequencerActionType = DSuSequencerActionType.None;		// What action should we use
	}
	
	// Token Action Class
	enum DSTokenActionType{Set,Add,Subtract}
	class DSTokenActions{ 
		var index : int = 0;														// Token To Modify
		var action : DSTokenActionType = DSTokenActionType.Set;						// action to apply
		var argument : String = "";													// The argument to use (could be either a string or a number)
		var localize : boolean = false;												// Should we localize this argument?
		var localizedArgument : DS_LocalizedTokenArgument;							// Argument localizations
	}
		// Localized Arguments
		class DS_LocalizedTokenArgument{
			var english : String = "";												// This is set automatically
			var chinese : String = "";
			var korean : String = "";
			var japanese : String = "";
			var spanish : String = "";
			var italian : String = "";
			var german : String = "";
			var french : String = "";
			var portuguese : String = "";
			var russian : String = "";		
		}
	

	// ** NEW IN v3.5
	enum DSPlayerPrefsActionType{SetString,SetFloat,SetInt,AddToFloat,AddToInt,SubtractFromFloat,SubtractFromInt,DeleteKey,DeleteAllKeys}
	class DSPlayerPrefsActions{
		var action : DSPlayerPrefsActionType = DSPlayerPrefsActionType.SetString;	// What type of action to perform
		var key : String = "ENTER_KEY";												// What type of action to perform
		var stringArg : String = "";												// String Argument
		var floatArg : float = 0;													// Float Argument
		var intArg : int = 0;														// int Argument
	}


	// Audio Setup
	enum DSAudioAction{None,Play,FadeInAndPlay,FadeOut,Stop}
	public class DSAudioSetup{
		
		var source : AudioSource = null;											// These are automatically cached at start (copies from the DialogUI)!
		
		var action : DSAudioAction = DSAudioAction.None;
		var useAudioPath : boolean = false;
		var playFromPath : String = "";
		var clip : AudioClip;
		
		var volume : float = 1;
		var currentVolume : float = 1;												// This is a volume used for fading in (not visible in the editor)
		var pitch : float = 1;
		var loop : boolean = false;
		
		var fadeDuration : float = 2;
	}
	
	// SendMessage Setup
	class DS_SendMessage{
		var findDestination : String = "";
		var destination : GameObject = null;
		var functionName : String = "NameOfFunction";
		var argType : DS_SendMessageArg = DS_SendMessageArg.None;
		var stringArg : String = "";
		var intArg : float = 0;
		var floatArg : float = 0;
		var goArg : GameObject = null;
		var transformArg : Transform = null;	
		
	}
	enum DS_SendMessageArg{None,SendString,SendInt,SendFloat,SendGameObject,SendTransform}


// Object Creation Class
public class DSObjectCreation {

	var createObject : GameObject = null;
	var createLocation : Transform = null;
	var findGameObjectLocation : String = "";
	
}

// For Icon Grid API
class IconGridWindowOptions{
	// Setup the window and content area ...
	var IG_WindowSizeX : int = 1474;												// X Size of Window
	var IG_WindowSizeY : int = 1024;												// Y Size of Window
	var IG_WindowOffsetX : int = 0;													// Move the window X Pixels
	var IG_WindowOffsetY : int = 0;													// Move the window Y Pixels
	var IG_useXScrolling : boolean = false;											// use a scroll view with X Scrolling
	var IG_useYScrolling : boolean = false;											// use a scroll view with Y Scrolling
	var IG_WindowShowTitle : boolean = true;										// Should we show the title?
	var IG_WindowShowSubtitle : boolean = true;										// Should we show the subtitle?
	var IG_AddSpaceBetweenSubtitleAndContent : boolean = false;						// Should we add space between the content and titles?
	var IG_showPanelBG : boolean = true;											// Should we show the Panel BG graphic as the window?
	var IG_BackgroundAlpha : float = 1;												// The opacity of the background
	// NOTE: We share the variables for the Popup background to dispay it.
}

// For Icon Grid API
class IconGridLayout{
	// Icons
	var IG_iconSizeX : int = 150;													// X Size of the icons
	var IG_iconSizeY : int = 150;													// Y Size of the icons
	var IG_iconsPerRow : int = 4;													// Number of icons to display per row
	var IG_IconSpacer : int = 48;													// Spacer between icons
	var IG_AddInnerIconSpacing : int = 16;											// Apply Spacing inside of buttons
	var IG_showIconLabels : boolean = true;											// Show info under the icons?
	var IG_iconLabelSize : int = 32;												// The Y space of the labels (under the icons)
	var IG_firstIconIsCloseButton : boolean = true;									// If this is set to true, first button is on the top right.
	var IG_closeButtonSize : int = 100;												// Size of the close button
	var IG_showButtonBackgrounds : boolean = true;									// Should we render the button backgrounds normally?
	var IG_buttonImagePosition : ImagePosition = ImagePosition.ImageOnly;			// The image button position
}




