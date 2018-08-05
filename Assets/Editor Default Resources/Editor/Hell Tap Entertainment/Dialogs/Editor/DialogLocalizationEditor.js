////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// 	DialogLocalizationEditor.js
//
//	Renders LDC using Unity's built-in OnGUI.
//
//	Created By Melli Georgiou
//	© 2012 - 2014 Hell Tap Entertainment LTD
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import HTE_EditorUILibrary;								// GUI Elements

@CustomEditor (DialogLocalization)
class DialogLocalizationEditor extends Editor {	

	// Helpers
	var dl : DialogLocalization;
	var tab : int = 0;
		
	// Labels
	var nameLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/Localization.png") as Texture2D;
	var keyLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/keyLabel.png") as Texture2D;
	var findLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/findLabel.png") as Texture2D;



	var resizeLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/resizeLabel.png") as Texture2D;
	var positionLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/positionLabel.png") as Texture2D;
	var scenesLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/scenesLabel.png") as Texture2D;
	var actionsLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/actionsLabel.png") as Texture2D;
	var iPhoneLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/iPhoneLabel.png") as Texture2D;
	var webLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/webLabel.png") as Texture2D;
	var flashLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/flashLabel.png") as Texture2D;
	var metroLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/metroLabel.png") as Texture2D;
	var standaloneLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/standaloneLabel.png") as Texture2D;
	var consoleLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/consoleLabel.png") as Texture2D;
	var layersLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/layersLabel.png") as Texture2D;

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

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// SEPLINE
	// Draws a seperator Line
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function SepLine(){
		GUILayout.Box("", GUILayout.ExpandWidth(true), GUILayout.Height(1));	
	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DO TITLE
	// Draws the header title
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function DoTitle(){

		// Vertical Space
		GUILayout.Label("", GUILayout.MaxHeight(8));
		
		// Title	
		EditorGUILayout.BeginHorizontal();
			GUILayout.Label("", GUILayout.MaxWidth(5));
			GUILayout.Label(nameLabel, GUILayout.MaxWidth(32), GUILayout.MinHeight(32), GUILayout.MaxHeight(32) );
			EditorGUILayout.BeginVertical();
				GUILayout.Label("Dialog Localization", "BoldLabel", GUILayout.MinWidth(190), GUILayout.MaxWidth(190));
				if(!Application.isPlaying){
					GUILayout.Label("This Editor controls how languages are detected and handled.", GUILayout.MinWidth(600), GUILayout.MaxWidth(600), GUILayout.MaxHeight(24));
				} else {
					GUILayout.Label("Changes will not be saved while the application is running!", GUILayout.MinWidth(600), GUILayout.MaxWidth(600), GUILayout.MaxHeight(24));	
				}
			EditorGUILayout.EndVertical();
			GUILayout.FlexibleSpace();
		EditorGUILayout.EndHorizontal();

		// Vertical Space
		GUILayout.Label("", GUILayout.MaxHeight(5));
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	ON INSPECTOR GUI
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function OnInspectorGUI(){

		// If we have a selected gameObject.
	    if( Selection.activeGameObject && target != null && target.GetComponent(DialogLocalization) ) {
			
	    	// Cache Target
    		if( target!=null && target.GetComponent(DialogLocalization) != null ){
    			dl = target.GetComponent(DialogLocalization);
    		}

    		// Make sure the Dialog On GUI reference is valid ...
    		if(dl!=null){

				// Do the Title	
				DoTitle();

				// Create Big Layout
				StartBigLayout();

					// Start White Box
					StartWhiteBox();

						// Selection Grid
						tab = GUILayout.SelectionGrid(tab, ["Language Detection","Supported Languages"], 2, GUILayout.MinWidth(460));
						GUILayout.Space(8);
						SepLine();

						
						// Do Scaling Tab
						if(tab == 0){
							DoLanguageDetection();
						} else if (tab == 1){
							DoSupportedLanguagesTab();
						} 

					// End White Box
					EndWhiteBox();

				// End Big Layout
				EndBigLayout();

			}

		}

	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	DO LANGUAGE DETECTION
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function DoLanguageDetection(){

		// Show the title
		EditorGUILayout.Space();
		GUILayout.Label("Language Detection", "BoldLabel", GUILayout.MinWidth(190), GUILayout.MaxWidth(190), GUILayout.MaxHeight(16));
	
		// Add Space
		EditorGUILayout.Space();

		// Show Detection Mode
		dl.detectionMode = HTEEnumField( findLabel, "Detection Mode:", dl.detectionMode );

		// Options For Using PlayerPrefsKey
		if( dl.detectionMode == LDC_LanguageDetectionMode.UsingPlayerPrefsKey ){

			dl.detectUsingPlayerPrefsKey = HTETextField( keyLabel, "Use this PlayerPrefs key: ", dl.detectUsingPlayerPrefsKey );

		}

		// Make sure the PlayerPrefs Key is never empty
		if(dl.detectUsingPlayerPrefsKey == ""){ dl.detectUsingPlayerPrefsKey = "LDC_LANGUAGE"; }

		// Set a cool yellow color for the info backgrounds
		GUI.backgroundColor = Color(1,1,0.6,0.8);
		EditorGUILayout.Space();

		// Detect System Language Info
		if( dl.detectionMode == LDC_LanguageDetectionMode.DetectSystemLanguage ){
			EditorGUILayout.HelpBox(
				"\nThe 'Detect System Language' option uses the default localization system in LDC. It automatically attempts to retrieve the language as set by the system. If a language is detected that is not in your 'Supported Languages' list, English is used as a fallback.\n",
				MessageType.Info);
		}

		// Using Player Prefs Key Info
		else if( dl.detectionMode == LDC_LanguageDetectionMode.UsingPlayerPrefsKey ){
			EditorGUILayout.HelpBox(
				"\nThis mode uses a custom PlayerPrefs string named \"" + dl.detectUsingPlayerPrefsKey + "\" to detect the current language. The string of this key should be the language name written in English. For example: \"English\", \"Russian\", \"Chinese\", etc. If the key is not found on Awake(), it is created using English as the default language. Likewise, if a language is detected that is not in your 'Supported Languages' list, English is used as a fallback.\n",
				MessageType.Info);
		}

		// Reset background color when done
		GUI.backgroundColor = Color(1,1,1,1);

		// Add Space
		EditorGUILayout.Space();
		SepLine();
		EditorGUILayout.Space();

		// Show the title
		GUILayout.Label("Debug Language (Editor Only)", "BoldLabel", GUILayout.MinWidth(190), GUILayout.MaxWidth(190), GUILayout.MaxHeight(16));
		GUILayout.Label("", GUILayout.MaxHeight(8) );
	
		// Cache the correct skin group
		dl.debugLanguage = HTEEnumField( nameLabel, "Choose a language to test:", dl.debugLanguage );
		
	}

	
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	DO SKINS TAB
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function DoSupportedLanguagesTab(){

		// Show the title
		EditorGUILayout.Space();
		GUILayout.Label("Supported Languages", "BoldLabel", GUILayout.MinWidth(190), GUILayout.MaxWidth(190), GUILayout.MaxHeight(16));
	
		// Cache the correct skin group
		GUILayout.Label("Select which additional languages you want to support in this game:", GUILayout.MinWidth(460), GUILayout.MaxWidth(600));
		
		// Do the skin paths:
		EditorGUILayout.Space();
		GUI.enabled = false;
		dl.languages.english = HTEToggleField( ukFlag, "English: ", true );
		GUI.enabled = true;
		dl.languages.german = HTEToggleField( germanyFlag, "German: ", dl.languages.german );
		dl.languages.french = HTEToggleField( franceFlag, "French: ", dl.languages.french );
		dl.languages.spanish = HTEToggleField( spainFlag, "Spanish: ", dl.languages.spanish );
		dl.languages.italian = HTEToggleField( italyFlag, "Italian: ", dl.languages.italian );
		dl.languages.portuguese = HTEToggleField( portugalFlag, "Portuguese: ", dl.languages.portuguese );
		dl.languages.russian = HTEToggleField( russiaFlag, "Russian: ", dl.languages.russian );
		dl.languages.chinese = HTEToggleField( chinaFlag, "Chinese: ", dl.languages.chinese );
		dl.languages.korean = HTEToggleField( koreaFlag, "Korean: ", dl.languages.korean );
		dl.languages.japanese = HTEToggleField( japanFlag, "Japanese: ", dl.languages.japanese );
	}

}





