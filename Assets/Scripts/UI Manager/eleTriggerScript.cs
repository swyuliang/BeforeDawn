using UnityEngine;
using System.Collections;

public class eleTriggerScript : MonoBehaviour {
	public elevator ele;
	public float waitime = 1.5f;
	void Awake()
	{
		ele = GetComponentInParent<elevator> ();
	}

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	void OnTriggerEnter(Collider other) {
		if (other.tag == "Player")
			StartCoroutine (eleMove());
	

	}


	IEnumerator eleMove()
	{
		yield return new WaitForSeconds (waitime);
		ele.isMov = true;

	}
}
