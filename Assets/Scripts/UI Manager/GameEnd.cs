using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class GameEnd : MonoBehaviour {
	public GameObject Bg;
	public float changetime = 2f;
	void Awake()
	{
		Bg.SetActive(false);
		Screen.lockCursor = false;
		Cursor.visible = true;
	}

	// Use this for initialization
	void Start () {

		InvokeRepeating ("ShowImage", changetime, 1);

	}
	
	// Update is called once per frame
	void Update () {

	}


	void ShowImage()
	{
			Bg.SetActive(true);
	}
}
