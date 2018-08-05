using UnityEngine;
using System.Collections;

public class playAnimationOnTriggerEnter : MonoBehaviour {

	public GameObject animationTarget;
	public string stateToPlayName = "";
	public int stateLayer = 0;
	public float crossFadeTime = 0.1f;
	public bool selfDestroy = true;

	void OnTriggerEnter( Collider other )
	{
		if( other.tag == "Player" )
		{
			if( animationTarget ) animationTarget.GetComponent< Animator >().CrossFade( stateToPlayName, crossFadeTime, stateLayer );
			
			if( selfDestroy ) Destroy ( this.gameObject );
		}
	}
}
