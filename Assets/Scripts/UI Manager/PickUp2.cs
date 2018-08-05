using UnityEngine;
using System.Collections;

public class PickUp2 : MonoBehaviour {
	public bool isTouch =false;
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		if(isTouch)
			if(Input.GetKeyDown(KeyCode.E))
		{
			Destroy(gameObject);
		}
	
	}
}
