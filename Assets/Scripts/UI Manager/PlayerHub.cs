using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class PlayerHub : MonoBehaviour {

	public Text PlayerHpText;
	public PlayerHeatlh playerHp;
	public Text CurrentText;
	public Text MaxText;
	public Text TimeText;
	public Weapon weapon;
	private float pausedTime;
	public GameObject Pause;
	public WeaponCrossHair wCross;
	public string GameOver;
	public int  time = 180;
	private int min;
	private int scd;
	void Awake()
	{
		wCross = GameObject.Find ("Weapon Camera").GetComponent<WeaponCrossHair> ();
		Pause.SetActive (false);
		playerHp = GameObject.Find ("Player").GetComponent<PlayerHeatlh> ();
		weapon = GameObject.Find ("AK47_Anim").GetComponent<Weapon> ();
		PlayerHpText =GameObject.Find("PlayerHpText").GetComponent<Text>();
		CurrentText = GameObject.Find("CurrentText").GetComponent<Text>();
		MaxText =GameObject.Find("MaxText").GetComponent<Text>();
		//TimeText =GameObject.Find("TimeText").GetComponent<Text>();
	}
	// Use this for initialization
	void Start() {

		PlayerHpText.text =  playerHp.currentHp / playerHp.maxHp * 100 +"%";
		CurrentText.text = "" + weapon.currentbullet;
		MaxText.text = "" + weapon.maxbullet;

		min = (time / 60) % 60;
		scd = time % 60;
		if (TimeText != null) {
			TimeText.text = "黎明前倒计时:" + min + ":" + scd;
			InvokeRepeating ("TimeUpdate", 0, 1);
		}
	
	}
	
	// Update is called once per frame
	void Update () {
		if (time <= 0) {
			//TimeText.text = "Time:00:00";
			Application.LoadLevel(GameOver);
		    //任务失败
		}
		if(Input.GetKeyDown(KeyCode.Escape )){//Pause game when pause button is pressed
			if(Time.timeScale > 0){
				pausedTime = Time.timeScale;
				Time.timeScale = 0;
				Pause.SetActive(true);
				wCross.isShow = true;
			}else{
				Time.timeScale = pausedTime;
				Pause.SetActive(false);
				wCross.isShow = false;
			}
		}
	
	}

	public void UpdateCurrentBullet()
	{
		CurrentText.text = "" + weapon.currentbullet;
	}

	public void UpdateMaxBullet()
	{
		MaxText.text = "" + weapon.maxbullet;
	}

	public void UpdatePlayerHp()
	{
		float Hp = playerHp.currentHp / playerHp.maxHp;
		PlayerHpText.text = Hp * 100 +"%";


		if (Hp <= 0.25f)
			PlayerHpText.color = Color.red;
		else if (Hp  < 0.5)
			PlayerHpText.color = Color.yellow;
		else if (Hp >= 0.5f)
			PlayerHpText.color = Color.green;
	}

	void TimeUpdate()
	{
		if (time <= 0) 
		{
			TimeText.text = "黎明前倒计时:00:00";	
			Application.LoadLevel(GameOver);
		}
		else{
			time -= 1;
			min = (time / 60) % 60;
			scd = time % 60;
			if(min >= 10 && scd >= 10)
				TimeText.text = "黎明前倒计时:" + min + ":" + scd;
			else if(min < 10 && scd >= 10)
				TimeText.text = "黎明前倒计时:0" + min + ":" + scd;
			else if(min >= 10 && scd < 10)
				TimeText.text = "黎明前倒计时:" + min + ":0" + scd;
			else
				TimeText.text = "黎明前倒计时:0" + min + ":0" + scd;
		}
		
	}
}
