using UnityEngine;
using System.Collections;

public class EnemyDestroy : MonoBehaviour {
	public Game01Manager gamemanager;
	// Use this for initialization
	void Start () {
		gamemanager = GameObject.Find ("GameManager").GetComponent<Game01Manager> ();
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	void OnDestroy()
	{
		gamemanager.subEnemy ();
	}
}
