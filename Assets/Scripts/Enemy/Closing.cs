using UnityEngine;
using System.Collections;

public class Closing : MonoBehaviour {
	public float life = 2f;
	// Use this for initialization
	void Start () {
		StartCoroutine (Enable());
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	IEnumerator Enable()
	{
		yield return new WaitForSeconds (life);
		gameObject.SetActive (false);
	}
}
