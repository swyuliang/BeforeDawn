using UnityEngine;
using System.Collections;

public class MouseMove : MonoBehaviour {
	void Awake()
	{

		Cursor.visible = false;
		Screen.lockCursor = false;
	}
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	void OnDestroy()
	{
	
		Cursor.visible = true;
		Screen.lockCursor = true;
	}
}
