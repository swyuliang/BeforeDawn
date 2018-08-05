using UnityEngine;
using System.Collections;

public class WeaponCrossHair : MonoBehaviour {
	public bool isShow =false;
	// Use this for initialization
	void Awake () {
		//Screen.lockCursor = true;

		//this.enabled = false;
	}

	void Start()
	{
		Cursor.visible = false;
		//gameObject.SetActive ();
	}
	
	// Update is called once per frame
	void Update () {
		if (!isShow) {
			Screen.lockCursor = true;
			Cursor.visible = false;
		}
		else 
		{
			Screen.lockCursor = false;
			Cursor.visible = true;
		}

	
	}
}
