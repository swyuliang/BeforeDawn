using UnityEngine;
using System.Collections;

public class Help_Dialog : MonoBehaviour {
	private float pausedTime;
	public GameObject HelpDialog;
	public WeaponCrossHair wh;
	public PlayerLook pl;
	public PlayerLook pl2;
	// Use this for initialization
	void Awake () {
		HelpDialog.SetActive (true);
		wh = GameObject.Find ("Weapon Camera").GetComponent<WeaponCrossHair> ();
		pl = GameObject.Find ("HeadLook").GetComponent<PlayerLook> ();
		pl2 = GameObject.Find ("Player").GetComponent<PlayerLook> ();
		//Screen.showCursor = true;
		//gameObject.SetActive (true);
		//pausedTime = Time.timeScale;
		//Time.timeScale = 0;
		wh.enabled = false;
		pl.enabled = false;
		pl2.enabled = false;
		pausedTime = Time.timeScale;
		Time.timeScale = 0;
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	public void CloseHelp()
	{
		Time.timeScale = pausedTime;
		wh.enabled = true;
		pl.enabled = true;
		pl2.enabled = true;
		HelpDialog.SetActive (false);
		Debug.Log ("点击了");
	}
}
