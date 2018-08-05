using UnityEngine;
using System.Collections;

public class setParentOnTriggerEnter : MonoBehaviour {

	public GameObject parentObject;
	public GameObject parentTo;

	public bool selfDestroy = true;

	void OnTriggerEnter( Collider other )
	{
		if( other.tag == "Player" )
		{
			if( parentTo )
			{
				parentObject.transform.parent = parentTo.transform;
			}
			else
			{
				parentObject.transform.parent = null;
			}
			
			if( selfDestroy ) Destroy ( this.gameObject );
		}
	}
}
