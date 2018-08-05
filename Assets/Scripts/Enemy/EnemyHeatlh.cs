using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class EnemyHeatlh : MonoBehaviour {
	public float maxHp = 100f;
	public float currentHp ;
	private bool isDead = false;
	public GameObject Dead;
	//public AudioClip deadSound;
	//public Game01Manager gamemanager;
	// Use this for initialization
	void Awake() {
		currentHp = maxHp;
		//gamemanager = GameObject.Find ("GameManager").GetComponent<Game01Manager> ();

	}
	
	// Update is called once per frame
	void Update () {

	}
	
	public void EnemyDamage(float Damount)
	{
		if (currentHp <= 0)
			return;

		currentHp -= Damount;

		if(currentHp <= 0 && !isDead)
		{
			currentHp = 0;
			//销毁怪物
			isDead = true ;
			//audio.clip = deadSound;
			//audio.Play();
			Die ();
		}
	}
	
	public void EnemyAddHeatlh(float Aamount)
	{
		currentHp += Aamount;
		
		if(currentHp > 100)
		{
			currentHp = 100;
		}
	}

	void Die()
	{
		//if(gamemanager)
			//gamemanager.subEnemy ();

		Destroy(gameObject);
		Instantiate (Dead, transform.position, transform.rotation);//产生尸体
	}

}
