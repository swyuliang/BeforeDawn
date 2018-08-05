using UnityEngine;
using System.Collections;

public class CreateDialog : MonoBehaviour {
	public GameObject d;
	public string nextname;
	// Use this for initialization
	void Start () {

	}
	
	// Update is called once per frame
	void Update () {

		if(!d)
		{
			Application.LoadLevel(nextname );
		}
	
	}

}
