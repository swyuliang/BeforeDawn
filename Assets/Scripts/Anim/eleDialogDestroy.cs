using UnityEngine;
using System.Collections;

public class eleDialogDestroy : MonoBehaviour {
	public WeaponCrossHair wCross;
	// Use this for initialization
	void Awake () {
		wCross = GameObject.Find ("Weapon Camera").GetComponent<WeaponCrossHair> ();
		//wCross.isShow = true;
		//wCross.enabled = false;
	}

	
	// Update is called once per frame
	void Update () {
	
	}

	void OnDestroy()
	{
		//wCross.enabled = true;
		wCross.isShow = false;
	}
}
