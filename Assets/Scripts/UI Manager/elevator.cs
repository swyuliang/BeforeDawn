using UnityEngine;
using System.Collections;

public class elevator : MonoBehaviour {
	// Use this for initialization
	public float Movespeed = 0.5f;
	public Animator ele;
	public bool isMov;
	public bool isAudio = true ; 
	void Awake()
	{
		ele = GetComponent<Animator> ();
	}
	void Start () {
		ele.SetBool ("isMove", false);
	
	}
	
	// Update is called once per frame
	void Update () {
		if (isMov) {
			ele.SetBool ("isMove", true);
			if(isAudio)
			{  
				Invoke("PlayAudio",0.5f);
				Invoke("PlayAudio",3.5f);
				Invoke("PlayAudio",6.5f);
				isAudio = false;
			}
		}
	}

	void PlayAudio()
	{
		this.GetComponent<AudioSource>().Play();
	}
}
