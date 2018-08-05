using UnityEngine;
using System.Collections;

public class walking : MonoBehaviour {
	private NavMeshAgent nav;
	public float patrolSpeed =2f;//巡逻速度
	private int wayPointsIndex = 0;
	public Transform[] patrolWayPoints;//巡逻点
	// Use this for initialization
	void Awake () {
		nav = GetComponent<NavMeshAgent> ();
		GetComponent<Animation>().Play ("walk");
	}
	
	// Update is called once per frame
	void Update () {
		nav.speed = patrolSpeed;
		if(nav.destination == transform.position)//判断主角与敌人的位置，如果超出视野范围，则重置巡逻点；
		{
				//移动索引至下一个位置
				if(wayPointsIndex == patrolWayPoints.Length-1)
					wayPointsIndex =0 ;
				else
					wayPointsIndex ++;


		}
		//目标点设为路径点
		nav.destination = patrolWayPoints [wayPointsIndex].position;//把巡逻目的地指向巡逻点；
		
	}
	

}
