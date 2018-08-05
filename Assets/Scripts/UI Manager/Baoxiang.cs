using UnityEngine;
using System.Collections;

public class Baoxiang : MonoBehaviour {
	public bool isTouch =false;
	public GameObject[] zombie;
	public GameObject pos;
	public GameObject[] thing;
	public AudioClip BaoxiangSound;
	public GameObject key_pos;
	public int keyIndex = 0;

	void Awake()
	{

   
	}
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void FixedUpdate () 
	{
		if(isTouch)
			if(Input.GetKeyDown(KeyCode.E))
		{
			Touch();
			this.enabled =false ;
		}


	
	}

	void Touch()
	{
		if (thing != null)
			keyIndex = Random.Range (0, thing.Length);
		if(thing[keyIndex] != null)
		Instantiate (thing [keyIndex],key_pos.transform.position,key_pos.transform.rotation);
		
		GetComponent<Animation>().Play ();
		GetComponent<AudioSource>().clip = BaoxiangSound;
		GetComponent<AudioSource>().Play ();
		if (pos) 
		{
			for (int i=0; i < zombie.Length; i++)
				Instantiate (zombie [i], pos.transform.position,pos.transform.rotation);
		}

	}
	
}
