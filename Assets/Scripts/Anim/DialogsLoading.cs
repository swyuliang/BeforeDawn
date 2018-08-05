using UnityEngine;
using System.Collections;

public class DialogsLoading : MonoBehaviour {
	public string scenename;
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	void OnDestroy()
	{
		Application.LoadLevel(scenename);
	}
}
