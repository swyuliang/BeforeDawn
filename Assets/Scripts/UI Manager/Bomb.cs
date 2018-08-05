using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class Bomb : MonoBehaviour {
	public bool isTouch =false;
	public GameObject bomb;
	public ShowPolice show;

	public float speed =0.001f;//时间变化速度
	private float tempTime = 0;//临时变量
	private bool startDefuseBomb;//开始拆弹标志

	public Slider bombProgressBar;
	public GameObject bombargameobject;
	public PlayerHeatlh playhp;


	// Use this for initialization
	void Awake()
	{
		show = GameObject.Find ("GameManager").GetComponent<ShowPolice> ();
		playhp = GameObject.Find ("Player").GetComponent<PlayerHeatlh> ();
	}
	void Start () {
		bomb.SetActive (false);
		bombargameobject.SetActive (false);
	}
	
	// Update is called once per frame
	void Update () {
		if(isTouch)
			if(Input.GetKey(KeyCode.E) && !playhp.isdamage)
		{
			//Touch();
			//show.AddIndex();
			//this.enabled =false ;
			bombargameobject.SetActive (true);
			tempTime = Mathf.Lerp(tempTime ,1,speed * Time.deltaTime);
			bombProgressBar.value = tempTime / 1;
		}
		else 
		{
			tempTime = Mathf.Lerp(tempTime ,0,speed * Time.deltaTime);
			bombargameobject.SetActive(false);
			bombProgressBar.value = tempTime / 1;
		}

		if(tempTime > 0.99f)
		{
			tempTime = 1;
			Touch();
			show.AddIndex();
			this.enabled =false ;
			bombargameobject.SetActive(false);
		}

	
	}

	void Touch()
	{
		bomb.SetActive (true);
	}
}
