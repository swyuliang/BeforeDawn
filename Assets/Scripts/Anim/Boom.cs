using UnityEngine;
using System.Collections;

public class Boom : MonoBehaviour {
	public GameObject pos;
	public GameObject booming;
	public float waitime = 2f;


	// Use this for initialization
	void Awake()
	{

	}

	void Start () {
		StartCoroutine (booing ());
	}
	
	// Update is called once per frame
	void Update () {


	}

	IEnumerator booing()
	{
		yield return new WaitForSeconds (waitime);
		Instantiate (booming, pos.transform.position, pos.transform.rotation);
	}



}
