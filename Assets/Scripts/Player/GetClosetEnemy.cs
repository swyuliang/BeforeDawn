using UnityEngine;
using System.Collections;

public class GetClosetEnemy : MonoBehaviour {

	private GameObject[] enemies;
	private GameObject wantsdEnemy;
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	public GameObject GetClosetZom()
	{
		enemies = GameObject.FindGameObjectsWithTag("Enemy");
		float distanceToEnemy = Mathf.Infinity;

		foreach(GameObject enemy in enemies)
		{
			float newDistanceToEnemy = Vector3.Distance(enemy.transform.position,this.transform.position);
			if(newDistanceToEnemy < distanceToEnemy)
			{
				distanceToEnemy = newDistanceToEnemy;
			    wantsdEnemy = enemy;
			}
		}
		return wantsdEnemy;
	}
}
