using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class destroyOnTriggerEnter : MonoBehaviour {

	public List<GameObject> objectsToDelete = new List<GameObject>();

	public bool selfDestroy = true;

	void OnTriggerEnter( Collider other )
	{
		if( other.tag == "Player" )
		{
			foreach( GameObject o in objectsToDelete ) Destroy ( o );

			if( selfDestroy ) Destroy ( this.gameObject );
		}
	}
}
