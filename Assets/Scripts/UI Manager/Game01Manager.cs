using UnityEngine;
using System.Collections;

public class Game01Manager : MonoBehaviour {
	public GameObject Zombie;
	private GameObject ZomGameObject;
	public int EnemyNumber = 50;
	public int currentEnemyNumber = 0;
	public GameObject CreatePos;
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {

		if(currentEnemyNumber < EnemyNumber)
		{
			ZomGameObject = Instantiate (Zombie, CreatePos.transform.position, CreatePos.transform.rotation) as GameObject;
			currentEnemyNumber ++;

		}


	}



			


	public void subEnemy()
	{
		currentEnemyNumber --;
	}
}
