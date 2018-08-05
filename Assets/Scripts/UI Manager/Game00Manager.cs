using UnityEngine;
using System.Collections;

public class Game00Manager : MonoBehaviour {
	public string startname;
	public string othername;
	public string menuname;
	//public AudioClip buttonSound;
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	public void Start_Button()
	{
		//audio.clip = buttonSound;
		//audio.Play ();
		Application.LoadLevel (startname);
		Debug.Log ("开始");
	}

	public void Other_Button()
	{
		//audio.clip = buttonSound;
		//audio.Play ();
		Time.timeScale = 1;
		Application.LoadLevel (othername);
		Debug.Log ("帮助");
	}

	public void Menu_Button()
	{
		//audio.clip = buttonSound;
		//audio.Play ();
		Time.timeScale = 1;
		Application.LoadLevel (menuname);
		Debug.Log ("菜单");
	}
	
	public void Out_Button()
	{
		Time.timeScale = 1;
		Application.Quit ();
		Debug.Log ("退出");
	}
	
}
