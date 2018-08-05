////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// 	DialogUI.js
//
//	Central Controller for LDC.
//
//	Created By Melli Georgiou
//	© 2012 - 2015 Hell Tap Entertainment LTD
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

#pragma downcast

// Screen Options
static var status : DUISTATUS = DUISTATUS.ENDED;							// Current internal status of the DialogUI
	enum DUISTATUS{ SHOW,FADEOUT,WAITFORSCREEN,ENDDIALOG,FORCECLOSE,ENDED };
static var ended : boolean = true;											// The UI has completely finished fading out

// Static Component
static var dui : DialogUI;													// This DialogUI, statically available.
static var guiComponent : Component;										// All GUI abstractions must register here.

// Change Thread Function
static var changeThreadDC : DialogController = null;						// The DialogController we are going to swap out.
static var changeThreadOverrideID : int = 0;								// 0 = Dont Override StartID

// Buttons, Focus and ScrollPositions
static var buttonNames : String[] = [""];
static var buttons : boolean[] = [false];
static var currentSelection = 0;
static var updateFocus : boolean = false;
static var scrollPosition : Vector2 = Vector2.zero;

// References
static var isActive : boolean;												// Should we show the UI?
@System.NonSerialized	
var alpha : float = 0;														// The opacity of the black bg

// Content Fade
@System.NonSerialized														// Comment this line out to see the debug status in the editor
var fade : float = 0;														// The opacity of the content (Portrait, text, etc.)

// Helper Values
private var localDeltaTime : float = 0.01;									// Caches DeltaTime on Update to use with GUI functions
	
// Screen Setup	
static var portrait : Texture2D;
static var actorName : String = "Actor's Name";
static var dialogText : String = "This is my dialog text.";					// What the ACTUAL digalog text is
static var currentDialogText : String;										// This is the "real time" dialogtext, ie to be used with typewriter effect

static var dialogStyle : DIALOGSTYLE;
static var customButton1 : String;
static var customButton2 : String;
static var multipleButtons : String[];
static var dataEntryToken : int = 0;										// Which token should we use for Data Entry
static var dataEntryFormat : DS_DATA_FORMAT = DS_DATA_FORMAT.Text;			// The format of the data (number or text)
static var dataEntryCharacterLimit : int = 25;								// The character limit of the text
static var dataEntryDefaultValue : String = "";								// The default value of the field
static var dataEntryString : String = "";									// Temporary string to hold the data entry
static var dataEntryAnchor : DS_DATA_ANCHOR = DS_DATA_ANCHOR.Bottom;		// How to position the Data Entry form

static var passwordMatchToToken : boolean = false;							// Password must match dataEntryToken.
static var passwordAnswer : String;											// The correct password for this screen.
static var passwordCaseSensitive : boolean = false;							// Should we enforce caps when comparing the password?
static var passwordMask : boolean = false;									// Hide Chars with ****

static var hideNextButton : boolean = false;	
static var noPortraitFadeIn : boolean = false;								// Don't allow any portrait transitions / fades while showing (fading in phase)
static var noPortraitFadeOut : boolean = false;								// Don't allow any portrait transitions / fades while showing (fading in phase)
static var screen : DialogScreen = null;
static var screenDuration : float;											// How long to display the screen before auto-skipping

static var portraitAnimation : DialogCastActor;								// *** NEW in v3. Animated Portraits.

// Custom Button Icons
static var buttonIcon1 : Texture2D;											// *** NEW in v3.8. Custom Button 1 Icon
static var buttonIcon2 : Texture2D;											// *** NEW in v3.8. Custom Button 2 Icon
static var multipleButtonsIcon : Texture2D[];								// *** NEW in v3.8. Custom Multiple Button Icons
static var buttonIcon1Animation : DialogCastActor;							// *** NEW in v3.8. Animated Custom Button 1 Icon
static var buttonIcon2Animation : DialogCastActor;							// *** NEW in v3.8. Animated Custom Button 2 Icon
static var multipleButtonsIconAnimation : DialogCastActor[];				// *** NEW in v3.8. Animated Custom Multiple Button Icons


static var setupTextField : boolean = false;								// toggle to try and setup the textfield in Data Entry / Password screens.

static var titleOffset : Vector2 = Vector2.zero;							// screencoordinates for the title in Title dialogs.
static var subtitleOffset : Vector2 = Vector2.zero;							// screencoordinates for the subtitle in Title dialogs.
static var titleColor : Color = Color.white;										// Text color of the title.
static var subtitleColor : Color = Color.white;									// Text color of the subtitle.
		
static var hideDialogBackground : boolean = false;						// hides the background during Title dialogs.
@System.NonSerialized
var hideBackgroundSubtractor : float = 0;

// Popup Image
static var popupImage : Texture2D;										// The background tex we will display in the popupImage
static var popupSizeX : int = 480;										// X Size of Popup
static var popupSizeY : int = 240;										// Y Size of Popup
static var popupBackgroundAlpha : float = 1;							// The opacity of the background
static var popupImageAnimation : DialogCastActor;						// The current Group, then animation ID to use
static var popupOptions : POPUP_OPTIONS = POPUP_OPTIONS.OneButton;		// The options of the Popup style

// Icon Grid
static var IG_WindowSizeX : int = 960;									// X Size of Window
static var IG_WindowSizeY : int = 640;									// Y Size of Window
static var IG_WindowOffsetX : int = 0;									// Move the window X Pixels
static var IG_WindowOffsetY : int = 0;									// Move the window Y Pixels
static var IG_WindowShowTitle : boolean = true;							// Should we show the title?
static var IG_WindowShowSubtitle : boolean = true;						// Should we show the subtitle?
static var IG_AddSpaceBetweenSubtitleAndContent : boolean = false;		// Should we add space between the content and titles?
static var IG_useXScrolling : boolean = false;							// use a scroll view with X Scrolling
static var IG_useYScrolling : boolean = false;							// use a scroll view with Y Scrolling
static var IG_showPanelBG : boolean = true;								// Should we show the Panel BG graphic as the window?

static var IG_BackgroundAlpha : float = 1;								// The opacity of the background
static var IG_Image : Texture2D;										// The background tex we will display in the Icon Grid
static var IG_ImageAnimation : DialogCastActor;							// The current Group, then animation ID to use

static var IG_iconSizeX : int = 128;									// X Size of the icons
static var IG_iconSizeY : int = 128;									// Y Size of the icon
static var IG_iconsPerRow : int = 6;									// Number of icons to display per row
static var IG_IconSpacer : int = 48;									// Spacer between icons
static var IG_AddInnerIconSpacing : int = 16;							// Apply Spacing inside of buttons
static var IG_showIconLabels : boolean = true;							// Show info under the icons?
static var IG_iconLabelSize : int = 32;									// The Y space of the labels (under the icons)
static var IG_firstIconIsCloseButton : boolean = true;					// If this is set to true, first button is on the top right.
static var IG_closeButtonSize : int = 100;								// Size of the close button
static var IG_showButtonBackgrounds : boolean = true;					// Should we render the button backgrounds normally?
static var IG_buttonImagePosition : ImagePosition = ImagePosition.ImageAbove;	// The image button position
static var IG_buttons : IconGridButtons[] = new IconGridButtons[1];		// the buttons being displayed in the Icon Grid

#if UNITY_POSTBRUTAL
	// Post Brutal Extras
	static var playerShouldTalk : boolean = false;						// Should the player talk
	static var npcShouldTalk : NPC;										// NPC Should talk
	static var aiShouldTalk : AI_ActorController;						// AI Actor should talk
	static var talkLookAt : Transform = null;							// The transform to look at
#endif

// Options
var options : DialogUIOptions = new DialogUIOptions();
class DialogUIOptions{
	var fadeDuration : float = 0.75;											// How long to fade between dialog screens	
	var backgroundFadeDuration : float = 0.75;									// How long to fade in / out the background graphic (lower black strip).
	var useGlobalTokens : boolean = false;										// If this is on, it will cause the tokens to be shared across different levels / scenes.
	var usePortraitFades : boolean = true;										// Allow the portrait to fade in
	var useButtonFades : boolean = true;										// Allow the buttons to fade in
	var useTextFades : boolean = true;											// Allow the buttons to fade in
	var usePortraitTransitions : boolean = true;								// Allow the portrait to slide in
	var useButtonTransitions : boolean = true;									// Allow buttons to slide in
	var drawTitleTextShadows : boolean = true;									// Draws a shadow for the Title / Actor text
	var drawBodyTextShadows : boolean = false;									// Draws a shadow for the body text
	var hideBackgroundFromUI : boolean = false;									// Option to hide the background image from the UI
	var hideChoicePanelFromUI : boolean = false;								// Option to hide the multiple choice background panel from the UI
	var hideAllTextFromUI : boolean = false;									// Option to hide the text from the UI
	var hideAllTitleTextFromUI : boolean = false;								// Option to hide the actor names and title text from the UI
	var hideAllBodyTextFromUI : boolean = false;								// Option to hide the main body of text from the UI
	var hideAllSingleButtonsFromUI : boolean = false;							// Option to force hide ALL "Next" or custom single buttons in the UI. Overrides hideNextButton.
	var ignoreAllDialogDuration : boolean = false;								// Option to ignore the duration on certain dialogs. Requires the user to press a button to continue.
	var ResizeTextIfNoPortraitsAreSetup : boolean = true;						// Text is moved all the way to the left when we have no icon / portrait setup
	var useTypeWriterEffectForText : boolean = true;							// Text is written on screen like a typewriter
	var typeWriterEffectSpeed : float = 1;										// Time modifier for typeWriter Effect.
	var completeTypeWriterEffectOnClickOrTouch : boolean = true;				// Allow the typewriter effect to be completed early
	var playTypeWriterAudio : AudioClip = null;									// The Audioclip to play for typewriter sound effects ** NEW in v3.8
	var playAudioOnButton : AudioClip = null;									// Plays audio when we press a button. ** NEW in v4
	var playAudioOnFocus : AudioClip = null;									// Plays audio when changing focus. ** NEW in v4
	
	var selectGuiWithTheseKeycodes : KeyCode[] = [KeyCode.KeypadEnter, KeyCode.Return];					// Skip dialogs by using any Keycode ** NEW in v3.3
	var focusNextGuiWithTheseKeycodes : KeyCode[] = [KeyCode.DownArrow, KeyCode.RightArrow,KeyCode.Tab];	// Moves focus of buttons up to the next GUI element. ** NEW in v3.3
	var focusPreviousGuiWithTheseKeycodes : KeyCode[] = [KeyCode.UpArrow, KeyCode.LeftArrow];			// Moves focus of buttons up to the next GUI element. ** NEW in v3.3
	var focusGuiWithTheseAxes : LDCInputAxes[] = [];							// Moves focus of buttons up to the next GUI element. ** NEW in v4
	
	@System.NonSerialized
	var focusButonTimeOut : float = 0;											// One timout counter for all GUI Buttons

	var audioFilepathPrefix : String = "Audio/";								// Allows us to put it in the root of our audio files to make setting up dialogs faster / cleaner
}

// LDC Input Axes
class LDCInputAxes{
	var axis : String = "Horizontal";
	var invert : boolean = false;
}

// Force close any playing Dialog
@System.NonSerialized															// Comment this line out to see this in the editor
var forceClose : boolean = false;

// Debug
@System.NonSerialized															// Comment this line out to see the debug status in the editor
var debugStatus : DUISTATUS = DUISTATUS.ENDED;									// allows us to view the status in the editor

// Background Layers
enum DUI_LAYER_STATUS{FadeIn,FadeOut,Hide,Show}									// Fades in and out texture, hide and show are instant!
@HideInInspector
var displayBackgroundLayers : boolean;											// Optimization variable to run background layers
@HideInInspector
var bgLayers : DialogUIBackgroundLayers[] = new DialogUIBackgroundLayers[0];	// We always have 5 background layers
class DialogUIBackgroundLayers{
	
	var setLayer : boolean;													// If this is flagged in the DialogScreen version of bgLayers, we should set the changes here too!
	var tex : Texture2D;													// the actual texture of the background
	var scale : ScaleMode;													// The scale mode to use
	
	// Animation (** NEW in v3.0)
	var animationID : Vector2 = Vector2(-1,-1);								// The current Group, then animation ID to use (-1 means dont animate) *** NEW in v3.0
	var anim : DialogCastActor = new DialogCastActor();						// We load up the animation here.
	
	// Hidden from player
	var opacity : float;													// the opacity of the texture
	var display : DUI_LAYER_STATUS = DUI_LAYER_STATUS.Hide;					// We should be hiding this layer by default.
}

// Actor Layers
enum DUI_ACTOR_MOTION{Static,Left,Right,Top,Bottom }						// How the Actor moves IN to the frame.
enum DUI_ACTOR_ALLIGN{TopLeft,Top,TopRight,MidLeft,Middle,MidRight,BotLeft,Bottom,BotRight}			// How the Actor moves IN to the frame.
@HideInInspector
var displayActorLayers : boolean;											// Optimization variable to run Actor layers
@HideInInspector
var bgActors : DialogUIActorLayers[] = new DialogUIActorLayers[0];			// We always have 5 Actor layers
class DialogUIActorLayers{
	
	var setLayer : boolean;													// If this is flagged in the DialogScreen version of bgLayers, we should set the changes here too!
	var tex : Texture2D;													// the actual texture of the background
	var scale : ScaleMode;													// The scale mode to use
	var size : float = 100;													// The size in percentage by ( 100 = original size, 50 = half size, 200 = double ) 
	var allignment : DUI_ACTOR_ALLIGN = DUI_ACTOR_ALLIGN.Middle;			// How to position the image on the screen (We use the built-in Unity TextAnchor for this), 
	var offset : Vector2 = Vector2.zero;									// Position Offset (After allignment has taken place)
	var motion : DUI_ACTOR_MOTION = DUI_ACTOR_MOTION.Static;				// Don't set tweening on by default.
	
	// Animation (** NEW in v3.0)
	var animationID : Vector2 = Vector2(-1,-1);								// The current Group, then animation ID to use (-1 means dont animate) *** NEW in v3.0
	var anim : DialogCastActor = new DialogCastActor();						// We load up the animation here.
	
	// Hidden from player
	var rect : Rect;														// Calculated Rect of the image (after size and allignment has been figured out)
	var motionRect : Rect;													// The above rect with "Tweening" Applied
	var opacity : float;													// the opacity of the texture
	var display : DUI_LAYER_STATUS = DUI_LAYER_STATUS.Hide;					// We should be hiding this layer by default.
}

// Audio Source
@HideInInspector
var musicSource : AudioSource;
@HideInInspector
var sfx1Source : AudioSource;
@HideInInspector
var sfx2Source : AudioSource;
@HideInInspector
var sfx3Source : AudioSource;
@HideInInspector
var typewriterSource : AudioSource;
@HideInInspector
var buttonSource : AudioSource;
@HideInInspector
var focusSource : AudioSource;

// AudioSetups ( class from DialogScreen )
@HideInInspector
var musicSetup : DSAudioSetup;												// AudioSetup
@HideInInspector
var sfx1Setup : DSAudioSetup;												// AudioSetup
@HideInInspector
var sfx2Setup : DSAudioSetup;												// AudioSetup
@HideInInspector
var sfx3Setup : DSAudioSetup;												// AudioSetup


// Tokens
var tokens : DUITokens[] =  new DUITokens[0];
@System.NonSerialized														// Comment this line out to see the debug status in the editor
var globalTokenStatus : DUI_GTS = DUI_GTS.None;
enum DUI_GTS{None,Initialized,Synchronized}									// None == not using Global Tokens, Initialized == first sync, Synchronized == 2nd+ frame
static var globalTokens : DUITokens[] = new DUITokens[0];
class DUITokens{
	var name : String = "";
	var value : String = "";
	var localizedValue : DUI_LocalizedValue = new DUI_LocalizedValue();
}
	// Languages
	class DUI_LocalizedValue {
		var english : String = "";
		var chinese : String = "";
		var korean : String = "";
		var japanese : String = "";
		var german : String = "";
		var french : String = "";
		var spanish : String = "";
		var italian : String = "";
		var portuguese : String = "";
		var russian : String = "";		
	}

// File Management
var fileManagement : LDC_Filemanagement = new LDC_Filemanagement();
class LDC_Filemanagement{
	var enable : boolean = false;										// [REQUIRES GLOBAL TOKENS!] If this is on, we will attempt to save and load tokens automatically.
	var savePrefix : String = "";										// Allows for multi-slot saves. Leave blank if you are only using single save slots.
	var loadOnAwake : boolean = true;									// Load tokens on awake function.
	var saveOnDestroy : boolean = true;									// Saves tokens when this gameObject is about to be destroyed (also doubles as end of level )
	var saveOnApplicationPause : boolean = false;						// Saves tokens automatically when pausing the application.
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	PLAY AUDIO
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

static function PlayButonAudio(){
	if( DialogUI.dui.buttonSource != null ){
		DialogUI.dui.buttonSource.clip = DialogUI.dui.options.playAudioOnButton;
		DialogUI.dui.buttonSource.Play();
	}
}

static function PlayFocusAudio(){
	if( DialogUI.dui.focusSource != null ){
		DialogUI.dui.focusSource.clip = DialogUI.dui.options.playAudioOnFocus;
		DialogUI.dui.focusSource.Play();
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	RESET STATIC VALUES
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

static function ResetStaticValues(){
	
	// Make sure our status is ended
	DialogUI.status = DUISTATUS.ENDED;
	DialogUI.changeThreadDC = null;
	DialogUI.changeThreadOverrideID = 0;

	// Remove any portraits left over from a previous scene.
	DialogUI.portrait = null;
	DialogUI.portraitAnimation = null;

}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	FILE MANAGEMENT
//	File Management Functions For LDC
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// SAVE TOKENS TO DISK ON DESTROY / END OF LEVEL
function OnDestroy(){
	
	// Should we save the tokens to PlayerPrefs?
	if(	DialogUI != null && DialogUI.dui != null && 
		DialogUI.dui.options.useGlobalTokens &&
		DialogUI.dui.fileManagement.enable &&
		DialogUI.dui.fileManagement.saveOnDestroy
	){
		Debug.Log("LDC: Saving Tokens On Destroy");
		SaveTokensToDisk();
	}

	// Reset All Static Values before destroying DialogUI
	DialogUI.ResetStaticValues();

	// Reset ALL Settings.
	DialogUI.isActive = false;
	DialogUI.status = DUISTATUS.ENDED;
	DialogUI.ended = true;
	DialogUI.screenDuration = 0;

	forceClose = false;
	screen = null;
	portrait = null;
	portraitAnimation = null;
	actorName = "";
	dialogText = "";
	currentDialogText = "";
	alpha = 0;
	fade = 0;
}

// SAVE TOKENS TO DISK ON PAUSE
function OnApplicationPause( wasJustPaused : boolean ){
		
	// Should we save the tokens to PlayerPrefs?
	if(	wasJustPaused &&
		Time.timeSinceLevelLoad > 1 &&	// Make sure Start and Awake have had time to run first!
		DialogUI != null && DialogUI.dui != null && 
		DialogUI.dui.options.useGlobalTokens &&
		DialogUI.dui.fileManagement.enable &&
		DialogUI.dui.fileManagement.saveOnApplicationPause
	){
		Debug.Log("LDC: Saving Tokens On Pause");
		SaveTokensToDisk();
	}
}


// REMOVE BAD CHARACTERS FROM PREFIX TO MAKE IT SAFE FOR FILES
static function MakeSavePrefixSafe( prefix : String){
	
	// Make sure the prefix isn't blank ..
	if( prefix!="" ){
		prefix = prefix.Replace(" ", "_");		// <- Replace Spaces with underscores
		prefix = prefix.Replace("\"", "");		// <- Remove "
		prefix = prefix.Replace("/", ""); 
		prefix = prefix.Replace("\\", "");
		prefix = prefix.Replace("|", "");
		prefix = prefix.Replace(".", "");
		prefix = prefix.Replace("<", "");
		prefix = prefix.Replace(">", "");
		prefix = prefix.Replace(",", "");
		prefix = prefix.Replace("?", "");
		prefix = prefix.Replace(";", "");
		prefix = prefix.Replace(":", "");
		prefix = prefix.Replace("'", "");
		prefix = prefix.Replace("{", "");
		prefix = prefix.Replace("}", "");
		prefix = prefix.Replace("[", "");
		prefix = prefix.Replace("]", "");
		prefix = prefix.Replace("-", "");
		prefix = prefix.Replace("+", "");
		prefix = prefix.Replace("=", "");
		prefix = prefix.Replace("!", "");
		prefix = prefix.Replace("@", "");
		prefix = prefix.Replace("#", "");
		prefix = prefix.Replace("$", "");
		prefix = prefix.Replace("%", "");
		prefix = prefix.Replace("^", "");
		prefix = prefix.Replace("&", "");
		prefix = prefix.Replace("*", "");
		prefix = prefix.Replace("`", "");
		prefix = prefix.Replace("~", "");
		prefix = prefix.Replace("(", "");
		prefix = prefix.Replace(")", "");
		// For formatting ..
		prefix = prefix + "_"; 					// Add underscore to the end of the prefix to make the save key look better.
	}
	
	return prefix;
}


// SAVE TOKENS TO DISK (PLAYER PREFS)
static function SaveTokensToDisk(){

	// Setup prefix
	var prefix : String = "";										// Setup an empty prefix because the next statement needs this!
	if(	DialogUI != null && DialogUI.dui != null ){					// Make sure we can see Dialog.dui	
		prefix = DialogUI.dui.fileManagement.savePrefix.ToUpper();	// Convert the prefix into upper case to match the rest of the save key.
		prefix = DialogUI.MakeSavePrefixSafe(prefix);				// Remove bad characters and add some formatting to make it look good in the Plists
	}

	// Make sure that all references are visible, and that Global Tokens have been setup correctly.
	if(	DialogUI != null && DialogUI.dui != null && 
		DialogUI.dui.options.useGlobalTokens &&
		DialogUI.dui.fileManagement.enable &&
		DialogUI.dui.tokens != null && 
		DialogUI.dui.tokens.length > 0
	){	
		
		// Delete the Size key if it already exists ( this sometimes causes problems which is why we need to delete it first! )
		if( PlayerPrefs.HasKey(prefix+"LDC_TOKENS_SIZE") ){
			PlayerPrefs.DeleteKey(prefix+"LDC_TOKENS_SIZE");
		}
		
		// Global Token Size
		PlayerPrefs.SetInt(prefix+"LDC_TOKENS_SIZE", DialogUI.dui.tokens.length );
	
		// Loop through the tokens and save them to disk
		var counter : int = 0;
		for( var token : DUITokens in DialogUI.dui.tokens){
			
			// Make sure this global token is valid
			if(token!=null){
				
				// If this token has already been saved, delete it first.
				if( PlayerPrefs.HasKey(prefix+"LDC_TOKENS_NAME_"+counter.ToString() ) ){
					PlayerPrefs.DeleteKey(prefix+"LDC_TOKENS_NAME_"+counter.ToString() );
				}
				if( PlayerPrefs.HasKey(prefix+"LDC_TOKENS_VALUE_"+counter.ToString() ) ){
					PlayerPrefs.DeleteKey(prefix+"LDC_TOKENS_VALUE_"+counter.ToString() );
				}
				
				// Save the Token to PlayerPrefs
				PlayerPrefs.SetString(prefix+"LDC_TOKENS_NAME_"+counter.ToString(), token.name );
				PlayerPrefs.SetString(prefix+"LDC_TOKENS_VALUE_"+counter.ToString(), token.value );
			}
			
			// increment counter
			counter++;
		}
		
		// Debug
		// Debug.Log("LDC: "+ counter+ " Tokens were saved to PlayerPrefs.");
	
	// Error	
	} else if ( DialogUI.dui!=null && DialogUI.dui.fileManagement.enable ) {
		Debug.Log("LDC: Couldn't save Tokens to PlayerPrefs. Make sure that you have enabled Global Tokens, and have at least 1 token setup in the DialogUI component!");
	} else if ( DialogUI.dui!=null && !DialogUI.dui.fileManagement.enable ) {
		Debug.Log("LDC: Couldn't save Tokens to PlayerPrefs. You need to enable \"File Management\" in DialogUI.");
	}
	
}

// LOAD TOKENS FROM DISK (PLAYER PREFS)
static function LoadTokensFromDisk(){

	// Setup prefix
	var prefix : String = "";										// Setup an empty prefix because the next statement needs this!
	if(	DialogUI != null && DialogUI.dui != null ){					// Make sure we can see Dialog.dui	
		prefix = DialogUI.dui.fileManagement.savePrefix.ToUpper();	// Convert the prefix into upper case to match the rest of the save key.
		prefix = DialogUI.MakeSavePrefixSafe(prefix);				// Remove bad characters and add some formatting to make it look good in the Plists
	}
	
	// Make sure that all references are visible, and that Global Tokens have been setup correctly.
	if(	DialogUI != null && DialogUI.dui != null && 
		DialogUI.dui.options.useGlobalTokens &&
		DialogUI.dui.fileManagement.enable &&
		PlayerPrefs.HasKey(prefix+"LDC_TOKENS_SIZE")
	){	
		
		// Make sure we have set the token array size and its bigger than 0!
		if( PlayerPrefs.GetInt(prefix+"LDC_TOKENS_SIZE") > 0 ){
		
			// Create a new array of tokens with the saved token array size
			DialogUI.dui.tokens = new DUITokens[  PlayerPrefs.GetInt(prefix+"LDC_TOKENS_SIZE") ];
			
			// Loop through the Tokens and set them up
			var counter : int = 0;
			if( DialogUI.dui.tokens.length > 0 ){
				for( var token : DUITokens in DialogUI.dui.tokens){
					
					// Create A New Token
					token = new DUITokens();
					
					// Set Token Name	
					if( PlayerPrefs.HasKey(prefix+"LDC_TOKENS_NAME_"+counter.ToString() ) ){
						token.name = PlayerPrefs.GetString(prefix+"LDC_TOKENS_NAME_"+counter.ToString() );
					}
					
					// Set Token Value
					if( PlayerPrefs.HasKey(prefix+"LDC_TOKENS_VALUE_"+counter.ToString() ) ){
						token.value = PlayerPrefs.GetString(prefix+"LDC_TOKENS_VALUE_"+counter.ToString() );
					}
					
					// increment counter
					counter++;
				}
			}
			
			// Debug
			// Debug.Log("LDC: "+ counter+ " Tokens were loaded and created from PlayerPrefs.");
		
			// Update Global Tokens
			DialogUI.globalTokens = DialogUI.dui.tokens;
		}
		
	// Error	
	} else if ( DialogUI.dui!=null && DialogUI.dui.fileManagement.enable ) {
		Debug.Log("LDC: Couldn't load Tokens from PlayerPrefs. Make sure that you have enabled Global Tokens, or perhaps no tokens have been saved yet!");
	} else if ( DialogUI.dui!=null && !DialogUI.dui.fileManagement.enable ) {
		Debug.Log("LDC: Couldn't load Tokens from PlayerPrefs. You need to enable \"File Management\" in DialogUI.");
	}
	
}

// DELETE TOKENS FROM DISK (PLAYER PREFS)
static function DeleteTokensFromDisk(){

	// Setup prefix
	var prefix : String = "";										// Setup an empty prefix because the next statement needs this!
	if(	DialogUI != null && DialogUI.dui != null ){					// Make sure we can see Dialog.dui	
		prefix = DialogUI.dui.fileManagement.savePrefix.ToUpper();	// Convert the prefix into upper case to match the rest of the save key.
		prefix = DialogUI.MakeSavePrefixSafe(prefix);				// Remove bad characters and add some formatting to make it look good in the Plists
	}
	
	// Make sure that all references are visible, and that Global Tokens have been setup correctly.
	if(	DialogUI != null && DialogUI.dui != null && 
		DialogUI.dui.options.useGlobalTokens &&
		DialogUI.dui.fileManagement.enable &&
		PlayerPrefs.HasKey(prefix+"LDC_TOKENS_SIZE")
	){	
		
		// Make sure we have set the token array size and its bigger than 0!
		if( PlayerPrefs.GetInt(prefix+"LDC_TOKENS_SIZE") > 0 ){
			
			// Loop through the Tokens and delete them
			for(var i = 0; i < PlayerPrefs.GetInt(prefix+"LDC_TOKENS_SIZE"); i++){
				
				// Set Token Name	
				if( PlayerPrefs.HasKey(prefix+"LDC_TOKENS_NAME_"+i.ToString() ) ){
					PlayerPrefs.DeleteKey(prefix+"LDC_TOKENS_NAME_"+i.ToString() );
				}
				
				// Set Token Value
				if( PlayerPrefs.HasKey(prefix+"LDC_TOKENS_VALUE_"+i.ToString() ) ){
					PlayerPrefs.DeleteKey(prefix+"LDC_TOKENS_VALUE_"+i.ToString() );
				}

			}
			
			// Delete Token Size Key
			PlayerPrefs.DeleteKey(prefix+"LDC_TOKENS_SIZE");
		}
		
	// Error	
	} else if ( DialogUI.dui!=null && DialogUI.dui.fileManagement.enable ) {
		Debug.Log("LDC: Couldn't delete Tokens from PlayerPrefs. Make sure that you have enabled Global Tokens, or perhaps no tokens have been saved yet!");
	} else if ( DialogUI.dui!=null && !DialogUI.dui.fileManagement.enable ) {
		Debug.Log("LDC: Couldn't delete Tokens from PlayerPrefs. You need to enable \"File Management\" in DialogUI.");
	}
	
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	PARSE FUNCTIONS
//	Workaround For TryParse On Flash
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class floatRef{	var value : float = 0;	}	// We have to use this as a workaround in JS too.
static function ParseTokenAsFloat( stringToParse : String, destination : floatRef ){
	try {
    	destination.value = float.Parse(stringToParse);
    	return true;
	}
	catch (err) {
	   return false;
	}
	// If something weird happens, just return false ..
	return false;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	TOKEN API
//	Set / Get Tokens externally
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ====================
//	SET TOKEN
// ====================

static function SetToken( tokenToSet : String, tokenValue : String ){
	
	// Handle null as an argument
	if( tokenValue == null){ tokenValue = ""; }
	
	// Set the token
	if(DialogUI.dui != null){
	
		// If we have tokens setup	
		var tokenWasFound : boolean = false;
		if( DialogUI.dui.tokens.length > 0 ){
			for( var token : DUITokens in DialogUI.dui.tokens ){
				// If this token's name matches:
				if( token.name == tokenToSet ){
					token.value = tokenValue;
					tokenWasFound = true;
				}
			}
		}
		
		// Update Global Tokens
		DialogUI.UpdateGlobalTokens();
		
		// Token wasn't found
		if(!tokenWasFound){
			Debug.Log("DIALOG UI: (SetToken) The Token \"" + tokenToSet+"\" wasn't found and couldn't be set.");	
		}
	
	// If DialogUI.dui isn't ready yet, throw an error.	
	} else {
		Debug.Log("DIALOG UI: (SetToken) Couldn't set token because DialogUI.dui isn't ready yet. This usually happens when calling SetToken from the Awake() function, try using Start() instead!");	
	}
}

// ====================
//	SET TOKEN
// ====================

static function SetToken( tokenToSet : String, sentFloat : float ){
	
	// Convert the float into a string
	if( sentFloat == null){ sentFloat = 0; }
	var tokenValue : String = sentFloat.ToString();
	
	// Set the token
	if(DialogUI.dui != null){
	
		// If we have tokens setup	
		var tokenWasFound : boolean = false;
		if( DialogUI.dui.tokens.length > 0 ){
			for( var token : DUITokens in DialogUI.dui.tokens ){
				// If this token's name matches:
				if( token.name == tokenToSet ){
					token.value = tokenValue;
					tokenWasFound = true;
				}
			}
		}
		
		// Update Global Tokens
		DialogUI.UpdateGlobalTokens();
		
		// Token wasn't found
		if(!tokenWasFound){
			Debug.Log("DIALOG UI: (SetToken) The Token \"" + tokenToSet+"\" wasn't found and couldn't be set.");	
		}
	
	// If DialogUI.dui isn't ready yet, throw an error.	
	} else {
		Debug.Log("DIALOG UI: (SetToken) Couldn't set token because DialogUI.dui isn't ready yet. This usually happens when calling SetToken from the Awake() function, try using Start() instead!");	
	}
}

// ====================
//	GET TOKEN
// ====================

static function GetToken( tokenToGet : String ){
	
	// Set the token
	if(DialogUI.dui != null){
	
		// If we have tokens setup	
		var tokenWasFound : boolean = false;
		if( DialogUI.dui.tokens.length > 0 ){
			for( var token : DUITokens in DialogUI.dui.tokens ){
				// If this token's name matches:
				if( token.name == tokenToGet ){
					tokenWasFound = true;
					return token.value;
				}
			}
		}
		
		// Token wasn't found
		if(!tokenWasFound){
			Debug.Log("DIALOG UI: (GetToken) The Token \"" + tokenToGet+"\" wasn't found.");	
			return "";
		}
	
	// If DialogUI.dui isn't ready yet, throw an error.	
	} else {
		Debug.Log("DIALOG UI: (GetToken) Couldn't set token because DialogUI.dui isn't ready yet. This usually happens when calling SetToken from the Awake() function, try using Start() instead!");	
	}
	
	// Return "" by default if no tokens were found.
	return "";
}

// ====================
//	GET TOKEN AS FLOAT
// ====================

static function GetTokenAsFloat( tokenToGet : String ){
	
	// Set the token
	if(DialogUI.dui != null){
	
		// If we have tokens setup	
		var tokenWasFound : boolean = false;
		if( DialogUI.dui.tokens.length > 0 ){
			for( var token : DUITokens in DialogUI.dui.tokens ){
				// If this token's name matches:
				if( token.name == tokenToGet ){
					tokenWasFound = true;
					
					// Try and convert the string into a float, and then return it!
					//var theFloat : float = 0;
					//if ( float.TryParse(token.value, theFloat) ){
					//	return theFloat;
					var theFloat = floatRef(); // Flash workaround.
					if ( DialogUI.ParseTokenAsFloat(token.value, theFloat) ){
						return theFloat.value;	
						
					// If it couldn't be converted, show an error and return 0.	
					} else {
						Debug.Log("DIALOG UI: (GetTokenAsFloat) Couldn't convert Token \"" + tokenToGet+"\" into a float. Returned 0.");
						return 0.0;
					}
				}
			}
		}
		
		// Token wasn't found
		if(!tokenWasFound){
			Debug.Log("DIALOG UI: (GetTokenAsFloat) The Token \"" + tokenToGet+"\" wasn't found.");	
			return 0.0;
		}
	
	// If DialogUI.dui isn't ready yet, throw an error.	
	} else {
		Debug.Log("DIALOG UI: (GetTokenAsFloat) Couldn't set token because DialogUI.dui isn't ready yet. This usually happens when calling SetToken from the Awake() function, try using Start() instead!");	
	}
	
	
	// Return "" by default if no tokens were found.
	return 0.0;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	TOKEN ACTIONS
//	Sets up token actions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function TokenActions( actions : DSTokenActions[] ){

	if( tokens.length > 0 ){
		
		// Start the loop through the actions
		var counter : int = 0;
		for( var action : DSTokenActions in actions ){
			
			// Make sure the action is valid and that our token index is within range ..
			if( action != null && action.index <= tokens.length-1 ){
				
				// Cache the actual token we're going to modify
				var token : DUITokens = tokens[action.index];
				
				// Helper variables
				var valueAsFloat = floatRef(); // Flash workaround.
				var argumentAsFloat = floatRef(); // Flash workaround.
				var parseFailed : boolean = false;
				
				// SET TOKEN
				if( action.action == DSTokenActionType.Set ){
					
					token.value = action.argument;
					// Add localization code here.
					
				}
				
				// ADD TO TOKEN
				else if( action.action == DSTokenActionType.Add ){
					
					// Parse Original Value
					//if( float.TryParse(token.value, valueAsFloat)){		
					if ( DialogUI.ParseTokenAsFloat(token.value, valueAsFloat) ){
									  
					//	 Debug.Log(valueAsFloat);
					}else{
					   Debug.Log("Unable to parse '{0}'." + token.value); 
					   parseFailed = true; 
					}
					
					// Parse Argument
					//if( float.TryParse(action.argument, argumentAsFloat)){
					if ( DialogUI.ParseTokenAsFloat(action.argument, argumentAsFloat) ){					  
					//	 Debug.Log(argumentAsFloat);
					}else{
					   Debug.Log("Unable to parse '{0}'." + action.argument);
					   parseFailed = true;  
					}

					// Add the 2 new variables together if everything parsed ok ..
					if(!parseFailed){
						valueAsFloat.value += argumentAsFloat.value;
						token.value = valueAsFloat.value.ToString();
					}
				}
				
				// SUBTRACT FROM TOKEN
				else if( action.action == DSTokenActionType.Subtract ){
					
					// Parse Original Value
					//if( float.TryParse(token.value, valueAsFloat)){
					if ( DialogUI.ParseTokenAsFloat(token.value, valueAsFloat) ){
					//	 Debug.Log(valueAsFloat);
					}else{
					   Debug.Log("Unable to parse '{0}'." + token.value); 
					   parseFailed = true; 
					}
					
					// Parse Argument
					//if( float.TryParse(action.argument, argumentAsFloat)){	
					if ( DialogUI.ParseTokenAsFloat(action.argument, argumentAsFloat) ){						  
					  
					//	 Debug.Log(argumentAsFloat);
					}else{
					   Debug.Log("Unable to parse '{0}'." + action.argument);
					   parseFailed = true;  
					}

					// Add the 2 new variables together if everything parsed ok ..
					if(!parseFailed){
						valueAsFloat.value -= argumentAsFloat.value;
						token.value = valueAsFloat.value.ToString();
					}
				}
				
			}
			
		}
		
		// Update Global Tokens
		DialogUI.UpdateGlobalTokens();
	}
	
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	GET TOKEN STRING ARRAY
//	function to recieve a String[] with the token names
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function GetTokenStringArray(){
	
	// Setup temporary Array
	var tokenArray : String[];

	// javascript Array
	var arr : Array = new Array();
	arr.Clear();
	
	// Populate the array
	if(tokens.Length > 0 ){
		for(var token : DUITokens in tokens){
			arr.Add(token.name);
		}
	}
	// Convert the javascript array into the token array
	tokenArray = arr.ToBuiltin(String) as String[];
		
	// return the array
	return tokenArray;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	SETUP DIALOG TEXT EFFECTS
//	We use this to start the typewriter effect, and later on for tokens, etc.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function SetupDialogTextEffects() {
	
	// Setup Tokens
	DialogUI.dialogText = ApplyTokens(DialogUI.dialogText);
	DialogUI.actorName = ApplyTokens(DialogUI.actorName);

	// Setup Button Tokens
	DialogUI.customButton1 = ApplyTokens(DialogUI.customButton1);
	DialogUI.customButton2 = ApplyTokens(DialogUI.customButton2);
	
	// Setup Multiple Button tokens
	if(DialogUI.multipleButtons != null && DialogUI.multipleButtons.length > 0){
		for( var s : String in DialogUI.multipleButtons){
			s = ApplyTokens(s);
		}
	}
		
	// If the dialogText isn't empty and we've enabled typewriter effect
	if( DialogUI.dialogText != "" && DialogUI.dui.options.useTypeWriterEffectForText ){
		DialogUI.currentDialogText = "";
		
		StopCoroutine("TypeWriterEffect");
		yield StartCoroutine( "TypeWriterEffect" );
			
	} else {
		DialogUI.currentDialogText = DialogUI.dialogText;
	}
		
}

// Creates a type writer effect when displaying the dialog text
private var twLastTime : float = 0;
private var twDeltaTime : float = 0;
private var twTextLength : float = 0;
function TypeWriterEffect(){

	// Wait until the screen has faded in enough before we start the typewriter effect ..
	while(fade < 0.25){		
		yield;
	}

	// Reset Delta Time and the text length
	twDeltaTime = 0;
	twLastTime = Time.realtimeSinceStartup;
	twTextLength = 0;
	
	// Play Typewriter Audio
	if( typewriterSource != null && options.playTypeWriterAudio != null &&
		DialogUI.dialogStyle == DIALOGSTYLE.NextButton ||
		DialogUI.dialogStyle == DIALOGSTYLE.YesOrNo ||
		DialogUI.dialogStyle == DIALOGSTYLE.OneButton ||
		DialogUI.dialogStyle == DIALOGSTYLE.TwoButtons
	){
		typewriterSource.clip = options.playTypeWriterAudio;
		typewriterSource.loop = true;
		typewriterSource.Play();
	}

	// Once the content has faded in enough, lets start the typewriter effect
	while( DialogUI.dialogText != "" && DialogUI.dialogText != DialogUI.currentDialogText ){

		// Calculate delta Time
		twDeltaTime = Time.realtimeSinceStartup - twLastTime;
		twLastTime = Time.realtimeSinceStartup;
		twTextLength += (twDeltaTime * 24) * options.typeWriterEffectSpeed;	// Default is 24 characters per second.

		// Set the current text length to stay within bounds of the original text
		twTextLength = Mathf.Clamp( twTextLength, 0, DialogUI.dialogText.length ); // Make sure the text length is in bounds

		// Show the current text based on how much time has gone by
		DialogUI.currentDialogText = DialogUI.dialogText.Substring(0, Mathf.Round(twTextLength) );

		// Finish Early On Mouse Click Or Touch
		if(	options.completeTypeWriterEffectOnClickOrTouch && DialogUI.currentDialogText != DialogUI.dialogText &&
			( Input.touchCount > 0 || Input.GetMouseButton(0) || Input.GetMouseButton(1) || Input.GetMouseButton(2) )
		){
			DialogUI.currentDialogText = DialogUI.dialogText;
		}

		// yield
		yield;
	}

	// Play Typewriter Audio
	if( typewriterSource != null && options.playTypeWriterAudio != null && typewriterSource.isPlaying ){
		typewriterSource.Stop();
	}
}

// Replaces tokens with their real values
function ApplyTokens( source : String ){
	
	// Loop through the tokens
	if( source != "" && tokens.length > 0 ){
		for(var token : DUITokens in tokens){
			if(token!=null && token.name != "" && token.value != ""){
				
				// Helper variables
				var tokenAsFloat = floatRef();
				var updatedTokenValue : String;
				
				// This will help format numeric tokens better ( for example 004, will become 4 )
				//if( float.TryParse(token.value, tokenAsFloat)){	
				if ( DialogUI.ParseTokenAsFloat(token.value, tokenAsFloat) ){						  
	
					updatedTokenValue = tokenAsFloat.value.ToString();
				} else {
					updatedTokenValue = token.value;
				}
				
				// If the source string contains the token variable, then replace it with the token value..
				if( source.Contains("$"+token.name) ){
					source = source.Replace("$"+token.name, updatedTokenValue );
				}
				
			}
		}
	}
	
	
	// Return the source when we're done
	return source;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	UPDATE GLOBAL TOKENS
//	Whenever we do anything with tokens, we should update Global Tokens to keep it synced across different frames
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

static function UpdateGlobalTokens(){

	// if we're using Global tokens and we can access the DialogUI, lets update them!
	if( DialogUI.dui != null && DialogUI.dui.options.useGlobalTokens && DialogUI.dui.globalTokenStatus != DUI_GTS.None){
		// Debug.Log("LDC: Updated Global Tokens");
		DialogUI.globalTokens = DialogUI.dui.tokens;
	}
	
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	AWAKE
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Awake () {
	
	// Reset All Static values
	DialogUI.ResetStaticValues();
		
	// Make this component statically available
	DialogUI.dui = this;

	// GLOBAL TOKENS
	// Note: In the beginning of each frame, if the static tokens array is empty, we know to copy from the main one. 
	// On every scene after that it should show up as length > 0.
	if( options.useGlobalTokens ){
		
		// This is the first time we're setting up global tokens, lets copy it from the main one.
		if( DialogUI.dui.tokens.length > 0 && DialogUI.globalTokens.length == 0 ){	
			Debug.Log("LDC: Initializing Global Tokens");
			globalTokenStatus = DUI_GTS.Initialized;
			DialogUI.globalTokens = DialogUI.dui.tokens;
		
		// This a new scene - lets copy the Global Tokens back to the main one
		} else if ( DialogUI.globalTokens != null && DialogUI.globalTokens.length == DialogUI.dui.tokens.length) {
		//	Debug.Log("LDC: Syncing Global Tokens");
			globalTokenStatus = DUI_GTS.Synchronized;
			DialogUI.dui.tokens = DialogUI.globalTokens;
		
		// Something has gone wrong and we can't sync the Global Tokens
		} else {
			globalTokenStatus = DUI_GTS.None;
			Debug.Log("LDC: (DialogUI) ERROR - Syncing Global Tokens Failed. Are there tokens setup in the DialogUI component?");
		}
		
		// Load Tokens From Disk On Awake.
		if( DialogUI.dui.fileManagement.loadOnAwake ){
			DialogUI.LoadTokensFromDisk();
		}
		
	}
	
	// BG / ACTOR LAYERS
	// Make sure the graphics Layer arrays have 10 entries!
	bgLayers = new DialogUIBackgroundLayers[10];
	for(var bgLayer : DialogUIBackgroundLayers in bgLayers){bgLayer = new DialogUIBackgroundLayers(); }
	bgActors = new DialogUIActorLayers[10];
	for(var bgActor : DialogUIActorLayers in bgActors){bgActor = new DialogUIActorLayers(); }
	
	// CREATE AUDIO GAMEOBJECTS AND ATTACH
	// Music
	var music : GameObject = new GameObject("Dialog UI - Music Channel");
	music.transform.parent = transform;
	musicSource = music.AddComponent(AudioSource);
	musicSource.loop = true;
	musicSource.playOnAwake = false;
	
	// SFX
	var sfx1 : GameObject = new GameObject("Dialog UI - SFX Channel 1");
	sfx1.transform.parent = transform;
	sfx1Source = sfx1.AddComponent(AudioSource);
	sfx1Source.loop = false;
	sfx1Source.playOnAwake = false;
	
	// SFX
	var sfx2 : GameObject = new GameObject("Dialog UI - SFX Channel 2");
	sfx2.transform.parent = transform;
	sfx2Source = sfx2.AddComponent(AudioSource);
	sfx2Source.loop = false;
	sfx2Source.playOnAwake = false;
	
	// SFX
	var sfx3 : GameObject = new GameObject("Dialog UI - SFX Channel 3");
	sfx3.transform.parent = transform;
	sfx3Source = sfx3.AddComponent(AudioSource);
	sfx3Source.loop = false;
	sfx3Source.playOnAwake = false;

	// TYPEWRITER AUDIO
	var twriter : GameObject = new GameObject("Dialog UI - TypeWriter Channel");
	twriter.transform.parent = transform;
	typewriterSource = twriter.AddComponent(AudioSource);
	typewriterSource.clip = options.playTypeWriterAudio;
	typewriterSource.loop = false;
	typewriterSource.playOnAwake = false;

	// BUTTON AUDIO
	var btnAudio : GameObject = new GameObject("Dialog UI - Button Channel");
	btnAudio.transform.parent = transform;
	buttonSource = btnAudio.AddComponent(AudioSource);
	buttonSource.clip = options.playAudioOnButton;
	buttonSource.loop = false;
	buttonSource.playOnAwake = false;

	// FOCUS AUDIO
	var focAudio : GameObject = new GameObject("Dialog UI - Focus Channel");
	focAudio.transform.parent = transform;
	focusSource = focAudio.AddComponent(AudioSource);
	focusSource.clip = options.playAudioOnFocus;
	focusSource.loop = false;
	focusSource.playOnAwake = false;
	

	// Set Status to ended at start
	DialogUI.status = DUISTATUS.ENDED;
	
	// Create Origin Object (so we can create objects there using Dialog Screens)
	transform.position = Vector3.zero; transform.rotation = Quaternion.identity;
	var theOrigin : GameObject = new GameObject("Origin");
	if(theOrigin!=null){theOrigin.transform.parent = transform;}
	
	// ==================
	// OPTION FIXES
	// ==================
	
	// Transitions won't play properly if the fade duration is too quick .. so we can automatically turn them off here
	if( options.fadeDuration < 0.1 ){
		options.fadeDuration = 0.001;
		options.usePortraitFades = false;
		options.useButtonFades = false;
		options.useTextFades = false;
		options.usePortraitTransitions = false;
		options.useButtonTransitions = false;
	}
	
	// If we are ignoring dialog duration, we NEED to have single buttons in the UI. So we automatically turn them back on at start!
	if( options.ignoreAllDialogDuration ){
		options.hideAllSingleButtonsFromUI = false;
	}
	
	// Make sure the typewriter speed isn't too low
	if(options.typeWriterEffectSpeed < 0.1){
		options.typeWriterEffectSpeed = 0.1;
	}
	
	// ==================
	// GUI BUTTON FOCUS
	// ==================
	
	// Reset currentSelection
	DialogUI.currentSelection = 0;
	DialogUI.updateFocus = false;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	START
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Start(){

	// Add DialogOnGUI Component if no GUI Component has been registered exist
	if( DialogUI.guiComponent == null && GetComponent(DialogOnGUI) == null ){
		Debug.Log("DialogUI: No GUI Component has been registered, creating default DialogOnGUI.");
		gameObject.AddComponent(DialogOnGUI);

	// If we're using a custom GUI Abstraction layer, print it here.	
	} else if( GetComponent(DialogOnGUI) == null ){
		Debug.Log("DialogUI: Using " + DialogUI.guiComponent + " for GUI." );
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	LOCALIZE TOKENS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function LocalizeTokens(){
	
	if( !options.useGlobalTokens || globalTokenStatus != DUI_GTS.Synchronized ){
	
		// Loop through the tokens and localize them
		if(tokens.length > 0){
			for(var token : DUITokens in tokens ){
				if(token!=null && token.name!=""){
			
					// ENGLISH
					if ( DialogLocalization.language == "English" ){
						if(token.localizedValue.english !=""){ token.value = token.localizedValue.english; }
					}
					
					// CHINESE
					else if ( DialogLocalization.language == "Chinese" ){
						if(token.localizedValue.chinese !=""){ token.value = token.localizedValue.chinese; }
					}
					
					// KOREAN
					else if ( DialogLocalization.language == "Korean" ){
						if(token.localizedValue.korean !=""){ token.value = token.localizedValue.korean; }
					}
					
					// JAPANESE
					else if ( DialogLocalization.language == "Japanese" ){
						if(token.localizedValue.japanese !=""){ token.value = token.localizedValue.japanese; }
					}
					
					// GERMAN
					else if ( DialogLocalization.language == "German" ){
						if(token.localizedValue.german !=""){ token.value = token.localizedValue.german; }
					}
					
					// FRENCH
					else if ( DialogLocalization.language == "French" ){
						if(token.localizedValue.french !=""){ token.value = token.localizedValue.french; }
					}
					
					// SPANISH
					else if ( DialogLocalization.language == "Spanish" ){
						if(token.localizedValue.spanish !=""){ token.value = token.localizedValue.spanish; }
					}
					
					// ITALIAN
					else if ( DialogLocalization.language == "Italian" ){
						if(token.localizedValue.italian !=""){ token.value = token.localizedValue.italian; }
					}
					
					// PORTUGUESE
					else if ( DialogLocalization.language == "Portuguese" ){
						if(token.localizedValue.portuguese !=""){ token.value = token.localizedValue.portuguese; }
					}
					
					// RUSSIAN
					else if ( DialogLocalization.language == "Russian" ){
						if(token.localizedValue.russian !=""){ token.value = token.localizedValue.russian; }
					}
			
				}
			}
		}
		
		// Update Global Tokens
		DialogUI.UpdateGlobalTokens();
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	UPDATE
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Update () {
	
	// Cache DeltaTime
	localDeltaTime = Time.deltaTime;

	// If the force Close flag is on, make sure we stay in the Force Close mode
	if (forceClose){ DialogUI.status = DUISTATUS.FORCECLOSE; }
	
	// FORCE CLOSE
	// This overrides everything
	if ( DialogUI.status == DUISTATUS.FORCECLOSE || forceClose ){
	
		DialogUI.screen = null;
		DialogUI.screenDuration = 0;
		
		// First fade content
		if ( fade > 0 ){
			fade -= Time.deltaTime;
		
		// If fade out has already completed
		} else {
			
			// Now fade out the main background
			if( alpha > 0 ){
				alpha -= Time.deltaTime / options.backgroundFadeDuration;
			
			// Now we have faded out content and the main background, reset DialogUI
			} else if ( alpha<=0 && fade <=0) {
			//	Debug.Log("Finished Force Close Routine!");
				DialogUI.isActive = false;
				DialogUI.status = DUISTATUS.ENDED;
				DialogUI.ended = true;
				DialogUI.screenDuration = 0;

				forceClose = false;
				screen = null;
				portrait = null;
				portraitAnimation = null;
				actorName = "";
				dialogText = "";
				currentDialogText = "";
				alpha = 0;
				fade = 0;
				
			}
			
		}
	
	// STANDARD ROUTINES
	// Otherwise, do the normal routines
	} else {
	
		// Fade in the Opacity of the BG
		if( isActive && alpha < 1 ){
			alpha += Time.deltaTime / options.backgroundFadeDuration;
		} else if (!isActive && alpha > 0 && fade <= 0) {
			alpha -= Time.deltaTime / options.backgroundFadeDuration;
		}
		
		// Has the UI completely faded out?
		if ( alpha <= 0 && fade <= 0 && status == DUISTATUS.ENDED ){
			DialogUI.ended = true;

			// Also make sure we release the movement AI
			#if UNITY_POSTBRUTAL
				Actors.stopAllMovementAI = false;
			#endif

		} else {
			DialogUI.ended = false;	
		}
	
		// SHOW THE SCREEN
		if ( status == DUISTATUS.SHOW ) {
			
			if( alpha >= 1 && fade < 1 ){
				fade += Time.deltaTime/options.fadeDuration;
			}
			
			// If this is a standard screen with a duration, countdown!
			if ( (DialogUI.dialogStyle == DIALOGSTYLE.NextButton || 
				DialogUI.dialogStyle == DIALOGSTYLE.OneButton || 
				#if UNITY_POSTBRUTAL
					DialogUI.dialogStyle == DIALOGSTYLE.VoiceRoom ||
				#endif
				DialogUI.dialogStyle == DIALOGSTYLE.Title ) && DialogUI.screen != null && !options.ignoreAllDialogDuration ){

				if( screenDuration > 0 && alpha >= 1 && fade >= 1){
					screenDuration -= Time.deltaTime;	
				} else if( screenDuration <= 0 && alpha >= 1 && fade >= 1) {
					
					// Dont skip if we're forcing this screen to close
					if ( !forceClose ){
						screen.Skip();
					} 
				}
			}
		
		// FADE OUT THE SCREEN	
		} else if ( status == DUISTATUS.FADEOUT ) {
			if( fade > 0 ){
				fade -= Time.deltaTime/options.fadeDuration;
				
				// If we're using the typewriter effect, set the full text when skipping a dialog
				if(options.useTypeWriterEffectForText ){
					currentDialogText = dialogText;	
				}
				
			} else {
				status = DUISTATUS.WAITFORSCREEN;	
			}
		}
		
		// FADE OUT CONTENT
		if (!isActive && fade > 0 ){
			fade -= Time.deltaTime/options.fadeDuration;
			
			// If we're using the typewriter effect, hide the text as soon as we are fading out!
			if(options.useTypeWriterEffectForText && DialogUI.dialogStyle != DIALOGSTYLE.Title){
				currentDialogText = dialogText;	
			//	dialogText = "";
			//	currentDialogText = "";	
			}
		}
	}
	
	// Handle background opacity subtractor
	// NOTE: We use this for Title dialogs when we need to temporarily hide the background UI
	if( hideDialogBackground ){
		if( hideBackgroundSubtractor < 1){
			hideBackgroundSubtractor += Time.deltaTime;
		} else {
			hideBackgroundSubtractor = 1;
		}
	} else {
		if( hideBackgroundSubtractor > 0 ){
			hideBackgroundSubtractor -= Time.deltaTime;
		} else {
			hideBackgroundSubtractor = 0;	
		}
	}
	
	// Show debug status
	if ( Application.isEditor){
		debugStatus = DialogUI.status;	
	}
	
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	STOP SCREEN NOW
//	Begins the Force Close Routine
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function StopScreenNow(){
	screenDuration = 0;	
	DialogUI.status = DUISTATUS.FORCECLOSE;
	forceClose = true;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	PLAY AUDIO
//	All Speech should be loaded from Resources/Audio/Speech/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PlayAudio( filePathToLoad : String, pitch : float ){

	//Debug.Log("Playing: "+ options.audioFilepathPrefix+filePathToLoad);

	// A Brief delay gives the UI a chance to fade in first!
	yield WaitForSeconds(DialogUI.dui.options.fadeDuration); 

	// Make sure we can access this component locally and that the Audio is available.
	if( DialogUI.dui != null && DialogUI.dui.GetComponent.<AudioSource>() != null ){
		
		// Load the Audio file into a temporary variable
		var theAudio : AudioClip = Resources.Load(options.audioFilepathPrefix+filePathToLoad) as AudioClip;
		
		// If theAudio is valid, let's set the pitch and go ahead and play it!
		if( theAudio != null ){
			DialogUI.dui.GetComponent.<AudioSource>().pitch = pitch;
			DialogUI.dui.GetComponent.<AudioSource>().clip = theAudio;
			DialogUI.dui.GetComponent.<AudioSource>().Play();
		}
	}
	
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	SETUP AUDIO
//	Notes:	id 0 = music, id 1 == sfx1, id 2 == sfx2, id 3 = sfx3 ..
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function SetupAudio( id : int, setup : DSAudioSetup ){
	
	// MUSIC
	if( id == 0 ){
		musicSetup = setup;
		musicSetup = SetupAudioHelper(musicSetup);
		
		// Start the Fade Routines if we need it
		if( musicSetup.action == DSAudioAction.FadeInAndPlay ){
			StopCoroutine("AudioFadeIn");
			yield StartCoroutine( AudioFadeIn( musicSetup ));
		
		} else if( musicSetup.action == DSAudioAction.FadeOut ){
			StopCoroutine("AudioFadeOut");
			yield StartCoroutine( AudioFadeOut( musicSetup ));
		}
	
	// SFX 1
	} else if ( id == 1 ){
		sfx1Setup = setup;
		sfx1Setup = SetupAudioHelper(sfx1Setup);
		
		// Start the Fade Routines if we need it
		if( sfx1Setup.action == DSAudioAction.FadeInAndPlay ){
			StopCoroutine("AudioFadeIn");
			yield StartCoroutine( AudioFadeIn( sfx1Setup ));
		
		} else if( sfx1Setup.action == DSAudioAction.FadeOut ){
			StopCoroutine("AudioFadeOut");
			yield StartCoroutine( AudioFadeOut( sfx1Setup ));
		}
		
	// SFX 2
	} else if ( id == 2 ){
		sfx2Setup = setup;
		sfx2Setup = SetupAudioHelper(sfx2Setup);
		
		// Start the Fade Routines if we need it
		if( sfx2Setup.action == DSAudioAction.FadeInAndPlay ){
			StopCoroutine("AudioFadeIn");
			yield StartCoroutine( AudioFadeIn( sfx2Setup ));
		
		} else if( sfx2Setup.action == DSAudioAction.FadeOut ){
			StopCoroutine("AudioFadeOut");
			yield StartCoroutine( AudioFadeOut( sfx2Setup ));
		}
		
	// SFX 3
	} else if ( id == 3 ){
		sfx3Setup = setup;
		sfx3Setup = SetupAudioHelper(sfx3Setup);
		
		// Start the Fade Routines if we need it
		if( sfx3Setup.action == DSAudioAction.FadeInAndPlay ){
			StopCoroutine("AudioFadeIn");
			yield StartCoroutine( AudioFadeIn( sfx3Setup ));
		
		} else if( sfx3Setup.action == DSAudioAction.FadeOut ){
			StopCoroutine("AudioFadeOut");
			yield StartCoroutine( AudioFadeOut( sfx3Setup ));
		}
		
	}
	
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	SETUP AUDIO HELPER
//	Configures the new DSAudioSetup sent from DialogScreen
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function SetupAudioHelper( setup : DSAudioSetup ){
	
	// Should We Stop?
	if( setup.action == DSAudioAction.Stop ){
		setup.source.Stop();
		setup.source.clip == null;
		setup.action = DSAudioAction.None;
	}
	
	// Should We Play?
	else if( setup.action == DSAudioAction.Play || setup.action == DSAudioAction.FadeInAndPlay ){
		
		// LOAD FROM PATH
		// Check if we should load in the AudioClip dynamically
		if( setup.useAudioPath && setup.playFromPath != null ){
			
			// Load the Audio file into a temporary variable
			setup.clip = Resources.Load(options.audioFilepathPrefix+setup.playFromPath) as AudioClip;
			
			// If the Audio clip wasn't valid, Change to "Stop" mode
			if( setup.clip == null ){
				
				Debug.Log("DIALOG UI: Couldn't Play Audio. No file was located at \""+options.audioFilepathPrefix+setup.playFromPath+"\"" );
				setup.action = DSAudioAction.None;
				setup.source.Stop();
				setup.clip == null;
			
			}
		
		// NO CLIP WAS SENT	
		// No AudioClip was passed - Change to "Stop" mode
		} else if ( !setup.useAudioPath && setup.clip == null ){
			
			Debug.Log("DIALOG UI: Couldn't play Audio. No AudioClip was set up." );
			setup.action = DSAudioAction.None;
			setup.source.Stop();
			setup.clip == null;
		
		}
		
		// If we have an audio clip setup, looks like we're ok!
		if(setup.clip != null){
		
			// We should fade in this audio and play it
			if(setup.action == DSAudioAction.FadeInAndPlay ){
				setup.currentVolume = 0.001;
				setup.source.volume = 0.001;
				setup.source.clip = setup.clip;
				setup.source.pitch = setup.pitch;
				setup.source.loop = setup.loop;
				setup.source.Play();
			}
			
			// We Play the Audio now
			else if(setup.action == DSAudioAction.Play ){
				setup.currentVolume = setup.volume;
				setup.source.clip = setup.clip;
				setup.source.volume = setup.volume;
				setup.source.pitch = setup.pitch;
				setup.source.loop = setup.loop;
				setup.source.Play();
			}
		}
	}
	
	// Return the setup
	return setup;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	AUDIO FADE IN
//	Fades Audio In
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function AudioFadeIn( setup : DSAudioSetup ){
	
	// Wait one frame before we do anything
	yield;
	
	// Make sure this Audio Setup is valid
	if(setup != null){

		// FADE IN
		// If we're fading
		while( setup != null && setup.action == DSAudioAction.FadeInAndPlay && setup.source.clip != null && setup.source.volume < setup.volume ) {
    	
    		// do fade in
    		setup.source.volume += Time.deltaTime / setup.fadeDuration;
    		
    		// Set Action to "None" when done
			if( setup.action == DSAudioAction.FadeInAndPlay && setup.source.volume >= setup.volume  ){
				setup.action = DSAudioAction.None;
			}
    		
    		// wait for one frame
    		yield; 
    
		}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	AUDIO FADE OUT
//	Fades Audio Out
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function AudioFadeOut( setup : DSAudioSetup ){
	
	// Wait one frame before we do anything
	yield;
	
	// Make sure this Audio Setup is valid
	if(setup != null){
		
		// FADE OUT
		// If we're fading
		while( setup != null && setup.action == DSAudioAction.FadeOut && setup.source.clip != null && setup.source.volume > 0.1 ) {
    		
    		// do fade out
    		setup.source.volume -= Time.deltaTime / setup.fadeDuration;
    		
    		// Stop
			if( setup.action == DSAudioAction.FadeOut && setup.source.volume <= 0.1  ){
				setup.source.Stop();
				setup.source.volume = 0.001;
				setup.action = DSAudioAction.None;
				setup.clip = null;
			}
			
			// Wait for one frame
    		yield; 
    
		}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	PLAY VOICE ROOM AUDIO
//	Requests a local URL to a custom file on the device, and then we attempt to load and play it.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
#if UNITY_POSTBRUTAL
	function PlayVoiceRoomAudio( id : int ){

		// Make sure we can see the VoiceRoom Audio Library
		if(VoiceRoomAudio!=null){
			
			// Cache the URL from the VoiceRoom Audio Library
			var url : String = VoiceRoomAudio.GetCustomAudioEntry(id);

			// ================================================
			//	USE PLAYER RECORDED AUDIO FILE
			// ================================================
			
			// If we recieved an URL for the custom audio ..
			if( url!=""){
			
				// A Brief delay gives the UI a chance to fade in first!
				yield WaitForSeconds(DialogUI.dui.options.fadeDuration); 
			
				// Make sure we can access this component locally and that the AudioSource is available.
				if( DialogUI.dui != null && DialogUI.dui.audio != null ){
				
					Debug.Log("loading WAVE file from: "+url);
					
					 // Start a download of the given URL
				   	var www : WWW = new WWW (url);
				
				   	// Wait for download to complete
				   	yield www;
				   	
				   	 // Print the error to the console
				    if (www.error != null){
				        Debug.Log(www.error);
					}
				
					// Make sure the www object is valid!
				   	else if(www!=null){
		
				   		Debug.Log("Converting WAVE file to AudioClip");
				   		audio.clip = www.GetAudioClip(false);
				   		audio.pitch = 1;
				   		audio.Play();
				   	}
			   	}
			
			// ================================================
			//	USE BUILT-IN AUDIO FILE
			// ================================================
			
			// VoiceRoom returned "" which means this file hasn't been recorded yet, we should use the built-in one
			} else {
				
				// Show a console message
				Debug.Log("VoiceRoom Audio File "+id + " does not exist. It probably has not been recorded yet by the user. Defaulting to the pre-recorded audio set");
				
				// Cache the URL from the VoiceRoom Audio Library
				var path : String = VoiceRoomAudio.GetDefaultAudioEntry(id);
				
				// We need to remove the file extensions
				path = path.Replace(".wav", "");
				path = path.Replace(".aif", "");
				path = path.Replace(".aiff", "");
				
				// If the path is still valid
				if( path != ""){
					
					// A Brief delay gives the UI a chance to fade in first!
					yield WaitForSeconds(DialogUI.dui.options.fadeDuration); 
				
					// Make sure we can access this component locally and that the Audio is available.
					if( DialogUI.dui != null && DialogUI.dui.audio != null ){
						
						// Load the Audio file into a temporary variable
						var theAudio : AudioClip = Resources.Load( path ) as AudioClip;
						
						// If theAudio is valid, let's set the pitch and go ahead and play it!
						if( theAudio != null ){
							DialogUI.dui.audio.pitch = 1;
							DialogUI.dui.audio.clip = theAudio;
							DialogUI.dui.audio.Play();
						}
						
					}
				
				// Something went wrong, the default file doesnt exist!
				} else {
					Debug.Log("DIALOG UI ERROR -> This shouldn't happen. The VoiceRoom library couldn't resolve a custom or built-in file for Audio Library slot "+id);
				}
			}
		}
	}
#endif

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	LOCALIZE BUTTONS
//	Converts Yes, No and Skip between all supported languages
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function LocalizeYesButton(){

	// ENGLISH
	if ( DialogLocalization.language == "English" ){ return "Yes"; }
	
	// CHINESE
	else if ( DialogLocalization.language == "Chinese" ){ return "是"; }
	
	// KOREAN
	else if ( DialogLocalization.language == "Korean" ){ return "예"; }
	
	// JAPANESE
	else if ( DialogLocalization.language == "Japanese" ){ return "はい"; }
	
	// GERMAN
	else if ( DialogLocalization.language == "German" ){ return "Ja"; }
	
	// FRENCH
	else if ( DialogLocalization.language == "French" ){ return "Oui"; }
	
	// SPANISH
	else if ( DialogLocalization.language == "Spanish" ){ return "Sí"; }
	
	// ITALIAN
	else if ( DialogLocalization.language == "Italian" ){ return "Sì"; }
	
	// PORTUGUESE
	else if ( DialogLocalization.language == "Portuguese" ){ return "Sim"; }
	
	// RUSSIAN
	else if ( DialogLocalization.language == "Russian" ){ return "да"; }
	
	// DEFAULT ENGLISH IF ANYTHING GOES WRONG
	else {
		return "Yes";
	}
}

function LocalizeNoButton(){

	// ENGLISH
	if ( DialogLocalization.language == "English" ){ return "No"; }
	
	// CHINESE
	else if ( DialogLocalization.language == "Chinese" ){ return "没有"; }
	
	// KOREAN
	else if ( DialogLocalization.language == "Korean" ){ return "아니"; }
	
	// JAPANESE
	else if ( DialogLocalization.language == "Japanese" ){ return "ノー"; }
	
	// GERMAN
	else if ( DialogLocalization.language == "German" ){ return "Nicht"; }
	
	// FRENCH
	else if ( DialogLocalization.language == "French" ){ return "Aucun"; }
	
	// SPANISH
	else if ( DialogLocalization.language == "Spanish" ){ return "No"; }
	
	// ITALIAN
	else if ( DialogLocalization.language == "Italian" ){ return "No"; }
	
	// PORTUGUESE
	else if ( DialogLocalization.language == "Portuguese" ){ return "Não"; }
	
	// RUSSIAN
	else if ( DialogLocalization.language == "Russian" ){ return "нет"; }

	// DEFAULT ENGLISH IF ANYTHING GOES WRONG
	else {
		return "No";
	}
}

function LocalizeNextButton(){

	// ENGLISH
	if ( DialogLocalization.language == "English" ){ return "Next"; }
	
	// CHINESE
	else if ( DialogLocalization.language == "Chinese" ){ return "下"; }
	
	// KOREAN
	else if ( DialogLocalization.language == "Korean" ){ return "다음"; }
	
	// JAPANESE
	else if ( DialogLocalization.language == "Japanese" ){ return "次の"; }
	
	// GERMAN
	else if ( DialogLocalization.language == "German" ){ return "NÃ¤chste"; }
	
	// FRENCH
	else if ( DialogLocalization.language == "French" ){ return "Next"; }
	
	// SPANISH
	else if ( DialogLocalization.language == "Spanish" ){ return "Próximo"; }
	
	// ITALIAN
	else if ( DialogLocalization.language == "Italian" ){ return "Seguente"; }
	
	// PORTUGUESE
	else if ( DialogLocalization.language == "Portuguese" ){ return "Próximo"; }
	
	// RUSSIAN
	else if ( DialogLocalization.language == "Russian" ){ return "следующий"; }

	// DEFAULT ENGLISH IF ANYTHING GOES WRONG
	else {
		return "Next";
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	API - CHANGE LANGUAGE
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

static function API_ChangeLanguage( action : DS_SetNewLanguage, updateGUISkin : boolean ){ 
	DialogUI.ChangeLanguage(action, updateGUISkin);
}

static function ChangeLanguage( action : DS_SetNewLanguage, updateGUISkin : boolean ){
	if( DialogLocalization.com != null && action != DS_SetNewLanguage.No ){

		// ========================
		//	SET THE NEW LANGUAGE
		// ========================

		// Run Auto-Detect Routine
		if( action == DS_SetNewLanguage.AutoDetect ){
			DialogLocalization.com.Localize();
		}

		// Use English
		else if( 	action == DS_SetNewLanguage.English //&&
					//DialogLocalization.com.languages.english == true
		){
			DialogLocalization.language = "English";
		}

		// Use Chinese (if it is in the supported list)
		else if( 	action == DS_SetNewLanguage.Chinese &&
					DialogLocalization.com.languages.chinese == true
		){
			DialogLocalization.language = "Chinese";
		}

		// Use Korean (if it is in the supported list)
		else if( 	action == DS_SetNewLanguage.Korean &&
					DialogLocalization.com.languages.korean == true
		){
			DialogLocalization.language = "Korean";
		}

		// Use Japanese (if it is in the supported list)
		else if( 	action == DS_SetNewLanguage.Japanese &&
					DialogLocalization.com.languages.japanese == true
		){
			DialogLocalization.language = "Japanese";
		}

		// Use Spanish (if it is in the supported list)
		else if( 	action == DS_SetNewLanguage.Spanish &&
					DialogLocalization.com.languages.spanish == true
		){
			DialogLocalization.language = "Spanish";
		}

		// Use Italian (if it is in the supported list)
		else if( 	action == DS_SetNewLanguage.Italian &&
					DialogLocalization.com.languages.italian == true
		){
			DialogLocalization.language = "Italian";
		}

		// Use German (if it is in the supported list)
		else if( 	action == DS_SetNewLanguage.German &&
					DialogLocalization.com.languages.german == true
		){
			DialogLocalization.language = "German";
		}

		// Use French (if it is in the supported list)
		else if( 	action == DS_SetNewLanguage.French &&
					DialogLocalization.com.languages.french == true
		){
			DialogLocalization.language = "French";
		}

		// Use Portuguese (if it is in the supported list)
		else if( 	action == DS_SetNewLanguage.Portuguese &&
					DialogLocalization.com.languages.portuguese == true
		){
			DialogLocalization.language = "Portuguese";
		}

		// Use Russian (if it is in the supported list)
		else if( 	action == DS_SetNewLanguage.Russian &&
					DialogLocalization.com.languages.russian == true
		){
			DialogLocalization.language = "Russian";
		}

		// If something unexpected or weird happens, use English!
		else {
			DialogLocalization.language = "English";
		}

		// ========================
		//	SAVE TO PLAYER PREFS
		// ========================

		// Write it to the PlayerPrefs if we're using that mode!
		if( DialogLocalization.com.detectionMode == LDC_LanguageDetectionMode.UsingPlayerPrefsKey &&
			DialogLocalization.com.detectUsingPlayerPrefsKey != "" 
		){
			// Delete the key if it already exists ...
			if( PlayerPrefs.HasKey( DialogLocalization.com.detectUsingPlayerPrefsKey) == true ){ 
				PlayerPrefs.DeleteKey( DialogLocalization.com.detectUsingPlayerPrefsKey); }

			// Replace with the new version	
			PlayerPrefs.SetString( DialogLocalization.com.detectUsingPlayerPrefsKey, DialogLocalization.language );
		}

		// ========================================
		//	UPDATE ALL DIALOG SCREENS IN THE SCENE
		// ========================================

		var dialogScreens : DialogScreen[] = FindObjectsOfType(DialogScreen) as DialogScreen[];
		if( dialogScreens.length > 0 ){
			for( var ds : DialogScreen in dialogScreens ){
				if(ds!=null){ ds.Localize(); }
			}
		}

		// ========================================
		//	UPDATE GUISKIN
		// ========================================

		if( updateGUISkin && DialogOnGUI.com != null ){
			DialogOnGUI.com.Start();
			Resources.UnloadUnusedAssets();	// This should help get rid of unused fonts and images, etc.
		}

	// If DialogLocalization.com isn't ready yet ...
	} else if( DialogLocalization.com == null ){
		Debug.Log("LDC: DialogLocalization.com doesn't exist yet. Note you cannot change Languages On Awake().");
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	API
//	Functions for 3rd party tools
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Instantiates A Dialog when the current dialog has ended
static function API_LoadLevel( level : String ){
	if(Application.isPlaying){ // Make sure the application is running to avoid issues.
		if( level!="" && DialogUI.dui != null ){ 
			DialogUI.dui.StopCoroutine("API_CreateDialogCoroutine"); // Stop any previous co-routine for instantiation ..	
			DialogUI.dui.StopCoroutine("API_PlayDialogCoroutine"); // Stop any previous co-routine for triggers..
			DialogUI.dui.StopCoroutine("API_LoadLevelCoroutine"); // Stop any previous co-routine for triggers..			
			DialogUI.dui.StartCoroutine("API_LoadLevelCoroutine", level); 
		} else {
			Debug.Log("DialogUI API (API_LoadLevelCoroutine): No Level was setup to be loaded!"); 
		}
	}
}
	// Wait for DialogUI to finish its current dialog, and then start the new one.
	function API_LoadLevelCoroutine( level : String){
		while( !DialogUI.ended ){ yield; }	// Wait for DialogUI to become available ..
		if(DialogUI.ended && level!=""){ 
			#if UNITY_POSTBRUTAL
				Engine.LoadLevel(level);
			#else
				Application.LoadLevel(level); 
			#endif
		} // And load the level
	}

// Instantiates A Dialog and overrides any existing dialogs
static function API_CreateDialogNow( go : GameObject ){
	if(Application.isPlaying){ // Make sure the application is running to avoid issues.
		if(go!=null){ 
			Instantiate(go); 
		} else { 
			Debug.Log("DialogUI API (API_CreateDialogNow): No GameObject was sent to be created!"); 
		}
	}
}

// Instantiates A Dialog when the current dialog has ended
static function API_CreateDialog( go : GameObject ){
	if(Application.isPlaying){ // Make sure the application is running to avoid issues.
		if( go!=null && DialogUI.dui != null ){ 
			DialogUI.dui.StopCoroutine("API_CreateDialogCoroutine"); // Stop any previous co-routine for instantiation ..	
			DialogUI.dui.StopCoroutine("API_PlayDialogCoroutine"); // Stop any previous co-routine for triggers..
			DialogUI.dui.StopCoroutine("API_LoadLevelCoroutine"); // Stop any previous co-routine for triggers..			
			DialogUI.dui.StartCoroutine("API_CreateDialogCoroutine", go); 
		} else {
			Debug.Log("DialogUI API (API_CreateDialog): No GameObject was sent to be created!"); 
		}
	}
}
	// Wait for DialogUI to finish its current dialog, and then start the new one.
	function API_CreateDialogCoroutine( go : GameObject){
		while( !DialogUI.ended ){ yield; }	// Wait for DialogUI to become available ..
		if(DialogUI.ended && go!=null){ Instantiate(go); } // And then launch the Dialog!
	}

// Plays A Dialog now and overrides any existing dialogs
static function API_PlayDialogNow( go : GameObject ){	// Forwards the GameObject to the DC (used for Playmaker, etc.)
	if(go!=null && go.GetComponent(DialogController) != null ){
		var dc : DialogController = go.GetComponent(DialogController);
		if(dc!=null){ DialogUI.API_PlayDialogNow(dc); }
	} else {
		Debug.Log("LDC API: This GameObject doesn't have a DialogController.");
	}
}

static function API_PlayDialogNow( dc : DialogController ){
	if(Application.isPlaying){ // Make sure the application is running to avoid issues.
		if(dc!=null){ dc.Play(); }
	}
}

// Plays A Dialog now and overrides any existing dialogs
static function API_PlayDialog( go : GameObject ){	// Forwards the GameObject to the DC (used for Playmaker, etc.)
	if(go!=null && go.GetComponent(DialogController) != null ){
		var dc : DialogController = go.GetComponent(DialogController);
		if(dc!=null){ DialogUI.API_PlayDialog(dc); }
	} else {
		Debug.Log("LDC API: This GameObject doesn't have a DialogController.");
	}
}

static function API_PlayDialog( dc : DialogController ){
	if(Application.isPlaying){ // Make sure the application is running to avoid issues.
		if(dc!=null){  
			DialogUI.dui.StopCoroutine("API_CreateDialogCoroutine"); // Stop any previous co-routine for instantiation ..	
			DialogUI.dui.StopCoroutine("API_PlayDialogCoroutine"); // Stop any previous co-routine for triggers..	
			DialogUI.dui.StopCoroutine("API_LoadLevelCoroutine"); // Stop any previous co-routine for triggers..	
			DialogUI.dui.StartCoroutine("API_PlayDialogCoroutine", dc ); 
		}
	}
}
	// Wait for DialogUI to finish its current dialog, and then trigger a new one!
	function API_PlayDialogCoroutine( dc : DialogController ){
		while( !DialogUI.ended ){ yield; }	// Wait for DialogUI to become available ..
		if(DialogUI.ended && dc!=null){ dc.Play(); } // And then play the Dialog!
	}

// Set Token - forwards to the main function
static function API_SetToken( tokenToSet : String, tokenValue : String ){
	if(Application.isPlaying){ // Make sure the application is running to avoid issues.
		DialogUI.SetToken(tokenToSet, tokenValue);
	}
}

// Set Token - forwards to the main function
static function API_SetToken( tokenToSet : String, sentFloat : float ){
	if(Application.isPlaying){ // Make sure the application is running to avoid issues.
		DialogUI.SetToken(tokenToSet, sentFloat);
	}
}

// Get Token As String - forwards to the main function
static function API_GetTokenAsString( tokenToGet : String ){
	if(Application.isPlaying){ // Make sure the application is running to avoid issues.
		return DialogUI.GetToken(tokenToGet);
	}
	// .. Otherwise Return an empty string if in edit mode.
	return "";
}

// Get Token As Float- forwards to the main function
static function API_GetTokenAsFloat( tokenToGet : String ){
	if(Application.isPlaying){ // Make sure the application is running to avoid issues.
		return DialogUI.GetTokenAsFloat(tokenToGet);
	}
	// .. Otherwise Return 0 if in edit mode.
	return 0;
}

// Get Token Index - Returns the index of a token by name
static function API_GetTokenIndex( nameOfToken : String ) : int {
	if(DialogUI.dui != null && DialogUI.dui.tokens.length > 0 ){
		var i : int = 0;
		for(var token : DUITokens in DialogUI.dui.tokens){
			
			// If we have found the token, return the index...
			if( token.name == nameOfToken ){
				return i;
			}

			// Increment Index
			i++;
		}

		// If we didn't find the token, throw an error.
		Debug.LogWarning("DIALOG UI: (ERROR) Couldn't find Index of token because no token matched the name: "+nameOfToken); 
		return -1;
	}

	// Return 0
	Debug.LogWarning("DIALOG UI: (ERROR) Couldn't find Index of token because DialogUI.dui doesn't exist yet or no tokens have been setup.");
	return -1;
}

// Saves Tokens to Disk
static function API_SaveTokensToDisk() {
	DialogUI.SaveTokensToDisk();
}

// Loads Tokens from Disk
static function API_LoadTokensFromDisk() {
	DialogUI.LoadTokensFromDisk();
}

// Delete Tokens from Disk
static function API_DeleteTokensFromDisk() {
	DialogUI.DeleteTokensFromDisk();
}

// Loads Tokens from Disk
static function API_SetTokenSavePrefix( prefix : String) {
	if(DialogUI.dui!=null){
		DialogUI.dui.fileManagement.savePrefix = prefix;
	} else {
		Debug.Log("LDC Error - Couldn't set save prefix because DialogUI.dui isn't available.");	
	}
}


//	This function finds all dialog controller and tells them, and their children screens to stop.
static function API_StopAllDialogs() {
	if(Application.isPlaying){ // Make sure the application is running to avoid issues.
		
		// Only allow one Dialog Controller to run at a time.
		var searchForDialogs : GameObject[] = GameObject.FindGameObjectsWithTag("DialogController");
	
		// Loop through the Dialog Controllers
		for ( var theDCObject : GameObject in searchForDialogs ) {
		
			// Make sure its not an empty reference - safety step!
			if ( theDCObject != null ) {
				
				// Make sure the object is not THIS one and it has a dialog controller attached!
				if ( theDCObject.GetComponent(DialogController) != null ) {
					
					// Get the DialogController			
					var theDC : DialogController = theDCObject.GetComponent(DialogController);
					
					// Send message.
					Debug.Log( "LDC: (DialogUI) telling another DialogController to stop -> object to stop is called "+ theDC.gameObject.name );
					
					// Tell it to end - as long as it's safe!
					if ( theDC != null && theDC.status != DCSTATUS.ENDED ) {
						
						// Tell the other Dialog Controller to stop
						theDC.status = DCSTATUS.ENDED;
						theDC.currentScreen = null;
						theDC.currentID = 0;
						
						// Loop through the screens and make sure they have also stopped.
						var theComponents = theDC.gameObject.GetComponents (DialogScreen);
						for (var ds : DialogScreen in theComponents) {
					    	if ( ds != null ) {
					    		ds.isActive = false;
					    	}
						}
						
						// Now we need to update the Dialog UI to reset the screen
						if(DialogUI!=null && DialogUI.dui!=null ){
							DialogUI.dui.StopScreenNow();
						}
						
						// If the dialog controller is an auto-play dialog, we should automatically destroy it.
						// We'll keep it if it's not as it may be used as a complex triggerable dialog system.
						if( theDC.autoPlay ){
							Debug.Log( "LDC: (DialogUI) Destroying DialogController of name: "+ theDC.gameObject);
							Destroy(theDC.gameObject);	
						}
					} 
				}
			}
		}
	}
}

//	BASE DIALOG
//	Create Base part of the Dialog GameObject
static function API_DialogCreate(){	// Assumes its an autoplay if left blank
	
	// Create GameObject
	var go : GameObject = new GameObject();
	go.name = "New LDC Dialog";
	
	// Add DialogController
	var dc : DialogController = go.AddComponent(DialogController);
	if(dc != null){ dc.autoPlay = true; dc.startAfterXSeconds = 1; }
	
	// Return the GameObject
	return go;
}

static function API_DialogCreate( isAutoPlay : boolean, howManySeconds : float ){

	// Create GameObject
	var go : GameObject = new GameObject();
	go.name = "New LDC Dialog";
	
	// Add DialogController
	var dc : DialogController = go.AddComponent(DialogController);
	if(dc != null ){
		dc.startAfterXSeconds = Mathf.Clamp(howManySeconds, 1, 9999999);
		if(isAutoPlay){ dc.autoPlay = true; }
	}
	
	// Return the GameObject
	return go;
}

//	NEXT
//	Create A Next Screen
static function API_DialogAddNextScreen( 	go : GameObject,			// <- Make sure you send the gameObject we are adding to here!
												dialogID : int,
												portrait : Texture2D, 
												title : String, 
												dialogText : String, 
												audioFilePath : String, 
												secondsToDisplay : float, 
												hideNextButton : boolean,
												hideDialogBackground : boolean,
												endAfterThis : boolean, 
												destroyAfterThis : boolean,
												noPortraitFadeIn : boolean,
												noPortraitFadeOut : boolean, 
												nextID : int,

												// Callbacks
												callbacksAtStart : Function[],
												callbacksAtEnd : Function[],
												actionCallbackAtStart : System.Action,
												actionCallbackAtEnd : System.Action,
												navigationCallback : String[]
											){
	
	// Create the new Dialog Screen
	var ds : DialogScreen = go.AddComponent( DialogScreen );
	if( ds != null ){ // Make sure the DialogScreen is valid, and then apply the settings
	
		ds.dialogID = dialogID;
		
		ds.screen.dialogStyle = DIALOGSTYLE.NextButton;
		ds.screen.actorName = title;
		ds.screen.dialogText = dialogText;
		ds.screen.soundToLoad = audioFilePath;
		ds.screen.portrait = portrait;
		
		ds.navigation.screenToLoadOnNext = nextID;
		ds.navigation.secondsToDisplay = secondsToDisplay;
		ds.navigation.hideNextButton = hideNextButton;
		ds.navigation.endDialogAfterThis = endAfterThis;
		ds.navigation.destroyAtEnd = destroyAfterThis;
		
		ds.navigation.noPortraitFadeIn = noPortraitFadeIn;
		ds.navigation.noPortraitFadeOut = noPortraitFadeOut;

		ds.navigation.hideDialogBackground = hideDialogBackground;

		// Setup Callbacks
		ds.actions.callbacksAtStart = callbacksAtStart;
		ds.actions.callbacksAtEnd = callbacksAtEnd;
		ds.actions.actionAtStart = actionCallbackAtStart;
		ds.actions.actionAtEnd = actionCallbackAtEnd;

		// Navigation Callback
		if( navigationCallback != null && navigationCallback.length == 3){
			ds.navigation.navigationCallbackGOName = navigationCallback[0];
			ds.navigation.navigationCallbackFunctionName = navigationCallback[1];
			ds.navigation.navigationCallbackArg = navigationCallback[2];
		}
		
		return ds;	
	}

	return null;
}

//	ONE BUTTON
//	Create A One-Button Screen
static function API_DialogAddOneButtonScreen( 	go : GameObject,			// <- Make sure you send the gameObject we are adding to here!
												dialogID : int,
												portrait : Texture2D, 
												title : String, 
												dialogText : String, 
												audioFilePath : String, 
												secondsToDisplay : float, 
												hideNextButton : boolean,
												hideDialogBackground : boolean,
												endAfterThis : boolean, 
												destroyAfterThis : boolean, 
												noPortraitFadeIn : boolean,
												noPortraitFadeOut : boolean,
												buttonLabel : String,
												nextID : int,

												// Callbacks
												callbacksAtStart : Function[],
												callbacksAtEnd : Function[],
												actionCallbackAtStart : System.Action,
												actionCallbackAtEnd : System.Action,
												navigationCallback : String[]
											){
	
	// Create the new Dialog Screen
	var ds : DialogScreen = go.AddComponent( DialogScreen );
	if( ds != null ){ // Make sure the DialogScreen is valid, and then apply the settings
	
		ds.dialogID = dialogID;
		
		ds.screen.dialogStyle = DIALOGSTYLE.OneButton;
		ds.screen.actorName = title;
		ds.screen.dialogText = dialogText;
		ds.screen.soundToLoad = audioFilePath;
		ds.screen.portrait = portrait;
		ds.screen.customButton1 = buttonLabel;
		
		ds.navigation.screenToLoadOnNext = nextID;
		ds.navigation.secondsToDisplay = secondsToDisplay;
		ds.navigation.hideNextButton = hideNextButton;
		ds.navigation.endDialogAfterThis = endAfterThis;
		ds.navigation.destroyAtEnd = destroyAfterThis;
		
		ds.navigation.noPortraitFadeIn = noPortraitFadeIn;
		ds.navigation.noPortraitFadeOut = noPortraitFadeOut;

		ds.navigation.hideDialogBackground = hideDialogBackground;

		// Setup Callbacks
		ds.actions.callbacksAtStart = callbacksAtStart;
		ds.actions.callbacksAtEnd = callbacksAtEnd;
		ds.actions.actionAtStart = actionCallbackAtStart;
		ds.actions.actionAtEnd = actionCallbackAtEnd;
		
		// Navigation Callback
		if( navigationCallback != null && navigationCallback.length == 3){
			ds.navigation.navigationCallbackGOName = navigationCallback[0];
			ds.navigation.navigationCallbackFunctionName = navigationCallback[1];
			ds.navigation.navigationCallbackArg = navigationCallback[2];
		}

		return ds;	
	}

	return null;
}

// 	YES / NO
//	Create A Yes / No Screen
static function API_DialogAddYesNoScreen( 	go : GameObject,			// <- Make sure you send the gameObject we are adding to here!
												dialogID : int,
												portrait : Texture2D, 
												title : String, 
												dialogText : String, 
												audioFilePath : String, 
												hideDialogBackground : boolean,
												endAfterThis : boolean, 
												destroyAfterThis : boolean, 
												noPortraitFadeIn : boolean,
												noPortraitFadeOut : boolean,
												yesID : int,
												noID : int,
												
												// Callbacks
												callbacksAtStart : Function[],
												callbacksAtEnd : Function[],
												actionCallbackAtStart : System.Action,
												actionCallbackAtEnd : System.Action,
												navigationCallback : String[]
											){
	
	// Create the new Dialog Screen
	var ds : DialogScreen = go.AddComponent( DialogScreen );
	if( ds != null ){ // Make sure the DialogScreen is valid, and then apply the settings
	
		ds.dialogID = dialogID;
		
		ds.screen.dialogStyle = DIALOGSTYLE.YesOrNo;
		ds.screen.actorName = title;
		ds.screen.dialogText = dialogText;
		ds.screen.soundToLoad = audioFilePath;
		ds.screen.portrait = portrait;
		
		ds.navigation.screenToLoadOnYes = yesID;
		ds.navigation.screenToLoadOnNo = noID;
		ds.navigation.endDialogAfterThis = endAfterThis;
		ds.navigation.destroyAtEnd = destroyAfterThis;
		
		ds.navigation.noPortraitFadeIn = noPortraitFadeIn;
		ds.navigation.noPortraitFadeOut = noPortraitFadeOut;

		ds.navigation.hideDialogBackground = hideDialogBackground;

		// Setup Callbacks
		ds.actions.callbacksAtStart = callbacksAtStart;
		ds.actions.callbacksAtEnd = callbacksAtEnd;
		ds.actions.actionAtStart = actionCallbackAtStart;
		ds.actions.actionAtEnd = actionCallbackAtEnd;
		
		// Navigation Callback
		if( navigationCallback != null && navigationCallback.length == 3){
			ds.navigation.navigationCallbackGOName = navigationCallback[0];
			ds.navigation.navigationCallbackFunctionName = navigationCallback[1];
			ds.navigation.navigationCallbackArg = navigationCallback[2];
		}

		return ds;
	}

	return null;
}

// 	TWO BUTTON
//	Create A Custom 2 Button Screen
static function API_DialogAddTwoButtonScreen( 	go : GameObject,			// <- Make sure you send the gameObject we are adding to here!
												dialogID : int,
												portrait : Texture2D, 
												title : String, 
												dialogText : String, 
												audioFilePath : String,
												hideDialogBackground : boolean, 
												endAfterThis : boolean, 
												destroyAfterThis : boolean,
												noPortraitFadeIn : boolean,
												noPortraitFadeOut : boolean,
												buttonLabelRight : String, 
												buttonLabelLeft : String, 
												yesID : int,
												noID : int,
												
												// Callbacks
												callbacksAtStart : Function[],
												callbacksAtEnd : Function[],
												actionCallbackAtStart : System.Action,
												actionCallbackAtEnd : System.Action,
												navigationCallback : String[]
											){
	
	// Create the new Dialog Screen
	var ds : DialogScreen = go.AddComponent( DialogScreen );
	if( ds != null ){ // Make sure the DialogScreen is valid, and then apply the settings
	
		ds.dialogID = dialogID;
		
		ds.screen.dialogStyle = DIALOGSTYLE.TwoButtons;
		ds.screen.actorName = title;
		ds.screen.dialogText = dialogText;
		ds.screen.soundToLoad = audioFilePath;
		ds.screen.portrait = portrait;
		
		ds.screen.customButton1 = buttonLabelRight;
		ds.screen.customButton2 = buttonLabelLeft;
		
		ds.navigation.screenToLoadOnYes = yesID;
		ds.navigation.screenToLoadOnNo = noID;
		ds.navigation.endDialogAfterThis = endAfterThis;
		ds.navigation.destroyAtEnd = destroyAfterThis;
		
		ds.navigation.noPortraitFadeIn = noPortraitFadeIn;
		ds.navigation.noPortraitFadeOut = noPortraitFadeOut;

		ds.navigation.hideDialogBackground = hideDialogBackground;

		// Setup Callbacks
		ds.actions.callbacksAtStart = callbacksAtStart;
		ds.actions.callbacksAtEnd = callbacksAtEnd;
		ds.actions.actionAtStart = actionCallbackAtStart;
		ds.actions.actionAtEnd = actionCallbackAtEnd;
		
		// Navigation Callback
		if( navigationCallback != null && navigationCallback.length == 3){
			ds.navigation.navigationCallbackGOName = navigationCallback[0];
			ds.navigation.navigationCallbackFunctionName = navigationCallback[1];
			ds.navigation.navigationCallbackArg = navigationCallback[2];
		}

		return ds;	
	}

	return null;
}

// 	MULTIPLE BUTTONS
//	Create A Custom Multiple Choice Screen
static function API_DialogAddMultipleButtonScreen( 	go : GameObject,			// <- Make sure you send the gameObject we are adding to here!
													dialogID : int,
													portrait : Texture2D, 
													title : String, 
													dialogText : String, 
													audioFilePath : String, 
													hideDialogBackground : boolean,
													endAfterThis : boolean, 
													destroyAfterThis : boolean, 
													noPortraitFadeIn : boolean,
													noPortraitFadeOut : boolean,
													multipleButtons : String[],
													multipleButtonsID : int[],
													
													// Callbacks
													callbacksAtStart : Function[],
													callbacksAtEnd : Function[],
													actionCallbackAtStart : System.Action,
													actionCallbackAtEnd : System.Action,
													navigationCallback : String[]
												){
	
	// Create the new Dialog Screen
	var ds : DialogScreen = go.AddComponent( DialogScreen );
	if( ds != null && multipleButtons.length > 0 && multipleButtons.length == multipleButtonsID.length ){ // Make sure the DialogScreen is valid, and the arrays match up in length
	
		ds.dialogID = dialogID;
		
		ds.screen.dialogStyle = DIALOGSTYLE.MultipleButtons;
		ds.screen.actorName = title;
		ds.screen.dialogText = dialogText;
		ds.screen.soundToLoad = audioFilePath;
		ds.screen.portrait = portrait;
		
		ds.screen.multipleButtons = multipleButtons;
		ds.navigation.multipleButtons = multipleButtonsID;

		ds.navigation.endDialogAfterThis = endAfterThis;
		ds.navigation.destroyAtEnd = destroyAfterThis;
		
		ds.navigation.noPortraitFadeIn = noPortraitFadeIn;
		ds.navigation.noPortraitFadeOut = noPortraitFadeOut;

		ds.navigation.hideDialogBackground = hideDialogBackground;

		// Setup Callbacks
		ds.actions.callbacksAtStart = callbacksAtStart;
		ds.actions.callbacksAtEnd = callbacksAtEnd;
		ds.actions.actionAtStart = actionCallbackAtStart;
		ds.actions.actionAtEnd = actionCallbackAtEnd;

		// Navigation Callback
		if( navigationCallback != null && navigationCallback.length == 3){
			ds.navigation.navigationCallbackGOName = navigationCallback[0];
			ds.navigation.navigationCallbackFunctionName = navigationCallback[1];
			ds.navigation.navigationCallbackArg = navigationCallback[2];
		}

		return ds;
			
	// Show a message if there was a problem
	} else {
		Debug.Log("LDC ERROR: Couldnt Add Multiple Button Screen because the button label and ID array lengths don't match (or were empty)! This screen was skipped!");	
	}

	return null;
}

//	PASSWORD
//	Create A One-Button Password Screen
static function API_DialogAddPasswordScreen( 	go : GameObject,			// <- Make sure you send the gameObject we are adding to here!
												dialogID : int,
												portrait : Texture2D, 
												title : String, 
												audioFilePath : String, 
												hideDialogBackground : boolean,
												endAfterThis : boolean, 
												destroyAfterThis : boolean, 
												noPortraitFadeIn : boolean,
												noPortraitFadeOut : boolean,
												buttonLabel : String,
												password : String,
												position : DS_DATA_ANCHOR,
												passwordCaseSensitive : boolean,
												usePasswordMask : boolean,
												correctID : int,
												wrongID : int,
												
												// Callbacks
												callbacksAtStart : Function[],
												callbacksAtEnd : Function[],
												actionCallbackAtStart : System.Action,
												actionCallbackAtEnd : System.Action,
												navigationCallback : String[]
											){
	
	// Create the new Dialog Screen
	var ds : DialogScreen = go.AddComponent( DialogScreen );
	if( ds != null ){ // Make sure the DialogScreen is valid, and then apply the settings
	
		ds.dialogID = dialogID;
		
		ds.screen.dialogStyle = DIALOGSTYLE.Password;
		ds.screen.actorName = title;
		ds.screen.soundToLoad = audioFilePath;
		ds.screen.portrait = portrait;
		ds.screen.customButton1 = buttonLabel;
		
		ds.screen.passwordMatchToToken = false;	// dont allow tokens with API (always false)
		ds.screen.passwordAnswer = password;
		ds.screen.dataEntryAnchor = position;
		ds.screen.passwordCaseSensitive = passwordCaseSensitive;
		ds.screen.passwordMask = usePasswordMask;
		
		ds.navigation.screenToLoadOnYes = correctID;
		ds.navigation.screenToLoadOnNo = wrongID;
		
		ds.navigation.endDialogAfterThis = endAfterThis;
		ds.navigation.destroyAtEnd = destroyAfterThis;
		
		ds.navigation.noPortraitFadeIn = noPortraitFadeIn;
		ds.navigation.noPortraitFadeOut = noPortraitFadeOut;

		ds.navigation.hideDialogBackground = hideDialogBackground;

		// Setup Callbacks
		ds.actions.callbacksAtStart = callbacksAtStart;
		ds.actions.callbacksAtEnd = callbacksAtEnd;
		ds.actions.actionAtStart = actionCallbackAtStart;
		ds.actions.actionAtEnd = actionCallbackAtEnd;

		// Navigation Callback
		if( navigationCallback != null && navigationCallback.length == 3){
			ds.navigation.navigationCallbackGOName = navigationCallback[0];
			ds.navigation.navigationCallbackFunctionName = navigationCallback[1];
			ds.navigation.navigationCallbackArg = navigationCallback[2];
		}

		return ds;
				
	}

	return null;
}

//	DATA ENTRY
//	Create A One-Button Data Entry Screen
static function API_DialogAddDataEntryScreen( 	go : GameObject,			// <- Make sure you send the gameObject we are adding to here!
												dialogID : int,
												portrait : Texture2D, 
												title : String, 
												audioFilePath : String, 
												hideDialogBackground : boolean,
												endAfterThis : boolean, 
												destroyAfterThis : boolean, 
												noPortraitFadeIn : boolean,
												noPortraitFadeOut : boolean,
												buttonLabel : String,
												tokenNameToSet : String,		// Enter the name of the token.
												position : DS_DATA_ANCHOR,
												dataFormat : DS_DATA_FORMAT,	// DS_DATA_FORMAT.Text / DS_DATA_FORMAT.Number
												characterLimit : int,			// How many characters should this use (default 25)
												defaultValue : String,			// The default text to show in the text field.
												nextID : int,
												
												// Callbacks
												callbacksAtStart : Function[],
												callbacksAtEnd : Function[],
												actionCallbackAtStart : System.Action,
												actionCallbackAtEnd : System.Action,
												navigationCallback : String[]
											){
	
	// Make sure the token is valid first...
	if( API_GetTokenIndex(tokenNameToSet) >= 0 ){

		// Create the new Dialog Screen
		var ds : DialogScreen = go.AddComponent( DialogScreen );
		if( ds != null ){ // Make sure the DialogScreen is valid, and then apply the settings
		
			ds.dialogID = dialogID;
			
			ds.screen.dialogStyle = DIALOGSTYLE.DataEntry;
			ds.screen.actorName = title;
			ds.screen.soundToLoad = audioFilePath;
			ds.screen.portrait = portrait;
			ds.screen.customButton1 = buttonLabel;
			
			// Find the Token ID by name, if its 0 or higher its valid (-1 means an error occured)
			ds.screen.dataEntryToken = API_GetTokenIndex(tokenNameToSet);

			ds.screen.dataEntryAnchor = position;
			ds.screen.dataEntryFormat = dataFormat;
			ds.screen.dataEntryCharacterLimit = characterLimit;
			ds.screen.dataEntryDefaultValue = defaultValue;
			
			ds.navigation.screenToLoadOnNext = nextID;
			
			ds.navigation.endDialogAfterThis = endAfterThis;
			ds.navigation.destroyAtEnd = destroyAfterThis;
			
			ds.navigation.noPortraitFadeIn = noPortraitFadeIn;
			ds.navigation.noPortraitFadeOut = noPortraitFadeOut;

			ds.navigation.hideDialogBackground = hideDialogBackground;

			// Setup Callbacks
			ds.actions.callbacksAtStart = callbacksAtStart;
			ds.actions.callbacksAtEnd = callbacksAtEnd;
			ds.actions.actionAtStart = actionCallbackAtStart;
			ds.actions.actionAtEnd = actionCallbackAtEnd;

			// Navigation Callback
			if( navigationCallback != null && navigationCallback.length == 3){
				ds.navigation.navigationCallbackGOName = navigationCallback[0];
				ds.navigation.navigationCallbackFunctionName = navigationCallback[1];
				ds.navigation.navigationCallbackArg = navigationCallback[2];
			}

			return ds;
		}

	// Couldn't find Token...
	} else {
		Debug.LogWarning("DIALOG UI: (ERROR) Data Entry Screen couldn't be created and was skipped.");
	}

	return null;
}

//	TITLE SCREEN
//	Create A One-Button Title Screen
static function API_DialogAddTitleScreen( 	go : GameObject,			// <- Make sure you send the gameObject we are adding to here!
												dialogID : int,
												title : String, 			// Title
												dialogText : String, 		// Subtitle
												titleOffset : Vector2,		// Screen Position of Title
												subtitleOffset : Vector2,	// Screen Position of Subtitle
												titleColor : Color,
												subtitleColor : Color,
												audioFilePath : String, 
												secondsToDisplay : float, 
												hideNextButton : boolean,
												hideDialogBackground : boolean,
												endAfterThis : boolean, 
												destroyAfterThis : boolean,
												buttonLabel : String,
												nextID : int,
												
												// Callbacks
												callbacksAtStart : Function[],
												callbacksAtEnd : Function[],
												actionCallbackAtStart : System.Action,
												actionCallbackAtEnd : System.Action,
												navigationCallback : String[]
											){
	
	// Create the new Dialog Screen
	var ds : DialogScreen = go.AddComponent( DialogScreen );
	if( ds != null ){ // Make sure the DialogScreen is valid, and then apply the settings
	
		ds.dialogID = dialogID;
		
		ds.screen.dialogStyle = DIALOGSTYLE.Title;
		ds.screen.actorName = title;
		ds.screen.dialogText = dialogText;
		ds.screen.soundToLoad = audioFilePath;
		ds.screen.customButton1 = buttonLabel;
		
		ds.screen.titleOffset = titleOffset;
		ds.screen.subtitleOffset = subtitleOffset;

		ds.screen.titleColor = titleColor;
		ds.screen.subtitleColor = subtitleColor;

		ds.navigation.screenToLoadOnNext = nextID;
		ds.navigation.secondsToDisplay = secondsToDisplay;
		ds.navigation.hideNextButton = hideNextButton;
		ds.navigation.endDialogAfterThis = endAfterThis;
		ds.navigation.destroyAtEnd = destroyAfterThis;
		
		ds.navigation.noPortraitFadeIn = false;
		ds.navigation.noPortraitFadeOut = false;

		ds.navigation.hideDialogBackground = hideDialogBackground;

		// Setup Callbacks
		ds.actions.callbacksAtStart = callbacksAtStart;
		ds.actions.callbacksAtEnd = callbacksAtEnd;
		ds.actions.actionAtStart = actionCallbackAtStart;
		ds.actions.actionAtEnd = actionCallbackAtEnd;

		// Navigation Callback
		if( navigationCallback != null && navigationCallback.length == 3){
			ds.navigation.navigationCallbackGOName = navigationCallback[0];
			ds.navigation.navigationCallbackFunctionName = navigationCallback[1];
			ds.navigation.navigationCallbackArg = navigationCallback[2];
		}

		return ds;
				
	}

	return null;
}

//	POPUP SCREEN
//	Create A Popup Screen
static function API_DialogAddPopupScreen( 	go : GameObject,			// <- Make sure you send the gameObject we are adding to here!
												dialogID : int,
												title : String, 				// Title
												dialogText : String, 			// Subtitle

												popupSize : Vector2,			// Screen Size of Popup Window (as Vector2)
												popupImage : Texture2D,			// Background to use for Popup Window
												popupBackgroundAlpha : float,	// alpha for the background		
												popupOptions : POPUP_OPTIONS,	// One button or two button popup?

												audioFilePath : String, 
												secondsToDisplay : float, 
												hideNextButton : boolean,
												hideDialogBackground : boolean,
												endAfterThis : boolean, 
												destroyAfterThis : boolean,

												// buttons
												buttonLabel1 : String,
												buttonLabel2 : String,
												buttonOneNextID : int,
												buttonTwoNextID : int,
												
												// Callbacks
												callbacksAtStart : Function[],
												callbacksAtEnd : Function[],
												actionCallbackAtStart : System.Action,
												actionCallbackAtEnd : System.Action,
												navigationCallback : String[]
											){
	
	// Create the new Dialog Screen
	var ds : DialogScreen = go.AddComponent( DialogScreen );
	if( ds != null ){ // Make sure the DialogScreen is valid, and then apply the settings
	
		ds.dialogID = dialogID;
		
		ds.screen.dialogStyle = DIALOGSTYLE.Popup;
		ds.screen.actorName = title;
		ds.screen.dialogText = dialogText;
		ds.screen.soundToLoad = audioFilePath;
		ds.screen.customButton1 = buttonLabel1;
		ds.screen.customButton2 = buttonLabel2;
		
		ds.screen.popupSizeX = Mathf.Round(popupSize.x);
		ds.screen.popupSizeY = Mathf.Round(popupSize.y);
		ds.screen.popupImage = popupImage;
		ds.screen.popupBackgroundAlpha = popupBackgroundAlpha;
		ds.screen.popupOptions = popupOptions;

		// Navigation (NOTE: we use both next and yes to cover one and two button popups)
		ds.navigation.screenToLoadOnNext = buttonOneNextID;
		ds.navigation.screenToLoadOnYes = buttonOneNextID;
		ds.navigation.screenToLoadOnNo = buttonTwoNextID;

		ds.navigation.secondsToDisplay = secondsToDisplay;
		ds.navigation.hideNextButton = hideNextButton;
		ds.navigation.endDialogAfterThis = endAfterThis;
		ds.navigation.destroyAtEnd = destroyAfterThis;
		
		ds.navigation.noPortraitFadeIn = false;
		ds.navigation.noPortraitFadeOut = false;

		ds.navigation.hideDialogBackground = hideDialogBackground;

		// Setup Callbacks
		ds.actions.callbacksAtStart = callbacksAtStart;
		ds.actions.callbacksAtEnd = callbacksAtEnd;
		ds.actions.actionAtStart = actionCallbackAtStart;
		ds.actions.actionAtEnd = actionCallbackAtEnd;

		// Navigation Callback
		if( navigationCallback != null && navigationCallback.length == 3){
			ds.navigation.navigationCallbackGOName = navigationCallback[0];
			ds.navigation.navigationCallbackFunctionName = navigationCallback[1];
			ds.navigation.navigationCallbackArg = navigationCallback[2];
		}

		return ds;
				
	}

	return null;
}


//	ICON GRID SCREEN
//	Create An Icon Grid Screen
static function API_DialogAddIconGridScreen( 	go : GameObject,			// <- Make sure you send the gameObject we are adding to here!
												dialogID : int,
												title : String, 				// Title
												subtitle : String, 				// Subtitle

												// Icon Grid specific settings
												windowOptions  : IconGridWindowOptions,
												iconLayout : IconGridLayout,
												buttons : IconGridButtons[],

												// Usual flags
												audioFilePath : String, 
												hideDialogBackground : boolean,
												endAfterThis : boolean, 
												destroyAfterThis : boolean,
												
												// Callbacks
												callbacksAtStart : Function[],
												callbacksAtEnd : Function[],
												actionCallbackAtStart : System.Action,
												actionCallbackAtEnd : System.Action,
												navigationCallback : String[]
											){
	
	// Make sure the references for the Icon Grid are valid before continuing ...
	if( windowOptions != null && iconLayout != null && buttons != null && buttons.length > 0 ){

		// Create the new Dialog Screen
		var ds : DialogScreen = go.AddComponent( DialogScreen );
		if( ds != null ){ // Make sure the DialogScreen is valid, and then apply the settings
		
			ds.dialogID = dialogID;
			
			ds.screen.dialogStyle = DIALOGSTYLE.IconGrid;
			ds.screen.actorName = title;
			ds.screen.dialogText = subtitle;
			ds.screen.soundToLoad = audioFilePath;
			
			// Do Window Options
			ds.screen.IG_WindowSizeX = windowOptions.IG_WindowSizeX;
			ds.screen.IG_WindowSizeY = windowOptions.IG_WindowSizeY;
			ds.screen.IG_WindowOffsetX = windowOptions.IG_WindowOffsetX;
			ds.screen.IG_WindowOffsetY = windowOptions.IG_WindowOffsetY;
			ds.screen.IG_useXScrolling = windowOptions.IG_useXScrolling;
			ds.screen.IG_useYScrolling = windowOptions.IG_useYScrolling;
			ds.screen.IG_WindowShowTitle = windowOptions.IG_WindowShowTitle;
			ds.screen.IG_WindowShowSubtitle = windowOptions.IG_WindowShowSubtitle;
			ds.screen.IG_AddSpaceBetweenSubtitleAndContent = windowOptions.IG_AddSpaceBetweenSubtitleAndContent;
			ds.screen.IG_showPanelBG = windowOptions.IG_showPanelBG;
			ds.screen.IG_BackgroundAlpha = windowOptions.IG_BackgroundAlpha;

			// Do Icon Layout
			ds.screen.IG_iconSizeX = iconLayout.IG_iconSizeX;
			ds.screen.IG_iconSizeY = iconLayout.IG_iconSizeY;
			ds.screen.IG_iconsPerRow = iconLayout.IG_iconsPerRow;
			ds.screen.IG_IconSpacer = iconLayout.IG_IconSpacer;
			ds.screen.IG_AddInnerIconSpacing = iconLayout.IG_AddInnerIconSpacing;
			ds.screen.IG_showIconLabels = iconLayout.IG_showIconLabels;
			ds.screen.IG_iconLabelSize = iconLayout.IG_iconLabelSize;
			ds.screen.IG_firstIconIsCloseButton = iconLayout.IG_firstIconIsCloseButton;
			ds.screen.IG_closeButtonSize = iconLayout.IG_closeButtonSize;
			ds.screen.IG_showButtonBackgrounds = iconLayout.IG_showButtonBackgrounds;
			ds.screen.IG_buttonImagePosition = iconLayout.IG_buttonImagePosition;

			// Buttons
			ds.screen.IG_buttons = buttons;

			// Navigation
			ds.navigation.endDialogAfterThis = endAfterThis;
			ds.navigation.destroyAtEnd = destroyAfterThis;
			ds.navigation.hideDialogBackground = hideDialogBackground;

			// Setup Callbacks
			ds.actions.callbacksAtStart = callbacksAtStart;
			ds.actions.callbacksAtEnd = callbacksAtEnd;
			ds.actions.actionAtStart = actionCallbackAtStart;
			ds.actions.actionAtEnd = actionCallbackAtEnd;

			// Navigation Callback
			if( navigationCallback != null && navigationCallback.length == 3){
				ds.navigation.navigationCallbackGOName = navigationCallback[0];
				ds.navigation.navigationCallbackFunctionName = navigationCallback[1];
				ds.navigation.navigationCallbackArg = navigationCallback[2];
			}

			// Return the valid DialogScreen
			return ds;
					
		}
	}

	// Return an empty variable
	return null;
}
