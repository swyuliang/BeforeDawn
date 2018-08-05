using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class setActiveOnTriggerEnter : MonoBehaviour {

	public List<GameObject> objectsToSet = new List<GameObject>();

	public bool active = true;

	public bool selfDestroy = true;

	void OnTriggerEnter( Collider other )
	{
		if( other.tag == "Player" )
		{
			foreach( GameObject o in objectsToSet ) o.SetActive( active );
			
			if( selfDestroy ) Destroy ( this.gameObject );
		}
	}
}
