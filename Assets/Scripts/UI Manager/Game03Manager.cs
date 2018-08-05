using UnityEngine;
using System.Collections;

public class Game03Manager : MonoBehaviour {
	public GameObject elevator_Opened;
	public GameObject elevator_Closed;
	public GameObject[] baoxiang;
	public Baoxiang baoxiangScript;
	public GameObject key;
	public bool iskey; 

	// Use this for initialization
	void Start () {
		iskey = true;
		//keyIndex = Random.Range (1, key_pos.Length);
		//Instantiate (key, key_pos [keyIndex].transform.position, key_pos [keyIndex].transform.rotation);
		int Index = Random.Range(0,baoxiang.Length);
		GameObject temp = baoxiang [Index];
		baoxiangScript = temp.GetComponentInChildren<Baoxiang> ();
		baoxiangScript.thing.SetValue (key, 0);

	
	}
	
	// Update is called once per frame
	void Update () {
		if (iskey) 
		{
			elevator_Closed.SetActive (true);
			elevator_Opened.SetActive (false);
		}
		else
		{
			elevator_Closed.SetActive (false);
			elevator_Opened.SetActive (true);
		}

	
	}
}
