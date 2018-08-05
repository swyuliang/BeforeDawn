using UnityEngine;
using System.Collections;

public class elevatorDialog : MonoBehaviour {
	public bool isTouch =false;
	public GameObject eleDialog;
	public float waitime = 10.0f;
	public WeaponCrossHair wCross;
	// Use this for initialization
	void Awake () {
		wCross = GameObject.Find ("Weapon Camera").GetComponent<WeaponCrossHair> ();
	}
	
	// Update is called once per frame
	void Update () {
		if(isTouch)
			if(Input.GetKeyDown(KeyCode.E))
		{
			//isTouch = false;
			Instantiate(eleDialog);
			wCross.isShow = true;
			
		}
		
	}
	void FixedUpdate () 
	{

		
			
	}	

}
