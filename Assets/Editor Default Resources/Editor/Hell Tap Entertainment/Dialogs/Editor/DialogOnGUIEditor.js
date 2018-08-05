////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// 	DialogOnGUIEditor.js
//
//	Renders LDC using Unity's built-in OnGUI.
//
//	Created By Melli Georgiou
//	© 2012 - 2014 Hell Tap Entertainment LTD
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import HTE_EditorUILibrary;								// GUI Elements

@CustomEditor (DialogOnGUI)
class DialogOnGUIEditor extends Editor {	

	// Helpers
	var dog : DialogOnGUI;
	var tab : int = 0;
		
	// Labels
	var nameLabel : Texture2D = EditorGUIUtility.Load("Hell Tap Entertainment/Localized Dialogs/dialogOnGUILabel.png") as Texture2D;
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
		GUILayout.Label("", GUILayout.MaxHeight(5));
		
		// Title	
		EditorGUILayout.BeginHorizontal();
			GUILayout.Label("", GUILayout.MaxWidth(5));
			GUILayout.Label(nameLabel, GUILayout.MaxWidth(32) );
			EditorGUILayout.BeginVertical();
				GUILayout.Label("Dialog OnGUI", "BoldLabel", GUILayout.MinWidth(190), GUILayout.MaxWidth(190));
				if(!Application.isPlaying){
					GUILayout.Label("This is the standard LDC GUI engine. Here you can control skins and scaling options.", GUILayout.MinWidth(600), GUILayout.MaxWidth(600));
				} else {
					GUILayout.Label("Changes will not be saved while the application is running!", GUILayout.MinWidth(600), GUILayout.MaxWidth(600));	
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
	    if( Selection.activeGameObject && target != null && target.GetComponent(DialogOnGUI) ) {
			
	    	// Cache Target
    		if( target!=null && target.GetComponent(DialogOnGUI) != null ){
    			dog = target.GetComponent(DialogOnGUI);
    		}

    		// Make sure the Dialog On GUI reference is valid ...
    		if(dog!=null){

				// Do the Title	
				DoTitle();

				// Create Big Layout
				StartBigLayout();

					// Start White Box
					StartWhiteBox();

						// Selection Grid
						tab = GUILayout.SelectionGrid(tab, ["GUI Scaling","Skins (HD)", "Skins (SD)", "Options"], 4, GUILayout.MinWidth(460));
						GUILayout.Space(8);
						SepLine();

						// Do Scaling Tab
						if(tab == 0){
							DoScalingTab();
						} else if (tab == 1){
							DoSkinsTab("HD");
						} else if (tab == 2){
							DoSkinsTab("SD");
						} else if (tab == 3){
							DoOptionsTab();
						}

					// End White Box
					EndWhiteBox();

				// End Big Layout
				EndBigLayout();

			}

		}

	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	DO SCALING TAB
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function DoScalingTab(){

		// Show the dropdown list
		GUILayout.Label("GUI Scaling", "BoldLabel", GUILayout.MinWidth(190), GUILayout.MaxWidth(190), GUILayout.MaxHeight(16));
		//GUILayout.Label("Setup how you want LDC to display the GUI on different resolutions.", GUILayout.MinWidth(460), GUILayout.MaxWidth(600));
		EditorGUILayout.Space();

		dog.scalingMethod = HTEEnumField( resizeLabel, "Scaling Mode:", dog.scalingMethod );

		// Scale To Fit Options
		if( dog.scalingMethod == OnGuiScaleMode.ScaleToFit ){
			dog.scalingAnchor = HTEEnumField( positionLabel, "Anchor:", dog.scalingAnchor );
			dog.scaleToFitBackgroundWidener = HTEFloatField( scenesLabel, "Background Widener", dog.scaleToFitBackgroundWidener );
		}

		EditorGUILayout.Space();

		// =======
		//	INFO
		// =======

		// Set a cool yellow color for the info backgrounds
		GUI.backgroundColor = Color(1,1,0.6,0.8);

		// Stretch To Fill Info
		if( dog.scalingMethod == OnGuiScaleMode.StretchToFill ){
			EditorGUILayout.HelpBox(
				"\n'Stretch To Fill' is the original scaling system of LDC. It stretches the screen to fit on any device and resolution. This is the most compatible scaling mode and will guarantee everything is visible and occupies the entire screen space. A small drawback is the aspect ratio isn't always perfect.\n",
				MessageType.Info);
		}

		// Scale To Fit Info
		else if( dog.scalingMethod == OnGuiScaleMode.ScaleToFit ){
			EditorGUILayout.HelpBox(
				"\n'Scale To Fit' is a new scaling mode that will shrink or grow the UI in order to fit the current screen and preserve the aspect ratio at the same time. \n\nThis can leave empty space around some of the edges of the screen so the 'Anchor' setting can be used to position the UI in this space. The 'Bottom' anchor is usually a good choice for this. The 'Background Widener' is a special option that can widen the width of your skin's background image (setting this to 1 or lower will disable this functionality). \n",
				MessageType.Info);
		}

		// Over Scale Info
		else if( dog.scalingMethod == OnGuiScaleMode.OverScale ){
			EditorGUILayout.HelpBox(
				"\n'Over Scale' is a scaling mode that grows the UI to cover the screen and maintain its aspect ratio. It is similar to the 'ScaleToFit' method except that it will clip itself in order to cover the screen.\n\nIt is anchored to the bottom right to make sure dialog buttons are visible. Because of this, this mode is recommended only for users needing simple dialog screens that prefer a different approach to unusual widescreen resolutions (such as Android).\n",
				MessageType.Info);
		}

		// Reset background color when done
		GUI.backgroundColor = Color(1,1,1,1);

	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	DO SKINS TAB
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function DoSkinsTab( id : String ){

		// Show the title
		GUILayout.Label("Skins ("+id+")", "BoldLabel", GUILayout.MinWidth(190), GUILayout.MaxWidth(190), GUILayout.MaxHeight(16));
	
		// Cache the correct skin group
		var s : DUI_LocalizedSkins = null;
		if(id=="HD"){
			GUILayout.Label("Enter the file paths for each of your High Definition GUISkins.", GUILayout.MinWidth(460), GUILayout.MaxWidth(600));
			s = dog.skins.localizedSkinsHD;
		} else {
			GUILayout.Label("Enter the file paths for each of your Standard Definition GUISkins.", GUILayout.MinWidth(460), GUILayout.MaxWidth(600));
			s = dog.skins.localizedSkins;
		}

		// Do the skin paths:
		EditorGUILayout.Space();
		s.english = HTETextField( ukFlag, "English: ", s.english );
		s.german = HTETextField( germanyFlag, "German: ", s.german );
		s.french = HTETextField( franceFlag, "French: ", s.french );
		s.spanish = HTETextField( spainFlag, "Spanish: ", s.spanish );
		s.italian = HTETextField( italyFlag, "Italian: ", s.italian );
		s.portuguese = HTETextField( portugalFlag, "Portuguese: ", s.portuguese );
		s.russian = HTETextField( russiaFlag, "Russian: ", s.russian );
		s.chinese = HTETextField( chinaFlag, "Chinese: ", s.chinese );
		s.korean = HTETextField( koreaFlag, "Korean: ", s.korean );
		s.japanese = HTETextField( japanFlag, "Japanese: ", s.japanese );
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	DO OPTIONS TAB
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function DoOptionsTab(){

		// Show the title
		GUILayout.Label("GUISkin Quality Per Platform", "BoldLabel", GUILayout.MinWidth(190), GUILayout.MaxWidth(190), GUILayout.MaxHeight(16));
		GUILayout.Label("Setup which platforms should use HD GUISkins.", GUILayout.MinWidth(460), GUILayout.MaxWidth(600));
		EditorGUILayout.Space();

		// Always show HD Skins
		dog.alwaysUseHiDef = HTEToggleField( actionsLabel, "Always Use HD Skins: ", dog.alwaysUseHiDef );

		// If we always show HD, dim out the other options
		if(dog.alwaysUseHiDef){
			GUI.enabled = false;
		}

		// Other Options
		dog.useHiDefOnMobileBuilds = HTEToggleField( iPhoneLabel, "Use HD On Mobile Builds: ", dog.useHiDefOnMobileBuilds );
		dog.useHiDefOnWebBuilds = HTEToggleField( webLabel, "Use HD On Web Builds: ", dog.useHiDefOnWebBuilds );
		dog.useHiDefOnFlashBuilds = HTEToggleField( flashLabel, "Use HD On Flash Builds: ", dog.useHiDefOnFlashBuilds );
		dog.useHiDefOnMetroBuilds = HTEToggleField( metroLabel, "Use HD On Metro Builds: ", dog.useHiDefOnMetroBuilds );
		dog.useHiDefOnStandaloneBuilds = HTEToggleField( standaloneLabel, "Use HD On Desktop Builds: ", dog.useHiDefOnStandaloneBuilds );
		dog.useHiDefOnConsoleBuilds = HTEToggleField( consoleLabel, "Use HD On Console Builds: ", dog.useHiDefOnConsoleBuilds );

		// Reset GUI Enabled
		GUI.enabled = true;

		// Add Space
		EditorGUILayout.Space();
		SepLine();
		EditorGUILayout.Space();

		// Show the title
		GUILayout.Label("GUI Depth", "BoldLabel", GUILayout.MinWidth(190), GUILayout.MaxWidth(190), GUILayout.MaxHeight(16));
		GUILayout.Label("Setup which layer LDC's GUI is drawn to ( Default is 0 ).", GUILayout.MinWidth(460), GUILayout.MaxWidth(600));
		EditorGUILayout.Space();
		dog.depth = HTEIntField( layersLabel, "LDC's GUI Depth: ", dog.depth );
	}
}





