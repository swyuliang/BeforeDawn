using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class Bullet : MonoBehaviour {
	public LayerMask mask = -1;           //忽略层变量
	public int speed = 500;               //子弹速率
	public float life = 3;                //子弹生命值
	public int impactForce = 10;          //子弹打上物体时施加力的大小
	public float fireDistance = 15f;       //射击距离；
	public bool impactHoles = true;       //是否产生弹孔标志位
	public List<GameObject> impactObjects; //弹孔效果对象
	public float damage = 20;         //伤害范围
	private Vector3 velocity;              //子弹速度
	private Vector3 newPos;                //新的位置
	private Vector3 oldPos;                //上次位置
	private bool hasHit =false ;           //是否已经产生碰撞标志位
	public RaycastHit hit;                     //声明碰撞信息变量

	// Use this for initialization
	void Start () {
		newPos = transform.position;       //子弹新位置初始化
		oldPos = newPos;                   //子弹旧位置初始化
		velocity = speed * transform.forward; //计算子弹速度
		Destroy (gameObject, life);            //life秒后摧毁子弹对象
	
	}
	
	// Update is called once per frame
	void Update () {
		if (hasHit)                         //已经产生碰撞
			return;                       //不执行下面代码
		newPos += velocity * Time.deltaTime;    //子弹发射后不断向前
		Vector3 direction = newPos - oldPos;	//计算子弹的方向
		float distance = direction.magnitude;	//计算子弹移动的距离
		if (distance > 0 ) {						//当子弹移动距离大于零时
			if (Physics.Raycast (oldPos, direction, out hit, fireDistance, mask)) {	//使用射线检测distance
				newPos = hit.point;              //将碰撞点赋值给newPos变量
				hasHit = true;                	//设置已经碰撞标志为真
				//计算Up向量到碰撞点法向量所要进行的旋转
				Quaternion rotation = Quaternion.FromToRotation (Vector3.up, hit.normal);
				//获取目标身上的生命脚本；
				EnemyHeatlh targetHealth = hit.collider.GetComponent<EnemyHeatlh> ();
				if (targetHealth)				//如果处在
					targetHealth.EnemyDamage (damage);
				if (hit.rigidbody) {				//如果被碰撞体上有刚体
					hit.rigidbody.AddForce (transform.forward * impactForce, ForceMode.Impulse);//对刚体施加一个力
				}
				if (impactHoles) {                 //如果弹孔对象存在
					for (int i = 0; i<impactObjects.Count; i++) { //遍历弹孔列表
						if (hit.transform.tag == impactObjects [i].tag) {//当两个标签相同
							//碰撞点实例化一个弹孔
							GameObject hole = (GameObject)Instantiate (impactObjects [i], hit.point, rotation);
							hole.transform.parent = hit.transform;//设置弹孔位置
					//	}
					}
				}
				Destroy (gameObject, 1); 			//一秒后摧毁此对象
			}
		}
		//oldPos = transform.position;         	//重新计算旧位置
		transform.position = newPos;			//实现子弹移动的效果
	  }
	}
}