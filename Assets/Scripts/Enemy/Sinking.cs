using UnityEngine;
using System.Collections;

public class Sinking : MonoBehaviour {
	public float life = 3f;
	//public float waitime = 2f;
	public float sinkspeed = 0.2f;
	private bool isSinking = false; 
	// Use this for initialization
	void Start () {
		StartCoroutine (Sink ());
	}
	
	// Update is called once per frame
	void Update () {
		if(isSinking)
		transform.Translate (-Vector3.up * sinkspeed * Time.deltaTime);
	
	}

	IEnumerator Sink()
	{
		yield return new WaitForSeconds (life);
		isSinking = true;
		GetComponent<Rigidbody> ().isKinematic = true;
		Destroy (gameObject, life);	

	}
}
