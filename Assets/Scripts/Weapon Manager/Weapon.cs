using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class Weapon : MonoBehaviour {
	public GameObject bullet;
	public float fireRate = 0.5f;         //设置发射频率
	private float nextFire;        //设置下次发射的时间
	bool isReload = false ;          //是否在换子弹
	public float ReloadTime = 3f;          //换子弹的时间；
	public GameObject pos;
	public PlayerHub playerHub;
	public int currentbullet = 50; //初始弹夹中子弹的数量
	public int maxbullet = 100;    //角色身上所有的子弹的数量
	public GameObject Muzz;
	public AudioClip fireSound;
	public AudioClip ReloadSound;


	// Use this for initialization
	void Awake()
	{
		GetComponent<Animation>() ["Fire"].wrapMode = WrapMode.Once;
		GetComponent<Animation>() ["Ready"].layer = 3;
		GetComponent<Animation>() ["Fire"].layer = 3;
		GetComponent<Animation>() ["Reload"].layer  = 5;
		GetComponent<Animation>() ["Reload"].speed  = 1.3f;
		GetComponent<Animation>() ["Fire"].speed = 5f;
		playerHub = GameObject.Find ("Canvas").GetComponent<PlayerHub> ();
	}

	void Start () {

	
	}
	
	// Update is called once per frame
	void Update () {

	/*	if (animation ["Reload"] == animation.Stop ("Reload"))
			isReload = false;
		else
			isReload = true;*/

		if(Input.GetButton("Fire1") && !isReload && Time.time > nextFire && currentbullet > 0)
		{
			nextFire = Time.time + fireRate;
			OnFire();
			GetComponent<AudioSource>().clip = fireSound;
			GetComponent<AudioSource>().Play ();
			GetComponent<Animation>().Play ("Fire");
		}
		else if (Input.GetKeyUp(KeyCode.R) && !isReload && maxbullet > 0)
		{
			isReload = true;
			GetComponent<AudioSource>().clip = ReloadSound;
			GetComponent<AudioSource>().Play ();
			GetComponent<Animation>().Play("Reload");
			StartCoroutine(GunReload());
		}
	
	}



	void OnFire()
	{
		//初始化子弹
		Vector3 firePoint = Camera.main.ScreenToWorldPoint(new Vector3(Screen.width / 2, Screen.height / 2, Camera.main.nearClipPlane));
		Instantiate(bullet, firePoint, pos.transform.rotation);
		Instantiate (Muzz, pos.transform.position, pos.transform.rotation);
		currentbullet -= 1;
		playerHub.UpdateCurrentBullet ();
		//Instantiate (bullet, pos.transform.position, pos.transform.rotation);
	}

	IEnumerator GunReload()
	{
		yield return new WaitForSeconds(ReloadTime);
		isReload = false;

		if(maxbullet >= 50)
		{
			maxbullet = maxbullet - (50 - currentbullet);
		    currentbullet = 50;
		}
		else
		{
			currentbullet = maxbullet;
			maxbullet = 0;
		}	
		playerHub.UpdateCurrentBullet ();
		playerHub.UpdateMaxBullet ();

	}

	public void AddBullet()
	{
		maxbullet += 100;
		playerHub.UpdateMaxBullet ();
	}
}
