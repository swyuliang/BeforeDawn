using UnityEngine;
using System.Collections;

public class setActiveOnAwake : MonoBehaviour {

	public bool active = false;

	void Start()
	{
		gameObject.SetActive( active );
	}
}
