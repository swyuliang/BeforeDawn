///////////////////////////////////////////////////////////////////////////////////////////////
//
//	DemoScript.js
//
//	Simple script that shows how to launch and view different Dialog styles
//
//	(C) 2012-2013 Melli Georgiou
//
///////////////////////////////////////////////////////////////////////////////////////////////

#pragma strict

// Prefabs
var dialogToTrigger : DialogController;
var instantiateAnAutoPlayDialog : GameObject;
var bestPracticeDialog : GameObject;
var dialogConvo : GameObject;
var testLocalizationDialog : GameObject;
var testMultipleChoice : GameObject;
var testTokens : GameObject;
var testPassword : GameObject;
var testLogic : GameObject;

// Skins
var originalEnglishSkin : GUISkin;
var customSkin1 : GUISkin;
var customSkin2 : GUISkin;

// Rects
private var labelRect : Rect = Rect( 32,32,256,64 );
private var buttonRect : Rect = Rect (32, 100, 196,40);
private var buttonRect2 : Rect = Rect (32, 160, 196,40);
private var buttonRect3 : Rect = Rect (32, 220, 196,40);
private var buttonRect4 : Rect = Rect (32, 280, 196,40);
private var buttonRect5 : Rect = Rect (32, 340, 196,40);
private var buttonRect6 : Rect = Rect (32, 400, 196,40);
private var buttonRect7 : Rect = Rect (32, 460, 196,40);
private var buttonRect8 : Rect = Rect (32, 520, 196,40);
private var buttonRect9 : Rect = Rect (32, 580, 196,40);

private var skin1Rect : Rect = Rect( 260,100,196,40 );
private var skin2Rect : Rect = Rect( 490,100,196,40 );
private var skin3Rect : Rect = Rect( 720,100,196,40 );

private var skinStatus : String = "Original Skin";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	ON GUI
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OnGUI(){
	
	//	CURRENT ACTIVE LOCALIZATION
	//	You can use "DialogLocalization.language" in your scripts to get easy access to the currently active language.
	GUI.Label(labelRect, "Active Localization: "+DialogLocalization.language + "\n" +"Dialog has ended: "+DialogUI.ended + "\nSkin: "+skinStatus);
	
	//	TRIGGER AN IN-GAME DIALOG
	//	This allows us to trigger a non-autoplay dialog that is present in the scene.
	//	You would use this kind of method in games such as RPG's where characters can say the same things every
	//	time you talk to them.
	if(GUI.Button(buttonRect, "Trigger A Dialog")){
		
		// Tell the Dialog to play
		dialogToTrigger.Play();
	}
	
	//	INSTANTIATE AN AUTO-PLAY DIALOG WITH CHOICE
	//	Autoplay dialogs are setup to start playing automatically when they are loaded, if another dialog
	//	is already playing, they will force them to close and take over.
	//	NOTE: If an autoplay enabled dialog is being taken over, it will also be destroyed to help manage memory issues,
	//	the idea being that autoplay should be one-shot dialogs that aren't needed anymore when they're done.  
	if(GUI.Button(buttonRect2, "Instantiate A Choice Dialog")){
		Instantiate(instantiateAnAutoPlayDialog);
	}
	
	//	BEST PRACTICE TO LOAD DIALOGS:
	//	Dialog Controllers do well at "taking over" each other and forcing already-playing dialogs to close.
	//	For best practice, it's best to launch dialogs with "if(DialogUI.ended)" to minize any conflicts:
	if(DialogUI.ended){		// <- This let's us know that the DialogUI has completely finished dealing with any other dialogs.
		if(GUI.Button(buttonRect3, "Best Practice Dialog")){
			Instantiate(bestPracticeDialog);
		}
	}
	
	//	DIALOG CONVERSATION WITH AUDIO:
	//	This dialog has some example speech audio along with the conversation. This code is launched using the Best Practice method.
	if(DialogUI.ended){		// <- This let's us know that the DialogUI has completely finished dealing with any other dialogs.
		if(GUI.Button(buttonRect4, "Dialog Convo with Audio")){
			Instantiate(dialogConvo);
		}
	}
	
	//	TEST SIMPLE DIALOG WITH LOCALIZATION
	//	This launches a simple dialog that is localized in all supported languages. Try changing the "debug Language" in the Localization
	//	Component to see it in action! In the demo scene, it is a component of the Dialog UI gameObject.
	if(DialogUI.ended){		// <- This let's us know that the DialogUI has completely finished dealing with any other dialogs.
		if(GUI.Button(buttonRect5, "Test Localization Dialog")){
			Instantiate(testLocalizationDialog);
		}
	}
	
	//	TEST MULTIPLE CHOICE
	//	This launches a new "Multiple Choice" style dialog, new from v1.5!
	if(DialogUI.ended){		// <- This let's us know that the DialogUI has completely finished dealing with any other dialogs.
		if(GUI.Button(buttonRect6, "Multiple Choice Dialog")){
			Instantiate(testMultipleChoice);
		}
	}
	
	//	TEST TOKENS
	//	This launches a new "Data Entry" style dialog, new from v2.0!
	if(DialogUI.ended){		// <- This let's us know that the DialogUI has completely finished dealing with any other dialogs.
		if(GUI.Button(buttonRect7, "Data Entry & Tokens")){
			Instantiate(testTokens);
		}
	}
	
	//	TEST PASSWORD
	//	This launches a new "Password" style dialog, new from v2.2!
	if(DialogUI.ended){		// <- This let's us know that the DialogUI has completely finished dealing with any other dialogs.
		if(GUI.Button(buttonRect8, "NEW - Password & Tokens")){
			Instantiate(testPassword);
		}
	}
	
	//	TEST LOGIC
	//	This launches a new "Logic" style dialog, new from v2.5!
	if(DialogUI.ended){		// <- This let's us know that the DialogUI has completely finished dealing with any other dialogs.
		if(GUI.Button(buttonRect9, "NEW - Logic & Tokens")){
			Instantiate(testLogic);
		}
	}
		
	// CUSTOM SKINS
	// Using GUISkins makes it easy to reskin the DialogUI system with new graphics and fonts! Here are some examples:
		
		// ORIGINAL ENGLISH SKIN
		if(GUI.Button(skin1Rect, "Original Skin - English")){
			DialogLocalization.language = "English";			// <- Override the current language as this skin only supports English.
			DialogOnGUI.com.skin = originalEnglishSkin;	// <- Sets the new skin.
			skinStatus = "Original Skin";				// <- Updates the skin label in the GUI
			DialogOnGUI.com.UpdateForceFocusButton();		// <- Updates the GUI Helper.
		}
		
		// CUSTOM SKIN 1
		if(GUI.Button(skin2Rect, "Modified Skin 1 - English")){
			DialogLocalization.language = "English";			// <- Override the current language as this skin only supports English.
			DialogOnGUI.com.skin = customSkin1;			// <- Sets the new skin.
			skinStatus = "Custom Skin 1";				// <- Updates the skin label in the GUI
			DialogOnGUI.com.UpdateForceFocusButton();		// <- Updates the GUI Helper.
		}
		
		// CUSTOM SKIN 2
		if(GUI.Button(skin3Rect, "Modified Skin 2 - English")){
			DialogLocalization.language = "English";			// <- Override the current language as this skin only supports English.
			DialogOnGUI.com.skin = customSkin2;			// <- Sets the new skin.
			skinStatus = "Custom Skin 2";				// <- Updates the skin label in the GUI
			DialogOnGUI.com.UpdateForceFocusButton();		// <- Updates the GUI Helper.
		}
	
}