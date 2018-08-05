using UnityEngine;
using System.Collections;

public class ViewMaxMap : MonoBehaviour {
	public GameObject MaxMap;
	// Use this for initialization
	void Start () {
		MaxMap.SetActive (false);
	
	}
	
	// Update is called once per frame
	void Update () {
		if (Input.GetKeyDown(KeyCode.V)) 
		{
			MaxMap.SetActive(true);
		}
		else if(Input.GetKeyUp(KeyCode.V))
		{
			MaxMap.SetActive(false);
		}

	}
}
