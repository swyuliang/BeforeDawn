using UnityEngine;
using System.Collections;

public class DialogDestroy : MonoBehaviour {
	public GameObject Dialog;
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	void OnDestroy()
	{
		Instantiate (Dialog);
	}

}
