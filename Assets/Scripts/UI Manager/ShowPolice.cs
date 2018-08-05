using UnityEngine;
using System.Collections;

public class ShowPolice : MonoBehaviour {
	public GameObject police;
	public GameObject p;
	public CapsuleCollider Pcollider;
	public int Index = 0;
	public int Max = 5; 
	// Use this for initialization
	void Awake()
	{
		Pcollider = police.GetComponent<CapsuleCollider> ();
		Pcollider.enabled = false;
	}
	void Start () {
		p.SetActive (false);

	
	}
	
	// Update is called once per frame
	void Update () {
		if (Index == Max) {
			Pcollider.enabled = true;
			p.SetActive (true);
		}
	
	}

	public void AddIndex()
	{
		Index  +=1;
	}
}
