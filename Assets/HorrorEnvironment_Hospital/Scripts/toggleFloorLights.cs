using UnityEngine;
using System.Collections;

public class toggleFloorLights : MonoBehaviour {

	public GameObject floorToActivate;
	public GameObject floorToDeactivate;

	void OnTriggerEnter( Collider other )
	{
		if( other.tag == "Player" )
		{
			floorToActivate.SetActive( true );
			floorToDeactivate.SetActive( false );
		}
	}
}
