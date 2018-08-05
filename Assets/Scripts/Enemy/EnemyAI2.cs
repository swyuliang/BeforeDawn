using UnityEngine;
using System.Collections;

public class EnemyAI2 : MonoBehaviour {
	public int Damage = 5;   //怪物的攻击力
	private float attacktime; // 攻击计数器
	public float waitime = 2f ;
	//public float chaseToPlayer = 15f;//追踪主角的范围
	public float attackToPlayer = 1f;//攻击主角的范围
	//public float patrolSpeed =2f;//巡逻速度
	public float chaseSpeed = 4f;//追踪速度
	//public float patrolWaitTime =1f;//巡逻等待时间
	public float chaseWaitTime = 5f;//追踪等待时间
	//public Transform[] patrolWayPoints;//巡逻点
	private Vector3 distanceToPlayer;//怪物距离
	private PlayerHeatlh playerHp;   //获取主角的生命脚本
	private NavMeshAgent nav;
    private Transform player;
	private NPC_Dialog stop;   //停止标志
	public AudioClip attackSound;
	//private float patrolTimer;//巡逻计时器
	//private int wayPointsIndex;
	// Use this for initialization
	void Awake () {
		player = GameObject.FindGameObjectWithTag ("Player").transform;
		playerHp = player.GetComponent<PlayerHeatlh> ();
		nav = GetComponent<NavMeshAgent> ();
		stop = GameObject.Find("NPC").GetComponent<NPC_Dialog> ();
	    GetComponent<Animation>().wrapMode = WrapMode.Loop;
	    GetComponent<Animation>()["shoot"].wrapMode = WrapMode.Once;
		GetComponent<Animation>()["shoot"].speed = 0.75f;
		GetComponent<Animation>()["idle"].layer = -1;
		GetComponent<Animation>()["walk"].layer = -1;
		GetComponent<Animation>()["run"].layer = -1;
		
		//animation["walk"].speed = patrolSpeed;
		GetComponent<Animation>()["run"].speed = chaseSpeed;
	}
	
	// Update is called once per frame
	void Update () 
	{
		if(player != null)
	/*	distanceToPlayer = transform.position - player.position;//计算怪物与主角的距离
		Vector3 dir = distanceToPlayer.normalized;
		float direction = Vector3.Dot (dir, transform.forward); // 判断敌人是否正面对着玩家

			if (distanceToPlayer.magnitude < attackToPlayer && direction < 0 && playerHp.currentHp > 0) {//主角在攻击范围内，且主角生命值不为0
			{//进行攻击
				attacktime += Time.deltaTime;
				nav.Stop ();
				animation.Play ("shoot");
				if(attacktime >= waitime)
				{

					//再次判断主角是否在攻击范围内，如果是才扣血
					if (distanceToPlayer.magnitude < attackToPlayer && direction < 0)
						Attacking ();
				}
			    //Debug.Log (direction);
			}
		} else if (distanceToPlayer.magnitude > attackToPlayer && distanceToPlayer.magnitude < chaseToPlayer && playerHp.currentHp > 0) {//主角在视野范围内，但不在攻击范围内，且主角生命值大于0
				//进行追踪
				Chasing ();
			} else {
				//进行巡逻
				Patrolling ();
			}*/
		distanceToPlayer = transform.position - player.position;//计算怪物与主角的距离
		Vector3 dir = distanceToPlayer.normalized;
		float direction = Vector3.Dot (dir, transform.forward); // 判断敌人是否正面对着玩家
		
		if (playerHp.currentHp <= 0 || stop.isTouch || stop.isOver)
			//nav.Stop ();
			nav.enabled = false;
		else if (distanceToPlayer.magnitude < attackToPlayer && direction < 0 && playerHp.currentHp > 0) {//主角在攻击范围内，且主角生命值不为0
			{//进行攻击
				attacktime += Time.deltaTime;
				//nav.Stop ();
				nav.enabled = false;
				GetComponent<Animation>().Play ("shoot");
				if(attacktime >= waitime)
				{
					
					//再次判断主角是否在攻击范围内，如果是才扣血
					if (distanceToPlayer.magnitude < attackToPlayer && direction < 0)
						Attacking ();
				}
				//Debug.Log (direction);
			}
		} else if (distanceToPlayer.magnitude > attackToPlayer && playerHp.currentHp > 0) {//主角在视野范围内，但不在攻击范围内，且主角生命值大于0
			//进行追踪
			Chasing ();
		
		}



	
	}

	void Attacking()
	{
		GetComponent<AudioSource>().clip = attackSound;
		GetComponent<AudioSource>().Play ();
		playerHp.playerDamage (Damage);
		attacktime = 0;
		   
	}

	void Chasing()
	{
		nav.enabled = true;
		nav.speed = chaseSpeed;
		GetComponent<Animation>().Play("run");
		nav.destination = player.position;
	}

	/*void Patrolling()
	{
		nav.speed = patrolSpeed;
		if(nav.destination == transform.position)//判断主角与敌人的位置，如果超出视野范围，则重置巡逻点；
		{
			//巡逻等待时间的计数器开始计时
			patrolTimer += Time.deltaTime;
			animation.Play("idle");
			//等待时间过后
			if(patrolTimer >= patrolWaitTime)
			{
				//移动索引至下一个位置
				if(wayPointsIndex == patrolWayPoints.Length-1)
					wayPointsIndex =0 ;
				else
					wayPointsIndex ++;
				//重置计时器
				patrolTimer =0f;
			}
		}
		else 
		{
			//
			patrolTimer = 0f;
		    animation.Play ("walk");
		}
		//目标点设为路径点
		nav.destination = patrolWayPoints [wayPointsIndex].position;//把巡逻目的地指向巡逻点；

	}*/
	
}
