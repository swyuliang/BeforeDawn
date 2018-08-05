using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class PlayerHeatlh : MonoBehaviour {

	public float maxHp = 100f;   //生命值上限
	public float currentHp ;     //当前生命值
	public Image damageImage;    
	public float flashSpeed = 2f; //受伤闪烁时间 
	public Color flashColour = new Color(1f,0f,0f,0.1f); //设置闪烁的颜色
	public bool isdamage;        //受伤标志
	public PlayerHub playerHub;
	public AudioClip deadSound;
	public AudioClip painSound;
	// Use this for initialization
	void Awake() {
		currentHp = maxHp;
		playerHub = GameObject.Find ("Canvas").GetComponent<PlayerHub> ();
	}
	
	// Update is called once per frame
	void Update () {
		if (isdamage)
		{
			flashColour.a = 1;
			damageImage.color =flashColour;

		}
		else
		{

			damageImage.color = Color.Lerp(damageImage.color ,Color.clear,flashSpeed * Time.deltaTime);
		}
		isdamage = false ;
	}

	public void playerDamage(float Damount)
	{
		GetComponent<AudioSource>().clip = painSound;
		GetComponent<AudioSource>().Play();
		isdamage = true;
		currentHp -= Damount;
		if(currentHp <= 0)
		{
			currentHp = 0;
			GetComponent<AudioSource>().clip = deadSound;
			GetComponent<AudioSource>().Play();
			//游戏结束
		}
		playerHub.UpdatePlayerHp ();
	}

	public void playerAddHeatlh(float Aamount)
	{
		currentHp += Aamount;

		if(currentHp > 100f)
		{
			currentHp = 100f;
		}
		playerHub.UpdatePlayerHp ();
	}

}
