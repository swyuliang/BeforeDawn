using UnityEngine;
using System.Collections;

public class ZoomUP : MonoBehaviour {
	private GameManager gamemanager;
	// Use this for initialization
	void Awake () {
		gamemanager = GameObject.Find ("GameManager").GetComponent<GameManager> ();
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	void OnDestroy()
	{
		gamemanager.isZoom = true;
	}
	
}
