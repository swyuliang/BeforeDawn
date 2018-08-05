using UnityEngine;
using System.Collections;

public class keyDestroy : MonoBehaviour {
	public Game03Manager G3;
	// Use this for initialization
	void Awake () {
		G3 = GameObject.Find ("GameManager").GetComponent<Game03Manager> ();
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	void OnDestroy()
	{
		G3.iskey = false;
	}
}
